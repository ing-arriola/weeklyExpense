const userExpense=prompt('Insert your weekly expense: ')

class expense{
    constructor(expense){
    this.expense=Number(expense)  
    this.rest=Number(expense)
    }
    restOfExpense(amount=0){
        return this.rest-=amount
    }
}


document.addEventListener('DOMContentLoaded',askData)

function askData(){
    if (userExpense === null || userExpense === '') {
        window.location.reload()
    } else {
        expense= new expense(userExpense)
    }
}