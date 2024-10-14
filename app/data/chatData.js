const chatData = [
  {
    id: 1,
    name: "Abraham Ocran",
    avatar: "https://i.pravatar.cc/150?img=1",
    lastMessage: "See you tomorrow!",
    time: "2m ago",
    online: true,
    messages: [
      { id: 1, text: "Hey, how are you?", sent: false, time: "10:00 AM" },
      { id: 2, text: "I'm good, thanks! How about you?", sent: true, time: "10:02 AM" },
      { id: 3, text: "Pretty good! Are we still on for tomorrow?", sent: false, time: "10:05 AM" },
      { id: 4, text: "Yes, absolutely! Looking forward to it.", sent: true, time: "10:07 AM" },
      { id: 5, text: "See you tomorrow!", sent: false, time: "10:08 AM" },
    ]
  },
   {
    id: 2,
    name: "Mord Astu",
    avatar: "https://i.pravatar.cc/150?img=2",
    lastMessage: "Thanks for the help!",
    time: "1h ago",
    online: false,
    messages: [
      { id: 1, text: "Hey, I'm stuck on this coding problem.", sent: false, time: "2:30 PM" },
      { id: 2, text: "What seems to be the issue?", sent: true, time: "2:35 PM" },
      { id: 3, text: "I can't figure out how to implement the sorting algorithm.", sent: false, time: "2:37 PM" },
      { id: 4, text: "Let me show you an example. It's easier than you think!", sent: true, time: "2:40 PM" },
      { id: 5, text: "Thanks for the help!", sent: false, time: "3:15 PM" },
    ]
  },
  {
    id: 3,
    name: "Joshua Addy",
    avatar: "https://i.pravatar.cc/150?img=3",
    lastMessage: "The meeting is at 3 PM",
    time: "3h ago",
    online: true,
    messages: [
      { id: 1, text: "Don't forget about our team meeting today.", sent: false, time: "9:00 AM" },
      { id: 2, text: "Thanks for the reminder. What time was it again?", sent: true, time: "11:30 AM" },
      { id: 3, text: "The meeting is at 3 PM", sent: false, time: "11:32 AM" },
      { id: 4, text: "Got it, I'll be there!", sent: true, time: "11:33 AM" },
    ]
  },
  {
    id: 4,
    name: "Skylous Peter",
    avatar: "https://i.pravatar.cc/150?img=4",
    lastMessage: "Did you see the news?",
    time: "5h ago",
    online: false,
    messages: [
      { id: 1, text: "Did you see the news?", sent: false, time: "7:00 AM" },
      { id: 2, text: "No, what happened?", sent: true, time: "8:30 AM" },
      { id: 3, text: "There's a new breakthrough in quantum computing!", sent: false, time: "8:32 AM" },
      { id: 4, text: "Wow, that's exciting! Send me the link?", sent: true, time: "8:35 AM" },
    ]
  },
  {
    id: 5,
    name: "Frederick Arthur",
    avatar: "https://i.pravatar.cc/150?img=5",
    lastMessage: "Great work today!",
    time: "1d ago",
    online: true,
    messages: [
      { id: 1, text: "Your presentation was amazing!", sent: false, time: "4:00 PM" },
      { id: 2, text: "Thank you! I was so nervous.", sent: true, time: "4:05 PM" },
      { id: 3, text: "You didn't show it at all. Great work today!", sent: false, time: "4:07 PM" },
      { id: 4, text: "I appreciate that, thanks!", sent: true, time: "4:10 PM" },
    ]
  },
  {
    id: 6,
    name: "Mirabel Mante",
    avatar: "https://i.pravatar.cc/150?img=8",
    lastMessage: "The project is due next week",
    time: "2d ago",
    online: false,
    messages: [
      { id: 1, text: "How's the project coming along?", sent: false, time: "11:00 AM" },
      { id: 2, text: "I'm about 70% done. You?", sent: true, time: "11:30 AM" },
      { id: 3, text: "Almost finished. Remember, it's due next week.", sent: false, time: "11:35 AM" },
      { id: 4, text: "I'll have it done in time, don't worry!", sent: true, time: "11:40 AM" },
    ]
  },
  {
    id: 7,
    name: "Chelsea Mettle",
    avatar: "https://i.pravatar.cc/150?img=9",
    lastMessage: "Movie night on Friday?",
    time: "3d ago",
    online: true,
    messages: [
      { id: 1, text: "Hey, are you free this Friday?", sent: false, time: "6:00 PM" },
      { id: 2, text: "I think so, why?", sent: true, time: "6:10 PM" },
      { id: 3, text: "Movie night at my place! You in?", sent: false, time: "6:12 PM" },
      { id: 4, text: "Sounds fun! What time?", sent: true, time: "6:15 PM" },
      { id: 5, text: "Let's say 8 PM. See you then!", sent: false, time: "6:20 PM" }
    ]
  }
];

export default chatData;

