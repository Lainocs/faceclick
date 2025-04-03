<script lang="ts">
	import { onMount } from 'svelte'

	let particles: {
		x: number
		y: number
		size: number
		speed: number
		color: string
	}[] = []
	let container: HTMLDivElement
	let animationFrame: number

	const colors = ['#4CAF50', '#2196F3', '#FFC107', '#9C27B0', '#FF5722']

	function createParticle() {
		return {
			x: Math.random() * 100,
			y: Math.random() * 100,
			size: Math.random() * 3 + 1,
			speed: Math.random() * 0.2 + 0.1,
			color: colors[Math.floor(Math.random() * colors.length)],
		}
	}

	function animate() {
		particles = particles.map((particle) => ({
			...particle,
			y: (particle.y + particle.speed) % 100,
		}))
		animationFrame = requestAnimationFrame(animate)
	}

	onMount(() => {
		particles = Array.from({ length: 50 }, createParticle)
		animate()

		return () => {
			cancelAnimationFrame(animationFrame)
		}
	})
</script>

<div
	class="particle-container"
	bind:this={container}
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

	.particle {
		position: absolute;
		border-radius: 50%;
		transition: transform 0.3s ease-out;
	}
</style>
