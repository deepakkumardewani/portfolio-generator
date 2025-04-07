"use client";

import { Suspense, useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { Badge } from "@/components/ui/badge";
import { DeploymentStatus } from "@/utils/exportUtils";
import Link from "next/link";
import { darkModeClasses } from "@/lib/utils";
import ProfileHeader from "./components/ProfileHeader";
import LoadingScreen from "@/components/LoadingScreen";

// Use the same key constant as defined in exportUtils.ts
const NETLIFY_SITE_ID_KEY = "netlify_portfolio_site_id";
const NETLIFY_SITE_URL_KEY = "netlify_portfolio_site";
const NETLIFY_DEPLOYMENT_DATE_KEY = "netlify_deployment_date";

interface DeploymentInfo {
  siteId: string | null;
  url: string;
  deployedAt?: string;
}

export default function ProfilePage() {
  const { user } = useAuth();
  const [deploymentInfo, setDeploymentInfo] = useState<DeploymentInfo | null>(
    null
  );

  // Function to get user's initials for avatar
  const getUserInitials = () => {
    if (!user || !user.name) return "U";
    const names = user.name.split(" ");
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return names[0][0].toUpperCase();
  };

  useEffect(() => {
    // Get deployment information from localStorage
    const siteId = localStorage.getItem(NETLIFY_SITE_ID_KEY);
    const siteUrl = localStorage.getItem(NETLIFY_SITE_URL_KEY);

    if (siteId && siteUrl) {
      setDeploymentInfo({
        siteId,
        url: siteUrl,
        deployedAt:
          localStorage.getItem(NETLIFY_DEPLOYMENT_DATE_KEY) || undefined,
      });
    }
  }, []);

  const visitSite = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <Suspense fallback={<LoadingScreen />}>
      <main className="min-h-screen bg-stone-50 dark:bg-neutral-950 pt-12 pb-24">
        <div className="container mx-auto px-4">
          <ProfileHeader />

          <div className="container mx-auto max-w-2xl px-4 py-10">
            <h1 className="text-3xl font-bold mb-8">Your Profile</h1>

            {/* User Information Card */}
            <Card className="mb-8 bg-neutral-50 dark:bg-neutral-950">
              <CardHeader className="flex flex-row items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="bg-purple-600 text-white text-xl">
                    {getUserInitials()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-2xl">{user?.name}</CardTitle>
                  <CardDescription className="text-base">
                    {user?.email}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div>
                    <p className="text-sm font-medium mb-1">
                      Account Information
                    </p>
                    <Separator className="mb-3" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Account ID
                        </p>
                        <p className="font-mono text-sm truncate">
                          {user?.$id}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Created On
                        </p>
                        <p>
                          {new Date(
                            user?.$createdAt || ""
                          ).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Deployment Information Card */}
            <Card className="mb-8 bg-neutral-50 dark:bg-neutral-950">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icons.rocketIcon className="h-5 w-5" />
                  Deployment Details
                </CardTitle>
                <CardDescription>
                  Information about your portfolio deployment
                </CardDescription>
              </CardHeader>
              <CardContent>
                {deploymentInfo ? (
                  <div className="grid gap-4">
                    <div>
                      <p className="text-sm font-medium mb-1">
                        Latest Deployment
                      </p>
                      <Separator className="mb-3" />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Status
                          </p>
                          <Badge className="mt-1 bg-green-500 hover:bg-green-600">
                            Live
                          </Badge>
                        </div>
                        {deploymentInfo.deployedAt && (
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Deployed On
                            </p>
                            <p>
                              {new Date(
                                deploymentInfo.deployedAt
                              ).toLocaleString()}
                            </p>
                          </div>
                        )}
                        <div className="md:col-span-2">
                          <p className="text-sm text-muted-foreground">
                            Deployment URL
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <p className="font-mono text-sm whitespace-pre-wrap">
                              <Link
                                href={deploymentInfo.url}
                                target="_blank"
                                className="text-blue-500 hover:underline"
                              >
                                {deploymentInfo.url}
                              </Link>
                            </p>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => visitSite(deploymentInfo.url)}
                            >
                              <Icons.externalLink className="h-4 w-4 mr-1" />{" "}
                              Visit
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="py-8 text-center">
                    <Icons.alertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">
                      No deployments yet
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      You haven't deployed your portfolio yet.
                    </p>
                    <Link href="/create">
                      <Button>
                        <Icons.plus className="h-4 w-4 mr-2" />
                        Create Your Portfolio
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </Suspense>
  );
}
