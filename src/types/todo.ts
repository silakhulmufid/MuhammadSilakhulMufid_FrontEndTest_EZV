export interface ITodo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

export interface ITodosResponse {
  todos: ITodo[];
  total: number;
}

export interface ICreateTodoRequest {
  title: string;
  userId: number;
  completed?: boolean;
}

export interface ICreateTodoResponse {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
}

export interface IUpdateTodoRequest extends ICreateTodoRequest {
  id: number;
}

export type IUpdateTodoResponse = ICreateTodoResponse