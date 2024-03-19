import { User } from "@/lib/types";
import React from "react";
import { Avatar } from "@/components";
import { Button } from "@/packages/ui";

const UserCard = ({
  user,
  action,
  label,
}: {
  user: User;
  action: any
  label: string;
}) => {
  return (
    <div
      className="flex items-center justify-between space-x-2 py-2 px-2 border rounded-md"
      key={user.id}
    >
      <div className="flex items-center space-x-2">
        <Avatar
          fallback={user.name}
          img={user.image}
          className="w-10 h-10 text-sm"
        />
        <div>
          <p className="text-[16px] font-medium">{user.name}</p>
          <p className="text-sm overflow-hidden whitespace-nowrap truncate">
            {user.bio ?? "Lorem ipsum dolor sit amet, consectetur."}
          </p>
        </div>
      </div>
      <Button variant="outline" onClick={action}>
        {label}
      </Button>
    </div>
  );
};

export default UserCard;
