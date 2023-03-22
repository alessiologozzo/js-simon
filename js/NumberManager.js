import { RandomNumber } from "./RandomNumber.js";

export class NumberManager{

    #num;

    constructor(dim){

        this.#num = new Array();
        for(let i = 0; i < dim; i++)
            this.#num.push(new RandomNumber);
    }

    generateNumbers(max){
        let num = new RandomNumber;
        for(let i = 0; i < this.#num.length; i++){
            do
                num.generate(max); 
            while(this.isPresent(num.getValue()));

            this.#num[i].setX(num.getValue());
        }

    }

    append(row){
        for(let i = 0; i < this.#num.length; i++){
            let element = document.createElement("div");
            element.classList.add("al-element");
            element.textContent = this.#num[i].getValue();
            row.appendChild(element);
        }
    }

    isPresent(num){

        let present = false;

        for(let i = 0; i < this.#num.length && !present; i++)
            if(this.#num[i].isEqual(num))
                present = true;

        return present;
    }

    push(val){
        this.#num.push(new RandomNumber);
        this.#num[this.#num.length - 1].setX(val);
    }

    getDim(){
        return this.#num.length;
    }

    getNum(i){
        return this.#num[i].getValue();
    }
}