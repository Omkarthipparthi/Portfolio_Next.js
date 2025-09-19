export type Project = {
  slug: string
  title: string
  description: string
  year: number
  role: string
  tech: string[]
  tags: string[]
  highlights: string[]
  links: { live?: string; repo?: string; caseStudy?: string }
  images: { src: string; alt: string }[]
}

export type Social = {
  name: string
  url: string
  icon: string
}

export type Experience = {
  title: string
  company: string
  location: string
  period: string
  description: string[]
  tech: string[]
}

export const projects: Project[] = [
  {
    slug: 'portfolio-website',
    title: 'Developer Portfolio',
    description: 'A modern, animated portfolio website built with Next.js and Framer Motion featuring 3D Earth visualization.',
    year: 2025,
    role: 'AI Full Stack Developer',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Three.js'],
    tags: ['Web Development', 'UI/UX', 'Animation', '3D Graphics'],
    highlights: [
      '60fps animations with Framer Motion',
      'Interactive 3D Earth visualization with Three.js',
      'Responsive design with Tailwind CSS',
      'Dark mode support',
      'SEO optimized',
    ],
    links: {
      live: 'https://portfolio-two-lime-88.vercel.app/home',
      repo: 'https://github.com/Omkarthipparthi/portfolio-nextjs',
    },
    images: [
      {
        src: '/projects/portfolio/hero.jpg',
        alt: 'Portfolio hero section',
      },
      {
        src: '/projects/portfolio/projects.jpg',
        alt: 'Projects grid view',
      },
    ],
  },
  {
    slug: 'leet2git',
    title: 'Leet2Git Chrome Extension',
    description: 'A Chrome extension that automates code submissions to GitHub, enhancing the coding practice workflow.',
    year: 2024,
    role: 'Full Stack Developer',
    tech: ['Angular', 'TypeScript', 'Chrome Extension API', 'OAuth', 'GitHub API'],
    tags: ['Web Development', 'Chrome Extension', 'Automation', 'GitHub Integration'],
    highlights: [
      'Content scripts for real-time page interaction',
      'Background service workers for asynchronous data processing',
      'OAuth integration for secure GitHub authentication',
      'Automated code submission workflow',
      'Enhanced coding practice efficiency',
    ],
    links: {
      repo: 'https://github.com/Omkarthipparthi/L2G',
    },
    images: [
      {
        src: '/projects/leet2git/extension.jpg',
        alt: 'Leet2Git Chrome extension interface',
      },
    ],
  },
  {
    slug: 'gradedevils',
    title: 'GradeDevils AI Grading Platform',
    description: 'An AI-powered grading platform using AWS services to automate grading workflows with scalable cloud solutions. Built during a hackathon with React frontend and Express.js backend.',
    year: 2024,
    role: 'AI/ML Engineer',
    tech: ['AWS Lambda', 'DynamoDB', 'S3', 'Bedrock', 'SageMaker', 'React', 'Express.js', 'Python'],
    tags: ['AI/ML', 'Cloud Computing', 'AWS', 'Machine Learning', 'Education', 'Hackathon'],
    highlights: [
      'Machine learning pipelines for automated grading',
      'Supervised learning techniques for submission classification',
      'SageMaker integration for model training and deployment',
      'Responsive React frontend with real-time feedback',
      'Scalable cloud architecture with AWS services',
      'Built during hackathon with Express.js backend',
    ],
    links: {
      repo: 'https://github.com/Omkarthipparthi/GradeDevils',
    },
    images: [
      {
        src: '/projects/gradedevils/dashboard.jpg',
        alt: 'GradeDevils AI grading dashboard',
      },
    ],
  },
  {
    slug: 'traviz',
    title: 'Visual Analytics of Taxi Trajectory Data',
    description: 'Interactive visualization platform for analyzing Chicago taxi trajectory data, showcasing data processing and geospatial visualization skills.',
    year: 2024,
    role: 'Data Visualization Engineer',
    tech: ['D3.js', 'JavaScript', 'Google Maps API', 'Data Visualization'],
    tags: ['Data Visualization', 'Geospatial', 'D3.js', 'JavaScript', 'Maps'],
    highlights: [
      'Interactive Graphs component using D3.js',
      'Google Maps API integration for geospatial data',
      'Real-time processing of complex trajectory data',
      'Visualization of most frequented roads in Chicago',
      'Advanced data processing and mapping techniques',
    ],
    links: {
      repo: 'https://github.com/Omkarthipparthi/TraViz',
    },
    images: [
      {
        src: '/projects/traviz/visualization.jpg',
        alt: 'Taxi trajectory data visualization',
      },
    ],
  },
  {
    slug: 'blockchain-money-management',
    title: 'Money Management Using Blockchain',
    description: 'Decentralized money management application on Ethereum test network with automated ether distribution based on customizable parameters.',
    year: 2023,
    role: 'Blockchain Developer',
    tech: ['Solidity', 'Ethereum', 'MetaMask', 'Ropsten Testnet', 'Smart Contracts'],
    tags: ['Blockchain', 'Ethereum', 'Solidity', 'Smart Contracts', 'DeFi'],
    highlights: [
      'Smart contracts in Solidity for automated transactions',
      'MetaMask integration for secure wallet interactions',
      'Customizable distribution parameters (percentages, dates, times)',
      'Deployed on Ropsten test network',
      'Decentralized financial management system',
    ],
    links: {
      repo: 'https://github.com/Omkarthipparthi/MoneyManagement',
    },
    images: [
      {
        src: '/projects/blockchain/dashboard.jpg',
        alt: 'Blockchain money management interface',
      },
    ],
  },
  {
    slug: 'supply-chain-hyperledger',
    title: 'Decentralized Supply Chain Management System',
    description: 'Enterprise-grade supply chain management system using Hyperledger Fabric for secure product lifecycle tracking and ownership transfer.',
    year: 2023,
    role: 'Blockchain Architect',
    tech: ['Hyperledger Fabric', 'Go', 'Docker', 'Smart Contracts', 'Blockchain'],
    tags: ['Blockchain', 'Hyperledger', 'Supply Chain', 'Enterprise', 'Go'],
    highlights: [
      'Smart contracts in Go for product tracking',
      'Multi-organization blockchain network',
      'Product lifecycle management and ownership transfer',
      'Docker containerization for deployment',
      'Private blockchain network implementation',
    ],
    links: {
      repo: 'https://github.com/Omkarthipparthi/supply-chain-hyperledger',
    },
    images: [
      {
        src: '/projects/hyperledger/dashboard.jpg',
        alt: 'Supply chain management dashboard',
      },
    ],
  },
  {
    slug: 'nl2sql',
    title: 'Natural Language to SQL (NL2SQL)',
    description: 'AI-powered system that translates natural language queries into SQL commands, making database access accessible to non-technical users.',
    year: 2024,
    role: 'AI/ML Engineer',
    tech: ['Python', 'NLP', 'T5 Model', 'Streamlit', 'FastAPI', 'Deep Learning'],
    tags: ['AI/ML', 'NLP', 'SQL', 'Deep Learning', 'Full Stack'],
    highlights: [
      'Fine-tuned T5 model for NL to SQL conversion',
      '90% execution accuracy on Spider benchmark',
      'Full-stack deployment with Streamlit and FastAPI',
      'Semantic parsing and context-aware query generation',
      'Ambiguity resolution and schema mapping',
      'Production-ready prototype with robust performance',
    ],
    links: {
      repo: 'https://github.com/Omkarthipparthi/NL2SQL',
    },
    images: [
      {
        src: '/projects/nl2sql/interface.jpg',
        alt: 'NL2SQL query interface',
      },
    ],
  },
]

