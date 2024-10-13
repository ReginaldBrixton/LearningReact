"use client"

import { useEffect, useState } from "react"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { app } from "../firebaseConfig"
import { useRouter } from 'next/navigation'
import { Header } from "@/components/Header"
import { Sidebar } from "@/components/Sidebar"
import { BottomNav } from "@/components/BottomNav"
import { MolecularStructureLoaderComponent } from "@/components/LoadingScreens/molecular-structure-loader"

export default function DashboardLayout({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const auth = getAuth(app)
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    if (!loading && user) {
      const timer = setTimeout(() => {
        setShowLoader(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [loading, user]);

  if (showLoader || loading || !user) {
    return <MolecularStructureLoaderComponent />;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header className="sticky top-0 z-10" />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 pb-16 sm:pb-4">
          <div className="h-full">{children}</div>
        </main>
        <BottomNav className="sticky bottom-0 z-10" />
      </div>
    </div>
  )
}