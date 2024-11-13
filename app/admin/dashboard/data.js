import { Bell, Users, Briefcase, BarChart } from 'lucide-react'
import { format, subDays } from 'date-fns'
import Image from 'next/image'

// Utility function to generate chart data with random values for a week
const generateChartData = (baseValue, range, days = 7) => 
  Array.from({ length: days }, (_, i) => ({
    date: format(subDays(new Date(), days - 1 - i), 'MMM dd'),
    value: Math.floor(Math.random() * range) + baseValue
  }))

// Factory function for creating stats cards with common structure
const createStatsCard = (config) => ({
  title: config.title,
  value: config.value,
  growth: config.growth || null,
  period: config.period || null,
  subtext: config.subtext || null,
  icon: config.icon,
  chartData: config.chartData || null,
  status: config.status || null,
  metrics: config.metrics || null,
  notifications: config.notifications || null,
  priority: config.priority || null
})

// Specific stats card creators using the factory function
const createUserStatsCard = () => createStatsCard({
  title: 'Total Users', 
  value: '1,234', 
  growth: '+5.25%', 
  period: 'from last month',
  icon: Users,
  chartData: generateChartData(1000, 300)
})

const createProjectStatsCard = () => createStatsCard({
  title: 'Active Projects', 
  value: '42', 
  growth: '+2', 
  period: 'new this week',
  icon: Briefcase,
  chartData: generateChartData(35, 10)
})

const createAnnouncementsCard = () => createStatsCard({
  title: 'Announcements', 
  value: '7', 
  subtext: '3 unread',
  icon: Bell,
  priority: 'high',
  notifications: [
    { title: 'System Maintenance', time: 'Tomorrow at 2 AM', priority: 'high' },
    { title: 'New Feature Release', time: 'Next Week', priority: 'medium' },
    { title: 'Team Meeting', time: 'Today at 4 PM', priority: 'low' },
    { title: 'Security Update', time: 'In 3 days', priority: 'high' },
    { title: 'Performance Optimization', time: 'Next Month', priority: 'medium' },
    { title: 'Quarterly Review', time: 'End of Quarter', priority: 'low' }
  ]
})

const createSystemHealthCard = () => createStatsCard({
  title: 'System Health', 
  value: '99.9%', 
  subtext: 'Operational',
  icon: BarChart,
  status: 'healthy',
  metrics: [
    { name: 'CPU Usage', value: '45%' },
    { name: 'Memory', value: '60%' },
    { name: 'Storage', value: '75%' }
  ]
})

// Generate stats cards
export const statsCards = [
  createUserStatsCard(),
  createProjectStatsCard(),
  createAnnouncementsCard(),
  createSystemHealthCard()
]

// Create activity with avatar
const createActivityWithAvatar = (activity) => ({
  ...activity,
  avatar: activity.avatar && (
    <Image 
      src={activity.avatar}
      alt={`${activity.user}'s avatar`}
      width={40}
      height={40}
      className="rounded-full object-cover"
      loading="lazy"
    />
  )
})

// Recent activities data
export const recentActivities = [
  { 
    user: 'John Doe', 
    action: 'logged in', 
    time: '2 minutes ago',
    type: 'auth',
    avatar: '/avatars/avatar1.jpg',
    details: { location: 'New York, US', device: 'Chrome on Windows' }
  },
  { 
    user: 'Jane Smith', 
    action: 'created a new project "AI Research"', 
    time: '1 hour ago',
    type: 'project',
    avatar: '/avatars/avatar2.jpg',
    details: { projectId: 'PRJ-123', department: 'Research & Development' }
  },
  { 
    user: 'Admin', 
    action: 'posted an announcement about system maintenance', 
    time: '3 hours ago',
    type: 'announcement',
    avatar: '/avatars/avatar3.jpg',
    details: { priority: 'High', affectedUsers: 'All' }
  },
  { 
    user: 'Mike Johnson', 
    action: 'updated department structure', 
    time: '5 hours ago',
    type: 'department',
    avatar: '/avatars/avatar4.jpg',
    details: { changes: ['Added new team', 'Updated reporting lines'] }
  }
].map(createActivityWithAvatar)