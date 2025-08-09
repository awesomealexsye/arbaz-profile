-- Temporary fix: Disable RLS on storage.objects for testing
-- WARNING: This makes uploads less secure, use only for testing

-- Disable RLS temporarily
ALTER TABLE storage.objects DISABLE ROW LEVEL SECURITY;

-- Or create a more permissive policy for testing
-- DROP POLICY IF EXISTS "Allow anyone to upload" ON storage.objects;
-- CREATE POLICY "Allow anyone to upload" ON storage.objects 
-- FOR INSERT WITH CHECK (bucket_id = 'my-bucket');

-- Remember to re-enable RLS after testing:
-- ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;
