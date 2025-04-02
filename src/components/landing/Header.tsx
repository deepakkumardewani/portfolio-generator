import Link from "next/link";
import React from "react";
import { ThemeToggle } from "../ui/theme-toggle";
import { ShimmerButton } from "../magicui/shimmer-button";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { Badge } from "../ui/badge";

export default function Header() {
  const { user, signOut } = useAuth();

  // Function to get user's initials
  const getUserInitials = () => {
    if (!user || !user.name) return "U";
    const names = user.name.split(" ");
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return names[0][0].toUpperCase();
  };

  // Function to generate a random color
  const getRandomColor = () => {
    const colors = [
      "bg-red-500",
      "bg-blue-500",
      "bg-green-500",
      "bg-yellow-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-indigo-500",
      "bg-teal-500",
    ];
    // Use the user's email to ensure the same color for the same user
    const index = user?.email
      ? user.email
          .split("")
          .reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0) %
        colors.length
      : Math.floor(Math.random() * colors.length);

    return colors[index];
  };

  return (
    <header className="fixed top-0 w-full z-10 bg-neutral-50 dark:bg-neutral-950 backdrop-blur-md border-b border-border/40 shadow-sm h-[72px]">
      <div className="flex justify-between items-center px-6 py-4 w-full mx-auto">
        <Link href="/" className="transition-transform hover:scale-105">
          <h1 className="text-2xl font-bold text-black/90 dark:text-white bg-clip-text">
            PortfolioGen
          </h1>
        </Link>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          {user ? (
            <div className="flex items-center gap-2">
              <Link href="/create">
                <ShimmerButton className="shadow-2xl" shimmerColor="#9E7AFF">
                  <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:text-stone-300 text-md">
                    Get Started
                  </span>
                </ShimmerButton>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer ml-2">
                    <AvatarFallback
                      className={`${getRandomColor()} text-white`}
                    >
                      {getUserInitials()}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => {}}
                  >
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => {}}
                  >
                    Dashboard
                    <Badge variant="secondary" className="ml-1">
                      Soon
                    </Badge>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="cursor-pointer"
                    variant="destructive"
                    onClick={() => signOut()}
                  >
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <Link href="/auth/signup">
              <ShimmerButton className="shadow-2xl" shimmerColor="#9E7AFF">
                <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:text-stone-300 text-md">
                  Sign Up
                </span>
              </ShimmerButton>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
