import { NextResponse } from "next/server";
import { getUser, MOCK_USER_ID } from "@/lib/db";

export async function GET() {
    try {
        const user = getUser(MOCK_USER_ID);

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ tier: user.tier });
    } catch (error) {
        console.error("Error fetching user tier:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
