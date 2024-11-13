import { Bell, Users, Briefcase, BarChart } from 'lucide-react'
import { format, subDays } from 'date-fns'
import Image from 'next/image'

export const statsCards = [
  { 
    title: 'Total Users', 
    value: '1,234', 
    growth: '+5.25%', 
    period: 'from last month',
    icon: Users,
    chartData: Array.from({ length: 7 }, (_, i) => ({
      date: format(subDays(new Date(), 6 - i), 'MMM dd'),
      value: Math.floor(Math.random() * 300) + 1000
    }))
  },
  { 
    title: 'Active Projects', 
    value: '42', 
    growth: '+2', 
    period: 'new this week',
    icon: Briefcase,
    chartData: Array.from({ length: 7 }, (_, i) => ({
      date: format(subDays(new Date(), 6 - i), 'MMM dd'),
      value: Math.floor(Math.random() * 10) + 35
    }))
  },
  { 
    title: 'Announcements', 
    value: '7', 
    subtext: '3 unread',
    icon: Bell,
    priority: 'high',
    notifications: [
      { title: 'System Maintenance', time: 'Tomorrow at 2 AM' },
      { title: 'New Feature Release', time: 'Next Week' },
      { title: 'Team Meeting', time: 'Today at 4 PM' }
    ]
  },
  { 
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
  },
]

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
  },
].map(activity => ({
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
})) 