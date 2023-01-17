import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";
import { Context, APIGatewayProxyCallback, APIGatewayEvent } from "aws-lambda";

const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocumentClient.from(client);

const TableName = "sam-sample-SampleTable-1T8PIFTWBASE2";

export const getByIdHandler = async (event: APIGatewayEvent, context: Context, callback: APIGatewayProxyCallback) => {
  if (event.httpMethod !== "GET") {
    throw new Error(`getMethod only accept GET method, you tried: ${event.httpMethod}`);
  }

  const { id } = event.pathParameters as any;

  const params = {
    TableName,
    Key: { id },
  };

  try {
    const data = await ddbDocClient.send(new GetCommand(params));
    var item = data.Item;
  } catch (err) {
    console.log("Error", err);
  }

  const response = {
    statusCode: 200,
    body: JSON.stringify(item),
  };

  console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
  return response;
};
