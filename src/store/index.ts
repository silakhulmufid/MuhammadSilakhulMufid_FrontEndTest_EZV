import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";
import { rootMiddleware } from "./rootMiddleware";

export const store = configureStore({
  reducer: rootReducer,
  middleware: rootMiddleware,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;