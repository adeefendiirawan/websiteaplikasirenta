// ... (kode sebelumnya) ...

var rentals = [];
var totalPayment = 0;

function addRental() {
  var carType = document.getElementById("carType").value;
  var rentalDays = document.getElementById("rentalDays").value;
  var rentalDate = document.getElementById("rentalDate").value; // Tambah baris ini

  if (rentalDays === "" || rentalDays <= 0 || rentalDate === "") {
    alert("Masukkan jumlah hari dan tanggal yang valid.");
    return;
  }

  var dailyRate = 0;
  var discountRate = 0;
  var totalCost = 0;

  if (carType === "Rush") {
    dailyRate = 750000;
    discountRate = 0.25; // Diskon 25%
  } else if (carType === "Calya") {
    dailyRate = 500000;
    discountRate = 0.15; // Diskon 15%
  } else if (carType === "Civic") {
    dailyRate = 650000;
  }

  totalCost = rentalDays * dailyRate;

  // Apply discount if applicable
  if (discountRate > 0 && rentalDays > 3 && carType === "avanza") {
    totalCost -= totalCost * discountRate;
  } else if (discountRate > 0 && rentalDays > 2 && carType === "ayla") {
    totalCost -= totalCost * discountRate;
  }

  var rental = {
    carType: carType,
    rentalDays: parseInt(rentalDays),
    rentalDate: rentalDate, // Tambah properti ini
    totalCost: totalCost,
  };

  rentals.push(rental);
  totalPayment += totalCost;
  displayRentals();
  displayTotalPayment();
}

function displayRentals() {
  var table = document.getElementById("rentalList");
  table.innerHTML = `
    <tr>
      <th>Jenis Mobil</th>
      <th>Jumlah Hari</th>
      <th>Total Biaya</th>
      <th>Aksi</th>
    </tr>
  `;

  for (var i = 0; i < rentals.length; i++) {
    var item = rentals[i];
    var row = table.insertRow();
    var carTypeCell = row.insertCell(0);
    var rentalDaysCell = row.insertCell(1);
    var totalCostCell = row.insertCell(2);
    var actionCell = row.insertCell(3);

    carTypeCell.innerHTML = item.carType;
    rentalDaysCell.innerHTML = item.rentalDays;
    totalCostCell.innerHTML = `<b>${item.totalCost}</b>`;
    actionCell.innerHTML = `<button onclick="editRental(${i})">Edit</button> <button onclick="deleteRental(${i})">Delete</button>`;
  }
}

function displayTotalPayment() {
  var totalPaymentElement = document.getElementById("totalPayment");
  totalPaymentElement.innerHTML = `<b>Total Pembayaran: ${totalPayment}</b>`;
}

function editRental(index) {
  var newRentalDays = prompt("Masukkan jumlah hari baru:");
  if (newRentalDays === null || newRentalDays <= 0) {
    alert("Masukkan jumlah hari yang valid.");
    return;
  }

  var item = rentals[index];
  totalPayment -= item.totalCost;

  item.rentalDays = parseInt(newRentalDays);

  // Recalculate total cost with potential discount
  item.totalCost = item.rentalDays * getDailyRate(item.carType);

  if (
    getDiscountRate(item.carType) > 0 &&
    item.rentalDays > getDiscountThreshold(item.carType)
  ) {
    item.totalCost -= item.totalCost * getDiscountRate(item.carType);
  }

  totalPayment += item.totalCost;
  displayRentals();
  displayTotalPayment();
}

function deleteRental(index) {
  var deletedRental = rentals[index];
  totalPayment -= deletedRental.totalCost;
  rentals.splice(index, 1);
  displayRentals();
  displayTotalPayment();
}

function calculateChange() {
  var amountPaid = parseFloat(document.getElementById("amountPaid").value);
  if (amountPaid < totalPayment) {
    alert("Jumlah bayar kurang!");
    return;
  }

  var change = amountPaid - totalPayment;
  displayChange(change);
}

function displayChange(change) {
  var changeElement = document.getElementById("change");
  if (change >= 0) {
    changeElement.innerHTML = `<b>Kembalian: ${change}</b>`;
  } else {
    changeElement.innerHTML = "<b>Jumlah bayar kurang!</b>";
  }
}

function getDailyRate(carType) {
  if (carType === "avanza") {
    return 300000;
  } else if (carType === "ayla") {
    return 400000;
  } else if (carType === "crv") {
    return 500000;
  }
}

function getDiscountRate(carType) {
  if (carType === "avanza") {
    return 0.25;
  } else if (carType === "ayla") {
    return 0.15;
  } else {
    return 0;
  }
}

function getDiscountThreshold(carType) {
  if (carType === "avanza") {
    return 3;
  } else if (carType === "ayla") {
    return 2;
  } else {
    return 0;
  }
}
