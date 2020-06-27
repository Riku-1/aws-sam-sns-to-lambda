"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const webhook_1 = require("@slack/webhook");
exports.handler = (event) => __awaiter(void 0, void 0, void 0, function* () {
    const ssm = new aws_sdk_1.default.SSM({ region: "ap-northeast-1" });
    const webhookUrl = yield ssm
        .getParameter({ Name: "slack-webhook-url" })
        .promise()
        .then((res) => res.Parameter.Value)
        .catch((err) => {
        throw err;
    });
    const webhook = new webhook_1.IncomingWebhook(webhookUrl);
    yield webhook
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
});
