import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  ITodo,
  ICreateTodoRequest,
  ICreateTodoResponse,
  IUpdateTodoResponse,
  IUpdateTodoRequest,
} from "@/types/todo";
import { IPaginationParams } from "@/types/pagination";

export const todoApi = createApi({
  reducerPath: "todoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com",
  }),
  tagTypes: ["Todo"],
  endpoints: (builder) => ({
    getTodos: builder.query<ITodo[], IPaginationParams & { userId?: number }>({
      query: ({ start, limit, userId }) => `/todos?_start=${start}&_limit=${limit}${userId ? `&userId=${userId}` : ""}`,
      providesTags: ["Todo"],
    }),
    getAllTodos: builder.query<ITodo[], void>({
      query: () => "/todos",
      providesTags: ["Todo"],
    }),
    createTodo: builder.mutation<ICreateTodoResponse, ICreateTodoRequest>({
      query: (todo) => ({
        url: "/todos",
        method: "POST",
        body: todo,
      }),
      invalidatesTags: ["Todo"],
    }),
    updateTodo: builder.mutation<IUpdateTodoResponse, IUpdateTodoRequest>({
      query: (todo) => {
        const { id, ...rest } = todo;
        return {
          url: `/todos/${id}`,
          method: "PUT",
          body: rest,
        };
      },
      invalidatesTags: ["Todo"],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useGetAllTodosQuery,
  useCreateTodoMutation,
  useUpdateTodoMutation,
  useLazyGetTodosQuery,
} = todoApi;
