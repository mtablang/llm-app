<script>
	import { useChat } from 'ai/svelte';

	const {
		input: openAIInput,
		handleSubmit: openAIHandleSubmit,
		messages: openAIMessages
	} = useChat({ api: '/api/chat-openai' });
	const {
		input: anthropicInput,
		handleSubmit: anthropicHandleSubmit,
		messages: anthropicMessages
	} = useChat({ api: '/api/chat-anthropic' });
	const {
		input: googleInput,
		handleSubmit: googleHandleSubmit,
		messages: googleMessages
	} = useChat({ api: '/api/chat-google' });
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<h1>Open AI (gpt-4-turbo-preview)</h1>
	<ul>
		{#each $openAIMessages as message}
			<li>{message.role}: {message.content}</li>
		{/each}
	</ul>
	<form on:submit={openAIHandleSubmit}>
		<input bind:value={$openAIInput} />
		<button type="submit">Send</button>
	</form>
</section>

<section>
	<h1>Anthropic (claude-3-opus-20240229)</h1>
	<ul>
		{#each $anthropicMessages as message}
			<li>{message.role}: {message.content}</li>
		{/each}
	</ul>
	<form on:submit={anthropicHandleSubmit}>
		<input bind:value={$anthropicInput} />
		<button type="submit">Send</button>
	</form>
</section>

<section>
	<h1>Google (gemini-pro)</h1>
	<ul>
		{#each $googleMessages as message}
			<li>{message.role}: {message.content}</li>
		{/each}
	</ul>
	<form on:submit={googleHandleSubmit}>
		<input bind:value={$googleInput} />
		<button type="submit">Send</button>
	</form>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}
</style>
