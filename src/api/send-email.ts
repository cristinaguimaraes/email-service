import type { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { EventBridgeClient, PutEventsCommand } from "@aws-sdk/client-eventbridge";
import { sendEmailSchema } from "../lib/schema";
import { z } from "zod";

const eventBridge = new EventBridgeClient({});

export const handler: APIGatewayProxyHandlerV2 = async (event) => {

  try {
    const body = event.body ? JSON.parse(event.body) : {};
    const parsed = sendEmailSchema.safeParse(body);

    if (!parsed.success) {
      const flattened = z.flattenError(parsed.error);

      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "Invalid payload",
          errors: flattened.fieldErrors,
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
