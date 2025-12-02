// Personal Information
export const personalInfo = {
    name: "ARBAZ",
    title: "🚀 Full-Stack Space Architect & Code Astronaut",
    email: "ak.khanarbaz777@gmail.com",
    phone: "(+91) 96254-42725",
    location: "Faridabad, Haryana 🌏",
    linkedin: "alexsye1999",
    github: "awesomealexsye",
    instagram: "alexsye1999",
    summary: "Hey there! 👋 I'm a code adventurer with 5+ years of building awesome stuff on the web and mobile. Think of me as your friendly neighborhood developer who loves turning wild ideas into real apps! I've launched 20+ apps into the digital universe (4 of them on App Store & Play Store with 50K+ downloads! 🎉). I craft experiences with React, React Native, and a sprinkle of magic from PHP/Laravel and Node.js. Oh, and I'm totally geeking out on AI/ML these days - because why not teach computers to be smart, right? 🤖✨",
    image: "/img/me.png"
};

// Skills organized by category
export const skills = {
    frontend: [
        "React ⚛️", "React Native 📱", "JavaScript 💛", "TypeScript 🔷",
        "HTML5/CSS3 🎨", "jQuery", "Redux 🔄", "Expo"
    ],
    backend: [
        "PHP 🐘", "Laravel ✨", "Node.js 🟢", "WordPress 📝",
        "RESTful APIs 🌐", "GraphQL"
    ],
    database: [
        "MySQL 🐬", "PostgreSQL 🐘", "SQLite", "Supabase ⚡", "Redis 🔴"
    ],
    devops: [
        "Linux Server Wizard 🧙", "AWS Cloud ☁️", "Ubuntu/CentOS 🐧",
        "Apache/Nginx 🌐", "Git 🔀", "CI/CD 🚀", "Docker 🐳", "SSH 🔐"
    ],
    mobile: [
        "Xcode 🍎", "Android Studio 🤖", "App Store Publishing 📲", "Play Store Publishing 🎮"
    ],
    aiml: [
        "Python 🐍", "TensorFlow 🧠", "Scikit-learn 📊", "Machine Learning 🤖",
        "NLP 💬", "Computer Vision 👁️"
    ]
};

// Work Experience
export const experience = [
    {
        title: "Application Developer & Digital Problem Solver",
        company: "Shipco IT Pvt Ltd 🚢",
        period: "September 2022 - June 2025",
        location: "Pune, India",
        responsibilities: [
            "🔐 Built rock-solid authentication systems (ADFS & AWS Cognito) - basically making sure only the right people get in!",
            "🚀 Managed smooth-as-butter releases with 99.8% uptime - because nobody likes downtime, right?",
            "🐛 Squashed bugs and improved code quality, cutting production issues by 35%. Less bugs = happier users!",
            "⚡ Made apps 45% faster through smart optimizations - because waiting is so last decade!"
        ]
    },
    {
        title: "Web Wizard & WordPress Ninja",
        company: "Adivaha - Travel Tech Adventure 🌍",
        period: "January 2020 - August 2022",
        location: "New Delhi, India",
        responsibilities: [
            "🎫 Created plugins that handled 1000+ bookings monthly - that's a lot of happy travelers!",
            "💳 Integrated payment gateways with 99.9% success rate - money moves smooth!",
            "🔄 Built real-time APIs that eliminated 90% of booking conflicts - no more double bookings!",
            "🖥️ Deployed 12+ WordPress sites on Linux servers - wearing my sysadmin hat!"
        ]
    }
];

// Education
export const education = {
    degree: "Diploma in Computer Science 🎓",
    institution: "Government Polytechnic",
    period: "2016 - 2019",
    location: "Gurugram, Haryana"
};

// Achievements
export const achievements = [
    "📱 4+ apps published on App/Play Stores",
    "🚀 20+ projects launched into production",
    "📊 50K+ downloads across all apps",
    "⏱️ 99.8% uptime for critical systems",
    "⭐ 4.5+ average rating on stores",
    "🐧 Linux server administration expert"
];

