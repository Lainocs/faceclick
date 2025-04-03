<script lang="ts">
	import { gameStore } from '../stores/gameStore'

	let clickParticles: {
		id: number
		x: number
		y: number
		size: number
		color: string
	}[] = []
	let nextId = 0

	function createClickParticle(event: MouseEvent) {
		const colors = ['#4CAF50', '#2196F3', '#FFC107', '#9C27B0', '#FF5722']
		const particle = {
			id: nextId++,
			x: event.clientX,
			y: event.clientY,
			size: Math.random() * 10 + 5,
			color: colors[Math.floor(Math.random() * colors.length)],
		}
		clickParticles = [...clickParticles, particle]
		setTimeout(() => {
			clickParticles = clickParticles.filter((p) => p.id !== particle.id)
		}, 1000)
	}

	$: if ($gameStore.clicks) {
		// This will trigger on every click due to store update
		const event = window.event as MouseEvent
		if (event) {
			createClickParticle(event)
		}
	}
</script>

<div class="click-animations">
	{#each clickParticles as particle (particle.id)}
		<div
			class="click-particle"
			style="
                left: {particle.x}px;
                top: {particle.y}px;
                width: {particle.size}px;
                height: {particle.size}px;
                background-color: {particle.color};
            "
		></div>
	{/each}
</div>

<style>
	.click-animations {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
		z-index: 1000;
	}

	.click-particle {
		position: absolute;
		border-radius: 50%;
		animation: particle-animation 1s ease-out forwards;
		transform: translate(-50%, -50%);
	}

	@keyframes particle-animation {
		0% {
			transform: translate(-50%, -50%) scale(0);
			opacity: 1;
		}
		100% {
			transform: translate(-50%, -50%) scale(2)
				translate(
					calc(var(--random-x, 0) * 100px),
					calc(var(--random-y, 0) * 100px)
				);
			opacity: 0;
		}
	}
</style>
