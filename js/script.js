import { NumberManager } from "./NumberManager.js";
import { Timer } from "./Timer.js";

let numberManager = new NumberManager(5);

let button = document.getElementsByClassName("al-button")[0];
button.addEventListener("click", showNumbers);

let startMenu = document.querySelector(".col-12 > div:first-of-type");

let fatherElement;
fatherElement = document.createElement("div");

let listener;

function showNumbers(){

    if(!startMenu.classList.contains("d-none")) //Almeno la seconda iterazione
        startMenu.classList.add("d-none");
    else{
        fatherElement.remove();
        fatherElement.innerHTML = "";
    }

    fatherElement.classList.add("col-12", "d-flex", "flex-column", "flex-wrap", "align-items-center", "justify-content-center", "gap-5");

    let firstChild = document.createElement("div");

    let timer = new Timer(30);
    timer.append(firstChild);
    timer.start();

    let secondChild = document.createElement("div");
    secondChild.classList.add("d-flex", "align-items-center", "justify-content-center", "gap-3", "pb-3");
    numberManager.generateNumbers(100);
    numberManager.append(secondChild);

    fatherElement.appendChild(firstChild);
    fatherElement.appendChild(secondChild);

    document.getElementsByClassName("col-12")[0].insertBefore(fatherElement, button);

    button.textContent = "Sono pronto";
    button.removeEventListener("click", showNumbers);
    button.addEventListener("click", listener = (() => {if(timer.isActive)timer.abort(); askNumbers(false)}));
}

export function askNumbers(showError){

    let input = new Array(5);

    fatherElement.innerHTML = "";

    if(showError){
        let error = document.createElement("div");
        error.classList.add("col-12", "text-center", "al-red");
        error.textContent = "Errore! Inserisci valori validi";
        fatherElement.appendChild(error);
    }

    fatherElement.classList.remove("flex-column");

    for(let i = 0; i < 5; i++){
        input[i] = document.createElement("input");
        input[i].type = "text";
        fatherElement.appendChild(input[i]);
    }

    button.textContent = "Invia soluzione";
    button.removeEventListener("click", listener);
    button.addEventListener( "click", listener = (() => checkInput(input)));
}

function checkInput(input){

    let num = new Number;
    let error = false;

    for(let i = 0; i < input.length && !error; i++){
        num = input[i].value;
        if(!Number.isSafeInteger(+num) || num < 0 || !num)
            error = true;
    }

    if(!error)
        showResults(input);
    else
        askNumbers(true);
        
}

function showResults(input){

    fatherElement.innerHTML = "";

    let num;
    let correct = 0;

    let element = document.createElement("div");
    element.classList.add("col-12", "d-flex", "justify-content-center", "align-items-center", "gap-3");
    numberManager.append(element);
    fatherElement.appendChild(element);

    let fNumberManager = new NumberManager(0);
    
    for(let i = 0; i  < input.length; i++){
        if(!fNumberManager.isPresent(input[i].value))
            fNumberManager.push(input[i].value);
    }

    for(let i = 0; i < fNumberManager.getDim(); i++){

        num = fNumberManager.getNum(i)
        element = document.createElement("div");

        if(numberManager.isPresent(num)){
            element.classList.add("al-green-sm");
            element.textContent = "Indovinato: " + num;
            correct++;
        }
        else{
            element.classList.add("al-red-sm");
            element.textContent = "Sbagliato: " + num;
        }

        fatherElement.appendChild(element);
        button.textContent = "Ricomincia";
        button.removeEventListener("click", listener);
        button.addEventListener("click", showNumbers);
    }

    element = document.createElement("div");
    element.classList.add("col-12", "al-blue", "text-center", "py-2");
    element.textContent = "Risultato: " + correct + "/" + input.length;
    fatherElement.appendChild(element);
}