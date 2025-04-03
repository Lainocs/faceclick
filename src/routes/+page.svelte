<script lang="ts">
	import Achievements from '$lib/components/Achievements.svelte'
	import ClickableCharacter from '$lib/components/ClickableCharacter.svelte'
	import ClickAnimation from '$lib/components/ClickAnimation.svelte'
	import Clicker from '$lib/components/Clicker.svelte'
	import ParticleBackground from '$lib/components/ParticleBackground.svelte'
	import Upgrades from '$lib/components/Upgrades.svelte'
</script>

<ParticleBackground />
<ClickAnimation />

<main>
	<div class="game-container">
		<svg
			class="decoration top-left"
			viewBox="0 0 100 100"
		>
			<path
				d="M10,50 Q30,30 50,50 T90,50"
				fill="none"
				stroke="#4CAF50"
				stroke-width="2"
			/>
			<circle
				cx="50"
				cy="50"
				r="5"
				fill="#4CAF50"
			/>
		</svg>
		<svg
			class="decoration top-right"
			viewBox="0 0 100 100"
		>
			<path
				d="M10,50 Q30,70 50,50 T90,50"
				fill="none"
				stroke="#2196F3"
				stroke-width="2"
			/>
			<circle
				cx="50"
				cy="50"
				r="5"
				fill="#2196F3"
			/>
		</svg>
		<Clicker />
		<ClickableCharacter />
		<Upgrades />
		<Achievements />
	</div>
</main>

<style>
	main {
		max-width: 800px;
		margin: 0 auto;
		padding: 2rem;
		position: relative;
	}

	.game-container {
		background: rgba(255, 255, 255, 0.9);
		border-radius: 16px;
		padding: 2rem;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
		position: relative;
		overflow: hidden;
	}

	.decoration {
		position: absolute;
		width: 100px;
		height: 100px;
		opacity: 0.6;
	}

	.top-left {
		top: -20px;
		left: -20px;
		transform: rotate(-15deg);
	}

	.top-right {
		top: -20px;
		right: -20px;
		transform: rotate(15deg);
	}

	:global(body) {
		background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
		min-height: 100vh;
		margin: 0;
		font-family:
			system-ui,
			-apple-system,
			BlinkMacSystemFont,
			'Segoe UI',
			Roboto,
			sans-serif;
	}
</style>
