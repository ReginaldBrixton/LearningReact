'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { ChevronDown, ChevronUp, MoreHorizontal, Plus, Search, ArrowUpDown } from 'lucide-react'

// Mock data
const initialSupervisors = [
  { id: 1, name: 'John Doe', email: 'john@example.com', department: 'Sales', teamSize: 8, performanceScore: 92 },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', department: 'Marketing', teamSize: 6, performanceScore: 88 },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', department: 'Engineering', teamSize: 10, performanceScore: 95 },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', department: 'Customer Support', teamSize: 12, performanceScore: 90 },
  { id: 5, name: 'Charlie Davis', email: 'charlie@example.com', department: 'Human Resources', teamSize: 5, performanceScore: 87 },
]

const teamMembers = [
  { id: 1, name: 'Team Member 1', role: 'Developer', supervisorId: 3 },
  { id: 2, name: 'Team Member 2', role: 'Designer', supervisorId: 2 },
  { id: 3, name: 'Team Member 3', role: 'Sales Rep', supervisorId: 1 },
  { id: 4, name: 'Team Member 4', role: 'Support Agent', supervisorId: 4 },
  { id: 5, name: 'Team Member 5', role: 'HR Specialist', supervisorId: 5 },
]

const getPerformanceLabel = (score) => {
  if (score >= 90) return 'Excellent'
  if (score >= 80) return 'Very Good'
  if (score >= 70) return 'Good'
  if (score >= 60) return 'Satisfactory'
  return 'Needs Improvement'
}

const SupervisorForm = ({ supervisor, onSubmit }) => {
  const [formData, setFormData] = useState(supervisor || { name: '', email: '', department: '', teamSize: 0, performanceScore: 0 })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="col-span-3"
            required
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="email" className="text-right">Email</Label>
          <Input
            id="email"
            type="email" 
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="col-span-3"
            required
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="department" className="text-right">Department</Label>
          <Input
            id="department"
            value={formData.department}
            onChange={(e) => setFormData({ ...formData, department: e.target.value })}
            className="col-span-3"
            required
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="teamSize" className="text-right">Team Size</Label>
          <Input
            id="teamSize"
            type="number"
            value={formData.teamSize}
            onChange={(e) => setFormData({ ...formData, teamSize: parseInt(e.target.value) })}
            className="col-span-3"
            required
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="performanceScore" className="text-right">Performance Score</Label>
          <Input
            id="performanceScore"
            type="number"
            value={formData.performanceScore}
            onChange={(e) => setFormData({ ...formData, performanceScore: parseInt(e.target.value) })}
            className="col-span-3"
            required
            min="0"
            max="100"
          />
        </div>
      </div>
      <DialogFooter>
        <Button type="submit">{supervisor ? 'Update Supervisor' : 'Add Supervisor'}</Button>
      </DialogFooter>
    </form>
  )
}

