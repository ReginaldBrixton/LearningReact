'use client';
import React, { useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { RadioGroup, RadioGroupItem } from "./components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/select";
import { Switch } from "./components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Textarea } from "./components/ui/textarea";

function ProfileTab({ handleSaveChanges, avatarUrl, handleFileUpload }) {
  return (
    <TabsContent value="profile">
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>Update your profile details here.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <AvatarSection avatarUrl={avatarUrl} handleFileUpload={handleFileUpload} />
          <InputField label="Full Name" id="name" placeholder="John Doe" />
          <InputField label="Email" id="email" type="email" placeholder="john@university.edu" />
          <InputField label="Major" id="major" placeholder="Computer Science" />
          <TextareaField label="Bio" id="bio" placeholder="Tell us about yourself and your projects" />
          <Button onClick={handleSaveChanges} className="w-full">Save Changes</Button>
        </CardContent>
      </Card>
    </TabsContent>
  );
}

function NotificationsTab({ emailNotifications, setEmailNotifications, pushNotifications, setPushNotifications, handleSaveChanges }) {
  return (
    <TabsContent value="notifications">
      <Card>
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
          <CardDescription>Manage how you want to be notified about your projects.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <NotificationSwitch
            id="email-notifications"
            label="Email Notifications"
            description="Receive project updates via email"
            checked={emailNotifications}
            onCheckedChange={setEmailNotifications}
          />
          <NotificationSwitch
            id="push-notifications"
            label="Push Notifications"
            description="Receive notifications on your device"
            checked={pushNotifications}
            onCheckedChange={setPushNotifications}
          />
          <NotificationFrequency />
          <Button onClick={handleSaveChanges} className="w-full">Save Preferences</Button>
        </CardContent>
      </Card>
    </TabsContent>
  );
}

function AppearanceTab({ handleSaveChanges }) {
  const { theme, setTheme } = useTheme();

  return (
    <TabsContent value="appearance">
      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>Customize the look and feel of your dashboard.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <ThemeSelector theme={theme} setTheme={setTheme} />
          <ColorSchemeSelector />
          <Button onClick={handleSaveChanges} className="w-full">Save Appearance Settings</Button>
        </CardContent>
      </Card>
    </TabsContent>
  );
}

function ProjectsTab({ handleSaveChanges }) {
  return (
    <TabsContent value="projects">
      <Card>
        <CardHeader>
          <CardTitle>Project Preferences</CardTitle>
          <CardDescription>Customize your project management experience.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <SelectField label="Default Project View" id="default-view" options={["list", "board", "calendar"]} />
          <SelectField label="Task Grouping" id="task-grouping" options={["status", "priority", "dueDate"]} />
          <NotificationSwitch
            id="show-completed"
            label="Show Completed Tasks"
            description="Display completed tasks in project views"
          />
          <Button onClick={handleSaveChanges} className="w-full">Save Project Preferences</Button>
        </CardContent>
      </Card>
    </TabsContent>
  );
}

function AvatarSection({ avatarUrl, handleFileUpload }) {
  return (
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
        onChange={handleFileUpload}
      />
    </div>
  );
}

function InputField({ label, id, type = "text", placeholder }) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} type={type} placeholder={placeholder} />
    </div>
  );
}

function TextareaField({ label, id, placeholder }) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Textarea id={id} placeholder={placeholder} />
    </div>
  );
}

function NotificationSwitch({ id, label, description, checked, onCheckedChange }) {
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-0.5">
        <Label htmlFor={id}>{label}</Label>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <Switch
        id={id}
        checked={checked}
        onCheckedChange={onCheckedChange}
      />
    </div>
  );
}

function NotificationFrequency() {
  return (
    <div className="space-y-2">
      <Label>Notification Frequency</Label>
      <RadioGroup defaultValue="daily">
        {["realtime", "daily", "weekly"].map((value) => (
          <div key={value} className="flex items-center space-x-2">
            <RadioGroupItem value={value} id={value} />
            <Label htmlFor={value}>{value.charAt(0).toUpperCase() + value.slice(1)}</Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}

function ThemeSelector({ theme, setTheme }) {
  return (
    <div className="space-y-2">
      <Label>Theme</Label>
      <div className="flex space-x-2">
        {["light", "dark"].map((t) => (
          <Button key={t} variant={theme === t ? 'default' : 'outline'} onClick={() => setTheme(t)}>
            {t === 'light' ? <Sun className="h-4 w-4 mr-2" /> : <Moon className="h-4 w-4 mr-2" />}
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </Button>
        ))}
      </div>
    </div>
  );
}

function ColorSchemeSelector() {
  return (
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
  );
}

function SelectField({ label, id, options }) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Select>
        <SelectTrigger id={id}>
          <SelectValue placeholder={`Select ${label}`} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default function EnhancedSettingsPage() {
  const { setTheme, theme } = useTheme();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [avatarUrl, setAvatarUrl] = useState("/placeholder.svg");

  const handleSaveChanges = () => {
    console.log("Settings saved");
  };

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setAvatarUrl(e.target?.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container mx-auto py-[1px] px-[2rem] sm:px-6 lg:px-[1px]">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList className="flex flex-wrap w-full">
          <TabsTrigger value="profile" className="flex-grow text-center py-1 px-4">Profile</TabsTrigger>
          <TabsTrigger value="notifications" className="flex-grow text-center py-1 px-4">Notifications</TabsTrigger>
          <TabsTrigger value="appearance" className="flex-grow text-center py-1 px-4">Appearance</TabsTrigger>
          <TabsTrigger value="projects" className="flex-grow text-center py-1 px-4">Projects</TabsTrigger>
        </TabsList>
        <ProfileTab handleSaveChanges={handleSaveChanges} avatarUrl={avatarUrl} handleFileUpload={handleFileUpload} />
        <NotificationsTab
          emailNotifications={emailNotifications}
          setEmailNotifications={setEmailNotifications}
          pushNotifications={pushNotifications}
          setPushNotifications={setPushNotifications}
          handleSaveChanges={handleSaveChanges}
        />
        <AppearanceTab handleSaveChanges={handleSaveChanges} />
        <ProjectsTab handleSaveChanges={handleSaveChanges} />
      </Tabs>
    </div>
  );
}