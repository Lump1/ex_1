import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { gameRendered, updateCords } from '../../redux/slices/gameSlice';
import './gameStyles.css';
import { Engine } from './Engin';
import { LabGenerator } from './LabGenerator';
import { mazeUpdate, checkMistake } from '../../redux/slices/gameSlice';
import store from '../../redux/store';

const config = {
    playerImgUrl: "",
    staticY: 260
}

function useGlobalGameDispatch(functionToBeCalled) {
    console.log(functionToBeCalled);
    console.log("text")
    useDispatch(functionToBeCalled);
}

function BeforeGameRendered() {
    return (
        <div className="before-game-state-container">
            <button id='buttonToStartGame' onClick={useGlobalGameDispatch(gameRendered())}>Render game</button>
        </div>
    );
}

function IdleMenu(props) {
    const gameSelector = useSelector(state => state.game);

    return(
        <div className="idle-game-state-container">
            <button>Start</button>
            <p>Last Score: {gameSelector.lastScore}</p>
            <p>Best Score: {gameSelector.bestScore}</p>
        </div>
    );
}

function Player() {
    const [jumpPoints, setPoint] = useState(0);

    // console.log("Player is rendered");

    useEffect(() => {
        const addClickEffect = () => document.getElementById("root").addEventListener("click", event => {

        })

    }, []);

    
    

    return(
        <div id='Player' className='player-container' style={{top: (260 - jumpPoints)}}>
            <img src={config.playerImgUrl}></img>
        </div>  
    )
}

function GameStarted() {
    return(
        <div id='gameJumping' className='started-game-state-container'>
            <Player></Player>
        </div>
    );
}


export function Game(props) {
    // const gameSelector = useSelector(state => state.game);
    // const [jsxState, setJSX] = useState(<IdleMenu />);

    // useEffect(() => {
    //     const conditionJSX = () => {
    //         switch(gameSelector.gameState) {
    //             case -1: 
    //                 setJSX(<BeforeGameRendered></BeforeGameRendered>);
    //                 break;
    //             case 0:
    //                 setJSX(<IdleMenu></IdleMenu>);
    //                 break;
    //             case 1:
    //                 setJSX(<GameStarted></GameStarted>);
    //                 break;
    //             default:
    //                 setJSX(<BeforeGameRendered></BeforeGameRendered>);
    //                 break;
    //         }
    //     }

    //     conditionJSX();

    // }, [useGlobalGameDispatch])

    const dispatch = useDispatch()
    const gameState = useSelector(state => state.game);

    const handleButtonClick = (event) => {
        let player = document.createElement("div");
        let gamePlate = document.getElementById("gamePlate");

        gamePlate.innerHTML = "";

        player.id = "player";
        player.className = "player-container"

        let pointer = document.createElement("span");
        pointer.className = "pointer-game";
        pointer.innerHTML = "↑";
    
        player.appendChild(pointer);
        gamePlate.appendChild(player);

        player.style.top = `${gameState.zCord * 30}px`;
        player.style.left = `${gameState.xCord * 30}px`;

        dispatch(mazeUpdate(new LabGenerator(5, 5)));
        
    };

    useEffect(() => {
        let player = document.getElementById("player");
        const engin = new Engine(player, {xCord: gameState.xCord, zCord: gameState.zCord, axis: gameState.axis, store: store});

        // setInterval(() => {
        //     console.clear();
        //     console.log(engin.xCord);
        //     console.log(engin.zCord);
        //     console.log(engin.axis);
        //     console.log(Math.sin(engin.axis * (Math.PI / 180)));
        //     console.log(gameState.isLose);
        // }, 1000)
    }, [dispatch])

    useEffect(() => {
        const player = document.getElementById("player");

        dispatch(checkMistake());
    
        if (player) {
            player.style.top = `${gameState.zCord * 30}px`;
            player.style.left = `${gameState.xCord * 30}px`;
        }
    }, [gameState.xCord, gameState.zCord]);

    useEffect(() => {
        const player = document.getElementById("player");

        if (player) {
            player.style.rotate = `${gameState.axis}deg`;
        }
    })
    
    return(
        <div className="game-container">
            <div id="gamePlate">
                {
                    gameState.isLose 
                        ? (<div className='game-losed-menu-container'>
                            <div className='info-game-losed-menu'>
                                <button className='button-restart-game-losed'>
                                    Play again
                                </button>
                            </div>
                        </div>)
                        : (<div style={{display: 'none'}}></div>)
                }
                {
                    gameState.maze.map(column => {
                        return(<div className='game-column'>
                            {
                                column.map(cell => {
                                    if(cell == 0)
                                        return(<div className='clear-cell cell'></div>)
                                    else
                                        return(<div className='full-cell cell'></div>)
                                })
                            }
                        </div>) 
                    })
                }
            </div>
            <button onClick={handleButtonClick}>
                Restart
            </button>
        </div>
        
    );
}