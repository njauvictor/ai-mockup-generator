import { CameraIcon, ShareIcon, Sparkle } from "lucide-react"

import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Button } from "./ui/button"
import { THEME_NAME_LIST, THEMES } from "@/data/Themes"
import { useState } from "react"

export default function SettingsSection() {
  const [selectedTheme, setSelectedTheme] = useState<string>(THEME_NAME_LIST[0])
  const [projectName, setProjectName] = useState<string>("")
  const [userNewScreenInput, setUserNewScreenInput] = useState<string>("")

  return (
    <div className="px-2 mt-2">
      <div className="relative h-screen overflow-auto scrollbar-modern rounded-lg border bg-background/50 p-2">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-background px-4 py-2 ">
          <h2 className="text-sm font-semibold tracking-tight">
            Project Settings
          </h2>
        </div>

        {/* Scrollable content */}
        <div className="px-4  space-y-6 overflow-y-auto scrollbar-modern ">
          {/* Project name */}
          <section className="space-y-2 border p-3 rounded-md">
            <p className="text-xs font-medium text-muted-foreground">
              Project Name
            </p>
            <Input
              className="text-xs"
              onChange={(e)=>setProjectName(e.target.value)}
            />
          </section>

          {/* AI Screen Generation */}
          <section className="space-y-4">
            <p className="text-xs font-medium text-muted-foreground">
              Generate New Screen
            </p>

            <Textarea
              placeholder="Describe the screen you want to generate using AI…"
              className="min-h-[120px] resize-none text-sm"
              onChange={(e)=>setUserNewScreenInput(e.target.value)}
            />

            <Button size="sm" className="gap-2 cursor-pointer">
              <Sparkle className="h-4 w-4" />
              <span className="text-[11px] font-medium">
                Generate with AI
              </span>
            </Button>
          </section>


          {/* Theme selection */}
          <section className="space-y-3 border p-2 rounded-md mt-6">
            <h3 className="text-sm font-semibold tracking-tight">
              Theme Selection
            </h3>
           <hr/>

            <div className="max-h-[120px] pr-1 overflow-y-auto scrollbar-modern  ">
              <div className="space-y-2 ">
                {THEME_NAME_LIST.map((theme) => {
                  const isActive = selectedTheme === theme

                  return (
                    <div
                      key={theme}
                      onClick={() => setSelectedTheme(theme)}
                      className={`
                        group flex items-center justify-between rounded-lg p-3 cursor-pointer transition-all
                        border
                        ${
                          isActive
                            ? "border-primary bg-primary/15 ring-1 ring-primary/30"
                            : "border-transparent hover:border-border hover:bg-muted"
                        }
                      `}
                    >
                      <span className="text-[10px] font-medium">
                        {theme.replace(/_/g, " ")}
                      </span>

                      <div className="flex items-center gap-1.5">
                        {["primary", "secondary", "accent", "background"].map(
                          (key) => {
                            const themeObj = THEMES[theme as keyof typeof THEMES]
                            const colorValue = themeObj?.[key as keyof typeof themeObj]
                            const backgroundColor = typeof colorValue === 'string' ? colorValue : undefined
                            
                            return (
                              <span
                                key={key}
                                className="h-4 w-4 rounded-full border"
                                style={{ backgroundColor }}
                              />
                            )
                          }
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </section>

          {/* Extras */}
          <section className="flex space-x-4">
       
            <Button size="sm" variant="default" className="gap-2 cursor-pointer">
              <CameraIcon className="h-4 w-4" />
              <span className="text-[11px] font-medium">
                Capture Screenshot
              </span>
            </Button>

            <Button size="sm" variant="outline" className="gap-2 cursor-pointer border-primary text-primary hover:bg-primary/10">
              <ShareIcon className="h-4 w-4" />
              <span className="text-[11px] font-medium">
                Share
              </span>
            </Button>


          </section>
        </div>
      </div>
    </div>
  )
}
