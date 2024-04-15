import {NextRequest, NextResponse} from "next/server";
import OpenAI from "openai";

const openai = new OpenAI();

export async function POST(req: NextRequest) {
    const formData = await req.formData()
    const question: string = formData.get('question') as string;

    const completion = await openai.chat.completions.create({
        messages: [
            { role: "system", content: "Jesteś pomocnym asystentem." },
            { role: "user", content: question },
        ],
        model: "gpt-3.5-turbo",
    })

    const answer = completion.choices[0].message.content as string
    return NextResponse.json(answer)
}