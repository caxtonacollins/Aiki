import { Course } from "@/types";

export const getCourseData = (id: string) => {
  const courses: Course[] = [
    {
      id: 1,
      title: "Blockchain Fundamentals",
      description:
        "Learn the core concepts of blockchain technology and distributed ledgers.",
      longDescription:
        "This comprehensive course covers the foundational principles of blockchain technology, distributed ledger systems, consensus mechanisms, and cryptographic fundamentals. You'll understand how blocks are created, validated, and linked together to form an immutable chain of transactions. By the end of this course, you'll have a solid understanding of blockchain architecture and its potential applications across various industries.",
      category: "blockchain",
      difficulty: "beginner",
      duration: "4 weeks",
      enrolledCount: 1250,
      rating: 4.8,
      instructor: "Alex Thompson",
      instructorTitle: "Blockchain Architect",
      image:
        "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1000&auto=format&fit=crop",
      modules: [
        {
          id: 1,
          title: "Introduction to Blockchain",
          lessons: [
            { id: 1, title: "What is Blockchain?", duration: "15 min" },
            {
              id: 2,
              title: "History of Distributed Systems",
              duration: "20 min",
            },
            {
              id: 3,
              title: "Core Components of Blockchain",
              duration: "25 min",
            },
          ],
        },
        {
          id: 2,
          title: "Cryptography Basics",
          lessons: [
            { id: 4, title: "Hashing Functions", duration: "30 min" },
            { id: 5, title: "Public and Private Keys", duration: "25 min" },
            { id: 6, title: "Digital Signatures", duration: "20 min" },
          ],
        },
        {
          id: 3,
          title: "Consensus Mechanisms",
          lessons: [
            { id: 7, title: "Proof of Work", duration: "35 min" },
            { id: 8, title: "Proof of Stake", duration: "25 min" },
            { id: 9, title: "Other Consensus Algorithms", duration: "30 min" },
          ],
        },
      ],
    },
    {
      id: 2,
      title: "Smart Contract Development",
      description:
        "Master Solidity and create secure, efficient smart contracts from scratch.",
      longDescription:
        "Dive deep into smart contract development with Solidity, the primary language for Ethereum-based applications. This course takes you from basic syntax to advanced patterns for creating secure, gas-efficient smart contracts. You'll learn how to handle common security vulnerabilities, implement upgradable patterns, and interact with other contracts and decentralized protocols. By the end of this course, you'll be able to design, deploy, and audit professional-grade smart contracts.",
      category: "blockchain",
      difficulty: "intermediate",
      duration: "6 weeks",
      enrolledCount: 890,
      rating: 4.6,
      instructor: "Sophia Chen",
      instructorTitle: "Smart Contract Developer",
      image:
        "https://images.unsplash.com/photo-1639322537504-6427a16b0a28?q=80&w=1000&auto=format&fit=crop",
      modules: [
        {
          id: 1,
          title: "Solidity Fundamentals",
          lessons: [
            { id: 1, title: "Solidity Syntax Basics", duration: "25 min" },
            { id: 2, title: "Data Types and Variables", duration: "30 min" },
            { id: 3, title: "Functions and Modifiers", duration: "35 min" },
          ],
        },
        {
          id: 2,
          title: "Smart Contract Design Patterns",
          lessons: [
            { id: 4, title: "Factory Pattern", duration: "30 min" },
            { id: 5, title: "Proxy Patterns", duration: "40 min" },
            { id: 6, title: "Oracle Patterns", duration: "35 min" },
          ],
        },
        {
          id: 3,
          title: "Smart Contract Security",
          lessons: [
            { id: 7, title: "Common Vulnerabilities", duration: "45 min" },
            { id: 8, title: "Security Best Practices", duration: "35 min" },
            { id: 9, title: "Audit Techniques", duration: "40 min" },
          ],
        },
      ],
    },
    {
      id: 3,
      title: "Data Analytics with Python",
      description:
        "Learn how to analyze and visualize data using Python and popular libraries.",
      longDescription:
        "Master the art of data analysis using Python's powerful ecosystem. From data cleaning and manipulation with Pandas to visualization with Matplotlib and Seaborn, this course provides hands-on experience with real-world datasets. You'll learn statistical analysis techniques, how to identify patterns in data, and create compelling visualizations that tell a story. Perfect for aspiring data analysts or anyone looking to make sense of complex datasets.",
      category: "data",
      difficulty: "beginner",
      duration: "5 weeks",
      enrolledCount: 1620,
      rating: 4.7,
      instructor: "David Kim",
      instructorTitle: "Data Scientist",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
      modules: [
        {
          id: 1,
          title: "Python Data Analysis Foundations",
          lessons: [
            { id: 1, title: "Python for Data Science", duration: "30 min" },
            { id: 2, title: "NumPy Fundamentals", duration: "35 min" },
            { id: 3, title: "Pandas Basics", duration: "40 min" },
          ],
        },
        {
          id: 2,
          title: "Data Visualization",
          lessons: [
            { id: 4, title: "Matplotlib Essentials", duration: "30 min" },
            {
              id: 5,
              title: "Seaborn for Statistical Visualization",
              duration: "35 min",
            },
            {
              id: 6,
              title: "Interactive Visualization with Plotly",
              duration: "40 min",
            },
          ],
        },
        {
          id: 3,
          title: "Exploratory Data Analysis",
          lessons: [
            { id: 7, title: "Descriptive Statistics", duration: "25 min" },
            { id: 8, title: "Data Cleaning Techniques", duration: "35 min" },
            { id: 9, title: "Feature Engineering", duration: "30 min" },
          ],
        },
      ],
    },
    {
      id: 4,
      title: "Advanced Data Engineering",
      description:
        "Build scalable data pipelines and infrastructure for big data applications.",
      longDescription:
        "Delve into advanced data engineering concepts required for handling large-scale data systems. This course covers building robust ETL pipelines, data warehousing solutions, and distributed processing systems. You'll learn how to design scalable infrastructure using technologies like Apache Spark, Airflow, and cloud-based services. By the end of this course, you'll be able to architect end-to-end data solutions that can process petabytes of information efficiently.",
      category: "data",
      difficulty: "advanced",
      duration: "8 weeks",
      enrolledCount: 560,
      rating: 4.9,
      instructor: "Elena Martinez",
      instructorTitle: "Data Engineering Lead",
      image:
        "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?q=80&w=1000&auto=format&fit=crop",
      modules: [
        {
          id: 1,
          title: "Data Pipeline Architecture",
          lessons: [
            { id: 1, title: "Pipeline Design Principles", duration: "40 min" },
            {
              id: 2,
              title: "Batch vs. Streaming Processes",
              duration: "35 min",
            },
            { id: 3, title: "Data Integration Patterns", duration: "45 min" },
          ],
        },
        {
          id: 2,
          title: "Big Data Processing",
          lessons: [
            { id: 4, title: "Apache Spark Fundamentals", duration: "50 min" },
            {
              id: 5,
              title: "Distributed Computing Models",
              duration: "45 min",
            },
            { id: 6, title: "Performance Optimization", duration: "40 min" },
          ],
        },
        {
          id: 3,
          title: "Data Orchestration",
          lessons: [
            {
              id: 7,
              title: "Workflow Management with Airflow",
              duration: "45 min",
            },
            { id: 8, title: "Monitoring and Alerting", duration: "35 min" },
            { id: 9, title: "Error Handling and Recovery", duration: "40 min" },
          ],
        },
      ],
    },
    {
      id: 5,
      title: "AI for Blockchain",
      description:
        "Combine artificial intelligence with blockchain technology for innovative solutions.",
      longDescription:
        "This cutting-edge course explores the intersection of artificial intelligence and blockchain technology. You'll learn how these transformative technologies can work together to create secure, decentralized AI systems. Topics include machine learning on distributed data, blockchain-based AI marketplaces, and smart contracts that execute AI models. This course is ideal for innovators looking to build the next generation of decentralized applications that leverage both AI and blockchain capabilities.",
      category: "ai",
      difficulty: "advanced",
      duration: "7 weeks",
      enrolledCount: 780,
      rating: 4.5,
      instructor: "Michael Johnson",
      instructorTitle: "AI & Blockchain Researcher",
      image:
        "https://images.unsplash.com/photo-1677442135188-d228f15560e5?q=80&w=1000&auto=format&fit=crop",
      modules: [
        {
          id: 1,
          title: "AI and Blockchain Foundations",
          lessons: [
            { id: 1, title: "AI Core Concepts", duration: "30 min" },
            {
              id: 2,
              title: "Blockchain for AI Applications",
              duration: "35 min",
            },
            {
              id: 3,
              title: "Decentralized Data for Machine Learning",
              duration: "40 min",
            },
          ],
        },
        {
          id: 2,
          title: "Decentralized AI Systems",
          lessons: [
            {
              id: 4,
              title: "Federated Learning on Blockchain",
              duration: "45 min",
            },
            { id: 5, title: "AI Model Marketplaces", duration: "35 min" },
            { id: 6, title: "Tokenized AI Services", duration: "40 min" },
          ],
        },
        {
          id: 3,
          title: "Smart Contracts for AI",
          lessons: [
            { id: 7, title: "Automated AI Execution", duration: "35 min" },
            { id: 8, title: "Oracle Systems for AI", duration: "30 min" },
            { id: 9, title: "Governance of AI Systems", duration: "40 min" },
          ],
        },
      ],
    },
    {
      id: 6,
      title: "Cybersecurity Fundamentals",
      description:
        "Learn the essential principles and practices of modern cybersecurity.",
      longDescription:
        "Develop a comprehensive understanding of cybersecurity principles and practices in this foundational course. You'll learn about common threats, vulnerabilities, and defense mechanisms that protect digital assets. The curriculum covers network security, cryptography, secure coding practices, and security policies. This course provides practical skills for identifying and mitigating security risks in various computing environments, making it essential for anyone working with digital systems.",
      category: "security",
      difficulty: "beginner",
      duration: "4 weeks",
      enrolledCount: 1380,
      rating: 4.6,
      instructor: "Sarah Williams",
      instructorTitle: "Security Specialist",
      image:
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=1000&auto=format&fit=crop",
      modules: [
        {
          id: 1,
          title: "Security Fundamentals",
          lessons: [
            {
              id: 1,
              title: "Introduction to Cybersecurity",
              duration: "25 min",
            },
            {
              id: 2,
              title: "Common Threats and Vulnerabilities",
              duration: "30 min",
            },
            { id: 3, title: "Security Models", duration: "35 min" },
          ],
        },
        {
          id: 2,
          title: "Network Security",
          lessons: [
            { id: 4, title: "Network Defense Basics", duration: "30 min" },
            { id: 5, title: "Firewalls and IDS/IPS", duration: "35 min" },
            { id: 6, title: "Secure Network Architecture", duration: "40 min" },
          ],
        },
        {
          id: 3,
          title: "Application Security",
          lessons: [
            { id: 7, title: "Secure Coding Practices", duration: "30 min" },
            {
              id: 8,
              title: "Authentication and Authorization",
              duration: "35 min",
            },
            { id: 9, title: "Web Application Security", duration: "40 min" },
          ],
        },
      ],
    },
  ];

  const courseData = courses.find((course) => course.id === parseInt(id));
  return courseData;
};
