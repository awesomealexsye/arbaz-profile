// Personal Information
export const personalInfo = {
    name: "ARBAZ",
    title: "Senior Full-Stack Software Engineer",
    email: "ak.khanarbaz777@gmail.com",
    phone: "(+91) 96254-42725",
    location: "Faridabad, Haryana",
    linkedin: "alexsye1999",
    github: "awesomealexsye",
    summary: "Senior Full-Stack Engineer with 5+ years architecting scalable web/mobile applications. Expert in React, React Native, PHP/Laravel, Node.js. Independently delivered 20+ production apps. Published 4+ apps on Play Store & App Store. Expertise in Linux server administration, DevOps, cloud deployments. Strong in system design, security implementation (ADFS, Cognito), cost optimization, and team mentorship. Currently expanding in AI/ML with Python for intelligent application development.",
    image: "/img/me.png"
};

// Skills organized by category
export const skills = {
    frontend: [
        "React", "React Native", "JavaScript", "TypeScript",
        "HTML5/CSS3", "jQuery", "Redux", "Expo"
    ],
    backend: [
        "PHP", "Laravel", "Node.js", "WordPress",
        "RESTful APIs", "GraphQL"
    ],
    database: [
        "MySQL", "PostgreSQL", "SQLite", "Supabase", "Redis"
    ],
    devops: [
        "Linux Server Admin", "AWS (EC2, S3, RDS)", "Ubuntu/CentOS",
        "Apache/Nginx", "Git", "CI/CD", "Docker", "SSH"
    ],
    mobile: [
        "Xcode", "Android Studio", "App Store Publishing", "Play Store Publishing"
    ],
    aiml: [
        "Python", "TensorFlow", "Scikit-learn", "Machine Learning",
        "NLP", "Computer Vision"
    ]
};

// Work Experience
export const experience = [
    {
        title: "IT Development - Application Developer",
        company: "Shipco IT Pvt Ltd",
        period: "September 2022 - June 2025",
        location: "Pune, India",
        responsibilities: [
            "Implemented enterprise authentication solutions (ADFS & AWS Cognito) and resolved critical vulnerabilities across PHP backend and Angular frontend applications",
            "Managed UAT & Production releases with zero-downtime deployments achieving 99.8% uptime for mission-critical systems",
            "Enhanced code quality and security standards, reducing production issues by 35% through comprehensive testing and code reviews",
            "Optimized application performance by 45% implementing caching and database query optimization"
        ]
    },
    {
        title: "Web Developer",
        company: "Adivaha - Travel Technology Company",
        period: "January 2020 - August 2022",
        location: "New Delhi, India",
        responsibilities: [
            "Built WordPress plugins processing 1000+ monthly bookings",
            "Integrated payment gateways with 99.9% success rate",
            "Eliminated 90% booking conflicts with real-time APIs",
            "Deployed 12+ WordPress sites on Linux servers"
        ]
    }
];

// Education
export const education = {
    degree: "Diploma in Computer Science",
    institution: "Government Polytechnic",
    period: "2016 - 2019",
    location: "Gurugram, Haryana"
};

// Achievements
export const achievements = [
    "4+ apps published on stores",
    "20+ projects delivered end-to-end",
    "50K+ downloads across apps",
    "99.8% uptime critical apps",
    "4.5+ ratings app store average",
    "Linux expert server admin"
];

// Key Projects
export const projects = [
    {
        id: 1,
        title: "Paylap Score",
        subtitle: "Digital Platform",
        description: "Independently developed comprehensive scoring platform with web/mobile apps. Implemented JWT auth, real-time analytics. Managed complete deployment: Linux setup, SSL certificates, domains, Play/App Store.",
        tech: ["React", "React Native", "Laravel", "MySQL", "AWS", "Linux"],
        highlights: ["Solo development", "Linux deployment", "App store publishing"],
        downloads: "10K+",
        rating: "4.5+",
        icon: "activity",
        gradient: "from-purple-500 via-pink-600 to-red-500",
        appStore: "#",
        playStore: "#"
    },
    {
        id: 2,
        title: "Paylap Fitness",
        subtitle: "Management Solution",
        description: "Built comprehensive gym management system with member registration, subscription management, QR & biometric attendance tracking, and customizable gym plans. Integrated payment gateways for member subscriptions and trainer payments.",
        tech: ["React Native", "Node.js", "Laravel", "MySQL", "Linux"],
        highlights: ["Full-stack solo", "Server deployment", "Both stores published"],
        rating: "4.6",
        icon: "heart",
        gradient: "from-blue-500 via-cyan-600 to-teal-500",
        appStore: "https://apps.apple.com/in/app/paylap-fitness/id6748222119",
        playStore: "https://play.google.com/store/apps/details?id=com.alexsye1999.PaylapFitness"
    },
    {
        id: 3,
        title: "Paylap Education",
        subtitle: "Learning Platform",
        description: "Architected education platform with course management, video streaming, assessments, RBAC for students/teachers/admins. Managed deployment pipeline: Linux setup, CDN, database optimization, Play/App Store.",
        tech: ["React", "React Native", "Laravel", "Supabase", "Linux"],
        highlights: ["Independent architecture", "Linux admin", "Complete deployment"],
        users: "5K+ active learners",
        icon: "book",
        gradient: "from-indigo-500 via-purple-600 to-pink-500",
        appStore: "#",
        playStore: "#"
    },
    {
        id: 4,
        title: "Paylap Pets Care",
        subtitle: "Management System",
        description: "Created comprehensive animal rescue platform with injured pet tracking, pet adoption browsing, NGO listings, and donation management. Implemented live tracking for rescued animals, health records management, and veterinary consultation booking.",
        tech: ["React Native", "Laravel", "MySQL", "AWS S3", "Linux"],
        highlights: ["Complete solo development", "AWS & Linux", "Independent publishing"],
        icon: "paw",
        gradient: "from-green-500 via-emerald-600 to-teal-500",
        appStore: "#",
        playStore: "#"
    }
];

// AI/ML Focus
export const aimlFocus = [
    "ML predictive models",
    "NLP & Computer Vision",
    "AI web app integration",
    "TensorFlow & Scikit-learn"
];
