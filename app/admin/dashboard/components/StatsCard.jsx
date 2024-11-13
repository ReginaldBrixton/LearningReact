import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts'
import { memo, useState, useEffect } from 'react'
import { Bell } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

// Helper function to determine border color based on card status
const getBorderColor = (card) => {
  if (card.priority === 'high') return '#ef4444'
  if (card.status === 'healthy') return '#22c55e'
  return '#e2e8f0'
}

// Helper function to render growth information
const renderGrowthInfo = (card) => {
  if (!card.growth) return null

  const isPositive = parseFloat(card.growth) > 0
  return (
    <p className={cn(
      "text-sm font-medium flex items-center gap-1",
      isPositive ? 'text-green-600' : 'text-red-600'
    )}>
      {isPositive ? '↑' : '↓'} {card.growth} 
      <span className="text-gray-500 text-xs ml-1">({card.period})</span>
    </p>
  )
}

// Helper function to render chart
const renderChart = (card, index) => {
  if (!card.chartData) return null

  return (
    <div className="h-[80px] mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={card.chartData}>
          <defs>
            <linearGradient id={`gradient${index}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366f1" stopOpacity={0.8}/>
              <stop offset="100%" stopColor="#6366f1" stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          <Area 
            type="monotone" 
            dataKey="value" 
            stroke="#6366f1" 
            fill={`url(#gradient${index})`}
            strokeWidth={2}
            isAnimationActive={false}
          />
          <Tooltip 
            content={({ active, payload }) => {
              if (active && payload?.[0]) {
                return (
                  <div className="bg-white dark:bg-gray-800 p-2 shadow-lg rounded-lg border text-sm">
                    <div className="font-medium">{payload[0].payload.date}</div>
                    <div className="text-indigo-600">{payload[0].value}</div>
                  </div>
                )
              }
              return null
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

// Helper function to render metrics
const renderMetrics = (card) => {
  if (!card.metrics) return null

  return (
    <div className="mt-4 space-y-3">
      {card.metrics.map((metric, i) => (
        <div key={i} className="flex items-center justify-between gap-4">
          <span className="text-sm text-gray-600 dark:text-gray-300 min-w-[80px]">{metric.name}</span>
          <div className="flex-1">
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                style={{ width: metric.value }}
              />
            </div>
          </div>
          <span className="text-sm font-medium min-w-[50px] text-right">{metric.value}</span>
        </div>
      ))}
    </div>
  )
}

// Notifications component
const NotificationsDisplay = memo(({ notifications }) => {
  const [currentNotificationIndex, setCurrentNotificationIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNotificationIndex((prevIndex) => 
        (prevIndex + 1) % notifications.length
      )
    }, 5000) // Change notification every 5 seconds

    return () => clearInterval(interval)
  }, [notifications])

  if (!notifications || notifications.length === 0) return null

  const currentNotification = notifications[currentNotificationIndex]

  return (
    <motion.div 
      key={currentNotificationIndex}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="mt-4 bg-gray-100 dark:bg-gray-800 p-3 rounded-lg"
    >
      <div className="flex items-center gap-3">
        <Bell className="h-5 w-5 text-indigo-600" />
        <div>
          <p className="text-sm font-medium">{currentNotification.title}</p>
          <p className="text-xs text-gray-500">{currentNotification.time}</p>
        </div>
      </div>
    </motion.div>
  )
})

// Main StatsCard component
const StatsCard = memo(function StatsCard({ card, index }) {
  // Extract the icon component from the card data
  const IconComponent = card.icon
  
  return (
    <Card 
      className="hover:shadow-lg transition-all duration-300 border-l-4 hover:scale-[1.02]" 
      style={{ borderLeftColor: getBorderColor(card) }}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          {card.title}
        </CardTitle>
        <IconComponent className={cn(
          "h-5 w-5",
          card.priority === 'high' ? 'text-red-500' : 'text-gray-500',
          card.status === 'healthy' ? 'text-green-500' : ''
        )} />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold mb-2">{card.value}</div>
        
        {renderGrowthInfo(card)}
        {renderChart(card, index)}
        {renderMetrics(card)}
        
        {card.notifications && (
          <NotificationsDisplay notifications={card.notifications} />
        )}
      </CardContent>
    </Card>
  )
})

export { StatsCard }