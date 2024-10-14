import { ChevronRight, List, Trophy, PieChart, Clock, Bell, UserPlus } from "lucide-react";

export const deadlines = [
  { title: "Capstone Proposal", dueIn: "Due in 2 days", urgency: "high" },
  { title: "Capstone One", dueIn: "Due in 5 days", urgency: "medium" },
  { title: "Capstone Two", dueIn: "Due in 8 weeks", urgency: "low" },
];

export const statCardsData = [
  { title: "Total Projects", value: "15", change: "+2 from last month", icon: ChevronRight, color: "bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200 border-blue-300 dark:border-blue-700", href: "/student/projects" },
  { title: "Active Tasks", value: "42", change: "+5 from last week", icon: List, color: "bg-emerald-200 dark:bg-emerald-800 text-emerald-800 dark:text-emerald-200 border-emerald-300 dark:border-emerald-700", href: "/student/tasks" },
  { title: "Score Board", value: "8", change: "+1 new this month", icon: Trophy, color: "bg-amber-200 dark:bg-amber-800 text-amber-800 dark:text-amber-200 border-amber-300 dark:border-amber-700", href: "/student/scoreboard" },
  { title: "Completion Rate", value: "78%", change: "+2% from last month", icon: PieChart, color: "bg-fuchsia-200 dark:bg-fuchsia-800 text-fuchsia-800 dark:text-fuchsia-200 border-fuchsia-300 dark:border-fuchsia-700", href: "/student/progress" },
];

export const activities = [
  { title: "Your project has been reviewed.", time: "2 hours ago", icon: Clock },
  { title: "Mr. Ofei made an announcement.", time: "5 hours ago", icon: Bell },
  { title: "New team member added", time: "1 day ago", icon: UserPlus },
];

export const projects = [
  { name: "Research Proposal", progress: 75, color: "bg-emerald-500 dark:bg-emerald-600" },
  { name: "Capstone One", progress: 3, color: "bg-red-500 dark:bg-red-600" },
  { name: "Capstone Two", progress: 2, color: "bg-amber-500 dark:bg-amber-600" },
];
