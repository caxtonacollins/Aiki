"use client";

import React from "react";
import {
  MessageSquare,
  Users,
  Calendar,
  ExternalLink,
  ArrowRight,
  Bell,
  User,
  Image as Image_Icon,
} from "lucide-react";
import Image from "next/image";

interface CommunityEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  description: string;
  image: string;
  attendees: number;
  featured: boolean;
  host: string;
}

interface Discussion {
  id: string;
  title: string;
  author: {
    name: string;
    avatar: string;
  };
  posted: string;
  replies: number;
  views: number;
  tags: string[];
}

const Community = () => {
  // Sample community events
  const events: CommunityEvent[] = [
    {
      id: "web3-conference",
      title: "Web3 Developer Conference",
      date: "June 15, 2023",
      time: "10:00 AM - 5:00 PM",
      description:
        "Join industry leaders and developers for a day of talks, workshops, and networking focused on Web3 technologies.",
      image:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop",
      attendees: 230,
      featured: true,
      host: "Aiki Learning",
    },
    {
      id: "nft-hackathon",
      title: "NFT Hackathon Weekend",
      date: "July 22-24, 2023",
      time: "All day",
      description:
        "A 48-hour hackathon focused on building innovative NFT projects with mentorship from industry experts.",
      image:
        "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=800&auto=format&fit=crop",
      attendees: 175,
      featured: true,
      host: "Web3 Foundation",
    },
    {
      id: "defi-workshop",
      title: "DeFi Developer Workshop",
      date: "August 5, 2023",
      time: "1:00 PM - 4:00 PM",
      description:
        "Hands-on workshop exploring the latest trends and tools in decentralized finance development.",
      image:
        "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=800&auto=format&fit=crop",
      attendees: 85,
      featured: false,
      host: "DeFi Alliance",
    },
  ];

  // Sample discussions
  const discussions: Discussion[] = [
    {
      id: "future-of-web3",
      title: "The Future of Web3 Education: Challenges and Opportunities",
      author: {
        name: "Alex Chen",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      },
      posted: "2 days ago",
      replies: 28,
      views: 342,
      tags: ["web3", "education", "future"],
    },
    {
      id: "smart-contract-security",
      title: "Best Practices for Smart Contract Security Audits",
      author: {
        name: "Maya Patel",
        avatar: "https://randomuser.me/api/portraits/women/68.jpg",
      },
      posted: "5 days ago",
      replies: 42,
      views: 516,
      tags: ["security", "smart contracts", "audits"],
    },
    {
      id: "dao-governance",
      title: "Effective DAO Governance Models: What's Working?",
      author: {
        name: "David Kim",
        avatar: "https://randomuser.me/api/portraits/men/75.jpg",
      },
      posted: "1 week ago",
      replies: 36,
      views: 428,
      tags: ["dao", "governance", "community"],
    },
    {
      id: "zero-knowledge-proofs",
      title: "Zero-Knowledge Proofs: Applications Beyond Privacy",
      author: {
        name: "Elena Rodriguez",
        avatar: "https://randomuser.me/api/portraits/women/90.jpg",
      },
      posted: "2 weeks ago",
      replies: 19,
      views: 275,
      tags: ["zk-proofs", "cryptography", "applications"],
    },
    {
      id: "defi-trends",
      title: "Emerging DeFi Trends for Developers to Watch",
      author: {
        name: "Thomas Wilson",
        avatar: "https://randomuser.me/api/portraits/men/42.jpg",
      },
      posted: "3 weeks ago",
      replies: 31,
      views: 389,
      tags: ["defi", "trends", "development"],
    },
  ];

  // Active communities
  const communities = [
    {
      name: "Blockchain Developers",
      members: 3845,
      icon: <Code className="h-4 w-4" />,
    },
    {
      name: "Web3 Educators",
      members: 1267,
      icon: <BookOpen className="h-4 w-4" />,
    },
    {
      name: "Smart Contract Auditors",
      members: 958,
      icon: <Shield className="h-4 w-4" />,
    },
    {
      name: "DeFi Innovators",
      members: 2134,
      icon: <TrendingUp className="h-4 w-4" />,
    },
    {
      name: "NFT Creators",
      members: 1789,
      icon: <ImageIcon className="h-4 w-4" />,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Community Header */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-secondary/50 to-white">
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
              <div className="mb-12">
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
                  {events.map((event) => (
                    <div
                      key={event.id}
                      className={`glass-card rounded-xl overflow-hidden ${
                        event.featured ? "border-2 border-primary/20" : ""
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
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Discussions */}
              <div>
                <div className="flex items-center justify-between mb-6">
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

                <div className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-subtle">
                  {discussions.map((discussion, index) => (
                    <React.Fragment key={discussion.id}>
                      <div className="p-5 hover:bg-gray-50 transition-colors">
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
                              <span className="text-sm">
                                {discussion.posted}
                              </span>
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
                      </div>
                      {index < discussions.length - 1 && (
                        <hr className="border-gray-100" />
                      )}
                    </React.Fragment>
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
              </div>
            </div>

            {/* Sidebar - 1/3 width */}
            <div className="lg:col-span-1 space-y-8">
              {/* User Profile Card */}
              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-subtle">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-secondary mx-auto flex items-center justify-center">
                    <User className="w-10 h-10 text-muted-foreground" />
                  </div>
                  <h3 className="font-semibold mt-4">Join Our Community</h3>
                  <p className="text-sm text-muted-foreground mt-2 mb-5">
                    Connect with fellow learners, participate in discussions,
                    and attend events.
                  </p>
                  <div className="space-y-3">
                    <a
                      href="/signup"
                      className="block w-full py-2 px-4 bg-primary text-primary-foreground rounded-lg text-sm font-medium text-center"
                    >
                      Sign Up
                    </a>
                    <a
                      href="/login"
                      className="block w-full py-2 px-4 border border-gray-200 rounded-lg text-sm font-medium text-center"
                    >
                      Log In
                    </a>
                  </div>
                </div>
              </div>

              {/* Active Communities */}
              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-subtle">
                <div className="flex items-center mb-4">
                  <Users className="w-5 h-5 mr-2 text-primary" />
                  <h3 className="font-semibold">Active Communities</h3>
                </div>
                <div className="space-y-3">
                  {communities.map((community, index) => (
                    <a
                      key={index}
                      href={`/communities/${community.name
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                      className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-secondary/70 flex items-center justify-center mr-3">
                          {community.icon}
                        </div>
                        <span className="text-sm font-medium">
                          {community.name}
                        </span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {community.members.toLocaleString()} members
                      </div>
                    </a>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <a
                    href="/communities"
                    className="text-primary hover:text-primary/80 transition-colors text-sm font-medium"
                  >
                    View All Communities
                  </a>
                </div>
              </div>

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
                  className="flex items-center justify-center w-full py-2 px-4 bg-primary text-primary-foreground rounded-lg text-sm font-medium"
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

// Missing icon components
const Code = ({ className }: { className?: string }) => {
  return <Code className={className} />;
};

const BookOpen = ({ className }: { className?: string }) => {
  return <BookOpen className={className} />;
};

const Shield = ({ className }: { className?: string }) => {
  return <Shield className={className} />;
};

const TrendingUp = ({ className }: { className?: string }) => {
  return <TrendingUp className={className} />;
};

const ImageIcon = ({ className }: { className?: string }) => {
  return <Image_Icon className={className} />;
};

const Eye = ({ className }: { className?: string }) => {
  return <Eye className={className} />;
};

export default Community;
