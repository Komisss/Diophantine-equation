class Uravnenie {
    #A;
    #B;
    #C;
    constructor(A, B, C){
        //А - коэффициент перед x,
        //B - коэффициент перед y,
        //C - ответ после =
        this.#A = Number(A);
        this.#B = Number(B);
        this.#C = Number(C);
    }

    getA(){
        return this.#A;
    }

    setA(value){
        this.#A = value;
    }

    getB(){
        return this.#B;
    }

    setB(value){
        this.#B = value;
    }

    getC(){
        return this.#C;
    }

    setC(value){
        this.#C = value;
    }

    //Наибольший общий делитель A и B находится для проверки возможности решения
    NOD(odds = {x: this.#A, y: this.#B}){
        while(odds.x != odds.y){
            if(odds.x > odds.y){
                odds.x = odds.x - odds.y;
            }
            else{
                odds.y = odds.y - odds.x;
            }
        }
        return odds.x;
    }

    #chastnoeReshenie(odds = {x: this.#A, y: this.#B, ans: this.#C}){
        if(odds.x == 1 || odds.y == 1){
            if(odds.x == 1){
                return {x: odds.ans, y: 0, ans: odds.ans};
            }
            else if (odds.y == 1){
                return {x: 0, y: odds.ans, ans: odds.ans};
            }
        }
        let newChastnoe;
        if(odds.x > odds.y){
            const CeloeX = Math.floor(odds.x / odds.y);
            const ostatokX = odds.x % odds.y;
            const skobkiOdds = {x: CeloeX, y: 1, ans: odds.ans};
            const newOdds = {x: ostatokX, y: odds.y, ans: odds.ans};
            const chastnoe = this.#chastnoeReshenie(newOdds);
            newChastnoe = {x: chastnoe.x, y: chastnoe.y - skobkiOdds.x * chastnoe.x, ans: chastnoe.ans};
        }
        else{
            const CeloeY = Math.floor(odds.y / odds.x);
            const ostatokY = odds.y % odds.x;
            const skobkiOdds = {x: 1, y: CeloeY, ans: odds.ans};
            const newOdds = {x: odds.x, y: ostatokY, ans: odds.ans};
            const chastnoe = this.#chastnoeReshenie(newOdds);
            newChastnoe = {x: chastnoe.x - skobkiOdds.y * chastnoe.y, y: chastnoe.y, ans: chastnoe.ans};
        }
        return newChastnoe;
    }

    //Общее решение выводит коэффициент для x и y перед параметром t:
    //например, общее решение:
    //          x = -22t
    //          y = 5t      t принадлежит Z
    //Записывается следующим образом в программе:
    //          {x: -22, y: 5}
    #obsheeReshenie(){
        return {x: -1 * this.#B, y: this.#A };
    }

    outputDiafant(){
        const NOD = this.NOD();
        //Если ответ делится нацело на НОД(A, B), то решение существует,
        //и необходимо поделить A, B, C на НОД(А,В), иначе решения не существует;
        if(this.#C % NOD == 0){
            this.setA(this.#A / NOD);
            this.setB(this.#B / NOD);
            this.setC(this.#C / NOD);
        }
        else{
            return "Решения не существует!";
        }
        const chastnoe = this.#chastnoeReshenie();
        const obshee = this.#obsheeReshenie();
        return `Итоговое решение:
        x = ${chastnoe.x}${obshee.x < 0? " - " + (obshee.x * -1) + "t": " + " + obshee.x + "t"}
        y = ${chastnoe.y}${obshee.y < 0? " - " + -1 * obshee.y + "t" : " + " + obshee.y + "t"}
        `
    }
}

if (window.jQuery) alert("jQuery подключен");
else alert("jQuery не подключен");

function calcUr(){
    const A = Number(document.querySelector("#A").value);
    const B = Number(document.querySelector("#B").value);
    const C = Number(document.querySelector("#C").value);

    const ur = new Uravnenie(A, B, C);
    console.log("НОД: ", ur.NOD());
    document.querySelector("#output").innerHTML = ur.outputDiafant();
    console.log(ur.outputDiafant())
}
