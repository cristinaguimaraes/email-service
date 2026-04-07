import type { SQSHandler, SQSBatchResponse, SQSRecord } from "aws-lambda";
import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";
import { sendEmailSchema } from "../lib/schema";

const ses = new SESv2Client({});

type EventBridgeEnvelope = {
  source: string;
  "detail-type": string;
  detail: {
    toEmail: string;
    subject: string;
    message: string;
  };
};

async function processRecord(record: SQSRecord) {
    const envelope = JSON.parse(record.body) as EventBridgeEnvelope;
    const payload = sendEmailSchema.parse(envelope.detail);
  
    await ses.send(
      new SendEmailCommand({
        FromEmailAddress: process.env.FROM_EMAIL!,
        Destination: {
          ToAddresses: [payload.toEmail],
        },
        Content: {
          Simple: {
            Subject: { Data: payload.subject },
            Body: {
              Text: { Data: payload.message },
            },
          },
        },
      }),
    );
  }
  
  export const handler: SQSHandler = async (event): Promise<SQSBatchResponse> => {
    const batchItemFailures: { itemIdentifier: string }[] = [];
  
    for (const record of event.Records) {
      try {
        await processRecord(record);
      } catch (error) {
        console.error("record failed", { messageId: record.messageId, error });
        batchItemFailures.push({ itemIdentifier: record.messageId });
      }
    }
  
    return { batchItemFailures };
  };