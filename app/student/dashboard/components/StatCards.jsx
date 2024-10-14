import { ChevronRight, List, Trophy, PieChart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { statCardsData } from "@/app/data/dashboardData";

function StatCard({ title, value, change, icon: Icon, color, href }) {
  return (
    <Link href={href} className="block">
      <Card className={`${color} transition-all duration-300 hover:shadow-lg border-2 cursor-pointer`}>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          <Icon className="h-5 w-5" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{value}</div>
          <p className="text-sm mt-1">{change}</p>
        </CardContent>
      </Card>
    </Link>
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
          href={card.href}
        />
      ))}
    </div>
  );
}

export default StatCards;
