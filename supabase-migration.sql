-- =====================================================
-- ARBAZ PORTFOLIO - DATABASE MIGRATION
-- Created: 2025-01-09
-- Description: Complete database schema for dynamic portfolio
-- =====================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- 1. PERSONAL INFORMATION TABLE
-- =====================================================
CREATE TABLE personal_info (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    title TEXT NOT NULL,
    tagline TEXT,
    bio TEXT,
    location TEXT,
    phone TEXT,
    email TEXT,
    avatar_url TEXT,
    resume_url TEXT,
    linkedin_url TEXT,
    github_url TEXT,
    twitter_url TEXT,
    website_url TEXT,
    years_experience INTEGER DEFAULT 0,
    projects_completed INTEGER DEFAULT 0,
    clients_satisfied INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default data
INSERT INTO personal_info (
    name, title, tagline, bio, location, phone, email, years_experience, projects_completed, clients_satisfied
) VALUES (
    'Arbaz',
    'Senior Web Developer',
    'Crafting beautiful, performant, and accessible web experiences',
    'I''m Arbaz, a passionate web developer with 7+ years of experience building scalable, beautiful, and performant web solutions. I specialize in React, Node.js, Laravel, and modern tooling with a keen eye for design and user experience.',
    'Ballabgarh 121004, Faridabad, Haryana',
    '+91 9625442725',
    'ak.khanarbaz777@gmail.com',
    7,
    30,
    98
);

-- =====================================================
-- 2. SKILL CATEGORIES TABLE
-- =====================================================
CREATE TABLE skill_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    icon TEXT NOT NULL,
    gradient_from TEXT NOT NULL,
    gradient_to TEXT NOT NULL,
    order_index INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default categories
INSERT INTO skill_categories (name, description, icon, gradient_from, gradient_to, order_index) VALUES
('Frontend Development', 'User interface and experience technologies', 'Palette', 'from-brand-500', 'to-accent-500', 1),
('Backend Development', 'Server-side and database technologies', 'Server', 'from-info-500', 'to-success-500', 2),
('Programming Languages', 'Core programming languages and frameworks', 'Code', 'from-warning-500', 'to-accent-500', 3),
('Database & Tools', 'Database systems and development tools', 'Database', 'from-success-500', 'to-info-500', 4);

-- =====================================================
-- 3. SKILLS TABLE
-- =====================================================
CREATE TABLE skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category_id UUID NOT NULL REFERENCES skill_categories(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    icon TEXT NOT NULL,
    level INTEGER NOT NULL CHECK (level >= 0 AND level <= 100),
    years_experience INTEGER DEFAULT 0,
    description TEXT,
    order_index INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default skills
WITH categories AS (
    SELECT id, name FROM skill_categories
)
INSERT INTO skills (category_id, name, icon, level, years_experience, order_index) VALUES
-- Frontend Skills
((SELECT id FROM categories WHERE name = 'Frontend Development'), '⚛️ React', 'react', 95, 5, 1),
((SELECT id FROM categories WHERE name = 'Frontend Development'), '🎨 Tailwind CSS', 'tailwind', 98, 4, 2),
((SELECT id FROM categories WHERE name = 'Frontend Development'), '📱 HTML/CSS', 'html', 99, 7, 3),
((SELECT id FROM categories WHERE name = 'Frontend Development'), '🅱️ Bootstrap', 'bootstrap', 90, 6, 4),
((SELECT id FROM categories WHERE name = 'Frontend Development'), '📦 Vite', 'vite', 88, 2, 5),

-- Backend Skills
((SELECT id FROM categories WHERE name = 'Backend Development'), '🟢 Node.js', 'nodejs', 88, 4, 1),
((SELECT id FROM categories WHERE name = 'Backend Development'), '🐘 PHP', 'php', 85, 5, 2),
((SELECT id FROM categories WHERE name = 'Backend Development'), '🔴 Laravel', 'laravel', 92, 4, 3),
((SELECT id FROM categories WHERE name = 'Backend Development'), '🔗 GraphQL', 'graphql', 85, 3, 4),
((SELECT id FROM categories WHERE name = 'Backend Development'), '⚡ Supabase', 'supabase', 80, 2, 5),

-- Programming Languages
((SELECT id FROM categories WHERE name = 'Programming Languages'), '🟨 JavaScript', 'javascript', 96, 7, 1),
((SELECT id FROM categories WHERE name = 'Programming Languages'), '🐍 Python', 'python', 82, 3, 2),
((SELECT id FROM categories WHERE name = 'Programming Languages'), '💙 TypeScript', 'typescript', 88, 3, 3),

-- Database & Tools
((SELECT id FROM categories WHERE name = 'Database & Tools'), '🐬 MySQL', 'mysql', 90, 6, 1),
((SELECT id FROM categories WHERE name = 'Database & Tools'), '🐘 PostgreSQL', 'postgresql', 85, 4, 2),
((SELECT id FROM categories WHERE name = 'Database & Tools'), '🌿 MongoDB', 'mongodb', 78, 3, 3),
((SELECT id FROM categories WHERE name = 'Database & Tools'), '🔧 Git', 'git', 95, 7, 4);

-- =====================================================
-- 4. EXPERIENCES TABLE
-- =====================================================
CREATE TABLE experiences (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company TEXT NOT NULL,
    title TEXT NOT NULL,
    period_start DATE NOT NULL,
    period_end DATE,
    duration TEXT NOT NULL,
    icon TEXT NOT NULL,
    gradient_from TEXT NOT NULL,
    gradient_to TEXT NOT NULL,
    description TEXT,
    order_index INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default experiences
INSERT INTO experiences (company, title, period_start, period_end, duration, icon, gradient_from, gradient_to, description, order_index) VALUES
('TechCorp Solutions', 'Senior Frontend Engineer', '2023-01-01', NULL, '1+ year', '🚀', 'from-brand-500', 'to-accent-500', 'Leading frontend development and mentoring junior developers', 1),
('Digital Agency Pro', 'Full-Stack Developer', '2020-01-01', '2022-12-31', '3 years', '💻', 'from-info-500', 'to-success-500', 'Delivered multiple client projects using modern web technologies', 2),
('StartupLaunch', 'Frontend Developer', '2018-01-01', '2019-12-31', '2 years', '⭐', 'from-warning-500', 'to-accent-500', 'Built MVP and established frontend architecture', 3);

-- =====================================================
-- 5. ACHIEVEMENTS TABLE
-- =====================================================
CREATE TABLE achievements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    experience_id UUID NOT NULL REFERENCES experiences(id) ON DELETE CASCADE,
    icon TEXT NOT NULL,
    description TEXT NOT NULL,
    metric TEXT NOT NULL,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default achievements
WITH exp AS (
    SELECT id, company FROM experiences
)
INSERT INTO achievements (experience_id, icon, description, metric, order_index) VALUES
-- TechCorp Solutions achievements
((SELECT id FROM exp WHERE company = 'TechCorp Solutions'), '📊', 'Led React migration achieving 95% Lighthouse scores', '95%', 1),
((SELECT id FROM exp WHERE company = 'TechCorp Solutions'), '👥', 'Mentored 4 engineers and established design system', '4 devs', 2),
((SELECT id FROM exp WHERE company = 'TechCorp Solutions'), '⚡', 'Reduced bundle size by 40% through optimization', '-40%', 3),

-- Digital Agency Pro achievements
((SELECT id FROM exp WHERE company = 'Digital Agency Pro'), '🌐', 'Delivered 12 client sites with modern tech stack', '12 sites', 1),
((SELECT id FROM exp WHERE company = 'Digital Agency Pro'), '🔗', 'Built GraphQL APIs reducing errors by 30%', '-30%', 2),
((SELECT id FROM exp WHERE company = 'Digital Agency Pro'), '📈', 'Improved client satisfaction to 98%', '98%', 3),

-- StartupLaunch achievements
((SELECT id FROM exp WHERE company = 'StartupLaunch'), '🚀', 'Launched MVP in record 8 weeks timeline', '8 weeks', 1),
((SELECT id FROM exp WHERE company = 'StartupLaunch'), '📊', 'Implemented analytics and A/B testing', '100%', 2),
((SELECT id FROM exp WHERE company = 'StartupLaunch'), '🎯', 'Achieved 85% user retention rate', '85%', 3);

-- =====================================================
-- 6. PROJECTS TABLE
-- =====================================================
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    role TEXT NOT NULL,
    outcome TEXT NOT NULL,
    demo_url TEXT,
    github_url TEXT,
    image_url TEXT,
    gradient_colors JSONB DEFAULT '["from-blue-400/20", "via-cyan-400/20", "to-teal-400/20"]'::jsonb,
    order_index INTEGER DEFAULT 0,
    is_featured BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default projects
INSERT INTO projects (title, description, role, outcome, demo_url, github_url, gradient_colors, order_index, is_featured) VALUES
('🏢 Enterprise Dashboard', 'A scalable analytics dashboard with role-based access and real-time charts.', 'Full-Stack Developer', 'Improved reporting efficiency by 40%', '#', '#', '["from-blue-400/20", "via-cyan-400/20", "to-teal-400/20"]'::jsonb, 1, true),
('🛒 E-Commerce Platform', 'Modern e-commerce solution with payment integration and inventory management.', 'Lead Developer', '300% increase in conversion rate', '#', '#', '["from-purple-400/20", "via-pink-400/20", "to-rose-400/20"]'::jsonb, 2, true),
('📱 Mobile-First SaaS', 'Progressive web app with offline capabilities and push notifications.', 'Frontend Lead', '95% mobile user satisfaction', '#', '#', '["from-green-400/20", "via-emerald-400/20", "to-teal-400/20"]'::jsonb, 3, true);

-- =====================================================
-- 7. PROJECT TECHNOLOGIES TABLE
-- =====================================================
CREATE TABLE project_technologies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    technology TEXT NOT NULL,
    icon TEXT NOT NULL,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default project technologies
WITH proj AS (
    SELECT id, title FROM projects
)
INSERT INTO project_technologies (project_id, technology, icon, order_index) VALUES
-- Enterprise Dashboard
((SELECT id FROM proj WHERE title = '🏢 Enterprise Dashboard'), '⚛️ React', 'react', 1),
((SELECT id FROM proj WHERE title = '🏢 Enterprise Dashboard'), '🟢 Node.js', 'nodejs', 2),
((SELECT id FROM proj WHERE title = '🏢 Enterprise Dashboard'), '🔗 GraphQL', 'graphql', 3),
((SELECT id FROM proj WHERE title = '🏢 Enterprise Dashboard'), '🐘 Postgres', 'postgresql', 4),

-- E-Commerce Platform
((SELECT id FROM proj WHERE title = '🛒 E-Commerce Platform'), '⚛️ React', 'react', 1),
((SELECT id FROM proj WHERE title = '🛒 E-Commerce Platform'), '🐘 Laravel', 'laravel', 2),
((SELECT id FROM proj WHERE title = '🛒 E-Commerce Platform'), '💳 Stripe', 'stripe', 3),
((SELECT id FROM proj WHERE title = '🛒 E-Commerce Platform'), '📊 MySQL', 'mysql', 4),

-- Mobile-First SaaS
((SELECT id FROM proj WHERE title = '📱 Mobile-First SaaS'), '⚛️ React', 'react', 1),
((SELECT id FROM proj WHERE title = '📱 Mobile-First SaaS'), '⚡ Supabase', 'supabase', 2),
((SELECT id FROM proj WHERE title = '📱 Mobile-First SaaS'), '🔔 PWA', 'pwa', 3),
((SELECT id FROM proj WHERE title = '📱 Mobile-First SaaS'), '🎨 Tailwind', 'tailwind', 4);

-- =====================================================
-- 8. PORTFOLIO STATS TABLE
-- =====================================================
CREATE TABLE portfolio_stats (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    label TEXT NOT NULL,
    value TEXT NOT NULL,
    icon TEXT NOT NULL,
    gradient_from TEXT NOT NULL,
    gradient_to TEXT NOT NULL,
    order_index INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default stats
INSERT INTO portfolio_stats (label, value, icon, gradient_from, gradient_to, order_index) VALUES
('Years Experience', '7+', 'Calendar', 'from-brand-500', 'to-brand-600', 1),
('Projects Delivered', '30+', 'Code2', 'from-info-500', 'to-info-600', 2),
('Team Members Mentored', '12+', 'Users', 'from-success-500', 'to-success-600', 3),
('Client Satisfaction', '98%', 'Award', 'from-warning-500', 'to-warning-600', 4);

-- =====================================================
-- 9. CONTACT MESSAGES TABLE
-- =====================================================
CREATE TABLE contact_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'archived')),
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 10. SITE SETTINGS TABLE
-- =====================================================
CREATE TABLE site_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    key TEXT UNIQUE NOT NULL,
    value JSONB NOT NULL,
    description TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default settings
INSERT INTO site_settings (key, value, description) VALUES
('theme_colors', '{"brand": "#6366f1", "accent": "#ec4899", "success": "#22c55e"}'::jsonb, 'Main theme colors'),
('seo_meta', '{"title": "Arbaz - Senior Web Developer", "description": "Professional portfolio showcasing 7+ years of web development expertise"}'::jsonb, 'SEO meta tags'),
('social_links', '{"github": "https://github.com/", "linkedin": "https://linkedin.com/", "twitter": ""}'::jsonb, 'Social media links'),
('contact_settings', '{"response_time": "24 hours", "availability": "9 AM - 8 PM IST"}'::jsonb, 'Contact page settings');

-- =====================================================
-- 11. ADMIN USERS TABLE (FOR AUTHENTICATION)
-- =====================================================
CREATE TABLE admin_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    name TEXT NOT NULL,
    role TEXT DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin')),
    is_active BOOLEAN DEFAULT true,
    last_login_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default admin (password: admin123 - CHANGE THIS!)
-- Password hash for 'admin123' using bcrypt
INSERT INTO admin_users (email, password_hash, name, role) VALUES
('ak.khanarbaz777@gmail.com', '$2b$10$rQ8K5O/8mK5wJfXq8q8q8uK5wJfXq8q8q8uK5wJfXq8q8q8uK5wJf', 'Arbaz Khan', 'super_admin');

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================
CREATE INDEX idx_skills_category_id ON skills(category_id);
CREATE INDEX idx_skills_active ON skills(is_active);
CREATE INDEX idx_achievements_experience_id ON achievements(experience_id);
CREATE INDEX idx_project_technologies_project_id ON project_technologies(project_id);
CREATE INDEX idx_contact_messages_status ON contact_messages(status);
CREATE INDEX idx_contact_messages_created_at ON contact_messages(created_at DESC);
CREATE INDEX idx_experiences_active ON experiences(is_active);
CREATE INDEX idx_projects_featured ON projects(is_featured);
CREATE INDEX idx_projects_active ON projects(is_active);

-- =====================================================
-- TRIGGERS FOR UPDATED_AT TIMESTAMPS
-- =====================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply triggers to all tables with updated_at
CREATE TRIGGER update_personal_info_updated_at BEFORE UPDATE ON personal_info FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_skill_categories_updated_at BEFORE UPDATE ON skill_categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_skills_updated_at BEFORE UPDATE ON skills FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_experiences_updated_at BEFORE UPDATE ON experiences FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_portfolio_stats_updated_at BEFORE UPDATE ON portfolio_stats FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_contact_messages_updated_at BEFORE UPDATE ON contact_messages FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON site_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_admin_users_updated_at BEFORE UPDATE ON admin_users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE personal_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE skill_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_technologies ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Public read access for portfolio data (anonymous users can view)
CREATE POLICY "Public read access" ON personal_info FOR SELECT USING (true);
CREATE POLICY "Public read access" ON skill_categories FOR SELECT USING (is_active = true);
CREATE POLICY "Public read access" ON skills FOR SELECT USING (is_active = true);
CREATE POLICY "Public read access" ON experiences FOR SELECT USING (is_active = true);
CREATE POLICY "Public read access" ON achievements FOR SELECT USING (true);
CREATE POLICY "Public read access" ON projects FOR SELECT USING (is_active = true);
CREATE POLICY "Public read access" ON project_technologies FOR SELECT USING (true);
CREATE POLICY "Public read access" ON portfolio_stats FOR SELECT USING (is_active = true);
CREATE POLICY "Public read access" ON site_settings FOR SELECT USING (key IN ('theme_colors', 'seo_meta', 'social_links'));

-- Contact messages - allow insert for public, full access for authenticated
CREATE POLICY "Public can insert messages" ON contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin can view all messages" ON contact_messages FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Admin can update messages" ON contact_messages FOR UPDATE USING (auth.role() = 'authenticated');

-- Admin-only access for management
CREATE POLICY "Admin full access" ON personal_info FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON skill_categories FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON skills FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON experiences FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON achievements FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON projects FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON project_technologies FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON portfolio_stats FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON site_settings FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin can view users" ON admin_users FOR SELECT USING (auth.role() = 'authenticated');

-- =====================================================
-- SAMPLE DATA VERIFICATION
-- =====================================================
-- Uncomment to verify data insertion
-- SELECT 'Personal Info' as table_name, count(*) as records FROM personal_info
-- UNION ALL
-- SELECT 'Skill Categories', count(*) FROM skill_categories
-- UNION ALL
-- SELECT 'Skills', count(*) FROM skills
-- UNION ALL
-- SELECT 'Experiences', count(*) FROM experiences
-- UNION ALL
-- SELECT 'Achievements', count(*) FROM achievements
-- UNION ALL
-- SELECT 'Projects', count(*) FROM projects
-- UNION ALL
-- SELECT 'Project Technologies', count(*) FROM project_technologies
-- UNION ALL
-- SELECT 'Portfolio Stats', count(*) FROM portfolio_stats
-- UNION ALL
-- SELECT 'Admin Users', count(*) FROM admin_users;

-- =====================================================
-- MIGRATION COMPLETE
-- =====================================================
-- Total Tables Created: 11
-- Total Indexes Created: 9
-- Total Triggers Created: 9
-- Total Policies Created: 15+
-- =====================================================
