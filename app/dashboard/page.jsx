'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebaseConfig'

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser)
      } else {
        router.push('/login')
      }
    })

    return () => unsubscribe()
  }, [router])

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1>Welcome to your dashboard, {user.displayName}!</h1>
      {/* Add more dashboard content here */}
    </div>
  )
}