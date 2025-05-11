
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("order-form");
    const tableBody = document.getElementById("order-table").getElementsByTagName("tbody")[0];
    const downloadButton = document.getElementById("download-btn");

    let orderData = JSON.parse(localStorage.getItem("orderData")) || [];

    function updateTable() {
        tableBody.innerHTML = "";
        orderData.forEach((item, index) => {
            const row = tableBody.insertRow();
            Object.values(item).forEach(value => {
                const cell = row.insertCell();
                cell.textContent = value;
            });
        });
    }

    function saveToLocalStorage() {
        localStorage.setItem("orderData", JSON.stringify(orderData));
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const item = document.getElementById("item").value;
        const quantity = parseInt(document.getElementById("quantity").value);
        const paymentMethod = document.getElementById("payment").value;

        const now = new Date();
        const timestamp = now.toLocaleString();

        const priceMap = {
            "Slice of Cake": 4.50,
            "Cupcake": 3.00,
            "Coconut Roll": 3.00,
            "Raisin Roll": 3.00
        };

        const total = (priceMap[item] * quantity).toFixed(2);

        const newRow = {
            Timestamp: timestamp,
            Item: item,
            Quantity: quantity,
            Payment: paymentMethod,
            Total: `$${total}`
        };

        orderData.push(newRow);
        saveToLocalStorage();
        updateTable();
        form.reset();
    });

    downloadButton.addEventListener("click", function () {
        const csvContent = "data:text/csv;charset=utf-8," + 
            ["Timestamp,Item,Quantity,Payment,Total"]
            .concat(orderData.map(e => Object.values(e).join(",")))
            .join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "sugarcity_pos_orders.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });

    updateTable(); // Load existing data on page load
});
