import TodoPage from "@/components/pages/todo";

export const revalidate = 60;

export default async function Todo({ 
  searchParams 
}: {
  searchParams: Promise<{ userId?: string }>
}) {
  const { userId } = await searchParams;
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos${
    userId ? `?userId=${userId}` : "?_start=0&_limit=10"
  }`);

  const initialTodosData = await res.json();
  return <TodoPage initialTodosData={initialTodosData} userId={userId} />;
}