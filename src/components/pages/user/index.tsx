import { Button } from "@/components/ui/button";
import { IUserResponse } from "@/types/user";

export default function UserPage({ users = [] }: { users?: IUserResponse[] }) {
  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <div className="grid grid-cols-3 gap-4">
        <Button href={`/todo`}>Show All</Button>
        {users.map((user) => (
          <Button key={user.id} href={`/todo?userId=${user.id}`}>
            {`User ${user.id}`}
          </Button>
        ))}
      </div>
    </div>
  );
}
