import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SettingsLoading() {
  return (
    <div className="container mx-auto lg:px-[1px]">
      <Skeleton className="h-9 w-[200px] mb-6" /> {/* Page title skeleton */}
      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList className="flex flex-wrap w-full">
          {['profile', 'notifications', 'appearance', 'projects'].map((tab) => (
            <TabsTrigger key={tab} value={tab} className="flex-grow text-center py-1 px-4">
              <Skeleton className="h-4 w-4 md:hidden" />
              <Skeleton className="hidden md:inline h-4 w-20" />
            </TabsTrigger>
          ))}
        </TabsList>
        {['profile', 'notifications', 'appearance', 'projects'].map((tab) => (
          <TabsContent key={tab} value={tab}>
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-1/3 mb-2" />
                <Skeleton className="h-4 w-2/3" />
              </CardHeader>
              <CardContent className="space-y-6">
                {tab === 'profile' && (
                  <>
                    <div className="flex flex-col items-center space-y-4">
                      <Skeleton className="w-24 h-24 rounded-full" />
                      <Skeleton className="h-9 w-32" />
                    </div>
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="space-y-2">
                        <Skeleton className="h-4 w-1/4" />
                        <Skeleton className="h-10 w-full" />
                      </div>
                    ))}
                  </>
                )}
                {tab === 'notifications' && (
                  <>
                    {[...Array(2)].map((_, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Skeleton className="h-4 w-32" />
                          <Skeleton className="h-3 w-48" />
                        </div>
                        <Skeleton className="h-6 w-10" />
                      </div>
                    ))}
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-32" />
                      <div className="space-y-2">
                        {[...Array(3)].map((_, i) => (
                          <div key={i} className="flex items-center space-x-2">
                            <Skeleton className="h-4 w-4 rounded-full" />
                            <Skeleton className="h-4 w-16" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
                {tab === 'appearance' && (
                  <>
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-16" />
                      <div className="flex space-x-2">
                        <Skeleton className="h-9 w-20" />
                        <Skeleton className="h-9 w-20" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                  </>
                )}
                {tab === 'projects' && (
                  <>
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="space-y-2">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-10 w-full" />
                      </div>
                    ))}
                  </>
                )}
                <Skeleton className="h-9 w-full" /> {/* Save button skeleton */}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}