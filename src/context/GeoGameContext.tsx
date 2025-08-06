import {type ActionDispatch, createContext, useReducer} from 'react';

const initialState: any = {
    playerName: '',
    playerStats: null,
    roundStarted: false,
    currentScore: 0,
    totalRounds: 0,
};

const gameReducer = (state: any, action: any) => {
    switch (action.type) {
        // case ActionTypes.SET_PLAYER: {
        //     const { name, stats } = action.payload;
        //     return {
        //         ...state,
        //         playerName: name,
        //         playerStats: stats,
        //     };
        // }
        // case ActionTypes.START_ROUND:
        //     return {
        //         ...state,
        //         roundStarted: true,
        //         currentScore: 0,
        //         totalRounds: action.payload.totalRounds || 0,
        //     };
        // case ActionTypes.UPDATE_SCORE:
        //     return {
        //         ...state,
        //         currentScore: state.currentScore + 1,
        //     };
        // case ActionTypes.FINISH_ROUND: {
        //     const { lastScore, highestScore } = action.payload;
        //     return {
        //         ...state,
        //         roundStarted: false,
        //         playerStats: {
        //             lastScore,
        //             highestScore,
        //         },
        //     };
        // }
        // case ActionTypes.RESET_GAME:
        //     return initialState;
        default:
            return state;
    }
};


const GeoGameStateContext = createContext(undefined);
const GeoGameDispatchContext = createContext<ActionDispatch<any>| undefined>(undefined);


export const GeoGameProvider = ({ children }: {children: any}) => {
    const [state, dispatch] = useReducer(gameReducer, initialState);

    return (
        <GeoGameStateContext.Provider value={state}>
            <GeoGameDispatchContext.Provider value={dispatch}>
                {children}
            </GeoGameDispatchContext.Provider>
        </GeoGameStateContext.Provider>
    );
};


