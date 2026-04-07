import { describe, expect, it, vi, beforeEach } from "vitest";
import type {
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
  Callback,
  Context,
} from "aws-lambda";

const sendMock = vi.fn();

vi.mock("@aws-sdk/client-eventbridge", () => {
  function EventBridgeClient() {
    return {
      send: sendMock,
    };
  }

  function PutEventsCommand(input: unknown) {
    return input;
  }

  return {
    EventBridgeClient,
    PutEventsCommand,
  };
});

describe("send-email handler", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    process.env.EVENT_BUS_NAME = "test-bus";
  });

  it("returns 400 for invalid payload", async () => {
    const { handler } = await import("../src/api/send-email");

    const event = {
      body: JSON.stringify({
        toEmail: "not-an-email",
        subject: "Hello",
        message: "Test",
      }),
    } as APIGatewayProxyEventV2;

    const result = (await handler(
      event,
      {} as Context,
      (() => undefined) as Callback<APIGatewayProxyResultV2>,
    )) as APIGatewayProxyResultV2;

    expect(typeof result).toBe("object");
    if (typeof result !== "string") {
      expect(result.statusCode).toBe(400);
    }
  });

  it("returns 202 for valid payload", async () => {
    sendMock.mockResolvedValue({ FailedEntryCount: 0 });

    const { handler } = await import("../src/api/send-email");

    const event = {
      body: JSON.stringify({
        toEmail: "test@example.com",
        subject: "Hello",
        message: "Test message",
      }),
    } as APIGatewayProxyEventV2;

    const result = (await handler(
      event,
      {} as Context,
      (() => undefined) as Callback<APIGatewayProxyResultV2>,
    )) as APIGatewayProxyResultV2;

    expect(typeof result).toBe("object");
    if (typeof result !== "string") {
      console.log(result.body);
      expect(result.statusCode).toBe(202);
    }

    expect(sendMock).toHaveBeenCalled();
  });
});