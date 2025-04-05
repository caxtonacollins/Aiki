import { Project } from "@/types";

export const projects: Project[] = [
  {
    id: 1,
    title: "Decentralized Finance Dashboard",
    description:
      "Build a comprehensive DeFi dashboard that tracks multiple protocols and provides analytics.",
    category: "blockchain",
    skills: ["React", "Solidity", "Web3.js", "Data Visualization"],
    completionRate: 65,
    contributors: [
      { id: 1, name: "Alex Johnson" },
      { id: 2, name: "Maria Garcia" },
      { id: 3, name: "James Wilson" },
      { id: 4, name: "Sarah Ahmed" },
    ],
    tasks: [
      {
        id: 101,
        title: "Set up project structure and basic UI",
        description:
          "Create the React app and implement the basic layout and navigation components.",
        difficulty: "beginner",
        estimatedTime: "2-3 hours",
        techStack: ["React", "TypeScript", "TailwindCSS"],
      },
      {
        id: 102,
        title: "Implement wallet connection functionality",
        description:
          "Add support for connecting to MetaMask and other Ethereum wallets.",
        difficulty: "intermediate",
        estimatedTime: "3-4 hours",
        techStack: ["Web3.js", "Ethers.js", "React"],
      },
      {
        id: 103,
        title: "Create data visualization components",
        description:
          "Build charts and graphs to display DeFi protocol metrics and performance.",
        difficulty: "intermediate",
        estimatedTime: "5-7 hours",
        techStack: ["D3.js", "React", "TypeScript"],
      },
      {
        id: 104,
        title: "Develop smart contract interaction layer",
        description:
          "Create service to interact with various DeFi protocols' smart contracts.",
        difficulty: "advanced",
        estimatedTime: "8-10 hours",
        techStack: ["Solidity", "Web3.js", "Ethers.js"],
      },
    ],
  },
  {
    id: 2,
    title: "AI-Powered Market Analysis Tool",
    description:
      "Create a tool that uses machine learning to analyze cryptocurrency markets and predict trends.",
    category: "data",
    skills: ["Python", "TensorFlow", "Data Science", "API Integration"],
    completionRate: 42,
    contributors: [
      { id: 5, name: "David Chen" },
      { id: 6, name: "Priya Patel" },
      { id: 2, name: "Maria Garcia" },
    ],
    tasks: [
      {
        id: 201,
        title: "Set up data collection pipeline",
        description:
          "Implement services to collect historical and real-time market data.",
        difficulty: "intermediate",
        estimatedTime: "4-6 hours",
        techStack: ["Python", "APIs", "MongoDB"],
      },
      {
        id: 202,
        title: "Develop data cleaning and preprocessing",
        description:
          "Create functions to clean, normalize, and prepare data for analysis.",
        difficulty: "intermediate",
        estimatedTime: "3-5 hours",
        techStack: ["Python", "Pandas", "NumPy"],
      },
      {
        id: 203,
        title: "Implement machine learning models",
        description: "Build and train ML models for market trend prediction.",
        difficulty: "advanced",
        estimatedTime: "10-12 hours",
        techStack: ["TensorFlow", "Scikit-learn", "Python"],
      },
    ],
  },
  {
    id: 3,
    title: "Cross-Chain NFT Marketplace",
    description:
      "Build a marketplace that allows trading NFTs across multiple blockchain networks.",
    category: "blockchain",
    skills: ["React", "Solidity", "Cross-chain", "Smart Contracts"],
    completionRate: 28,
    contributors: [
      { id: 1, name: "Alex Johnson" },
      { id: 7, name: "Thomas Wright" },
      { id: 8, name: "Sophia Kim" },
    ],
    tasks: [
      {
        id: 301,
        title: "Design NFT marketplace UI",
        description:
          "Create the user interface for browsing, buying, and selling NFTs.",
        difficulty: "beginner",
        estimatedTime: "5-7 hours",
        techStack: ["React", "TailwindCSS", "Figma"],
      },
      {
        id: 302,
        title: "Develop NFT smart contracts",
        description: "Create the smart contracts for minting and trading NFTs.",
        difficulty: "advanced",
        estimatedTime: "8-10 hours",
        techStack: ["Solidity", "OpenZeppelin", "Hardhat"],
      },
    ],
  },
  {
    id: 4,
    title: "Blockchain Data Analytics Platform",
    description:
      "A platform to analyze on-chain data across multiple blockchains and visualize trends.",
    category: "data",
    skills: ["Data Engineering", "SQL", "Python", "Visualization"],
    completionRate: 75,
    contributors: [
      { id: 9, name: "Emma Rodriguez" },
      { id: 2, name: "Maria Garcia" },
      { id: 10, name: "Omar Hassan" },
    ],
    tasks: [
      {
        id: 401,
        title: "Set up data warehouse",
        description:
          "Create a data warehouse structure to store and query blockchain data.",
        difficulty: "intermediate",
        estimatedTime: "5-7 hours",
        techStack: ["PostgreSQL", "dbt", "Python"],
      },
      {
        id: 402,
        title: "Develop data visualization dashboard",
        description:
          "Build interactive visualizations for exploring blockchain metrics.",
        difficulty: "intermediate",
        estimatedTime: "6-8 hours",
        techStack: ["React", "D3.js", "Recharts"],
      },
    ],
  },
];