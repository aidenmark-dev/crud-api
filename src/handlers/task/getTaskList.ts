import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { ScanCommand } from '@aws-sdk/lib-dynamodb';
import { formatJSONResponse, formatErrorResponse } from '../../utils/helpers';
import dynamoDb from '../../utils/db';
import { Task } from '../../utils/types';
import { Tables } from '../../utils/constants';

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const result = await dynamoDb.send(
      new ScanCommand({
        TableName: Tables.tasks,
      })
    );

    const tasks = result.Items as Task[];

    return formatJSONResponse({ tasks });
  } catch (error) {
    console.error('Error getting tasks:', error);
    return formatErrorResponse(error as Error);
  }
};
