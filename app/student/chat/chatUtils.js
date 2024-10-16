export const contacts = [
  { id: 1, name: "Dr. Smith", avatar: "/placeholder.svg?height=40&width=40", lastMessage: "How's your research going?", time: "2m ago", status: "Online" },
  { id: 2, name: "Jane Doe", avatar: "/placeholder.svg?height=40&width=40", lastMessage: "I've submitted my paper", time: "1h ago", status: "Offline" },
  { id: 3, name: "Research Team", avatar: "/placeholder.svg?height=40&width=40", lastMessage: "Meeting at 3 PM", time: "3h ago", status: "Busy" },
  { id: 4, name: "Library Services", avatar: "/placeholder.svg?height=40&width=40", lastMessage: "Your book is due soon", time: "1d ago", status: "Offline" },
  { id: 5, name: "Prof. Johnson", avatar: "/placeholder.svg?height=40&width=40", lastMessage: "Feedback on your draft", time: "2d ago", status: "Office Hours" },
];

export const initialMessages = [
  { id: 1, sender: "Dr. Smith", content: "How's your research paper coming along?", timestamp: "10:00 AM", thread: "General" },
  { id: 2, sender: "You", content: "It's progressing well. I've completed the literature review.", timestamp: "10:02 AM", thread: "General" },
  { id: 3, sender: "Dr. Smith", content: "Great! Have you started on the methodology section?", timestamp: "10:05 AM", thread: "Methodology" },
  { id: 4, sender: "You", content: "Yes, I'm working on it now. I have a question about the data analysis.", timestamp: "10:07 AM", thread: "Methodology" },
  { id: 5, sender: "Dr. Smith", content: "Sure, what's your question?", timestamp: "10:08 AM", thread: "Methodology" },
];

export const statusColors = {
  Online: "bg-emerald-500",
  Busy: "bg-rose-500",
  Offline: "bg-slate-500",
  "Office Hours": "bg-amber-500",
};
