import { TaskStatus } from './constants';

export interface CreateTaskDTO {
  title: string;
  description: string;
  status?: TaskStatus;
}

export interface UpdateTaskDTO {
  title?: string;
  description?: string;
  status?: TaskStatus;
}
