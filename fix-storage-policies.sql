-- First, drop any existing policies that might be conflicting
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can upload" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can update" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can delete" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update" ON storage.objects;

-- Create new policies for my-bucket
-- Allow public read access
CREATE POLICY "Allow public read access" ON storage.objects 
FOR SELECT USING (bucket_id = 'my-bucket');

-- Allow authenticated users to insert files
CREATE POLICY "Allow authenticated insert" ON storage.objects 
FOR INSERT WITH CHECK (
  bucket_id = 'my-bucket' 
  AND auth.role() = 'authenticated'
);

-- Allow authenticated users to update files
CREATE POLICY "Allow authenticated update" ON storage.objects 
FOR UPDATE USING (
  bucket_id = 'my-bucket' 
  AND auth.role() = 'authenticated'
);

-- Allow authenticated users to delete files
CREATE POLICY "Allow authenticated delete" ON storage.objects 
FOR DELETE USING (
  bucket_id = 'my-bucket' 
  AND auth.role() = 'authenticated'
);

-- Also make sure the bucket itself allows the operations
-- (This should be run in the Supabase dashboard under Storage > Policies)
