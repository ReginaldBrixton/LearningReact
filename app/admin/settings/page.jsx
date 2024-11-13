'use client'

import { useState } from 'react'
import { Save, Mail, Bell, Shield, Database, Globe, Users } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    general: {
      siteName: 'FYP Management System',
      siteUrl: 'https://fyp.example.com',
      maintenanceMode: false,
      allowRegistration: true,
    },
    email: {
      smtpHost: 'smtp.example.com',
      smtpPort: '587',
      smtpUser: 'notifications@example.com',
      enableEmailNotifications: true,
    },
    notifications: {
      enableSystemNotifications: true,
      enableEmailDigest: true,
      digestFrequency: 'daily',
      notifyOnNewUser: true,
      notifyOnProjectUpdate: true,
    },
    security: {
      requirePasswordChange: true,
      passwordExpiryDays: '90',
      maxLoginAttempts: '5',
      enableTwoFactor: false,
      allowedDomains: 'example.com, example.edu',
    }
  })

  const handleChange = (section, field, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }))
  }

  const handleSave = () => {
    // TODO: Implement settings save functionality
    console.log('Saving settings:', settings)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Settings</h1>
        <Button onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">
            <Globe className="h-4 w-4 mr-2" />
            General
          </TabsTrigger>
          <TabsTrigger value="email">
            <Mail className="h-4 w-4 mr-2" />
            Email
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="h-4 w-4 mr-2" />
            Security
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Configure basic system settings and functionality
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="siteName">Site Name</Label>
                <Input
                  id="siteName"
                  value={settings.general.siteName}
                  onChange={(e) => handleChange('general', 'siteName', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="siteUrl">Site URL</Label>
                <Input
                  id="siteUrl"
                  value={settings.general.siteUrl}
                  onChange={(e) => handleChange('general', 'siteUrl', e.target.value)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Maintenance Mode</Label>
                  <p className="text-sm text-gray-500">
                    Temporarily disable access to the system
                  </p>
                </div>
                <Switch
                  checked={settings.general.maintenanceMode}
                  onCheckedChange={(checked) => handleChange('general', 'maintenanceMode', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Allow Registration</Label>
                  <p className="text-sm text-gray-500">
                    Enable new user registration
                  </p>
                </div>
                <Switch
                  checked={settings.general.allowRegistration}
                  onCheckedChange={(checked) => handleChange('general', 'allowRegistration', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle>Email Settings</CardTitle>
              <CardDescription>
                Configure email server settings and notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="smtpHost">SMTP Host</Label>
                <Input
                  id="smtpHost"
                  value={settings.email.smtpHost}
                  onChange={(e) => handleChange('email', 'smtpHost', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="smtpPort">SMTP Port</Label>
                <Input
                  id="smtpPort"
                  value={settings.email.smtpPort}
                  onChange={(e) => handleChange('email', 'smtpPort', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="smtpUser">SMTP User</Label>
                <Input
                  id="smtpUser"
                  value={settings.email.smtpUser}
                  onChange={(e) => handleChange('email', 'smtpUser', e.target.value)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Enable Email Notifications</Label>
                  <p className="text-sm text-gray-500">
                    Send system notifications via email
                  </p>
                </div>
                <Switch
                  checked={settings.email.enableEmailNotifications}
                  onCheckedChange={(checked) => handleChange('email', 'enableEmailNotifications', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure system notifications and alerts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>System Notifications</Label>
                  <p className="text-sm text-gray-500">
                    Enable in-app notifications
                  </p>
                </div>
                <Switch
                  checked={settings.notifications.enableSystemNotifications}
                  onCheckedChange={(checked) => handleChange('notifications', 'enableSystemNotifications', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Digest</Label>
                  <p className="text-sm text-gray-500">
                    Send periodic email summaries
                  </p>
                </div>
                <Switch
                  checked={settings.notifications.enableEmailDigest}
                  onCheckedChange={(checked) => handleChange('notifications', 'enableEmailDigest', checked)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="digestFrequency">Digest Frequency</Label>
                <select
                  id="digestFrequency"
                  className="w-full p-2 border rounded-md"
                  value={settings.notifications.digestFrequency}
                  onChange={(e) => handleChange('notifications', 'digestFrequency', e.target.value)}
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Configure system security and access controls
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Require Password Change</Label>
                  <p className="text-sm text-gray-500">
                    Force password change on first login
                  </p>
                </div>
                <Switch
                  checked={settings.security.requirePasswordChange}
                  onCheckedChange={(checked) => handleChange('security', 'requirePasswordChange', checked)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="passwordExpiryDays">Password Expiry (Days)</Label>
                <Input
                  id="passwordExpiryDays"
                  type="number"
                  value={settings.security.passwordExpiryDays}
                  onChange={(e) => handleChange('security', 'passwordExpiryDays', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxLoginAttempts">Max Login Attempts</Label>
                <Input
                  id="maxLoginAttempts"
                  type="number"
                  value={settings.security.maxLoginAttempts}
                  onChange={(e) => handleChange('security', 'maxLoginAttempts', e.target.value)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Two-Factor Authentication</Label>
                  <p className="text-sm text-gray-500">
                    Enable 2FA for all users
                  </p>
                </div>
                <Switch
                  checked={settings.security.enableTwoFactor}
                  onCheckedChange={(checked) => handleChange('security', 'enableTwoFactor', checked)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="allowedDomains">Allowed Email Domains</Label>
                <Input
                  id="allowedDomains"
                  value={settings.security.allowedDomains}
                  onChange={(e) => handleChange('security', 'allowedDomains', e.target.value)}
                  placeholder="Enter comma-separated domains"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 