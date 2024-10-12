import { ChevronRight, List, Trophy, PieChart } from "lucide-react"
import StatCard from './StatCard'

function StatCards() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <StatCard title="Total Projects" value="15" change="+2 from last month" icon={ChevronRight} />
      <StatCard title="Active Tasks" value="42" change="+5 from last week" icon={List} />
      <StatCard title="Score Board" value="8" change="+1 new this month" icon={Trophy} />
      <StatCard title="Completion Rate" value="78%" change="+2% from last month" icon={PieChart} />
    </div>
  )
}

export default StatCards;
