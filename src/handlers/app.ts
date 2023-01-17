import { Context, APIGatewayProxyCallback, APIGatewayEvent } from "aws-lambda";

export const handler = async (event: APIGatewayEvent, context: Context, callback: APIGatewayProxyCallback) => {
  if (event.httpMethod !== "GET") {
    throw new Error(`getAllItems only accept GET method, you tried: ${event.httpMethod}`);
  }

  try {
    const response = {
      statusCode: 200,
      body: "Hello Serverless",
    };
    console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
    return response;
  } catch (err) {
    console.log("Error", err);
  }
};
