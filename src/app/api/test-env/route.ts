import { NextResponse } from 'next/server';

export async function GET() {
  // Log environment variables for debugging (without revealing the actual key)
  console.log('API Key present:', !!process.env.HUGGINGFACE_API_KEY);
  if (process.env.HUGGINGFACE_API_KEY) {
    console.log('API Key length:', process.env.HUGGINGFACE_API_KEY.length);
  }

  return NextResponse.json({ 
    apiKeyPresent: !!process.env.HUGGINGFACE_API_KEY,
    apiKeyLength: process.env.HUGGINGFACE_API_KEY ? process.env.HUGGINGFACE_API_KEY.length : 0
  });
}

export const runtime = 'nodejs';