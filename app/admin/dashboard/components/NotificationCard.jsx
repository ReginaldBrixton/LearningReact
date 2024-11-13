'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Bell, ChevronLeft, ChevronRight, Pause, Play, Filter, Search, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const initialAnnouncements = [
    { id: 1, title: "Critical Security Update", content: "Please update your systems immediately to address a critical vulnerability.", timing: "Action required within 24 hours", status: "Urgent", priority: 'high', category: 'Security' },
    { id: 2, title: "Performance Optimization", content: "We're rolling out performance improvements across our platform.", timing: "Scheduled for next week", priority: 'medium', category: 'Maintenance' },
    { id: 3, title: "Quarterly Business Review", content: "Join us for a comprehensive review of our Q2 performance and future strategies.", timing: "End of Q2", status: "5/6 completed", priority: 'medium', category: 'Business' },
    { id: 4, title: "New Feature: AI Assistant", content: "Introducing our new AI-powered assistant to help streamline your workflow.", timing: "Beta launch next month", priority: 'low', category: 'Product' },
    { id: 5, title: "System Maintenance", content: "Scheduled downtime for critical system upgrades. Please save your work in advance.", timing: "This weekend, 2-hour downtime expected", status: "Planned", priority: 'high', category: 'Maintenance' },
]

export default function AdvancedAnnouncementsCarousel() {
    const [announcements, setAnnouncements] = useState(initialAnnouncements)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isAutoPlay, setIsAutoPlay] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [filterPriority, setFilterPriority] = useState('all')
    const [filterCategory, setFilterCategory] = useState('all')
    const [showDetails, setShowDetails] = useState(false)
    const autoPlayRef = useRef()
    const [ref, inView] = useInView({
        threshold: 0.5,
    })

    const priorityColors = {
        low: 'bg-blue-100 text-blue-800',
        medium: 'bg-yellow-100 text-yellow-800',
        high: 'bg-red-100 text-red-800',
    }

    const filteredAnnouncements = announcements.filter(announcement =>
        (searchTerm === '' || announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) || announcement.content.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (filterPriority === 'all' || announcement.priority === filterPriority) &&
        (filterCategory === 'all' || announcement.category === filterCategory)
    )

    const resetAutoPlay = useCallback(() => {
        if (autoPlayRef.current) {
            clearInterval(autoPlayRef.current)
        }
        if (isAutoPlay && inView && filteredAnnouncements.length > 0) {
            autoPlayRef.current = setInterval(() => {
                setCurrentIndex((prev) => (prev + 1) % filteredAnnouncements.length)
            }, 5000)
        }
    }, [isAutoPlay, inView, filteredAnnouncements.length])

    useEffect(() => {
        resetAutoPlay()
        return () => {
            if (autoPlayRef.current) {
                clearInterval(autoPlayRef.current)
            }
        }
    }, [resetAutoPlay])

    useEffect(() => {
        if (currentIndex >= filteredAnnouncements.length && filteredAnnouncements.length > 0) {
            setCurrentIndex(0)
        }
    }, [filteredAnnouncements, currentIndex])

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + filteredAnnouncements.length) % filteredAnnouncements.length)
        setIsAutoPlay(false)
    }

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % filteredAnnouncements.length)
        setIsAutoPlay(false)
    }

    const toggleAutoPlay = () => {
        setIsAutoPlay((prev) => !prev)
    }

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value)
        setCurrentIndex(0)
    }

    const handlePriorityChange = (value) => {
        setFilterPriority(value)
        setCurrentIndex(0)
    }

    const handleCategoryChange = (value) => {
        setFilterCategory(value)
        setCurrentIndex(0)
    }

    const clearFilters = () => {
        setSearchTerm('')
        setFilterPriority('all')
        setFilterCategory('all')
        setCurrentIndex(0)
    }

    const categories = Array.from(new Set(announcements.map(a => a.category)))

    return (
        <Card className="w-full max-w-3xl bg-white shadow-xl rounded-xl overflow-hidden" ref={ref}>
            <CardHeader className="flex flex-col gap-4 p-6 bg-gradient-to-r from-purple-600 to-indigo-600">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Bell className="h-6 w-6 text-white" />
                        <h2 className="text-2xl font-semibold text-white">Announcements</h2>
                        <Badge variant="secondary" className="bg-white bg-opacity-20 text-white">
                            {filteredAnnouncements.length}
                        </Badge>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-white hover:bg-white hover:bg-opacity-10"
                        onClick={toggleAutoPlay}
                        aria-label={isAutoPlay ? "Pause autoplay" : "Start autoplay"}
                    >
                        {isAutoPlay ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </Button>
                </div>
                <div className="flex items-center gap-2">
                    <Input
                        type="text"
                        placeholder="Search announcements..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="flex-grow"
                    />
                    <Select value={filterPriority} onValueChange={handlePriorityChange}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Filter by priority" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Priorities</SelectItem>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select value={filterCategory} onValueChange={handleCategoryChange}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Filter by category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Categories</SelectItem>
                            {categories.map((category) => (
                                <SelectItem key={category} value={category}>{category}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Button variant="secondary" size="icon" onClick={clearFilters} aria-label="Clear filters">
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="p-6">
                <div className="relative h-[300px] overflow-hidden" aria-live="polite">
                    {filteredAnnouncements.length > 0 ? (
                        <AnimatePresence initial={false} custom={currentIndex}>
                            <motion.div
                                key={currentIndex}
                                custom={currentIndex}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -50 }}
                                transition={{ duration: 0.5 }}
                                className="absolute inset-0"
                            >
                                <Card className="h-full flex flex-col justify-between p-6 bg-gradient-to-br from-gray-50 to-white">
                                    <div>
                                        <div className="flex items-center justify-between mb-4">
                                            <Badge className={priorityColors[filteredAnnouncements[currentIndex].priority]}>
                                                {filteredAnnouncements[currentIndex].priority.toUpperCase()}
                                            </Badge>
                                            {filteredAnnouncements[currentIndex].status && (
                                                <Badge variant="outline">{filteredAnnouncements[currentIndex].status}</Badge>
                                            )}
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{filteredAnnouncements[currentIndex].title}</h3>
                                        <p className="text-lg text-gray-600 mb-2">{filteredAnnouncements[currentIndex].timing}</p>
                                        {showDetails && (
                                            <p className="text-gray-700">{filteredAnnouncements[currentIndex].content}</p>
                                        )}
                                    </div>
                                    <div className="flex justify-between items-center mt-4">
                                        <p className="text-sm text-gray-500">
                                            Announcement {currentIndex + 1} of {filteredAnnouncements.length}
                                        </p>
                                        <div className="flex gap-2">
                                            <Button variant="outline" size="icon" onClick={handlePrev} aria-label="Previous announcement">
                                                <ChevronLeft className="h-4 w-4" />
                                            </Button>
                                            <Button variant="outline" size="icon" onClick={handleNext} aria-label="Next announcement">
                                                <ChevronRight className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        </AnimatePresence>
                    ) : (
                        <div className="flex items-center justify-center h-full">
                            <p className="text-gray-500">No announcements match your criteria.</p>
                        </div>
                    )}
                </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center p-4 bg-gray-50">
                <div className="flex items-center space-x-2">
                    <Switch id="show-details" checked={showDetails} onCheckedChange={setShowDetails} />
                    <Label htmlFor="show-details">Show Details</Label>
                </div>
                <Button variant="outline" onClick={() => setAnnouncements([...announcements, {
                    id: announcements.length + 1,
                    title: "New Announcement",
                    content: "This is a new announcement.",
                    timing: "Just now",
                    priority: 'medium',
                    category: 'General'
                }])}>
                    Add New Announcement
                </Button>
            </CardFooter>
        </Card>
    )
}