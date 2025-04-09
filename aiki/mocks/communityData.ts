import { Community, CommunityEvent, Discussion } from "@/types";
import {
  Code,
  BookOpen,
  Shield,
  TrendingUp,
  Image,
} from "lucide-react";
// Sample community events
export const events: CommunityEvent[] = [
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
];

// Sample discussions
export const discussions: Discussion[] = [
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
export const communities: Community[] = [
  {
    name: "Blockchain Developers",
    members: 3845,
    icon: Code,
  },
  {
    name: "Web3 Educators",
    members: 1267,
    icon: BookOpen,
  },
  {
    name: "Smart Contract Auditors",
    members: 958,
    icon: Shield,
  },
  {
    name: "DeFi Innovators",
    members: 2134,
    icon: TrendingUp,
  },
  {
    name: "NFT Creators",
    members: 1789,
    icon: Image,
  },
];
