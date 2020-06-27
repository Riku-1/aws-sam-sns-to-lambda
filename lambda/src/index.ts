import aws from "aws-sdk";
import { IncomingWebhook } from "@slack/webhook";
import { SNSEvent } from "aws-lambda";

exports.handler = async (event: SNSEvent) => {
  const ssm = new aws.SSM({ region: "ap-northeast-1" });
  const webhookUrl = await ssm
    .getParameter({ Name: "slack-webhook-url" })
    .promise()
    .then((res) => res.Parameter!.Value!)
    .catch((err) => {
      throw err;
    });

  const webhook = new IncomingWebhook(webhookUrl);
  await webhook
    .send({
      text: event.Records[0].Sns.Message,
    })
    .then((res) => {
      console.log(res);
      console.log("send message");
    })
    .catch((err) => {
      console.log(err);
      console.log("failed to send message");
    });
};
