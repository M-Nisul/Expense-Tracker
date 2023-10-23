const button = document.getElementById('submit');
const table = document.getElementById('table');
const vendorInput = document.getElementById('vendor');
const dateInput = document.getElementById('date');
const amountInput = document.getElementById('amount');
const descriptionInput = document.getElementById('description');

//This stores the records in the local storage;
let expenseRecords = [];


const renderTable = () => {
    table.innerHTML = `<tr class="header">
    <th id="vendor-col">Vendor</th>
    <th id="amount-col">Amount</th>
    <th id="date-col">Date</th>
    <th id="description-col">Description</th>
    <th id="delete">Delete</th>
</tr>`

    expenseRecords.forEach((expense, index) => {
        table.innerHTML += `<tr>
        
                        <td id="vendor-table">${expense.vendor}</td>
                        <td id="amount-table">${expense.amount}</td>
                        <td id="date-table">${expense.date}</td>
                        <td id="description-table">${expense.description}</td>
                        <td class="delete"><button onclick="deleteRow()">❌</button></td>
                        <tr>`
    })
}


//This checks if there is any data in the local storage;
if(localStorage.getItem('expenseRecords')){
    expenseRecords = JSON.parse(localStorage.getItem('expenseRecords'));
    renderTable();
}
const inputs = [dateInput, amountInput, vendorInput, descriptionInput];

const addExpense = (date = 'N/A', amount = 'N/A', vendor = 'N/A', description = 'N/A') => {
    const dateObject = new Date(dateInput.value);
    const formattedDate = dateObject.toLocaleDateString('en-US', {month: '2-digit', date: '2-digit', year: 'numeric'});

    date = formattedDate;
    amount = amountInput.value;
    vendor = vendorInput.value;
    description = descriptionInput.value;
    //This updates the expenseRecords array
    expenseRecords.push({vendor, amount, date, description});
    //This updates the local storage
    updateLocalStorage();
    //Insert the data to the table
    renderTable();
    
}

const deleteRow = (index) => {
    expenseRecords.splice(index, 1);
    updateLocalStorage();
    renderTable();
}



const updateLocalStorage = () => {
    localStorage.setItem('expenseRecords', JSON.stringify(expenseRecords));
}

button.addEventListener('click', addExpense);


