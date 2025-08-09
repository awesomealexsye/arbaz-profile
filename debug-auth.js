// Add this to your Settings component to debug authentication
const debugAuth = async () => {
  const { data: { session }, error } = await supabase.auth.getSession()
  console.log('Current session:', session)
  console.log('Session error:', error)
  console.log('User ID:', session?.user?.id)
  console.log('User role:', session?.user?.role)
  console.log('User email:', session?.user?.email)
}

// Call this in useEffect or on button click
debugAuth()