// Key Projects
export const projects = [
    {
        id: 1,
        title: "Paylap Score",
        subtitle: "Digital Scoring Platform 🎯",
        description: "Solo mission alert! 🚀 Built this complete scoring platform from scratch - web, mobile, backend, everything! Added JWT authentication for security, real-time analytics for insights, and deployed it all on my own Linux server. Plus got it published on both App Store and Play Store. Talk about a full-stack adventure!",
        tech: ["React", "React Native", "Laravel", "MySQL", "AWS", "Linux"],
        highlights: ["✨ 100% solo development", "🖥️ Linux deployment mastery", "📱 Both app stores conquered"],
        downloads: "10K+",
        rating: "4.5+",
        icon: "activity",
        gradient: "from-purple-500 via-pink-600 to-red-500",
        appStore: "https://apps.apple.com/us/app/paylap-score/id6736965791",
        playStore: "https://play.google.com/store/apps/details?id=com.paylap.paylapscore"
    },
    {
        id: 2,
        title: "Paylap Fitness",
        subtitle: "Gym Management Magic 💪",
        description: "Your friendly neighborhood gym app! Built a complete management system with member check-ins via QR codes & biometrics (pretty cool, right?), subscription tracking, custom workout plans, and payment integration. Basically, everything a modern gym needs in one beautiful package. Solo mission accomplished! 🎉",
        tech: ["React Native", "Node.js", "Laravel", "MySQL", "Linux"],
        highlights: ["🏋️ Full-stack solo adventure", "☁️ Server deployed like a boss", "🌟 Published on both stores"],
        rating: "4.6",
        icon: "heart",
        gradient: "from-blue-500 via-cyan-600 to-teal-500",
        appStore: "https://apps.apple.com/in/app/paylap-fitness/id6748222119",
        playStore: "https://play.google.com/store/apps/details?id=com.alexsye1999.PaylapFitness"
    },
    {
        id: 3,
        title: "Paylap Education",
        subtitle: "Learning Platform 📚",
        description: "Education meets innovation! Created this awesome learning platform with video streaming, quizzes, course management, and role-based access for students, teachers, and admins. Set up the entire deployment pipeline - Linux server, CDN, database optimization, and app store publishing. Making learning digital and fun! 🎓",
        tech: ["React", "React Native", "Laravel", "Supabase", "Linux"],
        highlights: ["🏗️ Architected from ground up", "🐧 Linux server wizard", "🚀 Complete deployment pipeline"],
        users: "5K+ active learners",
        icon: "book",
        gradient: "from-indigo-500 via-purple-600 to-pink-500",
        appStore: "#",
        playStore: "#"
    },
    {
        id: 4,
        title: "Paylap Pets Care",
        subtitle: "Animal Rescue Platform 🐾",
        description: "Saving lives, one paw at a time! 💚 Built this comprehensive platform for animal rescue NGOs. Features include tracking injured pets, pet adoption browsing, donation management, live location tracking for rescued animals, health records, and vet consultation booking. Deployed it all independently on AWS & Linux. Every rescue counts!",
        tech: ["React Native", "Laravel", "MySQL", "AWS S3", "Linux"],
        highlights: ["❤️ Built with love (solo!)", "☁️ AWS & Linux deployment", "📲 Published independently"],
        icon: "paw",
        gradient: "from-green-500 via-emerald-600 to-teal-500",
        appStore: "https://apps.apple.com/us/app/paylap-pet-care/id6751187034",
        playStore: "https://play.google.com/store/apps/details?id=com.alexsye1999.paylappets"
    }
];

// AI/ML Focus
export const aimlFocus = [
    "🤖 ML predictive models - teaching machines to think!",
    "💬 NLP & 👁️ Computer Vision - understanding text and images",
    "🌐 AI web app integration - making apps smarter",
    "🧠 TensorFlow & Scikit-learn - the brain tools!"
];

// About Data - Extended Personal Information
export const aboutData = {
    introduction: "I'm a full-stack developer who believes code is more than just syntax—it's a way to create experiences that matter. With over 5 years of turning coffee into code, I've mastered the art of building applications that users love and businesses rely on. From mobile apps with 50K+ downloads to enterprise systems handling critical operations, I bring both technical expertise and a genuine passion for solving real-world problems.",
    mission: "To leverage cutting-edge technology and create digital solutions that make a meaningful impact, while constantly learning and evolving in the ever-changing tech landscape.",
    vision: "To be a catalyst for innovation, pushing the boundaries of what's possible with web and mobile technologies, and inspiring the next generation of developers.",
    values: [
        {
            icon: "code",
            title: "Quality First",
            description: "Writing clean, maintainable code isn't optional—it's a responsibility. Every line matters."
        },
        {
            icon: "users",
            title: "User-Centric",
            description: "Technology should serve people, not frustrate them. User experience is always the top priority."
        },
        {
            icon: "trending-up",
            title: "Continuous Growth",
            description: "The tech world never stops evolving, and neither do I. Always learning, always improving."
        },
        {
            icon: "zap",
            title: "Innovation",
            description: "Every project is an opportunity to try something new, push boundaries, and create something amazing."
        }
    ],
    highlights: [
        { label: "Years of Experience", value: "5+" },
        { label: "Projects Delivered", value: "20+" },
        { label: "Happy Clients", value: "15+" },
        { label: "Technologies Mastered", value: "30+" }
    ]
};

