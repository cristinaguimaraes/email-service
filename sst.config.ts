/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
    app(input) {
      return {
        name: "email-service",
        home: "aws",
        removal: input?.stage === "prod" ? "retain" : "remove",
      };
    },
    async run() {
      const bus = new sst.aws.Bus("EmailBus");
  
      const dlq = new sst.aws.Queue("EmailDlq");
  
      const queue = new sst.aws.Queue("EmailQueue", {
        dlq: {
          queue: dlq.arn,
          retry: 3,
        },
      });
  
      const api = new sst.aws.ApiGatewayV2("EmailApi");
      api.route("POST /send-email", {
        handler: "src/api/send-email.handler",
        environment: {
          EVENT_BUS_NAME: bus.name,
        },
        link: [bus],
      });
  
      sst.aws.Bus.subscribeQueue("SendEmailRequestedRule", bus.arn, queue.arn, {
        pattern: {
          source: ["app.email"],
          "detail-type": ["SendEmailRequested"],
        },
      });
  
      queue.subscribe({
        handler: "src/workers/email-consumer.handler",
        environment: {
          FROM_EMAIL: "crisgferreira@gmail.com",
        },
        permissions: [
          {
            actions: ["ses:SendEmail", "ses:SendRawEmail"],
            resources: ["*"],
          },
        ],
        batch: {
          partialResponses: true,
        },
      });
  
      return {
        api: api.url,
      };
    },
  });