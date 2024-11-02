import { Search, Calendar, Building } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function ArchivedFilters({ searchTerm, setSearchTerm, filterYear, setFilterYear, filterDepartment, setFilterDepartment }) {
  return (
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
  )
} 