<script lang="ts">
	import { gameStore } from '../stores/gameStore'

	let isAnimating = false
	let scale = 1
	let rotation = 0
	let lastClickTime = 0
	let showConfetti = false
	let showExplosion = false
	let showText = false
	let showGun = false
	let explosionText = ''
	let face: any = {}
	let tempFace: any = null
	let faceTimeout: number | null = null

	function handleClick() {
		const now = Date.now()
		if (now - lastClickTime < 1000) {
			gameStore.addBonusClicks(1)
		} else {
			gameStore.resetCombo()
			gameStore.addBonusClicks(1)
		}
		lastClickTime = now

		isAnimating = true
		scale = 1.2
		rotation = Math.random() * 20 - 10

		// Set temporary face based on combo level
		if ($gameStore.combo >= 15) {
			tempFace = getFaceForCombo(15)
			showExplosion = true
			showText = true
			showGun = true
			explosionText = 'UNSTOPPABLE!'
			setTimeout(() => {
				showExplosion = false
				showText = false
				showGun = false
			}, 3000)
		} else if ($gameStore.combo >= 10) {
			tempFace = getFaceForCombo(10)
			showExplosion = true
			showText = true
			showGun = true
			explosionText = 'DOMINATING!'
			setTimeout(() => {
				showExplosion = false
				showText = false
				showGun = false
			}, 3000)
		} else if ($gameStore.combo >= 7) {
			tempFace = getFaceForCombo(7)
			showConfetti = true
			showText = true
			showGun = true
			explosionText = 'RAMPAGE!'
			setTimeout(() => {
				showConfetti = false
				showText = false
				showGun = false
			}, 3000)
		} else if ($gameStore.combo >= 5) {
			tempFace = getFaceForCombo(5)
			showConfetti = true
			showGun = true
			setTimeout(() => {
				showConfetti = false
				showGun = false
			}, 2500)
		} else if ($gameStore.combo >= 3) {
			tempFace = getFaceForCombo(3)
			showConfetti = true
			setTimeout(() => {
				showConfetti = false
			}, 2000)
		}

		// Reset face after a delay
		if (faceTimeout) {
			clearTimeout(faceTimeout)
		}
		faceTimeout = setTimeout(() => {
			tempFace = null
		}, 1500) // Return to normal face after 1.5 seconds

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

	// Get face based on combo level
	function getFaceForCombo(comboLevel: number) {
		if (comboLevel >= 15) {
			return {
				eyes: 'M30,35 Q35,25 40,35 M60,35 Q65,25 70,35',
				mouth: 'M30,65 Q50,100 70,65',
				color: '#FF0000',
				tongue: 'M45,65 Q50,75 55,65',
				eyebrows: 'M25,30 L35,30 M65,30 L75,30',
				hearts: true,
				tears: true,
			}
		} else if (comboLevel >= 10) {
			return {
				eyes: 'M30,40 Q35,30 40,40 M60,40 Q65,30 70,40',
				mouth: 'M30,60 Q50,90 70,60',
				color: '#FF4500',
				tongue: 'M45,60 Q50,70 55,60',
				eyebrows: 'M25,35 L35,35 M65,35 L75,35',
				hearts: true,
			}
		} else if (comboLevel >= 7) {
			return {
				eyes: 'M35,40 L40,40 M60,40 L65,40',
				mouth: 'M30,60 Q50,85 70,60',
				color: '#FF69B4',
				tongue: 'M45,60 Q50,70 55,60',
				eyebrows: 'M25,35 L35,35 M65,35 L75,35',
				hearts: true,
			}
		} else if (comboLevel >= 5) {
			return {
				eyes: 'M35,40 L40,40 M60,40 L65,40',
				mouth: 'M30,60 Q50,80 70,60',
				color: '#FF69B4',
				eyebrows: 'M25,35 L35,35 M65,35 L75,35',
				hearts: true,
			}
		} else if (comboLevel >= 3) {
			return {
				eyes: 'M35,40 L40,40 M60,40 L65,40',
				mouth: 'M30,60 Q50,70 70,60',
				color: '#FFD700',
				eyebrows: 'M25,35 L35,35 M65,35 L75,35',
			}
		} else {
			return {
				eyes: 'M35,40 L40,40 M60,40 L65,40',
				mouth: 'M30,60 Q50,75 70,60',
				color: '#FFD700',
			}
		}
	}

	// Get the current face to display
	function getFace() {
		// If there's a temporary face, use it
		if (tempFace) {
			return tempFace
		}

		// Otherwise use the normal face based on combo
		return getFaceForCombo($gameStore.combo)
	}

	$: {
		face = getFace()
		console.log('Combo:', $gameStore.combo, 'Face:', face)
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
	<!-- Over-the-top background effects -->
	{#if showConfetti}
		<div class="effects-container confetti-container">
			{#each Array(200) as _, i}
				<div
					class="confetti"
					style="--delay: {i * 0.01}s; --angle: {Math.random() *
						360}deg; --color: {[
						'#FF69B4',
						'#FFD700',
						'#FF4500',
						'#FF0000',
						'#FF1493',
						'#00FFFF',
						'#FF00FF',
						'#FFFF00',
						'#00FF00',
						'#0000FF',
						'#FF00FF',
						'#FFFFFF',
					][Math.floor(Math.random() * 12)]}; --size: {Math.random() * 30 +
						10}px; --distance: {Math.random() * 300 + 150}px"
				></div>
			{/each}
		</div>
	{/if}

	{#if showExplosion}
		<div class="effects-container explosion-container">
			{#each Array(5) as _, i}
				<div
					class="explosion"
					style="--delay: {i * 0.1}s"
				></div>
			{/each}
			{#each Array(100) as _, i}
				<div
					class="explosion-particle"
					style="--delay: {i * 0.02}s; --angle: {Math.random() *
						360}deg; --color: {['#FF4500', '#FF0000', '#FFD700', '#FFFFFF'][
						Math.floor(Math.random() * 4)
					]}; --size: {Math.random() * 10 + 5}px; --distance: {Math.random() *
						150 +
						50}px"
				></div>
			{/each}
		</div>
	{/if}

	{#if showText}
		<div class="effects-container text-container">
			<div
				class="combo-text-large"
				style="--delay: 0.1s"
			>
				{explosionText}
			</div>
		</div>
	{/if}

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
			fill={face.color}
		/>

		<!-- Eyebrows -->
		{#if face.eyebrows}
			<path
				d={face.eyebrows}
				fill="none"
				stroke="#000"
				stroke-width="2"
				stroke-linecap="round"
			/>
		{/if}

		<!-- Eyes -->
		<path
			d={face.eyes}
			fill="none"
			stroke="#000"
			stroke-width="3"
			stroke-linecap="round"
		/>

		<!-- Mouth -->
		<path
			d={face.mouth}
			fill="none"
			stroke="#000"
			stroke-width="3"
		/>

		<!-- Tongue -->
		{#if face.tongue}
			<path
				d={face.tongue}
				fill="#FF69B4"
				stroke="#000"
				stroke-width="1"
			/>
		{/if}

		<!-- Hearts in eyes -->
		{#if face.hearts}
			<g class="hearts">
				<path
					d="M35,35 Q35,30 40,35 Q45,40 40,45 Q35,50 30,45 Q25,40 30,35 Q35,30 35,35"
					fill="#FF0000"
					stroke="#000"
					stroke-width="1"
				>
					<animate
						attributeName="opacity"
						values="0;1;0"
						dur="1s"
						repeatCount="indefinite"
					/>
				</path>
				<path
					d="M65,35 Q65,30 70,35 Q75,40 70,45 Q65,50 60,45 Q55,40 60,35 Q65,30 65,35"
					fill="#FF0000"
					stroke="#000"
					stroke-width="1"
				>
					<animate
						attributeName="opacity"
						values="0;1;0"
						dur="1s"
						repeatCount="indefinite"
					/>
				</path>
			</g>
		{/if}

		<!-- Tears -->
		{#if face.tears}
			<g class="tears">
				<path
					d="M40,45 Q40,55 40,65"
					fill="none"
					stroke="#00FFFF"
					stroke-width="2"
					stroke-dasharray="2,2"
				>
					<animate
						attributeName="d"
						values="M40,45 Q40,55 40,65;M40,45 Q40,55 40,75;M40,45 Q40,55 40,65"
						dur="1s"
						repeatCount="indefinite"
					/>
				</path>
				<path
					d="M60,45 Q60,55 60,65"
					fill="none"
					stroke="#00FFFF"
					stroke-width="2"
					stroke-dasharray="2,2"
				>
					<animate
						attributeName="d"
						values="M60,45 Q60,55 60,65;M60,45 Q60,55 60,75;M60,45 Q60,55 60,65"
						dur="1s"
						repeatCount="indefinite"
					/>
				</path>
			</g>
		{/if}

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
	{#if $gameStore.combo > 1}
		<div
			class="combo-text"
			class:animate={isAnimating}
		>
			{$gameStore.combo}x Combo!
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
		z-index: 1;
	}

	.character-container:focus {
		box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.5);
		border-radius: 50%;
	}

	.character {
		transition: transform 0.2s ease-out;
		filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
		position: relative;
		z-index: 2;
	}

	.sparkles {
		opacity: 0;
	}

	.sparkles.animate {
		opacity: 1;
	}

	.hearts {
		opacity: 0.8;
	}

	.tears {
		opacity: 0.8;
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
		z-index: 3;
	}

	.combo-text.animate {
		opacity: 1;
	}

	.effects-container {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
		z-index: 0;
		overflow: visible;
	}

	.confetti-container {
		width: 300px;
		height: 300px;
		top: -75px;
		left: -75px;
	}

	.confetti {
		position: absolute;
		width: var(--size);
		height: var(--size);
		background-color: var(--color);
		top: 50%;
		left: 50%;
		transform: rotate(var(--angle));
		animation: confetti-fall 1.5s ease-out forwards;
		animation-delay: var(--delay);
		opacity: 0;
		border-radius: 50%;
	}

	@keyframes confetti-fall {
		0% {
			transform: translate(-50%, -50%) rotate(var(--angle));
			opacity: 1;
		}
		100% {
			transform: translate(
					calc(-50% + var(--distance) * cos(var(--angle))),
					calc(-50% + var(--distance) * sin(var(--angle)))
				)
				rotate(calc(var(--angle) + 720deg));
			opacity: 0;
		}
	}

	.explosion-container {
		width: 300px;
		height: 300px;
		top: -75px;
		left: -75px;
	}

	.explosion {
		position: absolute;
		width: 200px;
		height: 200px;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background: radial-gradient(
			circle,
			rgba(255, 69, 0, 0.8) 0%,
			rgba(255, 0, 0, 0.6) 50%,
			rgba(255, 215, 0, 0.4) 100%
		);
		border-radius: 50%;
		animation: explosion-grow 0.5s ease-out forwards;
		animation-delay: var(--delay);
		opacity: 0;
		z-index: 0;
	}

	.explosion-particle {
		position: absolute;
		width: var(--size);
		height: var(--size);
		background-color: var(--color);
		top: 50%;
		left: 50%;
		transform: rotate(var(--angle));
		animation: explosion-particle 0.8s ease-out forwards;
		animation-delay: var(--delay);
		opacity: 0;
		border-radius: 50%;
	}

	@keyframes explosion-grow {
		0% {
			transform: translate(-50%, -50%) scale(0);
			opacity: 1;
		}
		100% {
			transform: translate(-50%, -50%) scale(1.5);
			opacity: 0;
		}
	}

	@keyframes explosion-particle {
		0% {
			transform: translate(-50%, -50%) rotate(var(--angle));
			opacity: 1;
		}
		100% {
			transform: translate(
					calc(-50% + var(--distance) * cos(var(--angle))),
					calc(-50% + var(--distance) * sin(var(--angle)))
				)
				rotate(calc(var(--angle) + 360deg));
			opacity: 0;
		}
	}

	.text-container {
		width: 100vw;
		height: 100vh;
		top: -50vh;
		left: -50vw;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.combo-text-large {
		font-size: 5rem;
		font-weight: 900;
		color: #ffd700;
		text-shadow:
			0 0 10px #ff4500,
			0 0 20px #ff4500,
			0 0 30px #ff4500;
		animation: text-pop 1s ease-out forwards;
		animation-delay: var(--delay);
		opacity: 0;
		transform: scale(0);
		text-transform: uppercase;
		letter-spacing: 2px;
		z-index: 10;
	}

	@keyframes text-pop {
		0% {
			opacity: 0;
			transform: scale(0);
		}
		50% {
			opacity: 1;
			transform: scale(1.2);
		}
		100% {
			opacity: 0;
			transform: scale(1);
		}
	}
</style>
