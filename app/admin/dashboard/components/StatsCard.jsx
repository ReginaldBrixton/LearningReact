import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts'
import { memo, useState, useEffect, useCallback, useRef } from 'react'
import { Bell, ChevronLeft, ChevronRight, Pause, Play, Volume2, VolumeX } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { useInView } from 'react-intersection-observer'

// ============= SECTION 1: CARD STYLING & APPEARANCE =============
const CardStyling = {
  // Helper function to determine border color based on card status
  getBorderColor: (card) => {
    if (card.priority === 'high') return '#ef4444'
    if (card.status === 'healthy') return '#22c55e'
    return '#e2e8f0'
  },

  // Helper function to render growth information with improved styling
  renderGrowthInfo: (card) => {
    if (!card.growth) return null

    const isPositive = parseFloat(card.growth) > 0
    return (
      <div className="flex items-center gap-2 mt-1">
        <p className={cn(
          "text-sm font-medium flex items-center gap-1 px-2 py-0.5 rounded-full",
          isPositive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
        )}>
          {isPositive ? '↑' : '↓'} {card.growth}
        </p>
        <span className="text-gray-500 text-xs">{card.period}</span>
      </div>
    )
  }
}

// ============= SECTION 2: CHART VISUALIZATION =============
const ChartComponent = {
  // Enhanced chart component with improved tooltips and interactions
  renderChart: (card, index) => {
    if (!card.chartData) return null

    return (
      <div className="h-[80px] mt-4 group">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={card.chartData}>
            <defs>
              <linearGradient id={`gradient${index}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#818cf8" stopOpacity={0.8}/>
                <stop offset="100%" stopColor="#818cf8" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="#818cf8"
              fill={`url(#gradient${index})`}
              strokeWidth={2}
              isAnimationActive={true}
              className="transition-all duration-300 group-hover:opacity-90"
            />
            <Tooltip 
              content={({ active, payload }) => {
                if (active && payload?.[0]) {
                  return (
                    <div className="bg-white dark:bg-gray-800 p-3 shadow-xl rounded-lg border border-indigo-100 dark:border-indigo-800">
                      <div className="font-medium text-indigo-600 dark:text-indigo-400">{payload[0].payload.date}</div>
                      <div className="text-lg font-bold mt-1">{payload[0].value}</div>
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
}

// ============= SECTION 3: METRICS DISPLAY =============
const MetricsComponent = {
  // Enhanced metrics display with animations
  renderMetrics: (card) => {
    if (!card.metrics) return null

    return (
      <div className="mt-4 space-y-3">
        {card.metrics.map((metric, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center justify-between gap-4 group"
          >
            <span className="text-sm text-gray-600 dark:text-gray-300 min-w-[80px] font-medium">{metric.name}</span>
            <div className="flex-1">
              <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: metric.value }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full bg-indigo-500 rounded-full group-hover:bg-indigo-600"
                />
              </div>
            </div>
            <span className="text-sm font-semibold min-w-[50px] text-right text-indigo-600 dark:text-indigo-400">{metric.value}</span>
          </motion.div>
        ))}
      </div>
    )
  }
}

// ============= SECTION 4: NOTIFICATIONS =============
const NotificationsDisplay = memo(({ notifications }) => {
  const [currentNotificationIndex, setCurrentNotificationIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
  const { ref, inView } = useInView({
    threshold: 0.5,
  })

  const speakNotification = useCallback((text) => {
    if (isMuted || !window.speechSynthesis) return
    const utterance = new SpeechSynthesisUtterance(text)
    window.speechSynthesis.speak(utterance)
  }, [isMuted])

  useEffect(() => {
    if (!inView || isPaused) return
    
    const interval = setInterval(() => {
      setCurrentNotificationIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % notifications.length
        speakNotification(notifications[nextIndex].title)
        return nextIndex
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [notifications, isPaused, inView, speakNotification])

  const handlePrevious = () => {
    setCurrentNotificationIndex((prev) => {
      const newIndex = (prev - 1 + notifications.length) % notifications.length
      speakNotification(notifications[newIndex].title)
      return newIndex
    })
  }

  const handleNext = () => {
    setCurrentNotificationIndex((prev) => {
      const newIndex = (prev + 1) % notifications.length
      speakNotification(notifications[newIndex].title)
      return newIndex
    })
  }

  const handleKeyPress = useCallback((e) => {
    if (e.key === 'ArrowLeft') handlePrevious()
    if (e.key === 'ArrowRight') handleNext()
    if (e.key === ' ') setIsPaused(p => !p)
  }, [])

  useEffect(() => {
    if (isHovered) {
      window.addEventListener('keydown', handleKeyPress)
      return () => window.removeEventListener('keydown', handleKeyPress)
    }
  }, [isHovered, handleKeyPress])

  if (!notifications || notifications.length === 0) return null

  const notification = notifications[currentNotificationIndex]
  const priority = notification?.priority || 'normal'

  return (
    <div 
      ref={ref}
      className="mt-6 relative rounded-xl bg-white dark:bg-gray-900 shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-2">
          <span className={cn(
            "px-2 py-1 text-xs font-semibold rounded-full uppercase",
            priority === 'high' ? 'bg-red-100 text-red-700' : 
            priority === 'normal' ? 'bg-blue-100 text-blue-700' :
            'bg-gray-100 text-gray-700'
          )}>
            {priority}
          </span>
          <span className="text-sm text-gray-500">
            {currentNotificationIndex + 1} of {notifications.length}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={handlePrevious}
            className="h-8 w-8"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsPaused(!isPaused)}
            className="h-8 w-8"
          >
            {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
          </Button>
          <Button
            variant="ghost"
            size="sm" 
            onClick={handleNext}
            className="h-8 w-8"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start gap-4">
          <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-lg">
            <Bell className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </div>
          <div>
            <h3 className="font-medium text-gray-900 dark:text-gray-100">
              {notification.title}
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              {notification.time}
            </p>
          </div>
        </div>
      </div>

      <div className="h-1 bg-gray-100 dark:bg-gray-800">
        <motion.div 
          className={cn(
            "h-full transition-colors",
            priority === 'high' ? 'bg-red-500' : 
            priority === 'normal' ? 'bg-blue-500' : 
            'bg-gray-500'
          )}
          initial={{ width: 0 }}
          animate={{ 
            width: `${((currentNotificationIndex + 1) / notifications.length) * 100}%` 
          }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </div>
  )
})

// ============= SECTION 5: MAIN SECTION: STATS CARD =============
// Main StatsCard component that combines all sections
const StatsCard = memo(function StatsCard({ card, index }) {
  const IconComponent = card.icon
  
  return (
    <Card 
      className="hover:shadow-lg transition-all duration-300 border-l-4 hover:scale-[1.02] group"
      style={{ borderLeftColor: CardStyling.getBorderColor(card) }}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold group-hover:text-indigo-600 transition-colors">
          {card.title}
        </CardTitle>
        <IconComponent className={cn(
          "h-5 w-5 transition-colors duration-300",
          card.priority === 'high' ? 'text-red-500 group-hover:text-red-600' : 'text-gray-500 group-hover:text-gray-600',
          card.status === 'healthy' ? 'text-green-500 group-hover:text-green-600' : ''
        )} />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">{card.value}</div>
        
        {CardStyling.renderGrowthInfo(card)}
        {ChartComponent.renderChart(card, index)}
        {MetricsComponent.renderMetrics(card)}
        
        {card.notifications && (
          <NotificationsDisplay notifications={card.notifications} />
        )}
      </CardContent>
    </Card>
  )
})

// ============= SECTION 6: ANNOUNCEMENTS =============
const AnnouncementsCard = memo(function AnnouncementsCard({ card, index }) {
  return (
    <StatsCard card={card} index={index} />
  )
})

// ============= SECTION 7: TOTAL USERS =============
const TotalUsersCard = memo(function TotalUsersCard({ card, index }) {
  return (
    <StatsCard card={card} index={index} />
  )
})

// ============= SECTION 8: ACTIVE PROJECTS =============
const ActiveProjectsCard = memo(function ActiveProjectsCard({ card, index }) {
  return (
    <StatsCard card={card} index={index} />
  )
})

// ============= SECTION 9: SYSTEM HEALTH =============
const SystemHealthCard = memo(function SystemHealthCard({ card, index }) {
  return (
    <StatsCard card={card} index={index} />
  )
})

export { StatsCard, AnnouncementsCard, TotalUsersCard, ActiveProjectsCard, SystemHealthCard }