import React from "react";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { DropdownMenuSeparator } from "../ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";
import { Icons } from "@/components/ui/icons";
import { useRouter } from "next/navigation";
import { Skeleton } from "../ui/skeleton";
import { useAppSelector } from "@/store";

export default function UserMenu() {
  const { user, logout } = useAuth();
  const { bio } = useAppSelector((state) => state.portfolio);
  const router = useRouter();

  const isAuthenticated = localStorage.getItem("is_authenticated") === "true";
  const getUserInitials = () => {
    if (!user || !user.name) return "";
    const names = user.name.split(" ");
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return names[0][0].toUpperCase();
  };

  // Function to generate a random color
  // const getRandomColor = () => {
  //   const colors = [
  //     "bg-red-500",
  //     "bg-blue-500",
  //     "bg-green-500",
  //     "bg-yellow-500",
  //     "bg-purple-500",
  //     "bg-pink-500",
  //     "bg-indigo-500",
  //     "bg-teal-500",
  //   ];
  //   // Use the user's email to ensure the same color for the same user
  //   const index = user?.email
  //     ? user.email
  //         .split("")
  //         .reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0) %
  //       colors.length
  //     : Math.floor(Math.random() * colors.length);

  //   return colors[index];
  // };

  const handleProfileClick = () => {
    router.push("/profile");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {isAuthenticated && (
          <Avatar className="cursor-pointer">
            <AvatarFallback className={`bg-purple-600 text-white`}>
              {getUserInitials()}
            </AvatarFallback>
            <AvatarImage src={bio.profileImg} />
          </Avatar>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={handleProfileClick}
        >
          <Icons.user className="mr-2 h-4 w-4" />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem
          disabled
          className="cursor-pointer text-muted-foreground"
          onClick={() => {}}
        >
          <Icons.chartBar className="mr-2 h-4 w-4" />
          Analytics
          <Badge variant="secondary" className="ml-1">
            Soon
          </Badge>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          variant="destructive"
          onClick={() => logout()}
        >
          <Icons.logout className="mr-2 h-4 w-4" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
