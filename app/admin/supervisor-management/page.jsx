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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ChevronDown, ChevronUp, MoreHorizontal, Plus, Search, ArrowUpDown, Download, Upload, Filter } from 'lucide-react'

// Mock data
const initialSupervisors = [
  { 
    id: 1, 
    name: 'John Doe', 
    email: 'john@example.com', 
    department: 'Sales', 
    teamSize: 8, 
    performanceScore: 92,
    status: 'Active',
    joinDate: '2022-01-15',
    notes: 'Excellent team leader with consistent results',
    certifications: ['Leadership 101', 'Sales Management'],
    lastReviewDate: '2023-06-15'
  },
  { 
    id: 2, 
    name: 'Jane Smith', 
    email: 'jane@example.com', 
    department: 'Marketing', 
    teamSize: 6, 
    performanceScore: 88,
    status: 'Active', 
    joinDate: '2022-03-20',
    notes: 'Strong communication skills, good team management',
    certifications: ['Marketing Strategy', 'Team Leadership'],
    lastReviewDate: '2023-07-01'
  },
  { 
    id: 3, 
    name: 'Bob Johnson', 
    email: 'bob@example.com', 
    department: 'Engineering', 
    teamSize: 10, 
    performanceScore: 95,
    status: 'Active',
    joinDate: '2021-11-30',
    notes: 'Technical expert, mentors team effectively',
    certifications: ['Technical Leadership', 'Agile Management'],
    lastReviewDate: '2023-05-15'
  },
  { 
    id: 4, 
    name: 'Alice Brown', 
    email: 'alice@example.com', 
    department: 'Customer Support', 
    teamSize: 12, 
    performanceScore: 90,
    status: 'On Leave',
    joinDate: '2022-02-10',
    notes: 'Customer-focused, builds strong team morale',
    certifications: ['Customer Service Leadership', 'Team Building'],
    lastReviewDate: '2023-06-30'
  },
  { 
    id: 5, 
    name: 'Charlie Davis', 
    email: 'charlie@example.com', 
    department: 'Human Resources', 
    teamSize: 5, 
    performanceScore: 87,
    status: 'Active',
    joinDate: '2022-04-05',
    notes: 'Strong HR background, good policy implementation',
    certifications: ['HR Management', 'Employment Law'],
    lastReviewDate: '2023-07-15'
  }
]

const teamMembers = [
  { 
    id: 1, 
    name: 'Team Member 1', 
    role: 'Developer', 
    supervisorId: 3,
    performance: 88,
    attendance: 95,
    projectsCompleted: 12,
    skills: ['React', 'Node.js'],
    status: 'Active',
    joinDate: '2022-06-15',
    lastReviewDate: '2023-05-01'
  },
  { 
    id: 2, 
    name: 'Team Member 2', 
    role: 'Designer', 
    supervisorId: 2,
    performance: 92,
    attendance: 98,
    projectsCompleted: 15,
    skills: ['UI/UX', 'Figma'],
    status: 'Active',
    joinDate: '2022-07-01',
    lastReviewDate: '2023-05-15'
  },
  { 
    id: 3, 
    name: 'Team Member 3', 
    role: 'Sales Rep', 
    supervisorId: 1,
    performance: 85,
    attendance: 90,
    projectsCompleted: 25,
    skills: ['Sales', 'Negotiation'],
    status: 'Active',
    joinDate: '2022-08-15',
    lastReviewDate: '2023-06-01'
  },
  { 
    id: 4, 
    name: 'Team Member 4', 
    role: 'Support Agent', 
    supervisorId: 4,
    performance: 90,
    attendance: 96,
    projectsCompleted: 150,
    skills: ['Customer Service', 'Problem Solving'],
    status: 'Active',
    joinDate: '2022-09-01',
    lastReviewDate: '2023-06-15'
  },
  { 
    id: 5, 
    name: 'Team Member 5', 
    role: 'HR Specialist', 
    supervisorId: 5,
    performance: 87,
    attendance: 93,
    projectsCompleted: 20,
    skills: ['Recruitment', 'Training'],
    status: 'Active',
    joinDate: '2022-10-01',
    lastReviewDate: '2023-07-01'
  }
]

const getPerformanceLabel = (score) => {
  if (score >= 90) return { label: 'Excellent', color: 'bg-green-500' }
  if (score >= 80) return { label: 'Very Good', color: 'bg-blue-500' }
  if (score >= 70) return { label: 'Good', color: 'bg-yellow-500' }
  if (score >= 60) return { label: 'Satisfactory', color: 'bg-orange-500' }
  return { label: 'Needs Improvement', color: 'bg-red-500' }
}

