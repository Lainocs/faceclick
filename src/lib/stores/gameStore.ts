import { writable } from 'svelte/store'

interface GameState {
	clicks: number
	autoClickers: number
	autoClickerCost: number
	autoClickerPower: number
	level: number
	clicksPerSecond: number
	clickPower: number
	totalClicks: number
	achievements: {
		clicks1000: boolean
		clicks10000: boolean
		autoClickers10: boolean
		level10: boolean
	}
}

const initialState: GameState = {
	clicks: 0,
	autoClickers: 0,
	autoClickerCost: 10,
	autoClickerPower: 1,
	level: 1,
	clicksPerSecond: 0,
	clickPower: 1,
	totalClicks: 0,
	achievements: {
		clicks1000: false,
		clicks10000: false,
		autoClickers10: false,
		level10: false,
	},
}

function createGameStore() {
	const { subscribe, set, update } = writable<GameState>(initialState)

	return {
		subscribe,
		click: () =>
			update((state) => {
				const newTotalClicks = state.totalClicks + state.clickPower
				return {
					...state,
					clicks: state.clicks + state.clickPower,
					totalClicks: newTotalClicks,
					achievements: {
						...state.achievements,
						clicks1000: newTotalClicks >= 1000 || state.achievements.clicks1000,
						clicks10000:
							newTotalClicks >= 10000 || state.achievements.clicks10000,
					},
				}
			}),
		addBonusClicks: (amount: number) =>
			update((state) => {
				const newTotalClicks = state.totalClicks + amount
				return {
					...state,
					clicks: state.clicks + amount,
					totalClicks: newTotalClicks,
					achievements: {
						...state.achievements,
						clicks1000: newTotalClicks >= 1000 || state.achievements.clicks1000,
						clicks10000:
							newTotalClicks >= 10000 || state.achievements.clicks10000,
					},
				}
			}),
		buyAutoClicker: () =>
			update((state) => {
				if (state.clicks >= state.autoClickerCost) {
					const newAutoClickers = state.autoClickers + 1
					return {
						...state,
						clicks: state.clicks - state.autoClickerCost,
						autoClickers: newAutoClickers,
						autoClickerCost: Math.floor(state.autoClickerCost * 1.5),
						clicksPerSecond: newAutoClickers * state.autoClickerPower,
					}
				}
				return state
			}),
		levelUp: () =>
			update((state) => {
				const newLevel = state.level + 1
				const cost = Math.floor(50 * Math.pow(1.3, newLevel - 1))
				if (state.clicks >= cost) {
					const newClickPower = Math.floor(1.5 * Math.pow(1.2, newLevel - 1))
					return {
						...state,
						clicks: state.clicks - cost,
						level: newLevel,
						clickPower: newClickPower,
						autoClickerPower: newClickPower,
						clicksPerSecond: state.autoClickers * newClickPower,
					}
				}
				return state
			}),
		autoClick: () =>
			update((state) => ({
				...state,
				clicks: state.clicks + state.autoClickers * state.autoClickerPower,
			})),
	}
}

export const gameStore = createGameStore()
