'use client'

import { useState } from 'react'
import { Search, Filter, Download, AlertCircle, Info, CheckCircle, XCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const MOCK_LOGS = [
  {
    id: 1,
    timestamp: '2024-03-20 14:30:25',
    level: 'error',
    source: 'Authentication',
    message: 'Failed login attempt - Invalid credentials',
    user: 'unknown',
  },
  {
    id: 2,
    timestamp: '2024-03-20 14:28:15',
    level: 'info',
    source: 'User Management',
    message: 'New user account created',
    user: 'admin@example.com',
  },
  {
    id: 3,
    timestamp: '2024-03-20 14:25:10',
    level: 'warning',
    source: 'System',
    message: 'High CPU usage detected',
    user: 'system',
  },
  {
    id: 4,
    timestamp: '2024-03-20 14:20:05',
    level: 'success',
    source: 'Project Management',
    message: 'Project status updated successfully',
    user: 'supervisor@example.com',
  },
]

const LOG_LEVELS = ['all', 'info', 'warning', 'error', 'success']
const LOG_SOURCES = ['all', 'Authentication', 'User Management', 'System', 'Project Management']

export default function LogsPage() {
  const [logs, setLogs] = useState(MOCK_LOGS)
  const [searchQuery, setSearchQuery] = useState('')
  const [levelFilter, setLevelFilter] = useState('all')
  const [sourceFilter, setSourceFilter] = useState('all')

  const getLevelIcon = (level) => {
    switch (level) {
      case 'error':
        return <XCircle className="h-4 w-4 text-red-500" />
      case 'warning':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
      case 'info':
        return <Info className="h-4 w-4 text-blue-500" />
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      default:
        return null
    }
  }

  const getLevelClass = (level) => {
    switch (level) {
      case 'error':
        return 'bg-red-100 text-red-800'
      case 'warning':
        return 'bg-yellow-100 text-yellow-800'
      case 'info':
        return 'bg-blue-100 text-blue-800'
      case 'success':
        return 'bg-green-100 text-green-800'
      default:
        return ''
    }
  }

  const filteredLogs = logs.filter(log => {
    const matchesSearch = 
      log.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.user.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesLevel = levelFilter === 'all' || log.level === levelFilter
    const matchesSource = sourceFilter === 'all' || log.source === sourceFilter
    return matchesSearch && matchesLevel && matchesSource
  })

  const handleExport = () => {
    const csvContent = [
      ['Timestamp', 'Level', 'Source', 'Message', 'User'],
      ...filteredLogs.map(log => [
        log.timestamp,
        log.level,
        log.source,
        log.message,
        log.user
      ])
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `system-logs-${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">System Logs</h1>
        <Button onClick={handleExport}>
          <Download className="h-4 w-4 mr-2" />
          Export Logs
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search logs..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <Select value={levelFilter} onValueChange={setLevelFilter}>
          <SelectTrigger className="w-[180px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filter by level" />
          </SelectTrigger>
          <SelectContent>
            {LOG_LEVELS.map(level => (
              <SelectItem key={level} value={level}>
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={sourceFilter} onValueChange={setSourceFilter}>
          <SelectTrigger className="w-[180px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filter by source" />
          </SelectTrigger>
          <SelectContent>
            {LOG_SOURCES.map(source => (
              <SelectItem key={source} value={source}>
                {source}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Timestamp</TableHead>
              <TableHead>Level</TableHead>
              <TableHead>Source</TableHead>
              <TableHead className="w-full">Message</TableHead>
              <TableHead>User</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLogs.map((log) => (
              <TableRow key={log.id}>
                <TableCell className="font-mono text-sm">
                  {log.timestamp}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {getLevelIcon(log.level)}
                    <span className={`px-2 py-1 rounded-full text-xs ${getLevelClass(log.level)}`}>
                      {log.level.charAt(0).toUpperCase() + log.level.slice(1)}
                    </span>
                  </div>
                </TableCell>
                <TableCell>{log.source}</TableCell>
                <TableCell>{log.message}</TableCell>
                <TableCell className="text-sm">{log.user}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
} 