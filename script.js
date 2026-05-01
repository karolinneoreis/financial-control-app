const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');
const list = document.getElementById('list');
const balance = document.getElementById('balance');

let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

function updateLocalStorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

function addTransactionDOM(transaction) {
  const sign = transaction.amount < 0 ? '-' : '+';

  const item = document.createElement('li');
  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

  item.innerHTML = `
    ${transaction.text} 
    <span>${sign}R$ ${Math.abs(transaction.amount)}</span>
    <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
  `;

  list.appendChild(item);
}

function updateBalance() {
  const amounts = transactions.map(t => t.amount);
  const total = amounts.reduce((acc, item) => acc + item, 0);

  balance.innerText = total.toFixed(2);
}

function removeTransaction(id) {
  transactions = transactions.filter(t => t.id !== id);
  updateLocalStorage();
  init();
}

function addTransaction(e) {
  e.preventDefault();

  const transaction = {
    id: Math.floor(Math.random() * 1000000),
    text: text.value,
    amount: +amount.value
  };

  transactions.push(transaction);

  updateLocalStorage();
  init();

  text.value = '';
  amount.value = '';
}

function init() {
  list.innerHTML = '';
  transactions.forEach(addTransactionDOM);
  updateBalance();
}

form.addEventListener('submit', addTransaction);

init();