"use client";

import { useState } from "react";
import { Trophy, ArrowUp, ArrowDown, Sparkles } from "lucide-react";
import Image from "next/image";
import { leaderboardUser } from "@/mocks/leaderboardUser";
import { Button } from "./ui/button";

const Leaderboard = () => {
  // Mock data for the leaderboard
  const [topUsers] = useState(leaderboardUser);

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <ArrowUp className="w-4 h-4 text-green-500" />;
      case "down":
        return <ArrowDown className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getRankStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case 2:
        return "bg-gray-100 text-gray-800 border-gray-200";
      case 3:
        return "bg-blue-200 text-amber-800 border-amber-200";
      default:
        return "bg-white text-gray-800 border-gray-200";
    }
  };

  return (
    <section className="py-24 bg-background text-foreground">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">Top Learners</h2>
          <p className="">
            Our community&apos;s most dedicated learners, ranked by points
            earned through course completions, contributions, and achievements.
          </p>
        </div>

        <div className="bg-background/50 text-foreground max-w-3xl mx-auto rounded-xl shadow-subtle overflow-hidden">
          <div className="p-4 bg-primary dark:bg-primary text-primary-foreground flex items-center justify-between">
            <div className="flex items-center">
              <Trophy className="w-5 h-5 mr-2" />
              <h3 className="font-bold">Leaderboard</h3>
            </div>
            <span className="text-sm">Updated daily</span>
          </div>

          <div className="divide-y divide-gray-100 dark:divide-gray-700">
            {topUsers.map((user) => (
              <div
                key={user.id}
                className="p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold ${getRankStyle(
                      user.rank
                    )}`}
                  >
                    {user.rank}
                  </div>
                  <Image
                    width={10}
                    height={10}
                    src={user.avatar}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover border border-gray-300"
                  />
                  <div>
                    <h4 className="font-medium">{user.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      @{user.username}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  <div className="flex items-center">
                    <Sparkles className="w-4 h-4 text-amber-500 mr-1" />
                    <span className="text-sm">{user.achievements}</span>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center">
                      <span className="font-semibold">
                        {user.points.toLocaleString()}
                      </span>
                      <span className="ml-1">{getTrendIcon(user.trend)}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      points
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-primary text-center">
            <Button className="text-sm text-primary-foreground font-medium hover:text-primary-foreground/80 dark:hover:text-muted-foreground/95 transition-colors cursor-pointer">
              View Full Leaderboard
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Leaderboard;
