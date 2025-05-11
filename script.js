document.addEventListener("DOMContentLoaded", function () {
  const saleForm = document.getElementById("sale-form");
  const itemInput = document.getElementById("item");
  const quantityInput = document.getElementById("quantity");
  const priceInput = document.getElementById("price");
  const paymentMethodInput = document.getElementById("payment-method");
  const salesTable = document.getElementById("sales-table");
  const downloadBtn = document.getElementById("download");

  let salesData = JSON.parse(localStorage.getItem("salesData")) || [];

  function addSaleToTable(sale) {
    const row = salesTable.insertRow(-1);
    row.insertCell(0).innerText = sale.date;
    row.insertCell(1).innerText = sale.item;
    row.insertCell(2).innerText = sale.quantity;
    row.insertCell(3).innerText = sale.price.toFixed(2);
    row.insertCell(4).innerText = sale.total.toFixed(2);
    row.insertCell(5).innerText = sale.paymentMethod;
  }

  function saveSalesData() {
    localStorage.setItem("salesData", JSON.stringify(salesData));
  }

  function updateTable() {
    // Clear existing rows
    while (salesTable.rows.length > 1) {
      salesTable.deleteRow(1);
    }

    salesData.forEach(addSaleToTable);
  }

  saleForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const item = itemInput.value.trim();
    const quantity = parseInt(quantityInput.value);
    const price = parseFloat(priceInput.value);
    const paymentMethod = paymentMethodInput.value;
    const total = quantity * price;
    const date = new Date().toLocaleString();

    const sale = { date, item, quantity, price, total, paymentMethod };
    salesData.push(sale);
    saveSalesData();
    updateTable();

    saleForm.reset();
  });

  downloadBtn.addEventListener("click", function () {
    let csv = "Date,Item,Quantity,Price,Total,Payment Method\n";
    salesData.forEach(sale => {
      csv += `${sale.date},${sale.item},${sale.quantity},${sale.price.toFixed(2)},${sale.total.toFixed(2)},${sale.paymentMethod}\n`;
    });

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "sales.csv";
    a.click();
    URL.revokeObjectURL(url);
  });

  // Load existing data on page load
  updateTable();
});
