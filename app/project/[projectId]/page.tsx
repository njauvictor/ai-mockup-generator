"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

import { ModeToggle } from "@/components/mode-toggle";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { Save, Loader } from "lucide-react";
import { ProjectType, ScreenConfigType } from "@/type/types";
import SettingsSection from "@/components/SettingsSection";

/**
 * AppSidebar component - Main sidebar navigation
 */
function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  return <Sidebar {...props} />;
}

export default function ProjectCanvasPlayground() {
  const { projectId } = useParams<{ projectId: string }>();

  const [projectDetails, setProjectDetails] = useState<ProjectType>();
  const [screenConfig, setScreenConfig] = useState<ScreenConfigType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (projectId) {
      getProjectDetails();
    }
  }, [projectId]);

  const generateScreenConfig = async () => {
    console.log("Generating screen configuration...");
    // TODO: Implement screen configuration generation
  };

  const getProjectDetails = async () => {
    setLoading(true);
    try {
      const result = await axios.get(`/api/project?projectId=${projectId}`);
      console.log("Project Details:", result.data);

      setProjectDetails(result?.data?.projectDetails);
      setScreenConfig(result?.data?.screenConfig ?? []);

      if (!result?.data?.screenConfig?.length) {
        generateScreenConfig();
      }
    } catch (error) {
      console.error("Failed to fetch project details:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SidebarProvider className="min-h-screen overflow-hidden">
      

      {/* SettingsSection component for configuration options */}
      <SettingsSection />

      <SidebarInset className="flex flex-col overflow-y-auto h-screen">
        <header className="flex h-18 items-center justify-between gap-2 px-4 ">
          <div className="flex items-center gap-2">
            <SidebarTrigger />
            <Separator orientation="vertical" className="h-4" />

            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="flex items-center gap-2">
            <Button size="sm">
              <Save className="mr-2 h-4 w-4" />
              Save
            </Button>
            <ModeToggle />
          </div>
        </header>

        <div className="flex-1 overflow-y-auto px-4">
          <div className="min-h-full rounded-xl bg-muted/50">
            {loading && (
              <div className="pt-2">
                <Loader className="mx-auto h-4 w-4 animate-spin" />
              </div>
            )}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
