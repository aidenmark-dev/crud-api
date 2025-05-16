import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { v4 as uuidv4 } from 'uuid';
import { PutCommand } from '@aws-sdk/lib-dynamodb';
import { formatErrorResponse, formatJSONResponse } from '../../utils/helpers';
import dynamoDb from '../../utils/db';
import { CreateTaskDTO } from '../../utils/dto';
import { Task } from '../../utils/types';
import { Tables, TaskStatus } from '../../utils/constants';

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    if (!event.body) {
      return formatErrorResponse(new Error('Missing request body'), 400);
    }

    const requestBody: CreateTaskDTO = JSON.parse(event.body);

    if (!requestBody.title) {
      return formatErrorResponse(new Error('Title is required in body'), 400);
    }

    const timestamp = new Date().toISOString();
    const task: Task = {
      id: uuidv4(),
      title: requestBody.title,
      description: requestBody.description || '',
      status: requestBody.status || TaskStatus.TODO,
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    await dynamoDb.send(
      new PutCommand({
        TableName: Tables.tasks,
        Item: task,
      })
    );

    return formatJSONResponse({ task });
  } catch (error) {
    console.error('Error creating task:', error);
    return formatErrorResponse(error as Error);
  }
};
