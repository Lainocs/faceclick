<script lang="ts">
	import { onMount } from 'svelte'
	import { gameStore } from '../stores/gameStore'

	let particles: {
		x: number
		y: number
		size: number
		speed: number
		color: string
	}[] = []
	let messages: {
		text: string
		x: number
		y: number
		scale: number
		rotation: number
		opacity: number
		color: string
		id: number
	}[] = []
	let container: HTMLDivElement
	let animationFrame: number
	let messageId = 0
	let screenShake = false
	let screenShakeIntensity = 0
	let screenShakeDuration = 0

	const colors = [
		'#4CAF50',
		'#2196F3',
		'#FFC107',
		'#9C27B0',
		'#FF5722',
		'#FF69B4',
		'#FFD700',
		'#FF4500',
		'#FF0000',
	]
	const messageColors = [
		'#FF4500',
		'#FFD700',
		'#FF69B4',
		'#00FFFF',
		'#FF00FF',
		'#FFFF00',
		'#FF0000',
		'#00FF00',
		'#0000FF',
		'#FFFFFF',
	]
	const messageTexts = [
		'BOOM!',
		'POW!',
		'BAM!',
		'WHAM!',
		'KAPOW!',
		'SMACK!',
		'CRASH!',
		'BANG!',
		'ZAP!',
		'BOING!',
		'POW!',
		'BAM!',
		'WHAM!',
		'KAPOW!',
		'SMACK!',
		'CRASH!',
		'BANG!',
		'ZAP!',
		'BOING!',
		'BOOM!',
	]

	function createParticle() {
		return {
			x: Math.random() * 100,
			y: Math.random() * 100,
			size: Math.random() * 5 + 1,
			speed: Math.random() * 0.3 + 0.1,
			color: colors[Math.floor(Math.random() * colors.length)],
		}
	}

	function addMessage(text: string) {
		const x = Math.random() * 80 + 10 // 10-90%
		const y = Math.random() * 80 + 10 // 10-90%
		const scale = Math.random() * 0.8 + 0.8 // 0.8-1.6
		const rotation = Math.random() * 60 - 30 // -30 to +30 degrees
		const color =
			messageColors[Math.floor(Math.random() * messageColors.length)]

		messages = [
			...messages,
			{
				text,
				x,
				y,
				scale,
				rotation,
				opacity: 1,
				color,
				id: messageId++,
			},
		]

		// Remove message after 3 seconds
		setTimeout(() => {
			messages = messages.filter((m) => m.id !== messageId - 1)
		}, 3000)
	}

	function triggerScreenShake(intensity = 10, duration = 500) {
		screenShake = true
		screenShakeIntensity = intensity
		screenShakeDuration = duration

		setTimeout(() => {
			screenShake = false
		}, duration)
	}

	function animate() {
		// Animate particles
		particles = particles.map((particle) => ({
			...particle,
			y: (particle.y + particle.speed) % 100,
		}))

		// Animate messages
		messages = messages.map((message) => ({
			...message,
			opacity: message.opacity > 0.1 ? message.opacity - 0.005 : 0,
			y: message.y - 0.05, // Slowly float upward
		}))

		// Remove messages that have faded out
		messages = messages.filter((m) => m.opacity > 0)

		// Update screen shake
		if (screenShake && screenShakeDuration > 0) {
			screenShakeDuration -= 16 // ~60fps
			if (screenShakeDuration <= 0) {
				screenShake = false
			}
		}

		animationFrame = requestAnimationFrame(animate)
	}

	// Subscribe to game store to detect combos
	$: if ($gameStore.combo > 1) {
		// Add random message for combos
		if (Math.random() > 0.7) {
			// 30% chance to add a message
			const text = messageTexts[Math.floor(Math.random() * messageTexts.length)]
			addMessage(text)
		}

		// Add combo-specific messages for higher combos
		if ($gameStore.combo >= 15 && Math.random() > 0.8) {
			addMessage('UNSTOPPABLE!')
			triggerScreenShake(15, 800)
		} else if ($gameStore.combo >= 10 && Math.random() > 0.8) {
			addMessage('DOMINATING!')
			triggerScreenShake(12, 600)
		} else if ($gameStore.combo >= 7 && Math.random() > 0.8) {
			addMessage('RAMPAGE!')
			triggerScreenShake(10, 500)
		} else if ($gameStore.combo >= 5 && Math.random() > 0.8) {
			addMessage('COMBO!')
			triggerScreenShake(8, 400)
		} else if ($gameStore.combo >= 3 && Math.random() > 0.9) {
			triggerScreenShake(5, 300)
		}
	}

	onMount(() => {
		particles = Array.from({ length: 100 }, createParticle)
		animate()

		return () => {
			cancelAnimationFrame(animationFrame)
		}
	})
</script>

<div
	class="particle-container"
	bind:this={container}
	class:screen-shake={screenShake}
	style="--shake-intensity: {screenShakeIntensity}px;"
>
	{#each particles as particle}
		<div
			class="particle"
			style="
                left: {particle.x}%;
                top: {particle.y}%;
                width: {particle.size}px;
                height: {particle.size}px;
                background-color: {particle.color};
                opacity: {0.3 + Math.random() * 0.3};
            "
		></div>
	{/each}

	{#each messages as message}
		<div
			class="floating-message"
			style="
				left: {message.x}%;
				top: {message.y}%;
				transform: scale({message.scale}) rotate({message.rotation}deg);
				opacity: {message.opacity};
				color: {message.color};
			"
		>
			{message.text}
		</div>
	{/each}

	{#if screenShake}
		<div class="flash-overlay"></div>
	{/if}
</div>

<style>
	.particle-container {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
		z-index: -1;
		overflow: hidden;
	}

	.particle-container.screen-shake {
		animation: shake var(--shake-duration, 0.5s)
			cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
		transform: translate3d(0, 0, 0);
		backface-visibility: hidden;
		perspective: 1000px;
	}

	@keyframes shake {
		10%,
		90% {
			transform: translate3d(calc(-1 * var(--shake-intensity)), 0, 0);
		}
		20%,
		80% {
			transform: translate3d(calc(2 * var(--shake-intensity)), 0, 0);
		}
		30%,
		50%,
		70% {
			transform: translate3d(calc(-4 * var(--shake-intensity)), 0, 0);
		}
		40%,
		60% {
			transform: translate3d(calc(4 * var(--shake-intensity)), 0, 0);
		}
	}

	.particle {
		position: absolute;
		border-radius: 50%;
		transition: transform 0.3s ease-out;
	}

	.floating-message {
		position: absolute;
		font-size: 3rem;
		font-weight: 900;
		text-transform: uppercase;
		letter-spacing: 2px;
		text-shadow:
			0 0 10px rgba(255, 255, 255, 0.8),
			0 0 20px rgba(255, 255, 255, 0.6),
			0 0 30px rgba(255, 255, 255, 0.4);
		white-space: nowrap;
		pointer-events: none;
		z-index: 5;
	}

	.flash-overlay {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(255, 255, 255, 0.2);
		animation: flash 0.3s ease-out forwards;
		z-index: 4;
	}

	@keyframes flash {
		0% {
			opacity: 0.5;
		}
		100% {
			opacity: 0;
		}
	}
</style>
