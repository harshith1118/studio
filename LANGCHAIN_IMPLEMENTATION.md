# Langchain Implementation for EcoMind AI

## Overview
This project now uses Langchain for more reliable Google Gemini API calls. The implementation includes:

1. **Connection Reuse**: Singleton pattern to reuse model connections
2. **Retry Logic**: Exponential backoff retries on failures
3. **Circuit Breaker**: Prevents cascading failures during high load
4. **Timeout Handling**: Configurable timeouts for API calls
5. **Error Management**: Comprehensive error logging and fallback responses

## Architecture

### Files
- `src/ai/config.ts` - Configuration settings for the AI service
- `src/ai/langchain-service.ts` - Basic Langchain implementation
- `src/ai/langchain-service-advanced.ts` - Advanced implementation with circuit breaker
- `src/app/api/generate/route.ts` - API route using the advanced implementation

### API Route
The `/api/generate` endpoint now uses the advanced Langchain implementation with circuit breaker protection.

## Configuration
The configuration is in `src/ai/config.ts`:
- `modelName`: "gemini-1.5-flash"
- `maxOutputTokens`: 200
- `temperature`: 0.7
- `topP`: 0.9
- `maxRetries`: 3
- `timeout`: 30000ms (30 seconds)

## Circuit Breaker Pattern
The implementation uses a circuit breaker pattern:
- After 3 consecutive failures, the circuit opens
- After 30 seconds, the circuit moves to half-open state
- On success, the circuit closes and resets failure count
- While open, it returns a fallback message immediately

## Benefits over Direct API Calls
1. **Better Error Handling**: More sophisticated retry and fallback logic
2. **Reliability**: Circuit breaker prevents system overload during failures
3. **Performance**: Connection reuse reduces API call overhead
4. **Maintainability**: Centralized configuration and error handling