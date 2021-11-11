
/*Screens navigation*/


let retrievedObject = localStorage.getItem('history');
if(retrievedObject != null) {
    let history = JSON.parse(retrievedObject);
    const data = document.querySelector("#history");
    if(data != null) {
        
        for (let i = 0; i < history.length; i++) {
            data.innerHTML += history[i] + "</br>";
        }
    } 
    console.log(history);
}


let loginBtn = document.getElementById("loginbtn");
let submitBtn = document.getElementById("submitbtn");
let backBtn = document.getElementById("backtbtn");

if (loginBtn) {
loginBtn.addEventListener( 'click', (event) => {
    document.querySelector("#info-page").removeAttribute("class", "active");
    document.querySelector("#login-page").setAttribute("class", "active");
})
}
if (backBtn) {
backBtn.addEventListener( 'click', (event) => {
    document.querySelector("#login-page").removeAttribute("class", "active");
    document.querySelector("#info-page").setAttribute("class", "active");
})
} 
if (submitBtn) {
submitBtn.addEventListener( 'click', (event) => {
    
    let name_field = document.getElementById('name');
    let email_field = document.getElementById('email');
    if ( name_field.value == '' || email_field.value == '' ) {
        alert('Please enter your name and email');

    } else {
        window.location.href = 'calculator.html?name=' + name_field.value + '&email=' + email_field.value;  
    }
})
}


/*name and email cacher from previous page*/

const queryStr = window.location.search;
const urlParams = new URLSearchParams(queryStr);
const fullName = urlParams.get('name');
const email = urlParams.get('email');

let userInfo = document.getElementById('user-info');
let par = document.createElement('p');
par.innerText = 'Name: ' + fullName + " " +  "| Email: " + email;
userInfo.appendChild(par);



/*Calculator*/

class Calcuator {
      constructor(previousOperandTextElement, currentOperandTextElement) {
      this.previousOperandTextElement = previousOperandTextElement
      this.currentOperandTextElement = currentOperandTextElement
      this.clear()
}
    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }
    appendNumber(number) {
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }
    chooseOp(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute() 
        }
         this.operation = operation 
         this.previousOperand = this.currentOperand
         this.currentOperand = ''
    }

    compute() {
        let computation 
        let prev = parseFloat(this.previousOperand)
        let cur = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(cur)) return
        switch (this.operation) {
            case '+':
                computation = prev + cur
                break
            case '-':
                computation = prev - cur
                 break
            case 'x':
                multiply()
                break
            case '÷':
                divd()
                break
            case '%':
                prcnt()
                break
            case 'xⁿ':
                expnt()
                break
            default:
                return
        }
        this.currentOperand = computation 
        this.operation = undefined
        this.previousOperand = ''

        function multiply () {
            computation = prev
            for (let i = 0; i < cur-1; i++) {
                computation += prev
            }
        }
        function divd ()  {
            computation = prev
            let x = 0
            for (let i = 0; computation > 0; i++) {
                computation -= cur
                x = x + 1
                }
            computation = x
        }
        function prcnt () {
            let x = prev * cur 
            computation = x / 100 
        } 
        function expnt () {
            let x = 1 
            for(let i = 1; i <= cur; i++){
                x = x * prev
               }
            computation = x
        }
    }
        updateDisplay() {
          this.currentOperandTextElement.innerText = this.currentOperand
          if (this.operation != null) {
            this.previousOperandTextElement.innerText =
             `${this.previousOperand} ${this.operation}`
          } else {
            this.previousOperandTextElement.innerText =''
          }  
           
    }
}

const numBtn = document.querySelectorAll('[data-num]')
const opBtn = document.querySelectorAll('[data-op]')
const eqBtn = document.querySelector('[data-eq]')
const acBtn = document.querySelector('[data-all-clear]')
const hisBtn = document.querySelector('[data-his]')
const previousOperandTextElement = document.querySelector('[data-previous]')
const currentOperandTextElement = document.querySelector('[data-current]')
const calculator = new Calcuator(previousOperandTextElement, currentOperandTextElement)
if (numBtn)
numBtn.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
  })
if (opBtn)
opBtn.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOp(button.innerText)
        calculator.updateDisplay()
    })
  })
  let firstNum 
  let secondNum
  let sumNum
  let targil
  let calcHistoryArr = []
if (eqBtn)
eqBtn.addEventListener('click', button => {
    localStorage.removeItem("history");
    calculator.compute()
    firstNum = previousOperandTextElement.innerText
    firstNumNoSpace = firstNum.replace(/ /g,'');
    secondNum = currentOperandTextElement.innerText
    calculator.updateDisplay()
    sumNum =  currentOperandTextElement.innerText
    fullCalc = firstNumNoSpace + secondNum + "=" + sumNum
    saveCalc ()
   })
function saveCalc () {
    
    calcHistoryArr.push(fullCalc)


} 
if (acBtn)
acBtn.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay() 
})

/*Summary page*/

if (hisBtn)
hisBtn.addEventListener('click', button => {
    const queryString = window.location.search
    const name_field = urlParams.get('name')
    const email_field = urlParams.get('email')
  
  
    localStorage.setItem('history', JSON.stringify(calcHistoryArr))
window.location.href = 'summary.html?name=' + name_field + "&" + "email=" + email_field; 


})

