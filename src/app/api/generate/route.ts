import OpenAI from "openai"
import type { NextApiRequest, NextApiResponse } from "next"
import { NextResponse } from "next/server"

type ResponseData = {
   url: string | undefined
   msg: string | undefined
   code: number
}

const openai = new OpenAI({
   apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(
   request: Request,
   res: NextApiResponse<ResponseData>
) {
   const body = await request.json()

   const promptString = body.prompt

   if (!promptString) {
      return NextResponse.json({ msg: "Error in generating.. 🔴", code: 400 }, { status: 400 })
   }

   const aiResponse = await openai.images.generate({
      model: "dall-e-3",
      prompt: promptString,
      n: 1,
      size: "1024x1024"
   })

   console.log(aiResponse)

   const imageUrl = aiResponse.data[0].url
   return NextResponse.json({ url: imageUrl, msg: 'Successfull DALLE-3 Generation✅', code: 200 }, { status: 200 })
}