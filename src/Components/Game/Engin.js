import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateCords, updateAxis, checkMistake } from "../../redux/slices/gameSlice";
import store from '../../redux/store';

export class Engine {
    constructor(playerObj, configProps) {
        this.player = playerObj;

        Object.keys(configProps).forEach((prop, index) => {
            this[prop] = configProps[prop];
        })

        this.#importantInitialisation();
        this.#buttonPressingInit();
    }

    #setPropAnyway(propName, staticValue) {
        if(this[propName] == undefined)
            this[propName] = staticValue;
    }

    #importantInitialisation() {
        this.#setPropAnyway("xCord", 0);
        this.#setPropAnyway("zCord", 0);
        this.#setPropAnyway("axis", 0);
        this.#setPropAnyway("moveStrength", 1);
    }

    #tickTimerUp(tickRate, functionsToInvokeArray) {
        this["tickTimer"] = setInterval(() => {
            functionsToInvokeArray.forEach(invokableObj => {
                invokableObj.functionDelegate(...invokableObj.args);
            })
        }, 1000 / tickRate);
    }

    #buttonPressingInit() {
        const keyActions = {
            'w': () => this.mooving("forward"),
            'd': () => this.mooving("right"),
            'a': () => this.mooving("left"),
            's': () => this.mooving("backward"),
            'ArrowRight': () => this.changeAxis("right"),
            'ArrowLeft': () => this.changeAxis("left"),
        };

        window.addEventListener('keydown', (e) => {
            const action = keyActions[e.key];
            if (action) action(); 

            this["store"].dispatch(updateCords({x: this["xCord"], z: this["zCord"]}));
            this["store"].dispatch(updateAxis(this["axis"]));
            this["store"].dispatch(checkMistake());
        });
    }

    // static getAllMethodNames(obj) {
    //     let methods = new Set();
    //     while (obj = Reflect.getPrototypeOf(obj)) {
    //       let keys = Reflect.ownKeys(obj)
    //       keys.forEach((k) => methods.add(k));
    //     }
    //     return methods;
    //   }

    //Moving

    mooving(direction) {
        const mooveResult = this.#mathMoving();

        switch(direction) {
            case "forward":
                this.#forward(mooveResult);
                break;
            case "right":
                this.#right(mooveResult)
                break;
            case "left":
                this.#left(mooveResult);
                break;
            case "backward":
                this.#backward(mooveResult);
                break;
        }
    }

    changeAxis(direction) {
        if(direction == 'right') {
            this["axis"] += 90;
        }
        else {
            this["axis"] -= 90;
        }
    }

    #mathMoving() {
        return [Math.sin(this["axis"] * (Math.PI / 180)), Math.cos(this["axis"] * (Math.PI / 180))];
    }

    #forward(mooveResult) {
        mooveResult = this["axis"] % 180 == 0 ? mooveResult.map(item => item * -1) : mooveResult;
        this["xCord"] += mooveResult[0];
        this["zCord"] += mooveResult[1];
    }

    #backward(mooveResult) {
        mooveResult = this["axis"] % 180 != 0 ? mooveResult.map(item => item * -1) : mooveResult;
        this["xCord"] += mooveResult[0];
        this["zCord"] += mooveResult[1];
    }

    #right(mooveResult) {
        this["xCord"] += mooveResult[1];
        this["zCord"] += mooveResult[0];
    }

    #left(mooveResult) {
        this["xCord"] += mooveResult[1] * -1;
        this["zCord"] += mooveResult[0] * -1;
    }

    static getDeclaredProps() {
        let returnValue = "";
        Object.keys(this).forEach(prop => {
            returnValue += prop + ": " + this[prop];
        })

        return returnValue;
    }
}