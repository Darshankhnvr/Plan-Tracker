import Task from "@/models/Task";
import dbConnect from "@/utils/dbConnect";
import { NextResponse } from "next/server";

export async function GET(){
    await dbConnect()
    const task = await Task.find()
    return NextResponse.json(task)
}

export async function POST(req){
    await dbConnect()
    const body = await req.json()
    const task = await Task.create(body)
    return NextResponse.json(task, {status:201})
}