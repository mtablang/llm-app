import Anthropic from '@anthropic-ai/sdk';
import { AnthropicStream, StreamingTextResponse } from 'ai';

import { env } from '$env/dynamic/private';
// You may want to replace the above with a static private env variable
// for dead-code elimination and build-time type-checking:
// import { OPENAI_API_KEY } from '$env/static/private'

// Create an Anthropic API client (that's edge friendly)
const anthropic = new Anthropic({
	apiKey: env.ANTHROPIC_API_KEY || ''
});
import type { RequestHandler } from './$types';

export const POST = (async ({ request }) => {
	// Extract the `prompt` from the body of the request
	const { messages } = await request.json();

	const response = await anthropic.messages.create({
		messages,
		model: 'claude-3-opus-20240229',
		stream: true,
		max_tokens: 300
	});

	// Convert the response into a friendly text-stream
	const stream = AnthropicStream(response);

	// Respond with the stream
	return new StreamingTextResponse(stream);
}) satisfies RequestHandler;