export const experiences: Experience[] = [
  {
    title: 'Software Engineer',
    company: 'Ford Motor Company',
    location: 'Long Beach, CA',
    period: 'Jul 2025 - Present',
    description: [
      'Engineered high-performance visualization tools with Next.js, Tailwind, and GCP to process and analyze large-scale telemetry and cost data across multiple EV programs',
      'Designed scalable backend services and dashboards using FastAPI and cloud-native deployments on GCP to monitor vehicle system metrics and supply chain performance',
      'Collaborated with cross-functional teams to integrate simulation, forecasting, and AI-driven diagnostics into engineering workflows for next-generation electric vehicle platforms',
    ],
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'FastAPI', 'GCP', 'Python'],
  },
  {
    title: 'Software Engineer Intern',
    company: 'Rocket Mortgage',
    location: 'Detroit, MI',
    period: 'Jun 2025 - Jul 2025',
    description: [
      'Contributed to enterprise-grade web applications with dynamic, responsive frontends using Angular and scalable backend APIs using .NET and C#',
      'Built an AI-powered MCP server integrating tools like PagerDuty and Dynatrace to accelerate incident analysis and improve after-hours support response',
    ],
    tech: ['Angular', 'TypeScript', '.NET', 'C#', 'Microservices', 'AI/ML'],
  },
  {
    title: 'Software Engineer',
    company: 'Technology at ASU',
    location: 'Tempe, USA',
    period: 'May 2024 - Jul 2024',
    description: [
      'Built secure, scalable GenAI-powered educational platform using TypeScript, Python, Django, Docker, and Langchain',
      'Designed SME systems, job recommenders, and adaptive learning tools in collaboration with cross-functional Agile teams',
      'Applied CI/CD practices and containerization for faster deployment cycles',
    ],
    tech: ['TypeScript', 'Python', 'Django', 'Docker', 'Langchain', 'CI/CD'],
  },
  {
    title: 'Software Engineer',
    company: 'OpenText',
    location: 'Remote',
    period: 'Oct 2020 - Jul 2023',
    description: [
      'Led front-end and API optimization efforts, reducing Angular-based UI load times by 30% through enhanced component design and lazy loading',
      'Developed scalable RESTful services and Java Spring Boot backends using JPA/Hibernate for cross-database operations',
      'Successfully piloted 8-week migration project from Angular 2 to Angular 12',
      'Led migration of core functionalities from on-premises to cloud using Spring Cloud and containerized deployments',
      'Conducted security assessments using Burp and Fortify, achieving 50% increase in application security',
    ],
    tech: ['Java', 'Spring Boot', 'Angular', 'TypeScript', 'JPA', 'Hibernate'],
  },
]

