import { combineReducers } from "@reduxjs/toolkit";
import { todoApi } from "./todo/api";

export const rootReducer = combineReducers({
  [todoApi.reducerPath]: todoApi.reducer,
});
