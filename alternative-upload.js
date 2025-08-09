// Alternative upload method using signed URLs
const uploadWithSignedUrl = async (file) => {
  try {
    const fileExt = file.name.split('.').pop()
    const fileName = `project-${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
    const filePath = `projects/${fileName}`

    // Create a signed URL for upload
    const { data: signedUrlData, error: signedUrlError } = await supabase.storage
      .from('my-bucket')
      .createSignedUploadUrl(filePath)

    if (signedUrlError) throw signedUrlError

    // Upload using the signed URL
    const uploadResponse = await fetch(signedUrlData.signedUrl, {
      method: 'PUT',
      body: file,
      headers: {
        'Content-Type': file.type,
      },
    })

    if (!uploadResponse.ok) {
      throw new Error(`Upload failed: ${uploadResponse.statusText}`)
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('my-bucket')
      .getPublicUrl(filePath)

    return publicUrl
  } catch (error) {
    console.error('Error uploading with signed URL:', error)
    throw error
  }
}
