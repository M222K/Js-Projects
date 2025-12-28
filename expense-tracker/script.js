document.addEventListener("DOMContentLoaded", ()=>{
    //grab the elements
    const expenseForm = document.getElementById("expense-form");
    const expenseNameInput=document.getElementById("expense-name");
    const expenseAmountInput = document.getElementById("expense-amount");
    const expenseList = document.getElementById("expense-list");
    const totalExpenseDisplay = document.getElementById("total-amount");

    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    expenses.forEach((expense) => renderExpenses(expense));

    //take the data drom form and add it to the list
    expenseForm.addEventListener("submit",(e)=>{
        e.preventDefault();
        const name=expenseNameInput.value.trim();
        const amount=parseFloat(expenseAmountInput.value);

        if(name=="" || amount<=0|| isNaN(amount)){
            alert("please enter valid expense name and amount");
            return;
        }

        const expense={
            id:Date.now(),
            name:name,
            amount:amount
        }

        expenses.push(expense);
        console.log(expenses);

        renderExpenses();
        expenseForm.reset();
    });

    //function to render the expenses
    function renderExpenses(){
        expenseList.innerHTML="";
        let total=0;
        //for loop to display each expense
        expenses.forEach((expense,index)=>{
            const item=document.createElement("li");
            item.innerHTML=`
            <span>${expense.name}-$${expense.amount}</span>
            <button id="${index}" class="button">Delete</button>`;
            expenseList.appendChild(item);
            total+=expense.amount;
            totalExpenseDisplay.textContent=`${total.toFixed(2)}`;
        });
        if(expenses.length===0){
            //i want to display what is initially there when there are no expenses
            totalExpenseDisplay.textContent="0.00";
            
        }
        saveExpenses();
    }

    //event delegation for delete button
    expenseList.addEventListener("click",(e)=>{
        if(e.target.tagName==="BUTTON"){
            const index=parseInt(e.target.id);
            expenses.splice(index,1);
            renderExpenses();
        }
    });

    //function to save expenses to local storage
    function saveExpenses(){
        localStorage.setItem("expenses",JSON.stringify(expenses));
    }

});