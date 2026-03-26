let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
let currentType = "sell";

function openForm(type) {
  currentType = type;
  document.getElementById("formSection").classList.remove("hidden");
  document.getElementById("formTitle").innerText =
    type === "sell" ? "Record Sale" : "Record Purchase";
}

document.getElementById("isDebt").addEventListener("change", function () {
  document.getElementById("debtor").classList.toggle("hidden", !this.checked);
});

function saveTransaction() {
  const item = document.getElementById("item").value;
  const amount = Number(document.getElementById("amount").value);
  const isDebt = document.getElementById("isDebt").checked;
  const debtor = document.getElementById("debtor").value;

  const transaction = {
    id: Date.now(),
    name: item,
    amount: amount,
    type: currentType,
    isDebt: isDebt,
    debtor: debtor,
    date: new Date().toISOString()
  };

  transactions.push(transaction);
  localStorage.setItem("transactions", JSON.stringify(transactions));

  render();
}

function render() {
  const list = document.getElementById("list");
  list.innerHTML = "";

  let sales = 0;
  let expenses = 0;

  transactions.forEach(t => {
    const li = document.createElement("li");
    li.innerText = `${t.name} - ₦${t.amount} (${t.type})`;
    list.appendChild(li);

    if (t.type === "sell") sales += t.amount;
    else expenses += t.amount;
  });

  document.getElementById("sales").innerText = sales;
  document.getElementById("expenses").innerText = expenses;
  document.getElementById("profit").innerText = sales - expenses;
}

render();
