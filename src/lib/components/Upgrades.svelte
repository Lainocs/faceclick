<script lang="ts">
	import { gameStore } from '../stores/gameStore'
</script>

<div class="upgrades-container">
	<div class="upgrade-section">
		<h2>Auto Clickers</h2>
		<p>You have {$gameStore.autoClickers} auto clickers</p>
		<p>Cost: {$gameStore.autoClickerCost} clicks</p>
		<button
			class="upgrade-button"
			on:click={() => gameStore.buyAutoClicker()}
			disabled={$gameStore.clicks < $gameStore.autoClickerCost}
		>
			Buy Auto Clicker
		</button>
	</div>

	<div class="upgrade-section">
		<h2>Level Up</h2>
		<p>Current Level: {$gameStore.level}</p>
		<p>Cost: {Math.floor(100 * Math.pow(1.5, $gameStore.level - 1))} clicks</p>
		<button
			class="upgrade-button"
			on:click={() => gameStore.levelUp()}
			disabled={$gameStore.clicks <
				Math.floor(100 * Math.pow(1.5, $gameStore.level - 1))}
		>
			Level Up
		</button>
	</div>
</div>

<style>
	.upgrades-container {
		display: flex;
		gap: 2rem;
		padding: 1rem;
		background-color: #f5f5f5;
		border-radius: 8px;
		margin-top: 2rem;
	}

	.upgrade-section {
		flex: 1;
		padding: 1rem;
		background-color: white;
		border-radius: 8px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	h2 {
		margin: 0 0 1rem 0;
		color: #333;
	}

	.upgrade-button {
		width: 100%;
		padding: 0.5rem;
		background-color: #2196f3;
		color: white;
		border: none;
		border-radius: 4px;
		cursor: pointer;
		transition: background-color 0.2s;
	}

	.upgrade-button:hover:not(:disabled) {
		background-color: #1976d2;
	}

	.upgrade-button:disabled {
		background-color: #ccc;
		cursor: not-allowed;
	}
</style>
