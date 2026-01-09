"use client"

import Link from "next/link"
import {
  ArrowRight,
  StoreIcon,
  Wand2,
  Smartphone,
  Monitor,
  Image as ImageIcon,
  Layout,
  Megaphone,
  Loader,
} from "lucide-react"

import { AnimatedGroup } from "@/components/ui/animated-group"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import axios from "axios"
import { HeroHeader } from "./header"



export default function HeroSection() {
  const [userInput, setUserInput] = useState("")
  const [platform, setPlatform] = useState("")
  const [designType, setDesignType] = useState("")
  const { user } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false);



  const onCreateProject = async () => {

    if(!user) {
        router.push('/sign-in')
        return;
    }

    // Create a new project
    if(!user) {
        return;
    }
    setLoading(true);
    const projectId = `${user.id}-${Date.now()}`;
    const result = await axios.post('/api/project', {
        userInput: userInput,
        platform: platform,
        designType: designType,
        projectId: projectId
    });

    console.log('Project created:', result.data);
    setLoading(false);

    // // Redirect to the project page
     router.push(`/project/${projectId}`);




  }


  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Ambient background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden lg:block"
      >
        <div className="absolute left-1/2 top-[-40%] h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />
      </div>
           <HeroHeader />

      <section className="relative pt-24">
        <div className="mx-auto max-w-7xl px-6">
          {/* HEADER */}
          <div className="text-center">
            <AnimatedGroup>
              <Link
                href="/"
                className="group mx-auto mb-6 flex w-fit items-center gap-3 rounded-full border bg-muted px-4 py-1.5 text-sm shadow-sm"
              >
                AI Design Generator
                <ArrowRight className="size-4 transition group-hover:translate-x-1" />
              </Link>

              <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight">
                Generate{" "}
                <span className="text-primary">
                  Mockups, Ads & Social Designs
                </span>{" "}
                with AI
              </h1>

              <p className="mx-auto mt-6 max-w-3xl text-sm text-muted-foreground">
                Create pixel-perfect designs for websites, mobile apps, social
                media, and digital marketing — instantly.
              </p>
            </AnimatedGroup>
          </div>

          {/* INPUT */}
          <div className="mx-auto mt-10 max-w-3xl">
            <div className="relative rounded-xl border bg-background/80 p-4 shadow-xl backdrop-blur">
              <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-r from-primary/20 via-transparent to-accent/20 blur-xl" />

              <div className="relative space-y-4">
                {/* PROMPT */}
                <Textarea
                  placeholder="Describe your design… (brand, colors, style, CTA, mood)"
                  className="min-h-[160px] resize-none text-base"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                />

                {/* SELECTS */}
                <div className="flex flex-col gap-3 sm:flex-row">
                  {/* PLATFORM */}
                  <Select onValueChange={setPlatform}>
                    <SelectTrigger className="w-full sm:w-[220px]">
                      <SelectValue placeholder="Platform" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="website">
                        <Monitor className="mr-2 inline h-4 w-4" />
                        Website
                      </SelectItem>
                      <SelectItem value="mobile-app">
                        <Smartphone className="mr-2 inline h-4 w-4" />
                        Mobile App
                      </SelectItem>
                      <SelectItem value="social-media">
                        <ImageIcon className="mr-2 inline h-4 w-4" />
                        Social Media
                      </SelectItem>
                      <SelectItem value="marketing">
                        <Megaphone className="mr-2 inline h-4 w-4" />
                        Marketing / Ads
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  {/* DESIGN TYPE */}
                  <Select onValueChange={setDesignType}>
                    <SelectTrigger className="w-full sm:w-[260px]">
                      <SelectValue placeholder="Design Type & Size" />
                    </SelectTrigger>
                    <SelectContent>
                      {/* SOCIAL */}
                      <SelectItem value="instagram-post">
                        Instagram Post (1080×1080)
                      </SelectItem>
                      <SelectItem value="instagram-story">
                        Instagram Story (1080×1920)
                      </SelectItem>
                        <SelectItem value="facebook-post">
                        Facebook Post (1200×630)
                      </SelectItem>
                      <SelectItem value="facebook-ad">
                        Facebook Ad (1200×628)
                      </SelectItem>
                      <SelectItem value="linkedin-post">
                        LinkedIn Post (1200×627)
                      </SelectItem>
                      <SelectItem value="youtube-thumbnail">
                        YouTube Thumbnail (1280×720)
                      </SelectItem>

                      {/* ADS */}
                      <SelectItem value="google-display">
                        Google Display Ad (300×250)
                      </SelectItem>
                      <SelectItem value="banner-hero">
                        Website Hero Banner
                      </SelectItem>

                      {/* UI */}
                      <SelectItem value="website-mockup">
                        Website UI Mockup
                      </SelectItem>
                      <SelectItem value="mobile-app-ui">
                        Mobile App Screen
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  {/* CTA */}
                  {userInput && platform && designType ? (
                    
                    
                    <Button
                      className="w-full sm:w-auto"
                      onClick={onCreateProject}
                      disabled={loading}
                    >
                      {loading ? <Loader className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="h-4 w-4" />}
                      Generate Design
                    </Button>
                  ) : (
                    
                    
                    
                    <Button className="w-full sm:w-auto " disabled={true} >
                      Generate Design
                    </Button>



                  )}
                </div>
              </div>
            </div>

            <p className="mt-3 text-center text-xs text-muted-foreground">
              Designs are generated in platform-optimized sizes (Canva-style).
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
