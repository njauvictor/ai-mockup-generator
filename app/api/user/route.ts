
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/config/db";
import { usersTable } from "@/config/schema";



export async function POST (req: NextRequest) {

    const user = await currentUser();

    const result = await db.insert(usersTable).values({
        name: user?.firstName || "No Name",
        email: user?.primaryEmailAddress?.emailAddress as string,
        age: 0,
    }).returning();

    return NextResponse.json(result[0]);


     }

    