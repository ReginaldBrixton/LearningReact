"use client"

import React, { useState } from 'react'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import { 
  Search, 
  Filter, 
  RefreshCw, 
  Eye, 
  Download, 
  ChevronDown,
  Archive,
  Calendar,
  Tag,
  Building,
  ArrowUpRight,
  Loader2
} from 'lucide-react'
import { format } from 'date-fns'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

const ArchivedProject = {
  id: '',
  title: '',
  completionDate: '',
  status: '',
  department: '',
  description: '',
  supervisor: '',
  score: 0
}

const fetchArchivedProjects = async () => {
  // This would be replaced with an actual API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: '1', title: 'AI-Powered Smart Home', completionDate: '2023-05-15', status: 'Completed', department: 'Computer Science', description: 'A project focused on developing an AI system for smart home automation.', supervisor: 'Dr. Alan Turing', score: 95 },
        { id: '2', title: 'Sustainable Urban Planning', completionDate: '2023-06-20', status: 'Completed', department: 'Urban Studies', description: 'A comprehensive study on sustainable urban development strategies.', supervisor: 'Prof. Jane Jacobs', score: 88 },
        { id: '3', title: 'Quantum Computing Applications', completionDate: '2023-07-10', status: 'Completed', department: 'Physics', description: 'Exploring practical applications of quantum computing in various fields.', supervisor: 'Dr. Richard Feynman', score: 92 },
        { id: '4', title: 'Renewable Energy Solutions', completionDate: '2023-08-05', status: 'Completed', department: 'Environmental Science', description: 'Developing innovative solutions for renewable energy generation and storage.', supervisor: 'Dr. Wangari Maathai', score: 90 },
        { id: '5', title: 'Blockchain in Healthcare', completionDate: '2023-09-01', status: 'Completed', department: 'Health Informatics', description: 'Implementing blockchain technology to improve healthcare data management and security.', supervisor: 'Dr. Elizabeth Blackwell', score: 87 },
        { id: '6', title: 'Nanotechnology in Medicine', completionDate: '2023-10-12', status: 'Completed', department: 'Biomedical Engineering', description: 'Exploring the use of nanotechnology for targeted drug delivery and disease treatment.', supervisor: 'Dr. Robert Langer', score: 94 },
        { id: '7', title: 'Machine Learning for Climate Prediction', completionDate: '2023-11-25', status: 'Completed', department: 'Earth Sciences', description: 'Utilizing machine learning algorithms to improve long-term climate predictions.', supervisor: 'Dr. Syukuro Manabe', score: 91 },
        { id: '8', title: 'Augmented Reality in Education', completionDate: '2023-12-18', status: 'Completed', department: 'Education Technology', description: 'Developing AR applications to enhance learning experiences in classrooms.', supervisor: 'Dr. Sugata Mitra', score: 89 },
        { id: '9', title: 'Genetic Engineering for Crop Resilience', completionDate: '2024-01-30', status: 'Completed', department: 'Agricultural Science', description: 'Applying genetic engineering techniques to develop crops resistant to climate change effects.', supervisor: 'Dr. Norman Borlaug', score: 93 },
        { id: '10', title: 'Advanced Materials for Space Exploration', completionDate: '2024-02-28', status: 'Completed', department: 'Materials Science', description: 'Developing new materials to withstand extreme conditions in space exploration.', supervisor: 'Dr. Mae Jemison', score: 96 },
        { id: '11', title: 'Cybersecurity in IoT Devices', completionDate: '2024-03-15', status: 'Completed', department: 'Information Security', description: 'Enhancing security measures for Internet of Things (IoT) devices to prevent cyber attacks.', supervisor: 'Dr. Bruce Schneier', score: 88 },
        { id: '12', title: 'Behavioral Economics in Public Policy', completionDate: '2024-04-20', status: 'Completed', department: 'Economics', description: 'Applying behavioral economics principles to improve public policy effectiveness.', supervisor: 'Dr. Daniel Kahneman', score: 91 }
      ])
    }, 1000)
  })
}

