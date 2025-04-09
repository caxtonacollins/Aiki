"use client";

import React from "react";
import {
  MessageSquare,
  Users,
  Calendar,
  ExternalLink,
  ArrowRight,
  Bell,
  Eye,
} from "lucide-react";
import Image from "next/image";
import { communities, discussions, events } from "@/mocks/communityData";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { usePrivyAuth } from "@/hooks/use-privy-auth";
import AvatarImg from "@/public/avata.jpg";

const Community = () => {
  const { user } = usePrivyAuth();

  // Helper to get user's initials for avatar fallback
  const getUserInitials = () => {
    if (!user?.email) return "U";
    return user.email.charAt(0).toUpperCase();
  };

  return (
    <div className="min-h-screen">
      {/* Community Header */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-secondary/50 to-sky-400/20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-4 fade-in">Community</h1>
            <p
              className="text-lg text-muted-foreground mb-8 fade-in"
              style={{ animationDelay: "0.1s" }}
            >
              Connect with fellow learners, join discussions, and participate in
              events to expand your network and deepen your knowledge.
            </p>
          </div>
        </div>
      </section>

      {/* Community Content */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content - 2/3 width */}
            <div className="lg:col-span-2">
              {/* Upcoming Events */}
              <Card className="mb-12 p-5">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-primary" />
                    <h2 className="text-xl font-semibold">Upcoming Events</h2>
                  </div>
                  <a
                    href="/events"
                    className="text-primary hover:text-primary/80 transition-colors flex items-center text-sm font-medium"
                  >
                    View all events
                    <ArrowRight className="ml-1 w-4 h-4" />
                  </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {events.map((event, index) => (
                    <Card
                      key={`${event.id}-${index}`}
                      className={`p-0 rounded-xl overflow-hidden ${
                        event.featured ? "" : "border-2 border-primary/20"
                      }`}
                    >
                      <div className="relative">
                        <Image
                          width={800}
                          height={800}
                          src={event.image}
                          alt={event.title}
                          className="w-full h-40 object-cover"
                        />
                        {event.featured && (
                          <div className="absolute top-3 left-3">
                            <span className="text-xs font-medium py-1 px-2 bg-primary text-primary-foreground rounded-full">
                              Featured
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="p-5">
                        <h3 className="text-lg font-semibold mb-2">
                          {event.title}
                        </h3>
                        <div className="flex items-center text-muted-foreground mb-2">
                          <Calendar className="w-4 h-4 mr-1" />
                          <span className="text-sm mr-3">{event.date}</span>
                          <span className="text-sm">{event.time}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                          {event.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-muted-foreground">
                            <Users className="w-4 h-4 mr-1" />
                            <span className="text-sm">
                              {event.attendees} attending
                            </span>
                          </div>
                          <a
                            href={`/events/${event.id}`}
                            className="text-primary hover:text-primary/80 transition-colors text-sm font-medium"
                          >
                            Learn more
                          </a>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </Card>

              {/* Recent Discussions */}
              <Card className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <MessageSquare className="w-5 h-5 mr-2 text-primary" />
                    <h2 className="text-xl font-semibold">
                      Recent Discussions
                    </h2>
                  </div>
                  <a
                    href="/forum"
                    className="text-primary hover:text-primary/80 transition-colors flex items-center text-sm font-medium"
                  >
                    View all discussions
                    <ArrowRight className="ml-1 w-4 h-4" />
                  </a>
                </div>

                <div className="rounded-xl overflow-hidden border border-gray-100 shadow-subtle">
                  {discussions.map((discussion, index) => (
                    <div
                      className="p-5 hover:bg-gradient-to-b hover:from-secondary/50 hover:to-sky-400/20 transition-colors"
                      key={discussion.id}
                    >
                      <div className="flex items-start">
                        <Image
                          width={800}
                          height={800}
                          src={discussion.author.avatar}
                          alt={discussion.author.name}
                          className="w-8 h-8 rounded-full mr-3 mt-1"
                        />
                        <div className="flex-1">
                          <a
                            href={`/discussions/${discussion.id}`}
                            className="text-lg font-medium hover:text-primary transition-colors"
                          >
                            {discussion.title}
                          </a>
                          <div className="flex flex-wrap items-center text-muted-foreground mt-2 mb-3">
                            <span className="text-sm mr-3">
                              by {discussion.author.name}
                            </span>
                            <span className="text-sm">{discussion.posted}</span>
                          </div>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {discussion.tags.map((tag) => (
                              <span
                                key={tag}
                                className="text-xs py-1 px-2 bg-secondary rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          <div className="flex items-center">
                            <div className="flex items-center text-muted-foreground mr-4">
                              <MessageSquare className="w-4 h-4 mr-1" />
                              <span className="text-sm">
                                {discussion.replies} replies
                              </span>
                            </div>
                            <div className="flex items-center text-muted-foreground">
                              <Eye className="w-4 h-4 mr-1" />
                              <span className="text-sm">
                                {discussion.views} views
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      {index < discussions.length - 1 && (
                        <hr className="border-gray-100" />
                      )}
                    </div>
                  ))}
                  <div className="p-4 bg-gray-50 text-center">
                    <a
                      href="/forum/new"
                      className="text-primary hover:text-primary/80 transition-colors font-medium text-sm"
                    >
                      Start a new discussion
                    </a>
                  </div>
                </div>
              </Card>
            </div>

            {/* Sidebar - 1/3 width */}
            <div className="lg:col-span-1 space-y-8">
              {/* User Profile Card */}
              <Card className="rounded-xl p-5 border shadow-subtle">
                <div className="text-center">
                  <div className="w-[4.5rem] h-[4.5rem] rounded-full bg-secondary mx-auto flex items-center justify-center">
                    {/* <User className="w-10 h-10 text-muted-foreground" /> */}
                    <Avatar className="h-16 w-16">
                      {/* <AvatarImage src={user?.avatarUrl || ""} className="rounded-full"/> */}
                      <AvatarImage
                        src={AvatarImg.src}
                        className="rounded-full"
                      />

                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {getUserInitials()}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <h3 className="font-semibold mt-4">Join Our Community</h3>
                  <p className="text-sm text-muted-foreground mt-2 mb-5">
                    Connect with fellow learners, participate in discussions,
                    and attend events.
                  </p>
                  <div className="space-y-3">
                    <Input
                      placeholder="Enter a Nickname"
                      className="border-sky-400"
                      // value={newNickName}
                      // onChange={(e) => setNickName(e.target.value)}
                    />
                    <Button>Submit</Button>
                  </div>
                </div>
              </Card>

              {/* Active Communities */}
              <Card className="rounded-xl border shadow-subtle">
                <CardHeader className="flex items-center mb-4">
                  <Users className="w-5 h-5 mr-2 text-primary" />
                  <h3 className="font-semibold">Active Communities</h3>
                </CardHeader>
                <CardContent className="space-y-3">
                  {communities.map((community, index) => {
                    const Icon = community.icon; // Create Icon component reference
                    return (
                      <a
                        key={index}
                        href={`/communities/${community.name
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                        className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-secondary/70 flex items-center justify-center mr-3">
                            <Icon className="w-5 h-5" />
                            {/* Render the icon as a component */}
                          </div>
                          <span className="text-sm font-medium">
                            {community.name}
                          </span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {community.members.toLocaleString()} members
                        </div>
                      </a>
                    );
                  })}
                </CardContent>
                <CardFooter className="mt-4 ">
                  <a
                    href="/communities"
                    className="w-full text-primary hover:text-primary/80 transition-colors text-sm font-medium text-center"
                  >
                    View All Communities
                  </a>
                </CardFooter>
              </Card>

              {/* Telegram Bot */}
              <div className="bg-primary/5 rounded-xl p-6 border border-primary/10">
                <div className="flex items-center mb-4">
                  <Bell className="w-5 h-5 mr-2 text-primary" />
                  <h3 className="font-semibold">Stay Connected</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Join our Telegram bot for quick access to community updates,
                  new courses, and events.
                </p>
                <a
                  href="https://t.me/aikilearningbot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full py-2 px-4 bg-sky-400 rounded-lg text-sm font-medium"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Connect with Telegram
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-12">
        <div className="container mx-auto px-6 text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} Aiki Learning. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

const Code = ({ className }: { className?: string }) => {
  return (
    <>
      <Code className={className} />
    </>
  );
};

export default Community;
