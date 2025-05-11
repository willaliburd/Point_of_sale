document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("pos-form");
  const tableBody = document.getElementById("sales-table-body");
  const downloadBtn = document.getElementById("download-csv");

  // Load previous sales from localStorage
  let salesData = JSON.parse(localStorage.getItem("salesData")) || [];

  function saveSales() {
    localStorage.setItem("salesData", JSON.stringify(salesData));
  }

  function updateTable() {
    tableBody.innerHTML = "";
    salesData.forEach((sale, index) => {
      const row = document.createElement("tr");
      Object.values(sale).forEach((val) => {
        const td = document.createElement("td");
        td.textContent = val;
        row.appendChild(td);
      });
      tableBody.appendChild(row);
    });
  }

  function generateCSV() {
    if (salesData.length === 0) return "";

    const headers = Object.keys(salesData[0]);
    const csvRows = [headers.join(",")];

    salesData.forEach((sale) => {
      const row = headers.map((header) =>
        `"${(sale[header] || "").toString().replace(/"/g, '""')}"`
      );
      csvRows.push(row.join(","));
    });

    return csvRows.join("\n");
  }

  function downloadCSV() {
    const csv = generateCSV();
    if (!csv) return;

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sales-log.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const timestamp = new Date().toISOString();
    const customer = document.getElementById("customer").value.trim();
    const items = document.getElementById("items").value.trim();
    const total = document.getElementById("total").value.trim();
    const payment = document.getElementById("payment").value;

    if (!items || !total || !payment) {
      alert("Please fill in all required fields.");
      return;
    }

    const sale = {
      Date: timestamp,
      Customer: customer,
      Items: items,
      Total: total,
      Payment: payment,
    };

    salesData.push(sale);
    saveSales();
    updateTable();
    form.reset();
  });

  downloadBtn.addEventListener("click", downloadCSV);

  updateTable(); // Initialize table on page load
});
