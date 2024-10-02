'use client';
import React, { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useColorScheme } from '../../../theme/mainTheme';
import { HexColorPicker } from 'react-colorful';
import { getAuth, updateProfile } from 'firebase/auth';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';

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

function ProfileTab({ handleSaveChanges, avatarUrl, handleFileUpload, userData, setUserData }) {
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setUserData(prevData => ({ ...prevData, [id]: value }));
  };

  return (
    <TabsContent value="profile">
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>Update your profile details here.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <AvatarSection avatarUrl={avatarUrl} handleFileUpload={handleFileUpload} />
          <InputField 
            label="Full Name" 
            id="displayName" 
            placeholder="John Doe" 
            value={userData.displayName || ''} 
            onChange={handleInputChange}
          />
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              value={userData.email || ''} 
              disabled
            />
          </div>
          <InputField 
            label="Major" 
            id="major" 
            placeholder="Business Administration"
            value={userData.major || ''} 
            onChange={handleInputChange}
          />
          <TextareaField 
            label="Bio" 
            id="bio" 
            placeholder="Tell us about yourself and your projects" 
            value={userData.bio || ''} 
            onChange={handleInputChange}
          />
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
  const { colorScheme, changeColorScheme, customColors, updateCustomColors } = useColorScheme();
  const [showCustomPicker, setShowCustomPicker] = useState(false);

  return (
    <TabsContent value="appearance">
      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>Customize the look and feel of your dashboard.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <ThemeSelector theme={theme} setTheme={setTheme} />
          <ColorSchemeSelector
            colorScheme={colorScheme}
            changeColorScheme={changeColorScheme}
            setShowCustomPicker={setShowCustomPicker}
          />
          {showCustomPicker && (
            <CustomColorPicker
              customColors={customColors}
              updateCustomColors={updateCustomColors}
            />
          )}
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

function InputField({ label, id, type = "text", placeholder, value, onChange }) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} type={type} placeholder={placeholder} value={value} onChange={onChange} />
    </div>
  );
}

function TextareaField({ label, id, placeholder, value, onChange }) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Textarea id={id} placeholder={placeholder} value={value} onChange={onChange} />
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

function ColorSchemeSelector({ colorScheme, changeColorScheme, setShowCustomPicker }) {
  const handleChange = (value) => {
    changeColorScheme(value);
    setShowCustomPicker(value === 'custom');
  };

  return (
    <div className="space-y-2">
      <Label>Color Scheme</Label>
      <Select onValueChange={handleChange} defaultValue={colorScheme}>
        <SelectTrigger>
          <SelectValue placeholder="Select a color scheme" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="default">Default</SelectItem>
          <SelectItem value="colorful">Colorful</SelectItem>
          <SelectItem value="monochrome">Monochrome</SelectItem>
          <SelectItem value="pastel">Pastel</SelectItem>
          <SelectItem value="neon">Neon</SelectItem>
          <SelectItem value="custom">Custom</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

function CustomColorPicker({ customColors, updateCustomColors }) {
  const [currentColor, setCurrentColor] = useState('primary');

  const handleColorChange = (color) => {
    updateCustomColors({ ...customColors, [currentColor]: color });
  };

  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        {Object.entries(customColors).map(([key, value]) => (
          <Button
            key={key}
            onClick={() => setCurrentColor(key)}
            className={`w-1/3 ${currentColor === key ? 'ring-2 ring-offset-2' : ''}`}
            style={{ backgroundColor: value }}
          >
            {key}
          </Button>
        ))}
      </div>
      <HexColorPicker color={customColors[currentColor]} onChange={handleColorChange} />
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
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const { setTheme, theme } = useTheme();
  const { colorScheme, changeColorScheme } = useColorScheme();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [avatarUrl, setAvatarUrl] = useState("/placeholder.svg");

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      if (user) {
        fetchUserData(user);
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchUserData = async (user) => {
    try {
      const db = getFirestore();
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        const data = userDoc.data();
        setUserData({
          displayName: user.displayName || '',
          email: user.email || '',
          major: data.major || '',
          bio: data.bio || '',
        });
      } else {
        setUserData({
          displayName: user.displayName || '',
          email: user.email || '',
          major: '',
          bio: '',
        });
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveChanges = async () => {
    if (user) {
      const auth = getAuth();
      const db = getFirestore();
      
      try {
        // Update Firebase Auth profile
        await updateProfile(auth.currentUser, {
          displayName: userData.displayName,
        });

        // Prepare the update object for Firestore
        const updateData = {};
        if (userData.displayName !== undefined) updateData.displayName = userData.displayName;
        if (userData.major !== undefined) updateData.major = userData.major;
        if (userData.bio !== undefined) updateData.bio = userData.bio;

        // Only update Firestore if there are fields to update
        if (Object.keys(updateData).length > 0) {
          await updateDoc(doc(db, 'users', user.uid), updateData);
        }

        console.log("Profile updated successfully");
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setAvatarUrl(e.target?.result);
      reader.readAsDataURL(file);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Please sign in to access settings.</div>;
  }

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
        <ProfileTab 
          handleSaveChanges={handleSaveChanges} 
          avatarUrl={avatarUrl} 
          handleFileUpload={handleFileUpload}
          userData={userData}
          setUserData={setUserData}
        />
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