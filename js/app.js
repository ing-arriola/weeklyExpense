const userExpense=prompt('Insert your weekly expense: ')//Getting the expense from the user

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
}


document.addEventListener('DOMContentLoaded',askData)

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