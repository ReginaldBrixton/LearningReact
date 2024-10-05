'use client';
import React, { useState, useEffect } from 'react'
import { 
  ChevronDown, 
  ChevronUp, 
  Search, 
  Trophy, 
  TrendingUp, 
  TrendingDown, 
  Minus,
  Sun,
  Moon,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'

import { Button } from "./components/ui/button"
import { Input } from "./components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar"
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./components/ui/tooltip"
import { Switch } from "./components/ui/switch"
import { Progress } from "./components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs"

const students = [
  { id: 1, name: "Alice Johnson", avatar: "/avatars/alice.jpg", projectTitle: "AI-Powered Smart Home", scores: { proposal: 95, capstone1: 92, capstone2: 98 }, totalScore: 285, rank: 1, previousRank: 2, progress: 100 },
  { id: 2, name: "Bob Smith", avatar: "/avatars/bob.jpg", projectTitle: "Blockchain for Supply Chain", scores: { proposal: 90, capstone1: 88, capstone2: 95 }, totalScore: 273, rank: 2, previousRank: 1, progress: 100 },
  { id: 3, name: "Charlie Brown", avatar: "/avatars/charlie.jpg", projectTitle: "AR Navigation System", scores: { proposal: 88, capstone1: 90, capstone2: 92 }, totalScore: 270, rank: 3, previousRank: 4, progress: 100 },
  { id: 4, name: "Diana Miller", avatar: "/avatars/diana.jpg", projectTitle: "Eco-Friendly Packaging", scores: { proposal: 92, capstone1: 85, capstone2: 90 }, totalScore: 267, rank: 4, previousRank: 3, progress: 100 },
  { id: 5, name: "Ethan Davis", avatar: "/avatars/ethan.jpg", projectTitle: "ML for Medical Diagnosis", scores: { proposal: 85, capstone1: 88, capstone2: 91 }, totalScore: 264, rank: 5, previousRank: 6, progress: 100 },
  { id: 6, name: "Fiona Wilson", avatar: "/avatars/fiona.jpg", projectTitle: "Sustainable Energy Monitor", scores: { proposal: 87, capstone1: 84, capstone2: 89 }, totalScore: 260, rank: 6, previousRank: 5, progress: 100 },
  { id: 7, name: "George Taylor", avatar: "/avatars/george.jpg", projectTitle: "VR Educational Platform", scores: { proposal: 83, capstone1: 86, capstone2: 88 }, totalScore: 257, rank: 7, previousRank: 8, progress: 100 },
  { id: 8, name: "Hannah White", avatar: "/avatars/hannah.jpg", projectTitle: "IoT for Urban Farming", scores: { proposal: 86, capstone1: 82, capstone2: 87 }, totalScore: 255, rank: 8, previousRank: 7, progress: 100 },
  { id: 9, name: "Ian Black", avatar: "/avatars/ian.jpg", projectTitle: "Cybersecurity Toolkit", scores: { proposal: 84, capstone1: 83, capstone2: 86 }, totalScore: 253, rank: 9, previousRank: 10, progress: 100 },
  { id: 10, name: "Julia Green", avatar: "/avatars/julia.jpg", projectTitle: "Renewable Energy Optimizer", scores: { proposal: 82, capstone1: 85, capstone2: 84 }, totalScore: 251, rank: 10, previousRank: 9, progress: 100 },
]

const useScoreboardState = () => {
  const [sortColumn, setSortColumn] = useState('rank')
  const [sortDirection, setSortDirection] = useState('asc')
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [studentsPerPage] = useState(5)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [activeTab, setActiveTab] = useState('overall')

  return {
    sortColumn, setSortColumn,
    sortDirection, setSortDirection,
    searchTerm, setSearchTerm,
    currentPage, setCurrentPage,
    studentsPerPage,
    isDarkMode, setIsDarkMode,
    activeTab, setActiveTab
  }
}

const useFilterAndSort = (students, searchTerm, sortColumn, sortDirection) => {
  return students
    .filter(student => 
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.projectTitle.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortColumn === 'rank' || sortColumn === 'totalScore' || sortColumn === 'progress') {
        return sortDirection === 'asc' ? a[sortColumn] - b[sortColumn] : b[sortColumn] - a[sortColumn]
      } else {
        return sortDirection === 'asc' 
          ? a[sortColumn].localeCompare(b[sortColumn]) 
          : b[sortColumn].localeCompare(a[sortColumn]);
      }
    })
}

const getRankChangeIcon = (current, previous) => {
  if (current < previous) return <TrendingUp className="text-green-500" />;
  if (current > previous) return <TrendingDown className="text-red-500" />;
  return <Minus className="text-gray-500" />;
}

