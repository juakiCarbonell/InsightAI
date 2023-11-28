import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'
import OpenAI from 'openai'
import {
  ChatCompletion,
  ChatCompletionAssistantMessageParam,
  ChatCompletionMessageParam,
  CreateChatCompletionRequestMessage,
} from 'openai/resources/index.mjs'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // defaults to process.env["OPENAI_API_KEY"]
})

const instructionMessage: ChatCompletionMessageParam = {
  role: 'system',
  content:
    'You are a code generator. You must answer only in markdown code snippets. Use code comments for explanations.',
}

export async function POST(req: Request) {
  try {
    const { userId } = auth()
    const body = await req.json()
    const { messages } = body
    if (!userId) return new NextResponse('Unauthorized', { status: 401 })
    if (!openai.apiKey)
      return new NextResponse('OpenAI APIkey not configured', { status: 500 })
    if (!messages)
      return new NextResponse('Messages are required', { status: 400 })
    const response = await openai.chat.completions.create({
      messages: [instructionMessage, ...messages],
      model: 'gpt-3.5-turbo',
    })
    return NextResponse.json(response.choices[0].message)
  } catch (error) {
    console.log('[CODE_ERROR]', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
