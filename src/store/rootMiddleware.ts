import { todoApi } from "./todo/api";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const rootMiddleware = (getDefaultMiddleware: any) =>
  getDefaultMiddleware().concat(todoApi.middleware);
