const expenseForm = document.querySelector('#expense-form');
const expenseList = document.querySelector('#expense-list tbody');
const totalAmount = document.querySelector('#total-amount');
const filterForm = document.querySelector('#filter');
const monthSelect = document.querySelector('#month-select');
const yearSelect = document.querySelector('#year-select');

let expenses = [];

// Function to add an expense to the expenses array
function addExpense(event) {
  event.preventDefault();
  const name = expenseForm.elements["expense-name"].value;
  const date = expenseForm.elements["expense-date"].value;
  const amount = parseFloat(expenseForm.elements["expense-amount"].value);

  // Create an object for the new expense
  const expense = {
    name: name,
    date: date,
    amount: amount
  };

  // Add the new expense to the expenses array
  expenses.push(expense);

  // Reset the form inputs
  expenseForm.reset();

  // Update the UI with the new expense and total amount
  displayExpenses();
  displayTotal();
}

// Function to display the expenses in the UI
function displayExpenses() {
  // Clear the existing expense items
  expenseList.innerHTML = '';

  // Add each expense to the UI
  expenses.forEach((expense, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${expense.name}</td>
      <td>${expense.date}</td>
      <td>$${expense.amount.toFixed(2)}</td>
      <td><button onclick="deleteExpense(${index})">Delete</button></td>
    `;
    expenseList.appendChild(row);
  });
}

function deleteExpense(index) {
    // Remove the expense from the expenses array
    expenses.splice(index, 1);
  
    // Update the UI with the new expenses and total amount
    displayExpenses();
    displayTotal();
  }

// Function to display the total amount in the UI
function displayTotal() {
    let total = 0;
    expenses.forEach((expense) => {
      total += expense.amount;
    });
    totalAmount.textContent = `$${total.toFixed(2)}`;
  }
  
  // Function to filter the expenses by month and year
  function filterExpenses(event) {
    event.preventDefault();
  
    // Get the selected month and year
    const month = monthSelect.value;
    const year = parseInt(yearSelect.value);
  
    // Filter the expenses by month and year
    const filteredExpenses = expenses.filter((expense) => {
      const expenseDate = new Date(expense.date);
      return (month === '' || expenseDate.getMonth() === parseInt(month) - 1) &&
             (isNaN(year) || expenseDate.getFullYear() === year);
    });
  
    // Display the filtered expenses
    displayFilteredExpenses(filteredExpenses);
  }
  
  // Function to display the filtered expenses in the UI
  function displayFilteredExpenses(filteredExpenses) {
    // Clear the existing expense items
    expenseList.innerHTML = '';
  
    // Add each filtered expense to the UI
    filteredExpenses.forEach((expense) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${expense.name}</td>
        <td>${expense.date}</td>
        <td>$${expense.amount.toFixed(2)}</td>
      `;
      expenseList.appendChild(row);
    });
  }
  
  // Add event listeners
  expenseForm.addEventListener('submit', addExpense);
  filterForm.addEventListener('submit', filterExpenses);
  
  // Initialize the UI
  displayExpenses();
  displayTotal();
  