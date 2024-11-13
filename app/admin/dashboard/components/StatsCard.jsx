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
    }, 5000)

    return () => clearInterval(interval)
  }, [notifications])

  if (!notifications || notifications.length === 0) return null

  const getNotificationIndices = () => {
    const prev = (currentNotificationIndex - 1 + notifications.length) % notifications.length
    const next = (currentNotificationIndex + 1) % notifications.length
    return [prev, currentNotificationIndex, next]
  }

  const [prev, current, next] = getNotificationIndices()

  return (
    <div className="mt-6 relative h-[180px] overflow-hidden rounded-xl bg-white dark:bg-gray-900 shadow-lg border-2 border-indigo-100 dark:border-indigo-800">
      {/* Header section */}
      <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-r from-indigo-50 to-white dark:from-indigo-950 dark:to-gray-900 border-b border-indigo-100 dark:border-indigo-800">
        <div className="flex justify-between items-center">
          <span className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            {/* <Bell className="h-4 w-4 text-indigo-600 dark:text-indigo-400" /> */}
            {/* Announcements */}
          </span>
          <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/50 px-3 py-1 rounded-full">
            {currentNotificationIndex + 1} / {notifications.length}
          </span>
        </div>
      </div>
      
      <AnimatePresence mode="popLayout">
        <div className="flex justify-center items-center gap-8 mt-[72px]">
          {[prev, current, next].map((index, i) => (
            <motion.div
              key={index}
              className={cn(
                "bg-white dark:bg-gray-800 p-5 rounded-xl absolute w-[35%] border",
                i === 1 
                  ? "z-20 shadow-lg border-indigo-200 dark:border-indigo-700" 
                  : "z-10 opacity-30 border-gray-100 dark:border-gray-700"
              )}
              initial={{ 
                y: i === 0 ? -100 : i === 2 ? 100 : 0,
                x: `${(i-1) * 110}%`,
                opacity: 0 
              }}
              animate={{ 
                y: 0,
                x: `${(i-1) * 110}%`,
                opacity: i === 1 ? 1 : 0.3,
                scale: i === 1 ? 1.1 : 0.85
              }}
              exit={{ 
                y: i === 0 ? 100 : i === 2 ? -100 : 0,
                opacity: 0
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <div className="flex flex-col gap-3">
                <div className="bg-indigo-50 dark:bg-indigo-900/30 p-2.5 rounded-lg w-fit">
                  <Bell className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100 leading-snug">
                    {notifications[index].title}
                  </p>
                  <p className="text-xs text-indigo-600 dark:text-indigo-400 mt-1.5 font-medium">
                    {notifications[index].time}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </AnimatePresence>
    </div>
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