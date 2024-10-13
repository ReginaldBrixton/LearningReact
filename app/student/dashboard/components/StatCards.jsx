import { ChevronRight, List, Trophy, PieChart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const statCardsData = [
  { title: "Total Projects", value: "15", change: "+2 from last month", icon: ChevronRight },
  { title: "Active Tasks", value: "42", change: "+5 from last week", icon: List },
  { title: "Score Board", value: "8", change: "+1 new this month", icon: Trophy },
  { title: "Completion Rate", value: "78%", change: "+2% from last month", icon: PieChart },
];

function StatCard({ title, value, change, icon: Icon }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-gray-500 dark:text-gray-400">{change}</p>
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
        />
      ))}
    </div>
  );
}

export default StatCards;
