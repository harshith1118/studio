import { NextResponse } from 'next/server';
import { generateAIResponseWithGroqAndCircuitBreaker } from '../../../ai/groq-service';

console.log('API route loaded');

export async function POST(request: Request) {
  console.log('POST request received');
  
  try {
    const { prompt } = await request.json();
    console.log('Prompt received:', prompt);
    
    if (!prompt) {
      console.log('No prompt provided');
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }
    
    // Generate response using Groq with advanced retry logic and circuit breaker
    console.log('Generating AI response using Groq with circuit breaker...');
    const result = await generateAIResponseWithGroqAndCircuitBreaker(prompt);
    console.log('AI response generated:', result);
    
    return NextResponse.json({ result });
  } catch (error) {
    console.error('AI generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate response' },
      { status: 500 }
    );
  }
}

export const runtime = 'nodejs';