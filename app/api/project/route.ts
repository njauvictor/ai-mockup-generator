import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/config/db";
import { projectsTable, ScreenConfigTable, usersTable } from "@/config/schema";
import { and, eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
    try {
        const { userInput, platform, designType, projectId } = await req.json();
        const user = await currentUser();

        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const userEmail = user.primaryEmailAddress?.emailAddress;
        if (!userEmail) {
            return NextResponse.json({ error: "User email not found" }, { status: 400 });
        }

        // Check if user exists in usersTable, if not create them
        const existingUser = await db
            .select()
            .from(usersTable)
            .where(eq(usersTable.email, userEmail))
            .limit(1);

        if (existingUser.length === 0) {
            // Create user in usersTable
            await db.insert(usersTable).values({
                name: user.firstName || "No Name",
                email: userEmail,
                age: 0,
            });
        }

        // Insert project
        const result = await db.insert(projectsTable).values({
            projectId: projectId,
            userId: userEmail,
            userInput: userInput,
            platform: platform,
            designType: designType,
        }).returning();

        return NextResponse.json(result[0]);
    } catch (error) {
        console.error("Error creating project:", error);
        return NextResponse.json(
            { error: "Internal server error", details: error instanceof Error ? error.message : String(error) },
            { status: 500 }
        );
    }
}



export async function GET(req: NextRequest) {
    const projectId = req.nextUrl.searchParams.get("projectId");
    const user = await currentUser();

    if (!projectId || !user?.primaryEmailAddress?.emailAddress) {
        return NextResponse.json({ error: "Missing required parameters" }, { status: 400 });
    }

    try {
     const result = await db.select().from(projectsTable)
        .where(and(eq(projectsTable.projectId, projectId as string ), eq(projectsTable.userId, user.primaryEmailAddress.emailAddress as string)));

        const ScreenConfig = await db.select().from(ScreenConfigTable)
        .where(eq(ScreenConfigTable.projectId, projectId as string ));

    return NextResponse.json({
        projectDetails: result[0],
        screenConfig: ScreenConfig

    });
    } catch (e) {

    return NextResponse.json({ error: e })    
        
    }
}
