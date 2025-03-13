import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";

interface Props {
  params: Promise<{ id: number }>;
}

export async function GET(request: NextRequest, { params }: Props) {
  const { id } = await params;

  if (id > 10)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  return NextResponse.json({ id: 1, name: "Mosh" });
}

export async function PUT(request: NextRequest, { params }: Props) {
  const { id } = await params;
  const body = await request.json();

  const validation = schema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  if (id > 10)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  return NextResponse.json({ id, name: body.name });
}

export async function DELETE(request: NextRequest, { params }: Props) {
  const { id } = await params;
  const body = await request.json();

  if (id > 10)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  return NextResponse.json({});
}
