import { Archive, RefreshCw } from 'lucide-react'
import { Button } from "@/components/ui/button"

export function ArchivedHeader({ onRefresh }) {
  return (
    <div className="flex items-center justify-between flex-wrap gap-4">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white flex items-center">
        <Archive className="mr-2 text-primary" />
        Archived Projects
      </h1>
      <Button 
        onClick={onRefresh} 
        className="bg-primary hover:bg-primary/90 text-white"
      >
        <RefreshCw className="w-4 h-4 mr-2" />
        <span className="hidden sm:inline">Refresh</span>
      </Button>
    </div>
  )
} 