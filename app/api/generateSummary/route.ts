import openai from "@/openai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  // todos in the body of the POST req
  const { todos } = await request.json();

  // communicate with openAI GPT
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    temperature: 0.0,
    n: 1,
    stream: false,
    messages: [
      {
        role: "system",
        content:
          "When responding, welcome the user as Mr.Tanay. Limit the response to 200 characters",
      },
      {
        role: "user",
        content: `Hi there, provide a summary of the following todos. Count how many todos are in each category such as To do, In progress and done. Here's the data ${JSON.stringify(
          todos
        )}`,
      },
    ],
  });

  const { choices } = response;

  return NextResponse.json(choices[0].message);
}
