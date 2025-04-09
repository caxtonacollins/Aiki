import { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "defi-lending-platform",
    title: "DeFi Lending Platform",
    description:
      "A decentralized lending and borrowing platform built on Ethereum with smart contracts.",
    longDescription:
      "This comprehensive DeFi lending platform allows users to deposit assets as collateral and borrow other assets against it. Built on Ethereum, it features interest rate models, liquidation mechanisms, and governance protocols. The front-end is built with React and ethers.js, while the back-end consists of Solidity smart contracts deployed to the Ethereum blockchain.",
    image:
      "https://images.unsplash.com/photo-1639322537504-6427a16b0a28?q=80&w=1000&auto=format&fit=crop",
    category: "defi",
    difficulty: "advanced",
    technologies: ["Solidity", "React", "Ethers.js", "Hardhat"],
    starsCount: 245,
    forksCount: 68,
    contributorsCount: 12,
    createdAt: "2023-03-15",
    updatedAt: "2023-11-02",
    demo: "https://example.com/defi-lending-demo",
    repo: "https://github.com/caxtonacollins",
  },
  {
    id: "nft-marketplace",
    title: "NFT Marketplace",
    description:
      "A marketplace for creating, buying, and selling NFTs with support for multiple collections.",
    longDescription:
      "This NFT marketplace allows users to mint, list, buy, and sell NFTs across multiple collections. It features a modern UI, auction functionality, royalty payments to original creators, and integration with popular wallets. The platform is built using Next.js for the frontend and Solidity smart contracts for the backend, all deployed on Polygon for low gas fees.",
    image:
      "https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=1000&auto=format&fit=crop",
    category: "nft",
    difficulty: "intermediate",
    technologies: ["Next.js", "Solidity", "IPFS", "Polygon"],
    starsCount: 187,
    forksCount: 45,
    contributorsCount: 8,
    createdAt: "2023-05-20",
    updatedAt: "2023-10-18",
    demo: "https://example.com/nft-marketplace",
    repo: "https://github.com/caxtonacollins",
  },
  {
    id: "dao-governance",
    title: "DAO Governance Framework",
    description:
      "A complete governance framework for decentralized autonomous organizations with voting mechanisms.",
    longDescription:
      "This DAO governance framework provides a complete solution for creating and managing decentralized autonomous organizations. It includes token-based voting, proposal creation and execution, treasury management, and delegate voting. The system is built with security and flexibility in mind, allowing customization of voting parameters and governance rules.",
    image:
      "https://images.unsplash.com/photo-1642104704074-907c0698cbd9?q=80&w=1000&auto=format&fit=crop",
    category: "dao",
    difficulty: "advanced",
    technologies: ["Solidity", "React", "The Graph", "IPFS"],
    starsCount: 312,
    forksCount: 76,
    contributorsCount: 15,
    createdAt: "2023-01-10",
    updatedAt: "2023-12-05",
    demo: "https://example.com/dao-governance",
    repo: "https://github.com/caxtonacollins",
  },
  {
    id: "blockchain-voting",
    title: "Blockchain Voting System",
    description:
      "A secure and transparent voting system built on blockchain technology for various elections.",
    longDescription:
      "This blockchain-based voting system enables secure, transparent, and tamper-proof elections. It features voter authentication, anonymous voting, real-time tallying, and full auditability. The system can be used for organizational elections, community governance, or even as a prototype for larger-scale voting systems. Built with a React frontend and Solidity smart contracts on Ethereum.",
    image:
      "https://images.unsplash.com/photo-1642104704074-907c0698cbd9?q=80&w=1000&auto=format&fit=crop",
    category: "blockchain",
    difficulty: "intermediate",
    technologies: ["React", "Solidity", "Web3.js", "MetaMask"],
    starsCount: 156,
    forksCount: 32,
    contributorsCount: 7,
    createdAt: "2023-04-08",
    updatedAt: "2023-09-25",
    demo: "https://example.com/blockchain-voting",
    repo: "https://github.com/caxtonacollins",
  },
  {
    id: "web3-social-network",
    title: "Web3 Social Network",
    description:
      "A decentralized social network with user-owned data and content monetization features.",
    longDescription:
      "This Web3 social network puts users in control of their data and content. Features include decentralized identity, content ownership through NFTs, tokenized engagement, and community governance. The platform allows creators to monetize their content directly from fans without intermediaries and provides a censorship-resistant environment for sharing ideas.",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1000&auto=format&fit=crop",
    category: "web3",
    difficulty: "advanced",
    technologies: ["React", "IPFS", "Ceramic", "Ethereum"],
    starsCount: 278,
    forksCount: 54,
    contributorsCount: 19,
    createdAt: "2023-02-14",
    updatedAt: "2023-11-30",
    demo: "https://example.com/web3-social",
    repo: "https://github.com/caxtonacollins",
  },
  {
    id: "defi-dashboard",
    title: "DeFi Portfolio Dashboard",
    description:
      "A comprehensive dashboard for tracking and managing DeFi investments across multiple protocols.",
    longDescription:
      "This DeFi portfolio dashboard helps users track their investments across various DeFi protocols, displaying key metrics like APY, impermanent loss, and total value locked. It integrates with major DeFi platforms like Aave, Compound, and Uniswap to provide a unified view of positions. The dashboard also includes charts and analytics to help users optimize their DeFi strategy.",
    image:
      "https://images.unsplash.com/photo-1581287053822-fd7bf4f4bfec?q=80&w=1000&auto=format&fit=crop",
    category: "defi",
    difficulty: "intermediate",
    technologies: ["Vue.js", "Web3.js", "The Graph", "D3.js"],
    starsCount: 203,
    forksCount: 37,
    contributorsCount: 9,
    createdAt: "2023-03-28",
    updatedAt: "2023-10-15",
    demo: "https://example.com/defi-dashboard",
    repo: "https://github.com/caxtonacollins",
  },
  {
    id: "beginner-blockchain-wallet",
    title: "Beginner's Blockchain Wallet",
    description:
      "A simple cryptocurrency wallet designed for beginners to blockchain technology.",
    longDescription:
      "This beginner-friendly blockchain wallet offers a simplified interface for managing cryptocurrency assets. It includes educational tooltips, step-by-step transaction guidance, and built-in security features. The wallet supports multiple blockchains and includes a fiat on-ramp for easy purchasing of crypto. Perfect for newcomers to the blockchain ecosystem who want to learn while doing.",
    image:
      "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?q=80&w=1000&auto=format&fit=crop",
    category: "blockchain",
    difficulty: "beginner",
    technologies: ["JavaScript", "React Native", "Ethers.js"],
    starsCount: 134,
    forksCount: 45,
    contributorsCount: 6,
    createdAt: "2023-06-12",
    updatedAt: "2023-12-01",
    demo: "https://example.com/beginner-wallet",
    repo: "https://github.com/caxtonacollins",
  },
  {
    id: "nft-art-generator",
    title: "NFT Art Generator",
    description:
      "A tool for generating NFT collections with layered attributes and metadata.",
    longDescription:
      "This NFT art generator helps creators build generative art collections by combining different layers and attributes. It automatically creates the artwork, generates metadata compatible with OpenSea and other marketplaces, and can directly upload to IPFS. The tool includes rarity settings, preview capabilities, and batch minting functionality. Perfect for artists looking to enter the NFT space without deep technical knowledge.",
    image:
      "https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=1000&auto=format&fit=crop",
    category: "nft",
    difficulty: "beginner",
    technologies: ["Node.js", "Canvas API", "IPFS", "Ethereum"],
    starsCount: 198,
    forksCount: 87,
    contributorsCount: 5,
    createdAt: "2023-05-03",
    updatedAt: "2023-11-15",
    demo: "https://example.com/nft-generator",
    repo: "https://github.com/caxtonacollins",
  },
];