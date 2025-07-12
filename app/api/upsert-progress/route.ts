import { NextResponse } from "next/server";
import { upsertUserProgress } from "@/actions/user-progress";

export async function POST(req: Request) {
  const { courseId } = await req.json();
  await upsertUserProgress(courseId);
  return NextResponse.json({ success: true });
}