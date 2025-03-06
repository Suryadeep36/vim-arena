import { NextResponse } from "next/server";
const { GoogleGenerativeAI } = require("@google/generative-ai");


export async function GET() {
    const apiKey : string | undefined = process.env.GEMINI_API_KEY

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    
    const prompt = "Generate a small javascript code snippet with some syntex errors like brackets issues, not proper keyword spelings etc. i need five - six syntex errors don't create a big snippet keep it small and concise. try to be creative not just simple add functions.. also give solution so i can cross check. don't write any descriptions";
    
    const result = await model.generateContent(prompt);
    console.log(result.response);
    return NextResponse.json({ message: "Hello from Next.js!" , data: result.response.text()});
}