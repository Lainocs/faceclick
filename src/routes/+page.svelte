<script lang="ts">
	import Achievements from '$lib/components/Achievements.svelte'
	import ClickableCharacter from '$lib/components/ClickableCharacter.svelte'
	import ClickAnimation from '$lib/components/ClickAnimation.svelte'
	import Clicker from '$lib/components/Clicker.svelte'
	import ParticleBackground from '$lib/components/ParticleBackground.svelte'
	import Upgrades from '$lib/components/Upgrades.svelte'
	import { onMount } from 'svelte'

	let showTitle = false
	let showSubtitle = false

	onMount(() => {
		setTimeout(() => {
			showTitle = true
		}, 500)

		setTimeout(() => {
			showSubtitle = true
		}, 1500)
	})
</script>

<ParticleBackground />
<ClickAnimation />

<main>
	<div class="game-container">
		<div class="title-container">
			<h1
				class="game-title"
				class:visible={showTitle}
			>
				CLICKER RIGOLO
			</h1>
			<p
				class="game-subtitle"
				class:visible={showSubtitle}
			>
				THE MOST EPIC CLICKER EVER!
			</p>
		</div>

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
		<svg
			class="decoration bottom-left"
			viewBox="0 0 100 100"
		>
			<path
				d="M10,50 Q30,30 50,50 T90,50"
				fill="none"
				stroke="#FF69B4"
				stroke-width="2"
			/>
			<circle
				cx="50"
				cy="50"
				r="5"
				fill="#FF69B4"
			/>
		</svg>
		<svg
			class="decoration bottom-right"
			viewBox="0 0 100 100"
		>
			<path
				d="M10,50 Q30,70 50,50 T90,50"
				fill="none"
				stroke="#FFD700"
				stroke-width="2"
			/>
			<circle
				cx="50"
				cy="50"
				r="5"
				fill="#FFD700"
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
		border: 3px solid #ffd700;
		animation: container-pulse 3s infinite alternate;
	}

	@keyframes container-pulse {
		0% {
			box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
		}
		100% {
			box-shadow: 0 0 20px rgba(255, 215, 0, 0.7);
		}
	}

	.title-container {
		text-align: center;
		margin-bottom: 2rem;
	}

	.game-title {
		font-size: 3.5rem;
		font-weight: 900;
		color: #ff4500;
		text-transform: uppercase;
		letter-spacing: 5px;
		margin: 0;
		opacity: 0;
		transform: scale(0.5);
		transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
		text-shadow:
			0 0 10px rgba(255, 69, 0, 0.8),
			0 0 20px rgba(255, 69, 0, 0.6),
			0 0 30px rgba(255, 69, 0, 0.4);
	}

	.game-title.visible {
		opacity: 1;
		transform: scale(1);
	}

	.game-subtitle {
		font-size: 1.5rem;
		font-weight: 700;
		color: #ffd700;
		margin: 0.5rem 0 0;
		opacity: 0;
		transform: translateY(20px);
		transition: all 0.5s ease-out;
		text-shadow:
			0 0 5px rgba(255, 215, 0, 0.8),
			0 0 10px rgba(255, 215, 0, 0.6);
	}

	.game-subtitle.visible {
		opacity: 1;
		transform: translateY(0);
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

	.bottom-left {
		bottom: -20px;
		left: -20px;
		transform: rotate(15deg);
	}

	.bottom-right {
		bottom: -20px;
		right: -20px;
		transform: rotate(-15deg);
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
		overflow-x: hidden;
	}

	:global(::selection) {
		background-color: #ff69b4;
		color: white;
	}
</style>
