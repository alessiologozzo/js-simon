export class RandomNumber{

    #x = 0;

    generate(max){
        this.#x = Math.floor(Math.random() * max + 1);
    }

    getValue(){
        return this.#x;
    }

    setX(x){
        this.#x = x;
    }
    isEqual(x){
        let isEqual;

        if(this.#x == x)
            isEqual = true;
        else
            isEqual = false;

        return isEqual;
    }

    append(row){
        let element = document.createElement("div");
        element.classList.add("al-element");
        row.appendChild(element);
    }
}