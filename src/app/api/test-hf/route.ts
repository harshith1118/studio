import { NextResponse } from 'next/server';
import { HfInference } from '@huggingface/inference';

export async function GET() {
  try {
    // Test with a simple model
    const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);
    
    // Log API key status
    console.log('API Key present:', !!process.env.HUGGINGFACE_API_KEY);
    if (process.env.HUGGINGFACE_API_KEY) {
      console.log('API Key length:', process.env.HUGGINGFACE_API_KEY.length);
    }
    
    // Simple feature extraction test
    const result = await hf.featureExtraction({
      model: 'sentence-transformers/all-MiniLM-L6-v2',
      inputs: 'Hello world'
    });
    
    return NextResponse.json({ 
      success: true, 
      result: result ? 'Feature extraction successful' : 'No result',
      apiKeyPresent: !!process.env.HUGGINGFACE_API_KEY
    });
  } catch (error) {
    console.error('Hugging Face test error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message,
      apiKeyPresent: !!process.env.HUGGINGFACE_API_KEY
    });
  }
}

export const runtime = 'nodejs';