// Services Offered
export const services = [
    {
        id: 1,
        icon: "smartphone",
        title: "Mobile App Development",
        description: "Native-quality mobile apps using React Native that work seamlessly on both iOS and Android. From concept to App Store/Play Store publishing, I handle it all.",
        features: [
            "Cross-platform development with React Native",
            "Native iOS & Android features integration",
            "App Store & Play Store deployment",
            "Push notifications & real-time updates",
            "Offline functionality & data sync",
            "In-app purchases & payment integration"
        ],
        gradient: "from-blue-500 via-purple-600 to-pink-500"
    },
    {
        id: 2,
        icon: "globe",
        title: "Web Application Development",
        description: "Modern, responsive web applications built with React and powerful backend technologies. Scalable, secure, and optimized for performance.",
        features: [
            "React & Next.js applications",
            "RESTful API & GraphQL development",
            "Real-time features with WebSockets",
            "Progressive Web Apps (PWA)",
            "E-commerce & payment integration",
            "Admin dashboards & analytics"
        ],
        gradient: "from-cyan-500 via-blue-600 to-indigo-500"
    },
    {
        id: 3,
        icon: "server",
        title: "Backend & API Development",
        description: "Robust backend systems with Laravel, Node.js, and modern databases. Secure, scalable architecture that grows with your business.",
        features: [
            "RESTful & GraphQL APIs",
            "Laravel & Node.js backends",
            "Database design & optimization",
            "Authentication & authorization",
            "Third-party API integrations",
            "Microservices architecture"
        ],
        gradient: "from-green-500 via-emerald-600 to-teal-500"
    },
    {
        id: 4,
        icon: "cloud",
        title: "Cloud & DevOps",
        description: "Complete deployment and server management on AWS, Linux servers. CI/CD pipelines, monitoring, and infrastructure as code.",
        features: [
            "AWS cloud infrastructure setup",
            "Linux server administration",
            "CI/CD pipeline configuration",
            "Docker containerization",
            "SSL, DNS & domain management",
            "Server monitoring & optimization"
        ],
        gradient: "from-orange-500 via-red-600 to-pink-500"
    },
    {
        id: 5,
        icon: "shield",
        title: "Full-Stack Solutions",
        description: "End-to-end application development from database to UI. One person, complete ownership, delivered on time.",
        features: [
            "Complete project ownership",
            "Frontend to backend integration",
            "Database to deployment",
            "Code review & quality assurance",
            "Documentation & handover",
            "Post-launch support"
        ],
        gradient: "from-purple-500 via-pink-600 to-rose-500"
    },
    {
        id: 6,
        icon: "brain",
        title: "AI/ML Integration",
        description: "Bringing intelligence to your applications with machine learning, NLP, and computer vision capabilities.",
        features: [
            "ML model integration",
            "Natural Language Processing",
            "Computer vision features",
            "Predictive analytics",
            "AI-powered recommendations",
            "TensorFlow & Scikit-learn"
        ],
        gradient: "from-indigo-500 via-purple-600 to-pink-500"
    }
];

// Development Process Steps
export const processSteps = [
    {
        id: 1,
        number: "01",
        icon: "search",
        title: "Discovery & Analysis",
        description: "Understanding your needs, goals, and challenges. We dive deep into requirements, research the market, and define the perfect solution.",
        activities: [
            "Requirements gathering & analysis",
            "Competitor research & market study",
            "Technical feasibility assessment",
            "Project scope & timeline definition"
        ],
        color: "from-blue-500 to-cyan-500"
    },
    {
        id: 2,
        number: "02",
        icon: "pen-tool",
        title: "Design & Planning",
        description: "Creating the blueprint for success. From wireframes to detailed technical architecture, every detail is planned before a single line of code.",
        activities: [
            "UI/UX design & wireframing",
            "Database schema design",
            "API architecture planning",
            "Technology stack selection"
        ],
        color: "from-purple-500 to-pink-500"
    },
    {
        id: 3,
        number: "03",
        icon: "code",
        title: "Development",
        description: "Where ideas become reality. Clean, efficient code written with best practices, version control, and regular progress updates.",
        activities: [
            "Agile development methodology",
            "Clean code & best practices",
            "Git version control",
            "Regular progress updates"
        ],
        color: "from-green-500 to-emerald-500"
    },
    {
        id: 4,
        number: "04",
        icon: "check-circle",
        title: "Testing & QA",
        description: "Rigorous testing to ensure everything works perfectly. From unit tests to user acceptance testing, quality is guaranteed.",
        activities: [
            "Unit & integration testing",
            "Cross-browser/device testing",
            "Performance optimization",
            "Security vulnerability checks"
        ],
        color: "from-orange-500 to-red-500"
    },
    {
        id: 5,
        number: "05",
        icon: "upload-cloud",
        title: "Deployment",
        description: "Smooth launch to production. Server setup, domain configuration, app store publishing—everything handled professionally.",
        activities: [
            "Production server setup",
            "Domain & SSL configuration",
            "App store submission & approval",
            "Launch monitoring & support"
        ],
        color: "from-indigo-500 to-purple-500"
    },
    {
        id: 6,
        number: "06",
        icon: "settings",
        title: "Maintenance & Support",
        description: "Ongoing support and improvements. Bug fixes, updates, new features—your app stays current and performs optimally.",
        activities: [
            "Regular updates & maintenance",
            "Bug fixes & improvements",
            "Performance monitoring",
            "Feature enhancements"
        ],
        color: "from-pink-500 to-rose-500"
    }
];

