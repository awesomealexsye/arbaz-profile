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