function ArchivedProjectsContent() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterYear, setFilterYear] = useState('all')
  const [filterDepartment, setFilterDepartment] = useState('all')

  const { data: projects, isLoading, isError, refetch } = useQuery(
    'archivedProjects',
    fetchArchivedProjects
  )

  const filteredProjects = projects?.filter(project => 
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterYear === 'all' ? true : project.completionDate.startsWith(filterYear)) &&
    (filterDepartment === 'all' ? true : project.department === filterDepartment)
  )

  const handleRestore = (projectId) => {
    // Implement restore logic here
    console.log(`Restoring project with ID: ${projectId}`)
  }

  const handleExport = (format) => {
    // Implement export logic here
    console.log(`Exporting data in ${format} format`)
  }

  const getDepartmentColor = (department) => {
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

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600 dark:text-green-400'
    if (score >= 80) return 'text-blue-600 dark:text-blue-400'
    if (score >= 70) return 'text-yellow-600 dark:text-yellow-400'
    return 'text-red-600 dark:text-red-400'
  }

  if (isLoading) return (
    <div className="flex items-center justify-center h-64">
      <Loader2 className="h-12 w-12 animate-spin text-primary" />
    </div>
  )
  if (isError) return <div className="text-red-500 text-center py-8">Error fetching archived projects</div>

  return (
    <div className="container mx-auto p-4 space-y-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 min-h-screen">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white flex items-center">
          <Archive className="mr-2 text-primary" />
          Archived Projects
        </h1>
        <Button onClick={() => refetch()} className="bg-primary hover:bg-primary/90 text-white">
          <RefreshCw className="w-4 h-4 mr-2" />
          <span className="hidden sm:inline">Refresh</span>
        </Button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-primary focus:border-primary"
          />
        </div>
        <Select value={filterYear} onValueChange={setFilterYear}>
          <SelectTrigger className="w-full md:w-[180px] bg-white dark:bg-gray-700">
            <Calendar className="w-4 h-4 mr-2 text-primary" />
            <SelectValue placeholder="Filter by year" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Years</SelectItem>
            <SelectItem value="2023">2023</SelectItem>
            <SelectItem value="2022">2022</SelectItem>
            <SelectItem value="2021">2021</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterDepartment} onValueChange={setFilterDepartment}>
          <SelectTrigger className="w-full md:w-[180px] bg-white dark:bg-gray-700">
            <Building className="w-4 h-4 mr-2 text-primary" />
            <SelectValue placeholder="Filter by department" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Departments</SelectItem>
            <SelectItem value="Computer Science">Computer Science</SelectItem>
            <SelectItem value="Urban Studies">Urban Studies</SelectItem>
            <SelectItem value="Physics">Physics</SelectItem>
            <SelectItem value="Environmental Science">Environmental Science</SelectItem>
            <SelectItem value="Health Informatics">Health Informatics</SelectItem>
            <SelectItem value="Biomedical Engineering">Biomedical Engineering</SelectItem>
            <SelectItem value="Earth Sciences">Earth Sciences</SelectItem>
            <SelectItem value="Education Technology">Education Technology</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 dark:bg-gray-700">
              <TableHead className="font-semibold text-gray-600 dark:text-gray-200">Title</TableHead>
              <TableHead className="font-semibold text-gray-600 dark:text-gray-200 hidden md:table-cell">Completion Date</TableHead>
              <TableHead className="font-semibold text-gray-600 dark:text-gray-200 hidden sm:table-cell">Department</TableHead>
              <TableHead className="font-semibold text-gray-600 dark:text-gray-200 hidden lg:table-cell">Supervisor</TableHead>
              <TableHead className="font-semibold text-gray-600 dark:text-gray-200">Score</TableHead>
              <TableHead className="font-semibold text-gray-600 dark:text-gray-200">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProjects?.map((project) => (
              <TableRow key={project.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <TableCell className="font-medium text-gray-900 dark:text-gray-100">{project.title}</TableCell>
                <TableCell className="text-gray-600 dark:text-gray-300 hidden md:table-cell">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-primary" />
                    {format(new Date(project.completionDate), 'MMM d, yyyy')}
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <Badge className={`${getDepartmentColor(project.department)}`}>
                    {project.department}
                  </Badge>
                </TableCell>
                <TableCell className="text-gray-600 dark:text-gray-300 hidden lg:table-cell">{project.supervisor}</TableCell>
                <TableCell className={`font-semibold ${getScoreColor(project.score)}`}>{project.score}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="bg-primary/10 text-primary hover:bg-primary/20 dark:bg-primary/20 dark:hover:bg-primary/30">
                          <Eye className="w-4 h-4 sm:mr-2" />
                          <span className="hidden sm:inline">View</span>
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-white dark:bg-gray-800 max-w-3xl">
                        <DialogHeader>
                          <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">{project.title}</DialogTitle>
                          <DialogDescription className="text-gray-600 dark:text-gray-300">
                            Completed on {format(new Date(project.completionDate), 'MMMM d, yyyy')}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="mt-4 space-y-4">
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-gray-100">Description:</h4>
                            <p className="text-gray-600 dark:text-gray-300">{project.description}</p>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div>
                              <h4 className="font-semibold text-gray-900 dark:text-gray-100">Department:</h4>
                              <Badge className={`${getDepartmentColor(project.department)}`}>
                                {project.department}
                              </Badge>
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900  dark:text-gray-100">Status:</h4>
                              <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                                {project.status}
                              </Badge>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-gray-100">Supervisor:</h4>
                            <p className="text-gray-600 dark:text-gray-300">{project.supervisor}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-gray-100">Score:</h4>
                            <p className={`text-2xl font-bold ${getScoreColor(project.score)}`}>{project.score}</p>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button variant="outline" size="sm" onClick={() => handleRestore(project.id)} className="bg-amber-50 text-amber-600 hover:bg-amber-100 dark:bg-amber-900 dark:text-amber-100 dark:hover:bg-amber-800">
                      <RefreshCw className="w-4 h-4 sm:mr-2" />
                      <span className="hidden sm:inline">Restore</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Showing {filteredProjects?.length} of {projects?.length} archived projects
        </p>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200">
              <Download className="w-4 h-4 mr-2" />
              Export <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => handleExport('csv')} className="text-green-600 dark:text-green-400">
              <Download className="mr-2 h-4 w-4" />
              <span>Export as CSV</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleExport('pdf')} className="text-blue-600 dark:text-blue-400">
              <Download className="mr-2 h-4 w-4" />
              <span>Export as PDF</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

// Create a new QueryClient instance
const queryClient = new QueryClient()

// Wrap the component with QueryClientProvider
export default function ArchivedProjectsPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <ArchivedProjectsContent />
    </QueryClientProvider>
  )
}