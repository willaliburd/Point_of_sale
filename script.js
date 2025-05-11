const form = document.getElementById('sale-form');
const tableBody = document.querySelector('#sales-table tbody');
const downloadBtn = document.getElementById('download-csv');
let salesData = [];

// Load data from localStorage when the page loads
document.addEventListener('DOMContentLoaded', () => {
  loadFromLocalStorage();
  renderTable();
});

// Load sales data from localStorage
function loadFromLocalStorage() {
  const storedData = localStorage.getItem('sugarcitySalesData');
  if (storedData) {
    salesData = JSON.parse(storedData);
  }
}

// Save sales data to localStorage
function saveToLocalStorage() {
  localStorage.setItem('sugarcitySalesData', JSON.stringify(salesData));
}

// Handle form submissions
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const date = document.getElementById('date').value;
  const item = document.getElementById('item').value;
  const qty = parseInt(document.getElementById('qty').value);
  const price = document.getElementById('price').value;
  const payment = document.getElementById('payment').value;
  const buyer = document.getElementById('buyer').value;

  const sale = { date, item, qty, price, payment, buyer };
  salesData.push(sale);
  
  // Save to localStorage after adding new sale
  saveToLocalStorage();
  
  addToTable(sale);
  form.reset();
});

// Add a single sale to the table
function addToTable(sale) {
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${sale.date}</td>
    <td>${sale.item}</td>
    <td>${sale.qty}</td>
    <td>${sale.price}</td>
    <td>${sale.payment}</td>
    <td>${sale.buyer}</td>
  `;
  tableBody.appendChild(row);
}

// Render the entire table from salesData
function renderTable() {
  tableBody.innerHTML = ''; // Clear the table first
  salesData.forEach(sale => {
    addToTable(sale);
  });
}

// Handle CSV download
downloadBtn.addEventListener('click', () => {
  let csv = 'Date,Item,Quantity,Price,Payment Method,Buyer\n';
  salesData.forEach(({ date, item, qty, price, payment, buyer }) => {
    csv += `"${date}","${item}",${qty},"${price}","${payment}","${buyer}"\n`;
  });

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', 'sugarcity_sales.csv');
  link.click();
});
