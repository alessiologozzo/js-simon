import { askNumbers } from "./script.js";

export class Timer{

    #time = new Number;
    #element;
    #interval;
    #ending;
    #lastTime;
    #currentTime;

    constructor(time){
        this.#time = time * 1000;
        this.#ending = false;
    }

    append(row){
        this.#element = document.createElement("div");
        this.#element.classList.add("al-timer", "al-green");
        this.#element.textContent = this.#time;
        row.appendChild(this.#element);
    }

    start(){
        this.#lastTime = new Date();
        this.#interval = setInterval(() => {this.#currentTime = new Date(); this.#progress();}, 10);
    }

    abort(){
        clearInterval(this.#interval);
    }

    isActive(){

        let active;

        if(this.#time > 0)
            active = true;
        else
            active = false;

            return active;
    }

    #progress(){

        this.#time -= (this.#currentTime.getTime() - this.#lastTime.getTime());

        if(this.#time < 10000 && !this.#ending){
            this.#element.classList.remove("al-green");
            this.#element.classList.add("al-red");
            this.#ending = true;
        }

        if(this.#time > 0)
            this.#element.textContent = (this.#time / 1000).toFixed(2);
        else{
            this.abort();
            askNumbers();
        }

        this.#lastTime = new Date();
    }
}