const SupervisorForm = ({ supervisor, onSubmit }) => {
  const [formData, setFormData] = useState(supervisor || {
    name: '',
    email: '',
    department: '',
    teamSize: 0,
    performanceScore: 0,
    status: 'Active',
    notes: '',
    certifications: [],
    joinDate: new Date().toISOString().split('T')[0],
    lastReviewDate: new Date().toISOString().split('T')[0]
  })

  const [certification, setCertification] = useState('')
  const [formError, setFormError] = useState('')

  const handleAddCertification = () => {
    if (certification) {
      setFormData({
        ...formData,
        certifications: [...formData.certifications, certification]
      })
      setCertification('')
    }
  }

  const handleRemoveCertification = (index) => {
    setFormData({
      ...formData,
      certifications: formData.certifications.filter((_, i) => i !== index)
    })
  }

  const validateForm = () => {
    if (!formData.name.trim()) return 'Name is required'
    if (!formData.email.trim()) return 'Email is required'
    if (!formData.department) return 'Department is required'
    if (formData.teamSize < 0) return 'Team size cannot be negative'
    if (formData.performanceScore < 0 || formData.performanceScore > 100) {
      return 'Performance score must be between 0 and 100'
    }
    return ''
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const error = validateForm()
    if (error) {
      setFormError(error)
      return
    }
    setFormError('')
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {formError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {formError}
        </div>
      )}
      
      <div className="grid gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="department">Department</Label>
            <Select 
              value={formData.department}
              onValueChange={(value) => setFormData({ ...formData, department: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Sales">Sales</SelectItem>
                <SelectItem value="Marketing">Marketing</SelectItem>
                <SelectItem value="Engineering">Engineering</SelectItem>
                <SelectItem value="Customer Support">Customer Support</SelectItem>
                <SelectItem value="Human Resources">Human Resources</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select 
              value={formData.status}
              onValueChange={(value) => setFormData({ ...formData, status: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="On Leave">On Leave</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="teamSize">Team Size</Label>
            <Input
              id="teamSize"
              type="number"
              value={formData.teamSize}
              onChange={(e) => setFormData({ ...formData, teamSize: parseInt(e.target.value) })}
              required
              min="0"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="performanceScore">Performance Score</Label>
            <Input
              id="performanceScore"
              type="number"
              value={formData.performanceScore}
              onChange={(e) => setFormData({ ...formData, performanceScore: parseInt(e.target.value) })}
              required
              min="0"
              max="100"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="joinDate">Join Date</Label>
            <Input
              id="joinDate"
              type="date"
              value={formData.joinDate}
              onChange={(e) => setFormData({ ...formData, joinDate: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastReviewDate">Last Review Date</Label>
            <Input
              id="lastReviewDate"
              type="date"
              value={formData.lastReviewDate}
              onChange={(e) => setFormData({ ...formData, lastReviewDate: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            placeholder="Add any additional notes..."
            className="h-20"
          />
        </div>

        <div className="space-y-2">
          <Label>Certifications</Label>
          <div className="flex gap-2">
            <Input
              value={certification}
              onChange={(e) => setCertification(e.target.value)}
              placeholder="Add certification"
            />
            <Button type="button" onClick={handleAddCertification}>Add</Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.certifications.map((cert, index) => (
              <Badge key={index} variant="secondary" className="flex items-center gap-2">
                {cert}
                <button
                  type="button"
                  onClick={() => handleRemoveCertification(index)}
                  className="text-xs hover:text-red-500"
                >
                  ×
                </button>
              </Badge>
            ))}
          </div>
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
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <Card>
              <CardHeader>
                <CardTitle>Supervisor Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${supervisor.name}`} alt={supervisor.name} />
                    <AvatarFallback>{supervisor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-2xl font-semibold">{supervisor.name}</h3>
                    <p className="text-sm text-gray-500">{supervisor.email}</p>
                    <Badge className={
                      supervisor.status === 'Active' ? 'bg-green-500' :
                      supervisor.status === 'On Leave' ? 'bg-yellow-500' :
                      'bg-red-500'
                    }>
                      {supervisor.status}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold">Department</h4>
                    <p>{supervisor.department}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Team Size</h4>
                    <p>{supervisor.teamSize} members</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Join Date</h4>
                    <p>{new Date(supervisor.joinDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Last Review</h4>
                    <p>{new Date(supervisor.lastReviewDate).toLocaleDateString()}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Certifications</h4>
                  <div className="flex flex-wrap gap-2">
                    {supervisor.certifications.map((cert, index) => (
                      <Badge key={index} variant="secondary">
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Notes</h4>
                  <p className="text-sm text-gray-600">{supervisor.notes}</p>
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
                      <TableHead>Performance</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Review</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {teamMembers.map((member) => (
                      <TableRow key={member.id}>
                        <TableCell className="font-medium">{member.name}</TableCell>
                        <TableCell>{member.role}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Progress value={member.performance} className="w-[60px] mr-2" />
                            <span>{member.performance}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{member.status}</Badge>
                        </TableCell>
                        <TableCell>{new Date(member.lastReviewDate).toLocaleDateString()}</TableCell>
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
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-2">Overall Performance</h4>
                    <div className="flex items-center space-x-4">
                      <Progress value={supervisor.performanceScore} className="w-full h-4" />
                      <span className="text-lg font-semibold min-w-[60px]">{supervisor.performanceScore}%</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      {getPerformanceLabel(supervisor.performanceScore).label}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Team Performance</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">
                          {Math.round(teamMembers.reduce((acc, member) => acc + member.performance, 0) / teamMembers.length)}%
                        </div>
                        <p className="text-xs text-muted-foreground">Average team performance</p>
                        <Progress 
                          value={teamMembers.reduce((acc, member) => acc + member.performance, 0) / teamMembers.length} 
                          className="mt-2" 
                        />
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Team Attendance</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">
                          {Math.round(teamMembers.reduce((acc, member) => acc + member.attendance, 0) / teamMembers.length)}%
                        </div>
                        <p className="text-xs text-muted-foreground">Average attendance rate</p>
                        <Progress 
                          value={teamMembers.reduce((acc, member) => acc + member.attendance, 0) / teamMembers.length} 
                          className="mt-2" 
                        />
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Projects Completed</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">
                          {teamMembers.reduce((acc, member) => acc + member.projectsCompleted, 0)}
                        </div>
                        <p className="text-xs text-muted-foreground">Total team projects</p>
                        <Progress 
                          value={100} 
                          className="mt-2" 
                        />
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Team Skills Coverage</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {Array.from(new Set(teamMembers.flatMap(member => member.skills))).map((skill, index) => (
                            <Badge key={index} variant="outline">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Historical Data</CardTitle>
                <CardDescription>Track supervisor&apos;s progress over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-2">Performance History</h4>
                    {/* Add performance history chart here */}
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Team Size Changes</h4>
                    {/* Add team size history chart here */}
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Recent Activities</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span>Last performance review</span>
                        <span>{new Date(supervisor.lastReviewDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Team member changes</span>
                        <span>+2 in last 3 months</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Certifications earned</span>
                        <span>{supervisor.certifications.length} total</span>
                      </div>
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
  const [selectedStatus, setSelectedStatus] = useState([])
  const [performanceFilter, setPerformanceFilter] = useState(null)
  const [notification, setNotification] = useState({ show: false, message: '', type: '' })
  const [viewMode, setViewMode] = useState('table') // 'table' or 'grid'

  const departments = Array.from(new Set(supervisors.map(s => s.department)))
  const statuses = Array.from(new Set(supervisors.map(s => s.status)))

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type })
    setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000)
  }

  const filteredSupervisors = supervisors.filter(supervisor => {
    const matchesSearch = 
      supervisor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supervisor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supervisor.department.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesDepartment = 
      selectedDepartments.length === 0 || 
      selectedDepartments.includes(supervisor.department)
    
    const matchesStatus =
      selectedStatus.length === 0 ||
      selectedStatus.includes(supervisor.status)
    
    const matchesPerformance = 
      !performanceFilter ||
      (performanceFilter === 'high' && supervisor.performanceScore >= 90) ||
      (performanceFilter === 'medium' && supervisor.performanceScore >= 70 && supervisor.performanceScore < 90) ||
      (performanceFilter === 'low' && supervisor.performanceScore < 70)

    return matchesSearch && matchesDepartment && matchesStatus && matchesPerformance
  })

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
      showNotification(`${supervisor.name}'s information has been updated successfully.`)
    } else {
      const newSupervisor = { ...supervisor, id: supervisors.length + 1 }
      setSupervisors([...supervisors, newSupervisor])
      showNotification(`${newSupervisor.name} has been added as a new supervisor.`)
    }
    setIsFormOpen(false)
    setSelectedSupervisor(null)
  }

  const handleDeleteSupervisor = () => {
    if (supervisorToDelete) {
      setSupervisors(supervisors.filter(s => s.id !== supervisorToDelete))
      showNotification("The supervisor has been removed from the system.", "success")
      setSupervisorToDelete(null)
    }
  }

  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Department', 'Team Size', 'Performance Score', 'Status', 'Join Date', 'Last Review Date']
    const data = sortedSupervisors.map(s => [
      s.name,
      s.email,
      s.department,
      s.teamSize,
      s.performanceScore,
      s.status,
      s.joinDate,
      s.lastReviewDate
    ])
    
    const csvContent = [headers, ...data].map(row => row.join(',')).join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'supervisors.csv'
    a.click()
    showNotification('Supervisors data exported successfully')
  }

  const handleBulkUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const text = e.target.result
          const rows = text.split('\n')
          // Process CSV data here
          showNotification('Data imported successfully')
        } catch (error) {
          showNotification('Error importing data', 'error')
        }
      }
      reader.readAsText(file)
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
              This action cannot be undone. This will permanently delete the supervisor&apos;s account and remove their data from our servers.
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