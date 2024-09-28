'use client';
import { useState } from 'react'
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes'
import { motion } from 'framer-motion'

import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar"
import { Button } from "./components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card"
import { Input } from "./components/ui/input"
import { Label } from "./components/ui/label"
import { RadioGroup, RadioGroupItem } from "./components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/select"
import { Switch } from "./components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs"
import { Textarea } from "./components/ui/textarea"
// import { useToast } from "./components/ui/use-toast"

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5 }
}

export default function EnhancedSettingsPage() {
  const { setTheme, theme } = useTheme()
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [avatarUrl, setAvatarUrl] = useState("/placeholder.svg")

  const handleSaveChanges = () => {
    // Toast functionality is commented out, so we'll just log for now
    console.log("Settings saved")
  }

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => setAvatarUrl(e.target?.result)
      reader.readAsDataURL(file)
    }
  }

  return (
    <motion.div
      className="container mx-auto py-10 px-4 sm:px-6 lg:px-8"
      initial="initial"
      animate="animate"
      variants={fadeIn}>
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your profile details here.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={avatarUrl} />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <Button
                  variant="outline"
                  onClick={() => document.getElementById('avatar-upload')?.click()}>
                  Change Avatar
                </Button>
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileUpload} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="john@university.edu" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="major">Major</Label>
                <Input id="major" placeholder="Computer Science" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea id="bio" placeholder="Tell us about yourself and your projects" />
              </div>
              <Button onClick={handleSaveChanges} className="w-full">Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Manage how you want to be notified about your projects.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <motion.div
                className="flex items-center justify-between"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}>
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive project updates via email</p>
                </div>
                <Switch
                  id="email-notifications"
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications} />
              </motion.div>
              <motion.div
                className="flex items-center justify-between"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}>
                <div className="space-y-0.5">
                  <Label htmlFor="push-notifications">Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications on your device</p>
                </div>
                <Switch
                  id="push-notifications"
                  checked={pushNotifications}
                  onCheckedChange={setPushNotifications} />
              </motion.div>
              <div className="space-y-2">
                <Label>Notification Frequency</Label>
                <RadioGroup defaultValue="daily">
                  {["realtime", "daily", "weekly"].map((value) => (
                    <motion.div
                      key={value}
                      className="flex items-center space-x-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}>
                      <RadioGroupItem value={value} id={value} />
                      <Label htmlFor={value}>{value.charAt(0).toUpperCase() + value.slice(1)}</Label>
                    </motion.div>
                  ))}
                </RadioGroup>
              </div>
              <Button onClick={handleSaveChanges} className="w-full">Save Preferences</Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>Customize the look and feel of your dashboard.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Theme</Label>
                <div className="flex space-x-2">
                  {["light", "dark"].map((t) => (
                    <motion.div key={t} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button variant={theme === t ? 'default' : 'outline'} onClick={() => setTheme(t)}>
                        {t === 'light' ? <Sun className="h-4 w-4 mr-2" /> : <Moon className="h-4 w-4 mr-2" />}
                        {t.charAt(0).toUpperCase() + t.slice(1)}
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="color-scheme">Color Scheme</Label>
                <Select>
                  <SelectTrigger id="color-scheme">
                    <SelectValue placeholder="Select Color Scheme" />
                  </SelectTrigger>
                  <SelectContent>
                    {["default", "colorful", "monochrome"].map((scheme) => (
                      <SelectItem key={scheme} value={scheme}>
                        {scheme.charAt(0).toUpperCase() + scheme.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleSaveChanges} className="w-full">Save Appearance Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="projects">
          <Card>
            <CardHeader>
              <CardTitle>Project Preferences</CardTitle>
              <CardDescription>Customize your project management experience.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="default-view">Default Project View</Label>
                <Select>
                  <SelectTrigger id="default-view">
                    <SelectValue placeholder="Select Default View" />
                  </SelectTrigger>
                  <SelectContent>
                    {["list", "board", "calendar"].map((view) => (
                      <SelectItem key={view} value={view}>
                        {view.charAt(0).toUpperCase() + view.slice(1)} View
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="task-grouping">Task Grouping</Label>
                <Select>
                  <SelectTrigger id="task-grouping">
                    <SelectValue placeholder="Select Task Grouping" />
                  </SelectTrigger>
                  <SelectContent>
                    {["status", "priority", "dueDate"].map((group) => (
                      <SelectItem key={group} value={group}>
                        By {group.charAt(0).toUpperCase() + group.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <motion.div
                className="flex items-center justify-between"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}>
                <div className="space-y-0.5">
                  <Label htmlFor="show-completed">Show Completed Tasks</Label>
                  <p className="text-sm text-muted-foreground">Display completed tasks in project views</p>
                </div>
                <Switch id="show-completed" />
              </motion.div>
              <Button onClick={handleSaveChanges} className="w-full">Save Project Preferences</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}