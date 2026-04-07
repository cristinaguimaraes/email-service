import type { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { EventBridgeClient, PutEventsCommand } from "@aws-sdk/client-eventbridge";
import { sendEmailSchema } from "../lib/schema";

const eventBridge = new EventBridgeClient({});

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
    console.log("handler invoked");
    console.log("raw event body:", event.body);
    console.log("EVENT_BUS_NAME:", process.env.EVENT_BUS_NAME);
  try {
    const body = event.body ? JSON.parse(event.body) : {};
    const parsed = sendEmailSchema.safeParse(body);

    if (!parsed.success) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "Invalid payload",
          errors: parsed.error.flatten(),
        }),
      };
    }

    await eventBridge.send(
      new PutEventsCommand({
        Entries: [
          {
            EventBusName: process.env.EVENT_BUS_NAME,
            Source: "app.email",
            DetailType: "SendEmailRequested",
            Detail: JSON.stringify(parsed.data),
          },
        ],
      }),
    );

    return {
      statusCode: 202,
      body: JSON.stringify({ message: "Accepted" }),
    };
  } catch (error) {
    console.error("publish failed", error);

    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal server error" }),
    };
  }
};