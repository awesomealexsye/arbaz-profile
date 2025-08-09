-- Storage policies for my-bucket

-- Allow public read access to all files
CREATE POLICY "Public Access" ON storage.objects 
FOR SELECT USING (bucket_id = 'my-bucket');

-- Allow anyone to upload files (you can restrict this later)
CREATE POLICY "Anyone can upload" ON storage.objects 
FOR INSERT WITH CHECK (bucket_id = 'my-bucket');

-- Allow anyone to update files (you can restrict this later)
CREATE POLICY "Anyone can update" ON storage.objects 
FOR UPDATE USING (bucket_id = 'my-bucket');

-- Allow anyone to delete files (you can restrict this later)
CREATE POLICY "Anyone can delete" ON storage.objects 
FOR DELETE USING (bucket_id = 'my-bucket');
