const form = document.getElementById('sale-form');
const tableBody = document.querySelector('#sales-table tbody');
const downloadBtn = document.getElementById('download-csv');
const salesData = [];

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const date = document.getElementById('date').value;
  const item = document.getElementById('item').value;
  const qty = parseInt(document.getElementById('qty').value);
  const payment = document.getElementById('payment').value;
  const buyer = document.getElementById('buyer').value;

  const sale = { date, item, qty, payment, buyer };
  salesData.push(sale);
  addToTable(sale);
  form.reset();
});

function addToTable(sale) {
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${sale.date}</td>
    <td>${sale.item}</td>
    <td>${sale.qty}</td>
    <td>${sale.payment}</td>
    <td>${sale.buyer}</td>
  `;
  tableBody.appendChild(row);
}

downloadBtn.addEventListener('click', () => {
  let csv = 'Date,Item,Quantity,Payment Method,Buyer\n';
  salesData.forEach(({ date, item, qty, payment, buyer }) => {
    csv += `"${date}","${item}",${qty},"${payment}","${buyer}"\n`;
  });

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', 'sugarcity_sales.csv');
  link.click();
});
