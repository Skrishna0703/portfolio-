export type Project = {
  slug: string
  title: string
  shortTitle: string
  category: string
  description: string
  stack: string[]
  accent: string
  features: string[]
  workflow: string[]
  objective: string
}

// Manual media source: replace empty strings with local files from /public.
export const portfolioAssets = {
  profilePhoto: "/images/profile.png",
  projectScreenshots: {
    "weather-dashboard": ["/images/weather-dashboard.png"] as string[],
    pixelize: ["/images/pixelize.png"] as string[],
    "chatgpt-clone": ["/images/chatgpt-clone.png"] as string[],
    "financial-assistant": ["/images/financial-assistant.png"] as string[],
    tomato: ["/images/tomato.png"] as string[],
    "mental-wellness": ["/images/mental-wellness.png"] as string[],
    "career-aligner": ["/images/Career-Aligner.png"] as string[],
    techkart: ["/images/TechKart.png"] as string[],
  },
}

export const projects: Project[] = [
  {
    slug: "weather-dashboard",
    title: "Weather Dashboard Application",
    shortTitle: "Weather Dashboard",
    category: "Frontend · API Integration",
    description:
      "A responsive weather dashboard application that provides weather information and city-based weather searches.",
    stack: ["HTML", "CSS", "JavaScript", "OpenWeatherMap API"],
    accent: "weather",
    features: [
      "City-based search",
      "Current weather data",
      "Responsive dashboard",
      "API-driven updates",
    ],
    workflow: [
      "Search for a city",
      "Validate location",
      "Request weather data",
      "Present current conditions",
    ],
    objective:
      "Make city-based weather information easy to find in a clear, responsive interface.",
  },
  {
    slug: "pixelize",
    title: "Text to Image Generator (Pixelize)",
    shortTitle: "Pixelize",
    category: "Full Stack · Generative AI",
    description:
      "An AI-powered text-to-image generation application that transforms text prompts into visual content.",
    stack: [
      "React.js",
      "CSS",
      "Node.js",
      "Vite.js",
      "Express.js",
      "MongoDB",
      "Razorpay",
    ],
    accent: "pixelize",
    features: [
      "Prompt-based generation",
      "Credit workflow",
      "User accounts",
      "Payment integration",
    ],
    workflow: [
      "Enter a prompt",
      "Submit generation request",
      "Process through AI service",
      "Return generated visual",
    ],
    objective:
      "Provide an approachable workflow for turning written ideas into generated visual content.",
  },
  {
    slug: "chatgpt-clone",
    title: "ChatGPT Clone",
    shortTitle: "ChatGPT Clone",
    category: "Frontend · Conversational AI",
    description:
      "An interactive conversational AI application inspired by modern AI chat interfaces.",
    stack: ["React.js", "CSS", "JavaScript", "API Integration"],
    accent: "chat",
    features: [
      "Conversational interface",
      "Prompt history",
      "Responsive layout",
      "API responses",
    ],
    workflow: [
      "Write a message",
      "Send API request",
      "Receive model response",
      "Continue conversation",
    ],
    objective:
      "Explore familiar conversational patterns and responsive API-driven interactions.",
  },
  {
    slug: "financial-assistant",
    title: "GenAI-Powered Financial Assistant",
    shortTitle: "Financial Assistant",
    category: "Full Stack · Generative AI",
    description:
      "A generative AI-based financial assistant designed to help users interact with financial information and receive intelligent assistance.",
    stack: ["React.js", "CSS", "API", "Node.js", "Vite.js"],
    accent: "finance",
    features: [
      "Natural-language queries",
      "Financial information support",
      "Interactive responses",
      "Focused interface",
    ],
    workflow: [
      "Ask a finance question",
      "Send secure request",
      "Process with AI service",
      "Present useful guidance",
    ],
    objective:
      "Make interaction with financial information more intuitive through a conversational interface.",
  },
  {
    slug: "tomato",
    title: "Tomato Food Delivery App",
    shortTitle: "Tomato",
    category: "Full Stack · E-commerce",
    description:
      "A full stack food delivery application featuring food discovery, cart management, authentication and online payment integration.",
    stack: [
      "React.js",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Razorpay",
      "Web3Forms",
      "Netlify",
      "Render",
    ],
    accent: "tomato",
    features: [
      "Food discovery",
      "Cart management",
      "Authentication",
      "Online payments",
    ],
    workflow: [
      "Browse dishes",
      "Build a cart",
      "Authenticate and checkout",
      "Submit the order",
    ],
    objective:
      "Create a complete, convenient food-ordering flow from discovery through online checkout.",
  },
  {
    slug: "mental-wellness",
    title: "AI Mental Wellness Companion",
    shortTitle: "Mental Wellness",
    category: "Frontend · AI Wellness",
    description:
      "An AI-powered mental wellness companion with an interactive interface for emotional wellness support and user engagement.",
    stack: ["React.js", "Tailwind CSS", "Framer Motion", "Netlify"],
    accent: "wellness",
    features: [
      "Supportive interaction",
      "Calm visual language",
      "Guided engagement",
      "Responsive experience",
    ],
    workflow: [
      "Open a check-in",
      "Share current context",
      "Receive supportive interaction",
      "Continue at your pace",
    ],
    objective:
      "Offer an accessible, calm interaction model for emotional wellness support and engagement.",
  },
  {
    slug: "career-aligner",
    title: "Career Aligner: GenAI-Powered Job Application Assistant",
    shortTitle: "Career Aligner",
    category: "AI Tool · Career Technology",
    description:
      "An AI-powered job application assistant designed to support job seekers with intelligent career and application-related assistance.",
    stack: [
      "Streamlit",
      "Google Gemini API",
      "Python",
      "PyPDF2",
      "python-docx",
      "ReportLab",
      "Lottie",
      "HTML",
      "CSS",
      "JavaScript",
    ],
    accent: "career",
    features: [
      "Document parsing",
      "AI-assisted analysis",
      "Career guidance",
      "Report generation",
    ],
    workflow: [
      "Upload application material",
      "Parse the document",
      "Analyze with Gemini",
      "Generate actionable output",
    ],
    objective:
      "Help job seekers understand and improve their application materials with practical AI assistance.",
  },
  {
    slug: "techkart",
    title: "TechKart Ecommerce Site",
    shortTitle: "TechKart",
    category: "Full Stack · E-commerce",
    description:
      "A modern e-commerce application featuring product browsing, shopping experiences and authentication.",
    stack: [
      "Next.js",
      "Tailwind CSS",
      "Razorpay",
      "React.js",
      "MongoDB",
      "Clerk",
      "Render",
      "Vercel",
    ],
    accent: "techkart",
    features: [
      "Product browsing",
      "Shopping workflow",
      "Authentication",
      "Payment integration",
    ],
    workflow: [
      "Explore products",
      "Review product details",
      "Authenticate and add to cart",
      "Complete payment",
    ],
    objective:
      "Build a polished technology shopping experience supported by modern full-stack tools.",
  },
]

