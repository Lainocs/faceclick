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
		<div class="stat-item">
			<span class="stat-label">Clicks:</span>
			<span class="stat-value">{$gameStore.clicks}</span>
		</div>
		<div class="stat-item">
			<span class="stat-label">Clicks per second:</span>
			<span class="stat-value">{$gameStore.clicksPerSecond}</span>
		</div>
		<div class="stat-item">
			<span class="stat-label">Level:</span>
			<span class="stat-value">{$gameStore.level}</span>
		</div>
		<div class="stat-item">
			<span class="stat-label">Click power:</span>
			<span class="stat-value">{$gameStore.clickPower}</span>
		</div>
	</div>
</div>

<style>
	.clicker-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		padding: 1rem;
	}

	h1 {
		color: #333;
		margin: 0;
		font-size: 2rem;
	}

	.stats {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 1rem;
		width: 100%;
		max-width: 600px;
	}

	.stat-item {
		background: rgba(255, 255, 255, 0.8);
		padding: 0.8rem;
		border-radius: 8px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.stat-label {
		font-weight: 500;
		color: #555;
	}

	.stat-value {
		font-weight: bold;
		color: #2196f3;
		font-size: 1.2rem;
	}
</style>