const SemesterProjectScoreboardComponent = () => {
  const {
    sortColumn, setSortColumn,
    sortDirection, setSortDirection,
    searchTerm, setSearchTerm,
    currentPage, setCurrentPage,
    studentsPerPage,
    isDarkMode, setIsDarkMode,
    activeTab, setActiveTab
  } = useScoreboardState()

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortColumn(column)
      setSortDirection('asc')
    }
  }

  const filteredAndSortedStudents = useFilterAndSort(students, searchTerm, sortColumn, sortDirection)

  // Pagination
  const indexOfLastStudent = currentPage * studentsPerPage
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage
  const currentStudents = filteredAndSortedStudents.slice(indexOfFirstStudent, indexOfLastStudent)
  const totalPages = Math.ceil(filteredAndSortedStudents.length / studentsPerPage)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <div className={`container mx-auto p-4 space-y-4 ${isDarkMode ? 'dark' : ''}`}>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-primary">Semester Project Scoreboard</h1>
        <div className="flex items-center space-x-2">
          <Sun className="h-4 w-4 text-primary" />
          <Switch
            checked={isDarkMode}
            onCheckedChange={setIsDarkMode}
            aria-label="Toggle dark mode" />
          <Moon className="h-4 w-4 text-primary" />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="relative w-full sm:w-64">
          <Search
            className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search students or projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8" />
        </div>
      </div>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overall">Overall</TabsTrigger>
          <TabsTrigger value="proposal">Proposal</TabsTrigger>
          <TabsTrigger value="capstone1">Capstone 1</TabsTrigger>
          <TabsTrigger value="capstone2">Capstone 2</TabsTrigger>
        </TabsList>
        <TabsContent value="overall">
          <div className="rounded-md border border-border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">
                    <Button variant="ghost" onClick={() => handleSort('rank')} className="font-bold">
                      Rank
                      {sortColumn === 'rank' && (sortDirection === 'asc' ? <ChevronUp className="ml-2" /> : <ChevronDown className="ml-2" />)}
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button variant="ghost" onClick={() => handleSort('name')} className="font-bold">
                      Name
                      {sortColumn === 'name' && (sortDirection === 'asc' ? <ChevronUp className="ml-2" /> : <ChevronDown className="ml-2" />)}
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      onClick={() => handleSort('projectTitle')}
                      className="font-bold">
                      Project Title
                      {sortColumn === 'projectTitle' && (sortDirection === 'asc' ? <ChevronUp className="ml-2" /> : <ChevronDown className="ml-2" />)}
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      onClick={() => handleSort('totalScore')}
                      className="font-bold">
                      Total Score
                      {sortColumn === 'totalScore' && (sortDirection === 'asc' ? <ChevronUp className="ml-2" /> : <ChevronDown className="ml-2" />)}
                    </Button>
                  </TableHead>
                  <TableHead>Change</TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      onClick={() => handleSort('progress')}
                      className="font-bold">
                      Progress
                      {sortColumn === 'progress' && (sortDirection === 'asc' ? <ChevronUp className="ml-2" /> : <ChevronDown className="ml-2" />)}
                    </Button>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {student.rank <= 3 && (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <Trophy
                                  className={`w-5 h-5 ${
                                    student.rank === 1 ? 'text-yellow-500' :
                                    student.rank === 2 ? 'text-gray-400' :
                                    'text-amber-600'
                                  }`} />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{
                                  student.rank === 1 ? 'Gold' :
                                  student.rank === 2 ? 'Silver' :
                                  'Bronze'
                                } Trophy</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                        {student.rank}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar>
                          <AvatarImage src={student.avatar} alt={student.name} />
                          <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        {student.name}
                      </div>
                    </TableCell>
                    <TableCell>{student.projectTitle}</TableCell>
                    <TableCell>{student.totalScore}</TableCell>
                    <TableCell>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            {getRankChangeIcon(student.rank, student.previousRank)}
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>
                              {student.rank < student.previousRank
                                ? `Up ${student.previousRank - student.rank} place(s)`
                                : student.rank > student.previousRank
                                ? `Down ${student.rank - student.previousRank} place(s)`
                                : 'No change'}
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                    <TableCell>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Progress value={student.progress} className="w-[60px]" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{student.progress}% Complete</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        <TabsContent value="proposal">
          <div className="rounded-md border border-border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Project Title</TableHead>
                  <TableHead>Proposal Score</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.projectTitle}</TableCell>
                    <TableCell>{student.scores.proposal}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        <TabsContent value="capstone1">
          <div className="rounded-md border border-border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Project Title</TableHead>
                  <TableHead>Capstone 1 Score</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.projectTitle}</TableCell>
                    <TableCell>{student.scores.capstone1}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        <TabsContent value="capstone2">
          <div className="rounded-md border border-border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Project Title</TableHead>
                  <TableHead>Capstone 2 Score</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.projectTitle}</TableCell>
                    <TableCell>{student.scores.capstone2}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <p className="text-sm text-muted-foreground">
          Showing {indexOfFirstStudent + 1} to {Math.min(indexOfLastStudent, filteredAndSortedStudents.length)} of {filteredAndSortedStudents.length} entries
        </p>
        <div className="flex space-x-2">
          <Button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            variant="outline"
            size="sm">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
            <Button
              key={number}
              onClick={() => paginate(number)}
              variant={currentPage === number ? "default" : "outline"}
              size="sm">
              {number}
            </Button>
          ))}
          <Button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            variant="outline"
            size="sm">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return <SemesterProjectScoreboardComponent />;
}