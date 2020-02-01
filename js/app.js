const userExpense=prompt('Insert your weekly expense: ')//Getting the expense from the user
const form=document.getElementById('agregar-gasto')
let amountOfExpense //Global variable

class Expense{
    constructor(expense){
    this.expense=Number(expense)  
    this.rest=Number(expense)
    }
    restOfExpense(amount=0){
        return this.rest-=amount//
    }
}
//This class display or removes new elements on the UI if it's necessary 
//Also show messages and all that is related with the UI
class Interfaz{
    insertExpense(amount){
        console.log(amount)
        const expenseSpan=document.querySelector('span#total')
        const restOfExpense=document.querySelector('span#restante')

        expenseSpan.innerHTML=`${amount}`
        restOfExpense.innerHTML=`${amount}`
    }
    printMessage(message,typeOfMessage){
        const msgCnt=document.createElement('div')
        msgCnt.classList.add('text-center','alert')
        
        
        if (typeOfMessage==='error') {
            msgCnt.classList.add('alert-danger')
        } else {
            
        }
        //Add the message in the div
        msgCnt.appendChild(document.createTextNode(message))
        //Add the div with the message before the form
        document.getElementById('colWithForm').insertBefore(msgCnt,form)

        setTimeout(function(){
            document.querySelector('.primario .alert').remove()
            form.reset()
        },3000)

    }
    addPurchaseToList(name,amount){
        const listOfPurchases=document.querySelector('#gastos ul')
        const li=document.createElement('li')
        li.className='list-group-item d-flex justify-content-between align-items-center'
        li.innerHTML=`
            ${name}
            <span class='badge badge-primary badge-pill' >${amount}</span>
        `
        listOfPurchases.appendChild(li)
    }
    //Here the rest of the expense is sended to the UI after a purchase is substracted from the total
    restOfExpense(amount){
        const residue = document.querySelector('span#restante')
        const restOfUserExpense=amountOfExpense.restOfExpense(amount)
        residue.innerHTML=`${restOfUserExpense}`
        this.checkExpense()
    }
    checkExpense(){
        //Get vars and UI element 
        const total=amountOfExpense.expense
        const residue=amountOfExpense.rest
        const residueOnUi=document.querySelector('.restante')
        //Here the logic is quite simple, because i'm only checking if the residue is
        //between less than 50% but greater than 25%... that is a warning situation
        //grea than zero but less than 25% is a danger situation XD
        if(residue<total/2 && residue > total/4){    
            residueOnUi.classList.remove('alert-sucess')
            residueOnUi.classList.add('alert-warning')
        }else if(residue<total/4){
            residueOnUi.classList.remove('alert-sucess','alert-warning')
            residueOnUi.classList.add('alert-danger')
        }
    }

}

//Event Listerners
document.addEventListener('DOMContentLoaded',askData)

form.addEventListener('submit',addPurchase)


//Definition of functions
//This function ask for the data (as it's name saids) of the expense to the user and it's activated
//when the page is loaded on the browser
function askData(){
    if (userExpense === null || userExpense === '') {
        window.location.reload()
    } else {
        amountOfExpense= new Expense(userExpense)
        //Getting a interfaz instance to send the data to the DOM
        interfaz=new Interfaz()
        interfaz.insertExpense(amountOfExpense.expense)
    }
}


function addPurchase(e){
    e.preventDefault()
    const nameOfPurchase=document.getElementById('gasto').value
    const amountOfPurchase=document.getElementById('cantidad').value

    const ui=new Interfaz()

    if (nameOfPurchase === '' || amountOfPurchase === '') {
        ui.printMessage('There was an error','error')
    } else {
        ui.printMessage('success','Success')
        ui.addPurchaseToList(nameOfPurchase,amountOfPurchase)
        //After the purchase is added to the list it's necessary to substract it from the expense
        ui.restOfExpense(amountOfPurchase)
    }
}