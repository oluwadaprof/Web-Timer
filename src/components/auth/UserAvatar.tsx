import React from "react";
import { useAuthStore } from "@/lib/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";

export const UserAvatar = () => {
  const { user, signInWithGoogle, signOut } = useAuthStore();

  if (!user) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="text-white hover:bg-[#3A3F4B]"
        onClick={signInWithGoogle}
      >
        <LogIn className="h-5 w-5" />
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full hover:bg-[#3A3F4B]"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.user_metadata.avatar_url} />
            <AvatarFallback>
              {user.email?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-56 bg-[#2A2E37] text-white border-[#3A3F4B]"
      >
        <DropdownMenuItem className="text-sm cursor-pointer hover:bg-[#3A3F4B]">
          {user.email}
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-sm cursor-pointer hover:bg-[#3A3F4B] text-red-400"
          onClick={signOut}
        >
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
