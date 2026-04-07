import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Callback, Context, SQSBatchResponse } from "aws-lambda";

const sendMock = vi.fn();

vi.mock("@aws-sdk/client-sesv2", () => {
  function SESv2Client() {
    return {
      send: sendMock,
    };
  }

  function SendEmailCommand(input: unknown) {
    return input;
  }

  return {
    SESv2Client,
    SendEmailCommand,
  };
});

describe("email-consumer handler", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    process.env.FROM_EMAIL = "sender@example.com";
  });

  it("processes a valid SQS record", async () => {
    sendMock.mockResolvedValue({ MessageId: "123" });

    const { handler } = await import("../src/workers/email-consumer");

    const event = {
      Records: [
        {
          messageId: "msg-1",
          body: JSON.stringify({
            source: "app.email",
            "detail-type": "SendEmailRequested",
            detail: {
              toEmail: "recipient@example.com",
              subject: "Test",
              message: "Hello",
            },
          }),
        },
      ],
    };

    const result = (await handler(
      event as any,
      {} as Context,
      (() => undefined) as Callback<void | SQSBatchResponse>,
    )) as SQSBatchResponse;

    expect(result.batchItemFailures).toEqual([]);
    expect(sendMock).toHaveBeenCalledTimes(1);
  });

  it("returns batch failure if SES send fails", async () => {
    sendMock.mockRejectedValue(new Error("SES failed"));

    const { handler } = await import("../src/workers/email-consumer");

    const event = {
      Records: [
        {
          messageId: "msg-1",
          body: JSON.stringify({
            source: "app.email",
            "detail-type": "SendEmailRequested",
            detail: {
              toEmail: "recipient@example.com",
              subject: "Test",
              message: "Hello",
            },
          }),
        },
      ],
    };

    const result = (await handler(
      event as any,
      {} as Context,
      (() => undefined) as Callback<void | SQSBatchResponse>,
    )) as SQSBatchResponse;

    expect(result.batchItemFailures).toEqual([{ itemIdentifier: "msg-1" }]);
  });
});