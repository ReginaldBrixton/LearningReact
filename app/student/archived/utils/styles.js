export const getDepartmentColor = (department) => {
  const colors = {
    'Computer Science': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    'Urban Studies': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    'Physics': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    'Environmental Science': 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200',
    'Health Informatics': 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
    'Biomedical Engineering': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    'Earth Sciences': 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200',
    'Education Technology': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
  }
  return colors[department] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
}

export const getScoreColor = (score) => {
  if (score >= 90) return 'text-green-600 dark:text-green-400'
  if (score >= 80) return 'text-blue-600 dark:text-blue-400'
  if (score >= 70) return 'text-yellow-600 dark:text-yellow-400'
  return 'text-red-600 dark:text-red-400'
} 