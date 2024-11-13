import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts'
import { memo } from 'react'

const StatsCard = memo(function StatsCard({ card, index }) {
  // Memoize color calculations
  const borderColor = card.priority === 'high' ? '#ef4444' : 
                     card.status === 'healthy' ? '#22c55e' : '#e2e8f0'
                     
  const IconComponent = card.icon
  
  return (
    <Card 
      className="hover:shadow-lg transition-all duration-300 border-l-4 hover:scale-[1.02]" 
      style={{ borderLeftColor: borderColor }}
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
        {card.growth && (
          <p className={cn(
            "text-sm font-medium flex items-center gap-1",
            parseFloat(card.growth) > 0 ? 'text-green-600' : 'text-red-600'
          )}>
            {parseFloat(card.growth) > 0 ? '↑' : '↓'} {card.growth} 
            <span className="text-gray-500 text-xs ml-1">({card.period})</span>
          </p>
        )}
        {card.chartData && (
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
        )}
        {card.metrics && (
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
        )}
      </CardContent>
    </Card>
  )
})

export { StatsCard }