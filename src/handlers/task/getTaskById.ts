import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { GetCommand } from '@aws-sdk/lib-dynamodb';
import { formatJSONResponse, formatErrorResponse } from '../../utils/helpers';
import dynamoDb from '../../utils/db';
import { Task } from '../../utils/types';
import { Tables } from '../../utils/constants';

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const id = event.pathParameters?.id;

    if (!id) {
      return formatErrorResponse(new Error('Missing task ID'), 400);
    }

    const result = await dynamoDb.send(
      new GetCommand({
        TableName: Tables.tasks,
        Key: { id },
      })
    );

    if (!result.Item) {
      return formatErrorResponse(new Error('Task not found'), 404);
    }

    const task = result.Item as Task;

    return formatJSONResponse({ task });
  } catch (error) {
    console.error('Error getting task by ID:', error);
    return formatErrorResponse(error as Error);
  }
};
