document.addEventListener("DOMContentLoaded", function () {
  const saleForm = document.getElementById("sale-form");
  const itemInput = document.getElementById("item");
  const quantityInput = document.getElementById("qty"); // updated
  const priceInput = document.getElementById("price");
  const paymentMethodInput = document.getElementById("payment"); // updated
  const buyerInput = document.getElementById("buyer"); // new
  const salesTable = document.getElementById("sales-table");
  const downloadBtn = document.getElementById("download-csv"); // updated

  let salesData = JSON.parse(localStorage.getItem("salesData")) || [];

  function addSaleToTable(sale) {
    const row = salesTable.insertRow(-1);
    row.insertCell(0).innerText = sale.date;
    row.insertCell(1).innerText = sale.item;
    row.insertCell(2).innerText = sale.qty;
    row.insertCell(3).innerText = sale.payment;
    row.insertCell(4).innerText = sale.buyer || ""; // new
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
    const qty = parseInt(qtyInput.value);
    const price = parseFloat(priceInput.value);
    const payment = paymentInput.value;
    const buyer = buyerInput.value.trim(); // new
    const total = qty * price;
    const date = new Date().toLocaleString();

    const sale = { date, item, quantity, price, total, paymentMethod, buyer }; // new
    salesData.push(sale);
    saveSalesData();
    updateTable();

    saleForm.reset();
  });

  downloadBtn.addEventListener("click", function () {
    let csv = "Date,Item,Quantity,Price,Total,Payment Method,Buyer\n"; // updated header
    salesData.forEach(sale => {
      csv += `${sale.date},${sale.item},${sale.qty},${sale.price.toFixed(2)},${sale.total.toFixed(2)},${sale.payment},"${sale.buyer || ""}"\n`;
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
