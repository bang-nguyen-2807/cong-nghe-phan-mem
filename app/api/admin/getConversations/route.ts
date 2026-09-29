import { connnectDB } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const pool = await connnectDB();
        
        // Lấy danh sách cuộc trò chuyện kèm tin nhắn cuối cùng
        const result = await pool.query(`
            SELECT c.*, 
                   (SELECT content FROM messages m WHERE m.conversation_id = c.id ORDER BY m.created_at DESC LIMIT 1) AS last_message,
                   (SELECT created_at FROM messages m WHERE m.conversation_id = c.id ORDER BY m.created_at DESC LIMIT 1) AS last_message_time
            FROM conversations c
            ORDER BY c.created_at DESC
        `);

        return NextResponse.json({ success: true, conversations: result.rows });
    } catch (e: any) {
        return NextResponse.json({ success: false, error: e.message }, { status: 500 });
    }
}
