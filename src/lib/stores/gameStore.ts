import { writable } from 'svelte/store'

export interface GameState {
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
	combo: number
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
	combo: 0,
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
				const newClicks = state.clicks + amount
				const newTotalClicks = state.totalClicks + amount

				// Update combo
				const newCombo = state.combo + 1

				// Check achievements
				const newAchievements = { ...state.achievements }
				if (newTotalClicks >= 1000 && !newAchievements.clicks1000) {
					newAchievements.clicks1000 = true
				}
				if (newTotalClicks >= 10000 && !newAchievements.clicks10000) {
					newAchievements.clicks10000 = true
				}

				return {
					...state,
					clicks: newClicks,
					totalClicks: newTotalClicks,
					combo: newCombo,
					achievements: newAchievements,
				}
			}),
		buyAutoClicker: () =>
			update((state) => {
				if (state.clicks >= state.autoClickerCost) {
					const newAutoClickers = state.autoClickers + 1
					const newCost = Math.floor(state.autoClickerCost * 1.25)
					return {
						...state,
						clicks: state.clicks - state.autoClickerCost,
						autoClickers: newAutoClickers,
						autoClickerCost: newCost,
						clicksPerSecond: newAutoClickers * state.autoClickerPower,
						achievements: {
							...state.achievements,
							autoClickers10:
								newAutoClickers >= 10 || state.achievements.autoClickers10,
						},
					}
				}
				return state
			}),
		levelUp: () =>
			update((state) => {
				const newLevel = state.level + 1
				const cost = Math.floor(50 * Math.pow(1.2, newLevel - 1))
				if (state.clicks >= cost) {
					const newClickPower = Math.floor(
						1 + newLevel * 0.5 + Math.pow(1.1, newLevel - 1)
					)
					return {
						...state,
						clicks: state.clicks - cost,
						level: newLevel,
						clickPower: newClickPower,
						autoClickerPower: newClickPower,
						clicksPerSecond: state.autoClickers * newClickPower,
						achievements: {
							...state.achievements,
							level10: newLevel >= 10 || state.achievements.level10,
						},
					}
				}
				return state
			}),
		autoClick: () =>
			update((state) => {
				const newClicks =
					state.clicks + state.autoClickers * state.autoClickerPower
				const newTotalClicks =
					state.totalClicks + state.autoClickers * state.autoClickerPower
				return {
					...state,
					clicks: newClicks,
					totalClicks: newTotalClicks,
					achievements: {
						...state.achievements,
						clicks1000: newTotalClicks >= 1000 || state.achievements.clicks1000,
						clicks10000:
							newTotalClicks >= 10000 || state.achievements.clicks10000,
					},
				}
			}),
		resetCombo: () =>
			update((state) => ({
				...state,
				combo: 0,
			})),
	}
}

export const gameStore = createGameStore()