const SupervisorDetails = ({ supervisor, onClose, teamMembers }) => {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Supervisor Details</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <Card>
              <CardHeader>
                <CardTitle>Supervisor Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${supervisor.name}`} alt={supervisor.name} />
                    <AvatarFallback>{supervisor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-2xl font-semibold">{supervisor.name}</h3>
                    <p className="text-sm text-gray-500">{supervisor.email}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div>
                    <h4 className="font-semibold">Department</h4>
                    <p>{supervisor.department}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Team Size</h4>
                    <p>{supervisor.teamSize} members</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Performance Score</h4>
                    <div className="flex items-center">
                      <Progress value={supervisor.performanceScore} className="w-[60px] mr-2" />
                      <span>{supervisor.performanceScore}%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="team">
            <Card>
              <CardHeader>
                <CardTitle>Team Members</CardTitle>
                <CardDescription>Manage and view team members under this supervisor.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Role</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {teamMembers.map((member) => (
                      <TableRow key={member.id}>
                        <TableCell className="font-medium">{member.name}</TableCell>
                        <TableCell>{member.role}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="performance">
            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
                <CardDescription>View detailed performance metrics for this supervisor.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Overall Performance</h4>
                    <Progress value={supervisor.performanceScore} className="w-full h-4" />
                    <p className="text-sm text-gray-500 mt-1">{supervisor.performanceScore}% - {getPerformanceLabel(supervisor.performanceScore)}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Key Performance Indicators</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">Team Productivity</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">{Math.round(supervisor.performanceScore * 0.9)}%</div>
                          <p className="text-xs text-muted-foreground">+2% from last month</p>
                          <Progress value={supervisor.performanceScore * 0.9} className="mt-2" />
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">Employee Satisfaction</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">{Math.round(supervisor.performanceScore * 0.85)}%</div>
                          <p className="text-xs text-muted-foreground">+5% from last quarter</p>
                          <Progress value={supervisor.performanceScore * 0.85} className="mt-2" />
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">Project Completion Rate</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">{Math.round(supervisor.performanceScore * 0.95)}%</div>
                          <p className="text-xs text-muted-foreground">On track</p>
                          <Progress value={supervisor.performanceScore * 0.95} className="mt-2" />
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">Budget Adherence</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">{Math.round(supervisor.performanceScore * 0.88)}%</div>
                          <p className="text-xs text-muted-foreground">Within allocated budget</p>
                          <Progress value={supervisor.performanceScore * 0.88} className="mt-2" />
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

const SupervisorManagement = () => {
  const [supervisors, setSupervisors] = useState(initialSupervisors)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortConfig, setSortConfig] = useState(null)
  const [selectedSupervisor, setSelectedSupervisor] = useState(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [supervisorToDelete, setSupervisorToDelete] = useState(null)
  const [selectedDepartments, setSelectedDepartments] = useState([])

  const departments = Array.from(new Set(supervisors.map(s => s.department)))

  const filteredSupervisors = supervisors.filter(supervisor =>
    (supervisor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supervisor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supervisor.department.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedDepartments.length === 0 || selectedDepartments.includes(supervisor.department))
  )

  const sortedSupervisors = sortConfig !== null
    ? [...filteredSupervisors].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1
        }
        return 0
      })
    : filteredSupervisors

  const handleSort = (key) => {
    let direction = 'ascending'
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending'
    }
    setSortConfig({ key, direction })
  }

  const handleAddOrEditSupervisor = (supervisor) => {
    if (supervisor.id) {
      setSupervisors(supervisors.map(s => s.id === supervisor.id ? supervisor : s))
      alert(`${supervisor.name}'s information has been updated successfully.`)
    } else {
      const newSupervisor = { ...supervisor, id: supervisors.length + 1 }
      setSupervisors([...supervisors, newSupervisor])
      alert(`${newSupervisor.name} has been added as a new supervisor.`)
    }
    setIsFormOpen(false)
    setSelectedSupervisor(null)
  }

  const handleDeleteSupervisor = () => {
    if (supervisorToDelete) {
      setSupervisors(supervisors.filter(s => s.id !== supervisorToDelete))
      alert("The supervisor has been removed from the system.")
      setSupervisorToDelete(null)
    }
  }

  const handleDepartmentFilter = (department) => {
    setSelectedDepartments(prev =>
      prev.includes(department)
        ? prev.filter(d => d !== department)
        : [...prev, department]
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Supervisor Management</h1>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
        <div className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-4">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search supervisors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 w-64"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Filter by Department <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {departments.map(department => (
                <DropdownMenuItem key={department} onSelect={() => handleDepartmentFilter(department)}>
                  <Checkbox
                    checked={selectedDepartments.includes(department)}
                    onCheckedChange={() => handleDepartmentFilter(department)}
                  />
                  <span className="ml-2">{department}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setSelectedSupervisor(null)}>
              <Plus className="mr-2 h-4 w-4" /> Add Supervisor
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedSupervisor ? 'Edit Supervisor' : 'Add New Supervisor'}</DialogTitle>
              <DialogDescription>
                Enter the details of the supervisor below.
              </DialogDescription>
            </DialogHeader>
            <SupervisorForm supervisor={selectedSupervisor} onSubmit={handleAddOrEditSupervisor} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead onClick={() => handleSort('name')} className="cursor-pointer">
                Name <ArrowUpDown className="ml-2 h-4 w-4 inline" />
              </TableHead>
              <TableHead>Email</TableHead>
              <TableHead onClick={() => handleSort('department')} className="cursor-pointer">
                Department <ArrowUpDown className="ml-2 h-4 w-4 inline" />
              </TableHead>
              <TableHead onClick={() => handleSort('teamSize')} className="cursor-pointer">
                Team Size <ArrowUpDown className="ml-2 h-4 w-4 inline" />
              </TableHead>
              <TableHead onClick={() => handleSort('performanceScore')} className="cursor-pointer">
                Performance <ArrowUpDown className="ml-2 h-4 w-4 inline" />
              </TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedSupervisors.map((supervisor) => (
              <TableRow key={supervisor.id}>
                <TableCell className="font-medium">{supervisor.name}</TableCell>
                <TableCell>{supervisor.email}</TableCell>
                <TableCell>{supervisor.department}</TableCell>
                <TableCell>{supervisor.teamSize}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Progress value={supervisor.performanceScore} className="w-[60px] mr-2" />
                    <span>{supervisor.performanceScore}%</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => {
                        setSelectedSupervisor(supervisor)
                        setIsFormOpen(true)
                      }}>
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSelectedSupervisor(supervisor)}>
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        onClick={() => setSupervisorToDelete(supervisor.id)} 
                        className="text-red-600"
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {selectedSupervisor && (
        <SupervisorDetails 
          supervisor={selectedSupervisor} 
          onClose={() => setSelectedSupervisor(null)}
          teamMembers={teamMembers.filter(member => member.supervisorId === selectedSupervisor.id)}
        />
      )}

      <AlertDialog open={!!supervisorToDelete} onOpenChange={() => setSupervisorToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this supervisor?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the supervisor's account and remove their data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteSupervisor} className="bg-red-600 focus:ring-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default SupervisorManagement