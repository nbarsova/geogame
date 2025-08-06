export type CountryData = {
    name: string,
    capital: string
}

export type PlayerStats = {
    lastScore: number,
    highestScore: number
}

export interface GeoGameState {
    playerName: string;
    playerStats: PlayerStats | null;
    roundStarted: boolean;
    currentScore: number;
    totalRounds: number;
}

// export enum ActionTypes {
//     SET_PLAYER = 'SET_PLAYER',
//     START_ROUND = 'START_ROUND',
//     UPDATE_SCORE = 'UPDATE_SCORE',
//     FINISH_ROUND = 'FINISH_ROUND',
//     RESET_GAME = 'RESET_GAME',
// }
//
// export type GeoGameAction = {
//         type: ActionTypes.SET_PLAYER;
//         payload: { name: string; stats: PlayerStats | null };
//     }
//     | {
//     type: ActionTypes.START_ROUND;
//     payload: { totalRounds?: number };
// }
//     | {
//     type: ActionTypes.UPDATE_SCORE;
// }
//     | {
//     type: ActionTypes.FINISH_ROUND;
//     payload: { lastScore: number; highestScore: number };
// }
//     | {
//     type: ActionTypes.RESET_GAME;
// };
//
