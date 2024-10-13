import { ChevronRight, List, Trophy, PieChart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const statCardsData = [
  { title: "Total Projects", value: "15", change: "+2 from last month", icon: ChevronRight, color: "bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200 border-blue-300 dark:border-blue-700" },
  { title: "Active Tasks", value: "42", change: "+5 from last week", icon: List, color: "bg-emerald-200 dark:bg-emerald-800 text-emerald-800 dark:text-emerald-200 border-emerald-300 dark:border-emerald-700" },
  { title: "Score Board", value: "8", change: "+1 new this month", icon: Trophy, color: "bg-amber-200 dark:bg-amber-800 text-amber-800 dark:text-amber-200 border-amber-300 dark:border-amber-700" },
  { title: "Completion Rate", value: "78%", change: "+2% from last month", icon: PieChart, color: "bg-fuchsia-200 dark:bg-fuchsia-800 text-fuchsia-800 dark:text-fuchsia-200 border-fuchsia-300 dark:border-fuchsia-700" },
];

function StatCard({ title, value, change, icon: Icon, color }) {
  return (
    <Card className={`${color} transition-all duration-300 hover:shadow-lg border-2`}>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-5 w-5" />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{value}</div>
        <p className="text-sm mt-1">{change}</p>
      </CardContent>
    </Card>
  );
}

function StatCards() {
  return (
    <div className="grid gap-6 grid-cols-1 xsm:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {statCardsData.map((card, index) => (
        <StatCard
          key={index}
          title={card.title}
          value={card.value}
          change={card.change}
          icon={card.icon}
          color={card.color}
        />
      ))}
    </div>
  );
}

export default StatCards;
