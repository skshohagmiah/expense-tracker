const income = document.querySelector('.income strong');
const expense = document.querySelector('.expense strong');
const balance = document.querySelector('.balanced strong')
const form = document.querySelector('form');
const nameInput = document.querySelector('#name');
const typeInput = document.querySelector('#type');
const amountInput = document.querySelector('#amount');
const historyContainer = document.querySelector('.history-container');
const clearHistory = document.querySelector('.clear-btn');

let transaction = [];

form.addEventListener('submit', (e) => {
    e.preventDefault();
    transaction.push({name:nameInput.value, type:typeInput.value, amount:amountInput.value})
    localStorage.setItem('transaction', JSON.stringify(transaction));
    nameInput.value = '';
    typeInput.value = '';
    amountInput.value = '';
    calculateTotalIncome()
    calculateTotalExpense()
    calculateBalance()
    showHistory()
    clearHistory.style.display = 'block';
})

function showHistory(){
    historyContainer.innerHTML = '';
    transaction = JSON.parse(localStorage.getItem('transaction')) || [];
    transaction.forEach(tran => {
        const isIncome = tran.type === 'income' ? 'isincome':'isexpense';
        const singleHistory = document.createElement('div');
        singleHistory.classList.add('single-history');
        singleHistory.classList.add(isIncome);
        singleHistory.innerHTML = `
            <p>${tran.name}</p>
            <strong>${tran.amount}</strong>
        `
        historyContainer.appendChild(singleHistory)
    })
}
showHistory()


clearHistory.addEventListener('click', () => {
        transaction = [];
        localStorage.removeItem('transaction')
        calculateTotalIncome()
        calculateTotalExpense()
        calculateBalance()
        showHistory()
        clearHistory.style.display = 'none';
})

function calculateBalance(){
    const incomeBalance = income.textContent;
    const expenseBalance = expense.textContent;
    const totalBalance = Number(incomeBalance.slice(1)) - Number(expenseBalance.slice(1));
    balance.textContent = `$${totalBalance}`;
}
calculateBalance()


function calculateTotalIncome(){
    transaction = JSON.parse(localStorage.getItem('transaction'))|| [];
    const totalIncome = transaction.filter(tran => tran.type === 'income')
    .reduce((accu,item) => accu + Number(item.amount),0)
    income.textContent = `$${totalIncome}`
}
calculateTotalIncome()


function calculateTotalExpense(){
    transaction = JSON.parse(localStorage.getItem('transaction'))|| [];
    const totalExpense = transaction.filter(tran => tran.type === 'expense')
    .reduce((accu,item) => accu + Number(item.amount),0)
    expense.textContent = `$${totalExpense}`
}
calculateTotalExpense()