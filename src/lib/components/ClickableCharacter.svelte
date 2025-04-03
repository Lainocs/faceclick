<script lang="ts">
	import { gameStore } from '../stores/gameStore'

	let isAnimating = false
	let scale = 1
	let rotation = 0
	let lastClickTime = 0
	let combo = 0

	function handleClick() {
		const now = Date.now()
		if (now - lastClickTime < 1000) {
			combo++
		} else {
			combo = 1
		}
		lastClickTime = now

		isAnimating = true
		scale = 1.2
		rotation = Math.random() * 20 - 10

		// Bonus clicks based on combo
		const bonusClicks = Math.floor(combo * 1.5)
		gameStore.addBonusClicks(bonusClicks)

		setTimeout(() => {
			isAnimating = false
			scale = 1
			rotation = 0
		}, 200)
	}

	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault()
			handleClick()
		}
	}
</script>

<div
	class="character-container"
	on:click={handleClick}
	on:keydown={handleKeyDown}
	tabindex="0"
	role="button"
	aria-label="Clickable character for bonus clicks"
>
	<svg
		class="character"
		viewBox="0 0 100 100"
		style="transform: scale({scale}) rotate({rotation}deg)"
	>
		<!-- Face -->
		<circle
			cx="50"
			cy="50"
			r="45"
			fill="#FFD700"
		/>

		<!-- Eyes -->
		<circle
			cx="35"
			cy="40"
			r="5"
			fill="#000"
		/>
		<circle
			cx="65"
			cy="40"
			r="5"
			fill="#000"
		/>

		<!-- Smile -->
		<path
			d="M30,60 Q50,75 70,60"
			fill="none"
			stroke="#000"
			stroke-width="3"
		/>

		<!-- Sparkles -->
		<g
			class="sparkles"
			class:animate={isAnimating}
		>
			<circle
				cx="20"
				cy="20"
				r="2"
				fill="#FF69B4"
			>
				<animate
					attributeName="opacity"
					values="0;1;0"
					dur="0.5s"
					repeatCount="1"
				/>
			</circle>
			<circle
				cx="80"
				cy="20"
				r="2"
				fill="#FF69B4"
			>
				<animate
					attributeName="opacity"
					values="0;1;0"
					dur="0.5s"
					repeatCount="1"
				/>
			</circle>
		</g>
	</svg>
	{#if combo > 1}
		<div
			class="combo-text"
			class:animate={isAnimating}
		>
			{combo}x Combo!
		</div>
	{/if}
</div>

<style>
	.character-container {
		cursor: pointer;
		user-select: none;
		position: relative;
		width: 150px;
		height: 150px;
		margin: 1rem auto;
		outline: none;
	}

	.character-container:focus {
		box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.5);
		border-radius: 50%;
	}

	.character {
		transition: transform 0.2s ease-out;
		filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
	}

	.sparkles {
		opacity: 0;
	}

	.sparkles.animate {
		opacity: 1;
	}

	.combo-text {
		position: absolute;
		top: -20px;
		left: 50%;
		transform: translateX(-50%);
		color: #ff69b4;
		font-weight: bold;
		font-size: 1.2rem;
		opacity: 0;
		transition: opacity 0.2s;
	}

	.combo-text.animate {
		opacity: 1;
	}
</style>
