const userExpense=prompt('Insert your weekly expense: ')//Getting the expense from the user
const form=document.getElementById('agregar-gasto')

class Expense{
    constructor(expense){
    this.expense=Number(expense)  
    this.rest=Number(expense)
    }
    restOfExpense(amount=0){
        return this.rest-=amount//
    }
}

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
}

//Event Listerners
document.addEventListener('DOMContentLoaded',askData)

form.addEventListener('submit',addPurchase)


//Definition of functions
function askData(){
    if (userExpense === null || userExpense === '') {
        window.location.reload()
    } else {
        expense= new Expense(userExpense)
        //Getting a interfaz instance to send the data to the DOM
        interfaz=new Interfaz()
        interfaz.insertExpense(expense.expense)
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
    }
}