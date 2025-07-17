import UserPage from "@/components/pages/user";
import { IUserResponse } from "@/types/user";

export default async function User() {
  const data = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await data.json() as IUserResponse[];

  return <UserPage users={users} />;
}