// Technologies Showcase
export const technologiesShowcase = {
    frontend: {
        name: "Frontend",
        techs: [
            { name: "React", icon: "⚛️", proficiency: "expert" },
            { name: "React Native", icon: "📱", proficiency: "expert" },
            { name: "JavaScript", icon: "💛", proficiency: "expert" },
            { name: "TypeScript", icon: "🔷", proficiency: "advanced" },
            { name: "HTML5/CSS3", icon: "🎨", proficiency: "expert" },
            { name: "Redux", icon: "🔄", proficiency: "advanced" }
        ]
    },
    backend: {
        name: "Backend",
        techs: [
            { name: "PHP", icon: "🐘", proficiency: "expert" },
            { name: "Laravel", icon: "✨", proficiency: "expert" },
            { name: "Node.js", icon: "🟢", proficiency: "advanced" },
            { name: "REST APIs", icon: "🌐", proficiency: "expert" },
            { name: "GraphQL", icon: "📊", proficiency: "intermediate" }
        ]
    },
    database: {
        name: "Database",
        techs: [
            { name: "MySQL", icon: "🐬", proficiency: "expert" },
            { name: "PostgreSQL", icon: "🐘", proficiency: "advanced" },
            { name: "Supabase", icon: "⚡", proficiency: "advanced" },
            { name: "Redis", icon: "🔴", proficiency: "intermediate" }
        ]
    },
    devops: {
        name: "DevOps & Cloud",
        techs: [
            { name: "Linux", icon: "🐧", proficiency: "expert" },
            { name: "AWS", icon: "☁️", proficiency: "advanced" },
            { name: "Docker", icon: "🐳", proficiency: "intermediate" },
            { name: "Git", icon: "🔀", proficiency: "expert" },
            { name: "CI/CD", icon: "🚀", proficiency: "advanced" }
        ]
    }
};

// Statistics/Achievements
export const stats = [
    {
        id: 1,
        icon: "briefcase",
        label: "Years Experience",
        value: 5,
        suffix: "+",
        color: "from-blue-500 to-cyan-500"
    },
    {
        id: 2,
        icon: "folder",
        label: "Projects Completed",
        value: 20,
        suffix: "+",
        color: "from-purple-500 to-pink-500"
    },
    {
        id: 3,
        icon: "download",
        label: "App Downloads",
        value: 50,
        suffix: "K+",
        color: "from-green-500 to-emerald-500"
    },
    {
        id: 4,
        icon: "users",
        label: "Happy Clients",
        value: 15,
        suffix: "+",
        color: "from-orange-500 to-red-500"
    }
];

// Testimonials
export const testimonials = [
    {
        id: 1,
        name: "Rajesh Kumar",
        role: "Founder & CEO",
        company: "TechStart Solutions",
        image: "/img/testimonial-placeholder.jpg",
        rating: 5,
        text: "Arbaz is an exceptional developer who delivered our mobile app beyond expectations. His full-stack expertise and ability to handle everything from backend to deployment made our project a huge success. 50K+ downloads and counting!",
        gradient: "from-blue-500 to-cyan-500"
    },
    {
        id: 2,
        name: "Priya Sharma",
        role: "Product Manager",
        company: "EduTech Innovations",
        image: "/img/testimonial-placeholder.jpg",
        rating: 5,
        text: "Working with Arbaz was a game-changer for our education platform. He not only built a robust system but also optimized it for performance. His attention to detail and commitment to quality are unmatched.",
        gradient: "from-purple-500 to-pink-500"
    },
    {
        id: 3,
        name: "Amit Patel",
        role: "Operations Director",
        company: "FitLife Gyms",
        image: "/img/testimonial-placeholder.jpg",
        rating: 5,
        text: "The gym management app Arbaz built transformed our business operations. QR code check-ins, biometric integration, and seamless payment processing—all working perfectly. Highly recommended!",
        gradient: "from-green-500 to-emerald-500"
    },
    {
        id: 4,
        name: "Sneha Reddy",
        role: "Director",
        company: "Animal Welfare NGO",
        image: "/img/testimonial-placeholder.jpg",
        rating: 5,
        text: "Arbaz's passion for our animal rescue platform was evident in every feature. The tracking system, adoption portal, and donation management have helped us save countless lives. Thank you!",
        gradient: "from-orange-500 to-red-500"
    }
];
