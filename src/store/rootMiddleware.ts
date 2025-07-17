import { todoApi } from "./todo/api";

export const rootMiddleware = (getDefaultMiddleware: any) =>
  getDefaultMiddleware().concat(todoApi.middleware);
