"use client"

import { MolecularStructureLoaderComponent } from "@/components/LoadingScreens/molecular-structure-loader"

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <MolecularStructureLoaderComponent />
    </div>
  )
}