export const skillGroups = [
  {
    title: "Frontend",
    items: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "TypeScript",
      "React.js",
      "Next.js",
      "Tailwind CSS",
      "Vite.js",
      "Framer Motion",
    ],
  },
  {
    title: "Backend",
    items: [
      "Node.js",
      "Express.js",
      "REST APIs",
      "Socket.IO",
      "JWT Authentication",
    ],
  },
  { title: "Database", items: ["MongoDB", "PostgreSQL", "Firebase", "Prisma"] },
  {
    title: "AI & Machine Learning",
    items: ["Python", "TensorFlow", "Keras", "PyTorch", "Scikit-learn"],
  },
  {
    title: "Tools & Deployment",
    items: [
      "Git",
      "GitHub",
      "Postman",
      "Vercel",
      "Netlify",
      "Render",
      "MongoDB Atlas",
      "Streamlit",
    ],
  },
]

export type EducationYear = {
  title: string
  semesters: string
  pdf: string
  totalMarks: number | null
  obtainedMarks: number | null
  percentage: string
  sgpa: string
  cgpa: string
}

export type Education = {
  slug: string
  qualification: string
  institution: string
  board: string
  period: string
  status: string
  institutionLogo?: string
  universityLogo?: string
  marksheetImages?: string[]
  marksheetPdf?: string
  academicYears?: EducationYear[]
}

export type AcademicSubject = {
  code: string
  name: string
  internal: string
  external: string
  practical: string
  total: string
  grade: string
}

export type AcademicSemester = {
  number: number
  examinationSession: string
  monthYear: string
  sgpa: string
  cgpa: string
  credits: string
  marksheetImage: string
  subjects: AcademicSubject[]
}

