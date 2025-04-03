<script lang="ts">
	import { gameStore } from '../stores/gameStore'
</script>

<div class="achievements-container">
	<h2>Achievements</h2>
	<div class="achievements-grid">
		<div
			class="achievement"
			class:unlocked={$gameStore.achievements.clicks1000}
		>
			<svg
				viewBox="0 0 100 100"
				class="achievement-icon"
			>
				<circle
					cx="50"
					cy="50"
					r="45"
					fill={$gameStore.achievements.clicks1000 ? '#FFD700' : '#ccc'}
				/>
				<text
					x="50"
					y="60"
					text-anchor="middle"
					fill="white"
					font-size="40">1K</text
				>
			</svg>
			<span>1000 Clicks</span>
		</div>
		<div
			class="achievement"
			class:unlocked={$gameStore.achievements.clicks10000}
		>
			<svg
				viewBox="0 0 100 100"
				class="achievement-icon"
			>
				<circle
					cx="50"
					cy="50"
					r="45"
					fill={$gameStore.achievements.clicks10000 ? '#FFD700' : '#ccc'}
				/>
				<text
					x="50"
					y="60"
					text-anchor="middle"
					fill="white"
					font-size="40">10K</text
				>
			</svg>
			<span>10000 Clicks</span>
		</div>
		<div
			class="achievement"
			class:unlocked={$gameStore.achievements.autoClickers10}
		>
			<svg
				viewBox="0 0 100 100"
				class="achievement-icon"
			>
				<circle
					cx="50"
					cy="50"
					r="45"
					fill={$gameStore.achievements.autoClickers10 ? '#FFD700' : '#ccc'}
				/>
				<text
					x="50"
					y="60"
					text-anchor="middle"
					fill="white"
					font-size="40">10</text
				>
			</svg>
			<span>10 Auto-Clickers</span>
		</div>
		<div
			class="achievement"
			class:unlocked={$gameStore.achievements.level10}
		>
			<svg
				viewBox="0 0 100 100"
				class="achievement-icon"
			>
				<circle
					cx="50"
					cy="50"
					r="45"
					fill={$gameStore.achievements.level10 ? '#FFD700' : '#ccc'}
				/>
				<text
					x="50"
					y="60"
					text-anchor="middle"
					fill="white"
					font-size="40">10</text
				>
			</svg>
			<span>Level 10</span>
		</div>
	</div>
</div>

<style>
	.achievements-container {
		margin-top: 2rem;
		padding: 1rem;
		background: rgba(255, 255, 255, 0.9);
		border-radius: 8px;
	}

	h2 {
		text-align: center;
		color: #333;
		margin-bottom: 1rem;
	}

	.achievements-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
		gap: 1rem;
		justify-items: center;
	}

	.achievement {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
		opacity: 0.5;
		transition: all 0.3s ease;
	}

	.achievement.unlocked {
		opacity: 1;
		transform: scale(1.05);
	}

	.achievement-icon {
		width: 60px;
		height: 60px;
		filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
	}

	span {
		font-size: 0.9rem;
		text-align: center;
		color: #666;
	}
</style>
