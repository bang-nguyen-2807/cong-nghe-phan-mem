import { connnectDB } from "@/lib/db";
import { NextResponse } from "next/server";
export async function POST (req: Request){
    try {
        const body = await req.json();
        const { conversation_id, sender, content } = body;

        if (!conversation_id) {
            return NextResponse.json(
                { success: false, error: "vui lòng đăng nhập để sử dụng chatbox" },
                { status: 400 }
            );
        }

        const pool = await connnectDB();
        const result = await pool.query(
            "INSERT INTO messages (conversation_id, sender, content) VALUES ($1, $2, $3) RETURNING *",
            [conversation_id, sender, content]
        );

        return NextResponse.json({ success: true, message: result.rows[0] });
    } catch (e: any) {
        return NextResponse.json({ success: false, error: e.message }, { status: 500 });
    }
}