// BE semester-level data can be added when verified.
export const beAcademicRecord = {
  cgpa: "9.08",
  fourthYearSgpa: "9.45",
  semesters: Array.from(
    { length: 8 },
    (_, index): AcademicSemester => ({
      number: index + 1,
      examinationSession: "",
      monthYear: "",
      sgpa: "",
      cgpa: "",
      credits: "",
      marksheetImage: "",
      subjects: [],
    }),
  ),
}

export const education: Education[] = [
  {
    slug: "be",
    qualification: "BE — Artificial Intelligence & Data Science",
    institution: "Genba Sopanrao Moze College of Engineering, Pune",
    board: "Savitribai Phule Pune University",
    period: "July 2023 – June 2026",
    status: "9.45 SGPA",
    institutionLogo: "/images/GSMCOE.png",
    universityLogo: "/images/sppu.png",

    academicYears: [
      {
        title: "Second Year",
        semesters: "Semester 3 + 4",
        pdf: "/documents/education/be/second-year.pdf",
        totalMarks: 1900,
        obtainedMarks: 1425,
        percentage: "75.00%",
        sgpa: "8.80",
        cgpa: "",
      },
      {
        title: "Third Year",
        semesters: "Semester 5 + 6",
        pdf: "/documents/education/be/third-year.pdf",
        totalMarks: 1800,
        obtainedMarks: 1393,
        percentage: "77.39%",
        sgpa: "9.02",
        cgpa: "",
      },
      {
        title: "Fourth Year",
        semesters: "Semester 7 + 8",
        pdf: "/documents/education/be/fourth-year.pdf",
        totalMarks: 1500,
        obtainedMarks: 1215,
        percentage: "81.00%",
        sgpa: "9.45",
        cgpa: "9.08",
      },
    ],
  },

  {
    slug: "diploma-computer-technology",
    qualification: "Diploma in Computer Technology",
    institution: "Government Polytechnic, Solapur",
    board: "Maharashtra State Board of Technical Education",
    period: "July 2021 – June 2023",
    status: "81.77%",
    institutionLogo: "/images/GP.jpg",
    universityLogo: "/images/MSBTE.png",

    academicYears: [
      {
        title: "First Year",
        semesters: "Semester 1 + 2",
        pdf: "/documents/education/diploma/first-year.pdf",
        totalMarks: null,
        obtainedMarks: null,
        percentage: "",
        sgpa: "",
        cgpa: "",
      },
      {
        title: "Second Year",
        semesters: "Semester 3 + 4",
        pdf: "/documents/education/diploma/second-year.pdf",
        totalMarks: null,
        obtainedMarks: null,
        percentage: "",
        sgpa: "",
        cgpa: "",
      },
      {
        title: "Third Year",
        semesters: "Semester 5 + 6",
        pdf: "/documents/education/diploma/third-year.pdf",
        totalMarks: null,
        obtainedMarks: null,
        percentage: "",
        sgpa: "",
        cgpa: "",
      },
    ],
  },

  {
    slug: "ssc",
    qualification: "SSC (10th)",
    institution: "Rayat Shikshan Sanstha's New English School Tulshi",
    board:
      "Maharashtra State Board of Secondary & Higher Secondary Education, Pune",
    period: "June 2017 – March 2018",
    status: "78.60%",
    institutionLogo: "/images/NEST.jpg",
    universityLogo: "/images/MSBSHSE.png",
    marksheetPdf: "/documents/education/ssc/ssc-marksheet.pdf",
  },
]

export const experiences = [
  {
    slug: "gssoc-2025",
    organization: "GirlScript Summer of Code 2025",
    role: "Project Admin",
    type: "Open Source Contribution",
    date: "2025",
    description:
      "Open-source project administration and contributor coordination.",
    responsibilities: [
      "Managing contributors",
      "GitHub issue management",
      "Labels and pull request coordination",
      "Leaderboard management",
      "Contributor badges",
      "Community support",
    ],
    keywords: ["Open Source", "GitHub", "Community", "Project Administration"],
  },
  {
    slug: "oscg-2026",
    organization: "Open Source Connect Global 2026",
    role: "Mentor",
    type: "Mentorship & Community",
    date: "2026",
    description: "Open-source mentorship and contributor guidance.",
    responsibilities: [
      "Specific mentorship responsibilities — Editable placeholder",
    ],
    keywords: ["Mentorship", "Open Source", "Contributor Guidance"],
  },
]

export const navItems = [
  "Home",
  "About",
  "Skills",
  "Projects",
  "Education",
  "Experience",
  "Achievements",
  "Contact",
]