export const skills = {
  languages: ['JAVA', 'TypeScript', 'JavaScript', 'Python', 'SQL', 'Go (Golang)', 'Solidity', 'HTML', 'CSS'],
  backend: ['Spring Boot', 'FastAPI', '.NET', 'Servlet', 'JSP', 'NodeJS', 'Express.js', 'REST APIs', 'Nginx', 'JPA', 'Hibernate', 'J2EE', 'XML', 'JAXB', 'SOAP/WSDL', 'JUnit'],
  frontend: ['Angular', 'React', 'Next.js', 'TailwindCSS', 'D3.js', 'Streamlit', 'Google Maps API'],
  databases: ['Postgres', 'MySQL', 'MongoDB', 'DynamoDB'],
  'devops & tools': ['AWS', 'Kubernetes', 'Docker', 'GIT', 'Burp Suite', 'Postman', 'CI/CD (Jenkins, GitLab)', 'Apache', 'Linux', 'Kafka'],
  blockchain: ['Hyperledger Fabric', 'Ethereum', 'MetaMask', 'Smart Contracts', 'Solidity', 'Ropsten Testnet'],
  'ai & ml': ['AI/ML', 'GenAI', 'Langchain', 'NLP', 'T5 Model', 'SageMaker', 'Deep Learning', 'Supervised Learning'],
  other: ['OOPs', 'Data Structures & Algorithms', 'Caching', 'Microservices', 'Geospatial', 'Data Visualization'],
}
