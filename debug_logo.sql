-- Test script to check site_settings table
-- Run this in Supabase SQL editor to debug the logo issue

-- 1. Check if site_settings table exists
SELECT EXISTS (
   SELECT FROM information_schema.tables 
   WHERE table_name = 'site_settings'
);

-- 2. Check current site_logo setting
SELECT * FROM site_settings WHERE key = 'site_logo';

-- 3. If no site_logo exists, insert a test one
INSERT INTO site_settings (key, value) 
VALUES ('site_logo', 'test-logo-url')
ON CONFLICT (key) DO NOTHING;

-- 4. Update site_logo to null (test removal)
UPDATE site_settings SET value = null WHERE key = 'site_logo';

-- 5. Check the result
SELECT * FROM site_settings WHERE key = 'site_logo';
