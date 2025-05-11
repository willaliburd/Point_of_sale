// POS Data
let sales = JSON.parse(localStorage.getItem("salesData")) || [];

// Elements
const saleForm = document.getElementById("sale-form");
const salesTableBody = document.getElementById("sales-table-body");
const downloadBtn = document.getElementById("download-csv");

// Initialize: Load existing sales
sales.forEach(addSaleToTable);

// Form Submit
saleForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const item = document.getElementById("item").value.trim();
  const quantity = parseInt(document.getElementById("quantity").value, 10);
  const price = parseFloat(document.getElementById("price").value);
  const paymentMethod = document.getElementById("payment-method").value;
  const timestamp = new Date().toLocaleString();

  if (!item || isNaN(quantity) || isNaN(price)) {
    alert("Please fill out all fields correctly.");
    return;
  }

  const sale = { item, quantity, price, paymentMethod, timestamp };
  sales.push(sale);
  localStorage.setItem("salesData", JSON.stringify(sales));

  addSaleToTable(sale);
  saleForm.reset();
});

// Add a sale to the table
function addSaleToTable(sale) {
  const row = document.createElement("tr");

  row.innerHTML = `
    <td>${sale.item}</td>
    <td>${sale.quantity}</td>
    <td>${sale.price.toFixed(2)}</td>
    <td>${sale.paymentMethod}</td>
    <td>${sale.timestamp}</td>
  `;

  salesTableBody.appendChild(row);
}

// Download CSV
downloadBtn.addEventListener("click", function () {
  if (sales.length === 0) {
    alert("No sales to export.");
    return;
  }

  let csvContent = "data:text/csv;charset=utf-8,";
  csvContent += "Item,Quantity,Price,Payment Method,Timestamp\n";

  sales.forEach((sale) => {
    const row = [
      sale.item,
      sale.quantity,
      sale.price.toFixed(2),
      sale.paymentMethod,
      sale.timestamp,
    ].join(",");
    csvContent += row + "\n";
  });

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "sales_log.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});
