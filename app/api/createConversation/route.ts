import { connnectDB } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { user_name, user_email } = body;

        if (!user_name || !user_email) {
            return NextResponse.json(
                { success: false, error: "Vui lòng nhập đầy đủ tên và email!" },
                { status: 400 }
            );
        }

        const pool = await connnectDB();
        const result = await pool.query(
            "INSERT INTO conversations (user_name, user_email) VALUES ($1, $2) RETURNING *",
            [user_name, user_email]
        );

        return NextResponse.json({ success: true, conversation: result.rows[0] });
    } catch (e: any) {
        return NextResponse.json({ success: false, error: e.message }, { status: 500 });
    }
}