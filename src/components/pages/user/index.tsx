import { IUserResponse } from "@/types/user";
import { User2 } from "lucide-react";
import Link from "next/link";

export default function UserPage({ users = [] }: { users?: IUserResponse[] }) {
  return (
    <div className="w-full min-h-screen space-y-4 px-4 md:px-20 lg:px-40 py-16 bg-background">
      <h1 className="text-3xl font-bold">User</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <Link 
          href="todo"
          className="group rounded-md bg-gradient-to-br from-accent from-50 to-muted group-hover:from-90 w-full h-40 flex flex-col items-center justify-center gap-4 text-gray-500 text-center"
        >
          <div className="size-16 flex items-center justify-center rounded-full bg-gray-100 text-gray-600">
            <User2 className="size-8 group-hover:scale-105" />
          </div>
          <span>
            All User
          </span>
        </Link>
        {users.map((user) => (
          <Link 
            key={user.id} 
            href={`/todo?userId=${user.id}`} 
            className="group rounded-md bg-gradient-to-br from-accent to-muted hover:from-accent/90 w-full h-40 flex flex-col items-center justify-center gap-4 text-gray-500 text-center"
          >
            <div className="size-16 flex items-center justify-center rounded-full bg-gray-100 text-gray-600">
              <User2 className="size-8 group-hover:scale-105" />
            </div>
            <span className="line-clamp-2">
              {user.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
