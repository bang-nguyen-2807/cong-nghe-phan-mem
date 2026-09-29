import { connnectDB } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const conversation_id = searchParams.get("conversation_id");

        if (!conversation_id) {
            return NextResponse.json(
                { success: false, error: "Thiếu conversation_id!" },
                { status: 400 }
            );
        }

        const pool = await connnectDB();
        const result = await pool.query(
            "SELECT * FROM messages WHERE conversation_id = $1 ORDER BY created_at ASC",
            [conversation_id]
        );

        return NextResponse.json({ success: true, messages: result.rows });
    } catch (e: any) {
        return NextResponse.json({ success: false, error: e.message }, { status: 500 });
    }
}
