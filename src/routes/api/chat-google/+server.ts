import { GoogleGenerativeAI } from '@google/generative-ai';
import { GoogleGenerativeAIStream, Message, StreamingTextResponse } from 'ai';

import { env } from '$env/dynamic/private';
// You may want to replace the above with a static private env variable
// for dead-code elimination and build-time type-checking:
// import { OPENAI_API_KEY } from '$env/static/private'

const genAI = new GoogleGenerativeAI(env.GOOGLE_API_KEY || '');

import type { RequestHandler } from './$types';

// convert messages from the Vercel AI SDK Format to the format
// that is expected by the Google GenAI SDK
const buildGoogleGenAIPrompt = (messages: Message[]) => ({
	contents: messages
		.filter((message) => message.role === 'user' || message.role === 'assistant')
		.map((message) => ({
			role: message.role === 'user' ? 'user' : 'model',
			parts: [{ text: message.content }]
		}))
});

export const POST = (async ({ request }) => {
	// Extract the `prompt` from the body of the request
	const { messages } = await request.json();

	const geminiStream = await genAI
		.getGenerativeModel({ model: 'gemini-pro' })
		.generateContentStream(buildGoogleGenAIPrompt(messages));

	// Convert the response into a friendly text-stream
	const stream = GoogleGenerativeAIStream(geminiStream);

	// Respond with the stream
	return new StreamingTextResponse(stream);
}) satisfies RequestHandler;
