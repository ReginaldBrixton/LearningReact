"use client"

import React, { useState } from 'react'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import { Download, ChevronDown, RefreshCw, Loader2, Calendar, ChevronLeft, ChevronRight } from 'lucide-react'
import { format } from 'date-fns'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { ArchivedHeader } from './components/ArchivedHeader'
import { ArchivedFilters } from './components/ArchivedFilters'
import { ProjectDetailsDialog } from './components/ProjectDetailsDialog'
import { fetchArchivedProjects } from './utils/api'
import { getDepartmentColor, getScoreColor } from './utils/styles'

function ProjectTableRow({ project, handleRestore }) {
  return (
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
          <ProjectDetailsDialog project={project} getDepartmentColor={getDepartmentColor} getScoreColor={getScoreColor} />
          <Button variant="outline" size="sm" onClick={() => handleRestore(project.id)} className="bg-amber-50 text-amber-600 hover:bg-amber-100 dark:bg-amber-900 dark:text-amber-100 dark:hover:bg-amber-800">
            <RefreshCw className="w-4 h-4 sm:mr-2" />
            <span className="hidden sm:inline">Restore</span>
          </Button>
        </div>
      </TableCell>
    </TableRow>
  )
}

function ExportDropdown({ handleExport }) {
  return (
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
  )
}

function ProjectsTable({ projects, handleRestore }) {
  return (
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
        {projects?.map((project) => (
          <ProjectTableRow key={project.id} project={project} handleRestore={handleRestore} />
        ))}
      </TableBody>
    </Table>
  )
}

function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="flex items-center justify-center space-x-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="h-4 w-4" />
        Previous
      </Button>
      <div className="text-sm text-gray-600 dark:text-gray-300">
        Page {currentPage} of {totalPages}
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}

function ArchivedProjectsContent() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterYear, setFilterYear] = useState('all')
  const [filterDepartment, setFilterDepartment] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const { data: projects, isLoading, isError, refetch } = useQuery(
    'archivedProjects',
    fetchArchivedProjects,
    {
      refetchOnWindowFocus: false, // Disable automatic refetch on window focus
    }
  )

  const filteredProjects = projects?.filter(project => 
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterYear === 'all' ? true : project.completionDate.startsWith(filterYear)) &&
    (filterDepartment === 'all' ? true : project.department === filterDepartment)
  )

  // Calculate pagination
  const totalPages = Math.ceil((filteredProjects?.length || 0) / itemsPerPage)
  const paginatedProjects = filteredProjects?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, filterYear, filterDepartment])

  const handleRestore = (projectId) => {
    console.log(`Restoring project with ID: ${projectId}`)
  }

  const handleExport = (format) => {
    console.log(`Exporting data in ${format} format`)
  }

  const handleRefresh = async () => {
    await refetch()
  }

  if (isLoading) return (
    <div className="flex items-center justify-center h-64">
      <Loader2 className="h-12 w-12 animate-spin text-primary" />
    </div>
  )
  if (isError) return <div className="text-red-500 text-center py-8">Error fetching archived projects</div>

  return (
    <div className="container mx-auto p-4 space-y-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 min-h-screen">
      <ArchivedHeader onRefresh={handleRefresh} />
      
      <ArchivedFilters 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterYear={filterYear}
        setFilterYear={setFilterYear}
        filterDepartment={filterDepartment}
        setFilterDepartment={setFilterDepartment}
      />

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <ProjectsTable projects={paginatedProjects} handleRestore={handleRestore} />
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredProjects?.length)} of {filteredProjects?.length} archived projects
        </p>
        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
        <ExportDropdown handleExport={handleExport} />
      </div>
    </div>
  )
}

const queryClient = new QueryClient()

export default function ArchivedProjectsPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <ArchivedProjectsContent />
    </QueryClientProvider>
  )
}