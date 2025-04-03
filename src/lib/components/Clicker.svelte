<script lang="ts">
	import { onMount } from 'svelte'
	import { gameStore } from '../stores/gameStore'

	let interval: number

	onMount(() => {
		interval = setInterval(() => {
			gameStore.autoClick()
		}, 1000)

		return () => {
			clearInterval(interval)
		}
	})
</script>

<div class="clicker-container">
	<h1>Clicker Game</h1>
	<div class="stats">
		<p>Clicks: {$gameStore.clicks}</p>
		<p>Clicks per second: {$gameStore.clicksPerSecond}</p>
		<p>Level: {$gameStore.level}</p>
	</div>
	<button
		class="click-button"
		on:click={() => gameStore.click()}
	>
		Click me!
	</button>
</div>

<style>
	.clicker-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		padding: 2rem;
	}

	.stats {
		display: flex;
		gap: 1rem;
		font-size: 1.2rem;
	}

	.click-button {
		padding: 1rem 2rem;
		font-size: 1.5rem;
		background-color: #4caf50;
		color: white;
		border: none;
		border-radius: 8px;
		cursor: pointer;
		transition: transform 0.1s;
	}

	.click-button:hover {
		background-color: #45a049;
	}

	.click-button:active {
		transform: scale(0.95);
	}
</style>
