import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { Context, APIGatewayProxyCallback, APIGatewayEvent } from "aws-lambda";

const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocumentClient.from(client);

const TableName = "sam-sample-SampleTable-1T8PIFTWBASE2";

export const putItemHandler = async (event: any, context: Context, callback: APIGatewayProxyCallback) => {
  if (event.httpMethod !== "POST") {
    throw new Error(`postMethod only accepts POST method, you tried: ${event.httpMethod} method.`);
  }
  const body = event.body;
  const id = body.id;
  const name = body.name;
  console.log("イベント", event);
  var params = {
    TableName,
    Item: { id, name },
  };

  try {
    const data = await ddbDocClient.send(new PutCommand(params));
    console.log("Success - item added or updated", data);
    const response = {
      statusCode: 200,
      body: JSON.stringify(data),
    };
    return response;
  } catch (err) {
    console.log("Error", err);
  }

  // All log statements are written to CloudWatch
  // console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
  // return response;
};
