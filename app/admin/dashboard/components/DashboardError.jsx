import { AlertTriangle } from 'lucide-react'

const DashboardError = ({ message }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="text-center p-6">
        <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Error Loading Dashboard
        </h2>
        <p className="text-gray-600 dark:text-gray-300">{message}</p>
      </div>
    </div>
  )
}

export default DashboardError 