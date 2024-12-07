import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    lastScore: 0,
    bestScore: 0,
    currentScore: 0,
    gameState: 1,
    maze: [],
    xCord: -1,
    zCord: 1,
    axis: 0,
    isLose: false
};

const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        updateScore(state) {
            state.currentScore += 1;
        },
        gameStopedByDeath(state) {
            state.lastScore = state.currentScore;
            if(state.bestScore <= state.currentScore)
                state.bestScore = state.currentScore;

            state.gameState = 0;
        },
        gameStarted(state) {
            if(state.gameState == 0)
                state.gameState = 1;
            else
                console.warn("Game is not rendered!");
        },
        gameRendered(state) {
            console.log("gameRendered");
            if(state.gameState == -1)
                state.gameState = 0;
            else
                console.warn("WTH, it couldn't work");
        },
        mazeUpdate(state, action) {
            action.payload.generateMaze();
            state.maze = action.payload.grid;
            state.axis = -90;
            updateCords({x: state.xCord, z: state.zCord})
        },
        updateCords(state, action) {
            state.xCord = action.payload["x"];
            state.zCord = action.payload["z"];
        },
        updateAxis(state, action) {
            state.axis = action.payload;
        },
        checkMistake(state) {
            if(state.maze[state.x] == undefined || state.maze[state.x][state.z] == undefined) {
                console.log("Not in the plate")
                // console.log("State maze x: " + state.maze[state.x]);
                // console.log("State maze z: " + state.maze[state.x][state.z]);

                return;
            }
            if(state.maze[state.x][state.z] == 1) {
                console.log("Lost");

                state.isLose = true;
            }
        }

    }
})

export const { updateScore, gameStopedByDeath, gameStarted, gameRendered, mazeUpdate, updateCords, updateAxis, checkMistake } = gameSlice.actions;
export default gameSlice.reducer;