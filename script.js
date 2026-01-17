let inventory = JSON.parse(localStorage.getItem("inventory")) || [];

const nameInput = document.getElementById("name");
const qtyInput = document.getElementById("qty");
const addBtn = document.getElementById("addBtn");
const tableBody = document.querySelector("#inventoryTable tbody");

// ✅ 200+ medicine list
const medicines = [
  "Paracetamol", "Aspirin", "Ibuprofen", "Amoxicillin", "Cetirizine",
  "Omeprazole", "Metformin", "Atorvastatin", "Levothyroxine", "Losartan",
  "Amlodipine", "Simvastatin", "Azithromycin", "Ciprofloxacin", "Clarithromycin",
  "Doxycycline", "Naproxen", "Prednisone", "Hydrochlorothiazide", "Furosemide",
  "Gabapentin", "Sertraline", "Fluoxetine", "Citalopram", "Escitalopram",
  "Alprazolam", "Diazepam", "Lorazepam", "Clonazepam", "Tramadol",
  "Morphine", "Oxycodone", "Codeine", "Hydrocodone", "Dextromethorphan",
  "Loratadine", "Fexofenadine", "Montelukast", "Salbutamol", "Tiotropium",
  "Budesonide", "Fluticasone", "Beclomethasone", "Mometasone", "Prednisolone",
  "Insulin", "Glipizide", "Glyburide", "Pioglitazone", "Sitagliptin",
  "Vildagliptin", "Dapagliflozin", "Empagliflozin", "Canagliflozin", "Liraglutide",
  "Dulaglutide", "Saxagliptin", "Metoprolol", "Propranolol", "Carvedilol",
  "Bisoprolol", "Nebivolol", "Clopidogrel", "Prasugrel", "Ticagrelor",
  "Warfarin", "Apixaban", "Rivaroxaban", "Dabigatran", "Enoxaparin",
  "Heparin", "Albuterol", "Ipratropium", "Levocetirizine", "Ranitidine",
  "Famotidine", "Pantoprazole", "Lansoprazole", "Rabeprazole", "Esomeprazole",
  "Atenolol", "Nifedipine", "Diltiazem", "Verapamil", "Hydralazine",
  "Methotrexate", "Azathioprine", "Mycophenolate", "Cyclophosphamide", "Cyclosporine",
  "Tacrolimus", "Infliximab", "Adalimumab", "Etanercept", "Rituximab",
  "Bevacizumab", "Trastuzumab", "Pembrolizumab", "Nivolumab", "Cetuximab",
  "Amiodarone", "Dronedarone", "Digoxin", "Sotalol", "Nitroglycerin",
  "Isosorbide", "Clonidine", "Methyldopa", "Hydroxychloroquine", "Chloroquine",
  "Sulfamethoxazole", "Trimethoprim", "Nitrofurantoin", "Metronidazole", "Tinidazole",
  "Fluconazole", "Itraconazole", "Ketoconazole", "Terbinafine", "Nystatin",
  "Acyclovir", "Valacyclovir", "Famciclovir", "Oseltamivir", "Zanamivir",
  "Lisinopril", "Enalapril", "Ramipril", "Candesartan", "Telmisartan",
  "Valsartan", "Spironolactone", "Eplerenone", "Sildenafil", "Tadalafil",
  "Vardenafil", "Finasteride", "Dutasteride", "Tamsulosin", "Alfuzosin",
  "Oxybutynin", "Tolterodine", "Solifenacin", "Duloxetine", "Venlafaxine",
  "Bupropion", "Mirtazapine", "Trazodone", "Clopidogrel", "Dipyridamole",
  "Hydroxyurea", "Sunitinib", "Sorafenib", "Imatinib", "Dasatinib",
  "Nilotinib", "Erlotinib", "Gefitinib", "Temozolomide", "Paclitaxel",
  "Docetaxel", "Carboplatin", "Cisplatin", "Cyclophosphamide", "Doxorubicin",
  "Etoposide", "Vincristine", "Vinblastine", "Bleomycin", "Methotrexate",
  "Levetiracetam", "Valproate", "Carbamazepine", "Phenytoin", "Topiramate",
  "Lamotrigine", "Pregabalin", "Clobazam", "Oxcarbazepine", "Risperidone",
  "Olanzapine", "Quetiapine", "Aripiprazole", "Haloperidol", "Clozapine",
  "Lithium", "Baclofen", "Tizanidine", "Cyclobenzaprine", "Carisoprodol",
  "Diclofenac", "Meloxicam", "Celecoxib", "Indomethacin", "Piroxicam",
  "Nabumetone", "Etodolac", "Sulindac", "Ketorolac", "Tramadol",
  "Naproxen", "Acetaminophen", "Caffeine", "Guaifenesin", "Dextromethorphan",
  "Loperamide", "Ondansetron", "Domperidone", "Metoclopramide", "Prochlorperazine"
];

// Fill dropdown automatically
function populateDropdown() {
  const select = document.getElementById("name");

  medicines.forEach((med) => {
    const option = document.createElement("option");
    option.value = med;
    option.textContent = med;
    select.appendChild(option);
  });
}

populateDropdown();

addBtn.addEventListener("click", () => {
  const name = nameInput.value.trim();
  const qty = parseInt(qtyInput.value);

  if (!name || !qty) {
    alert("⚠️ Please enter valid details");
    return;
  }

  inventory.push({ name, qty });
  localStorage.setItem("inventory", JSON.stringify(inventory));

  nameInput.value = "";
  qtyInput.value = "";

  renderTable();
});

function renderTable() {
  tableBody.innerHTML = "";

  inventory.forEach((item, index) => {
    const row = document.createElement("tr");
    if (item.qty < 10) row.classList.add("low-stock");

    row.innerHTML = `
      <td>💊 ${item.name}</td>
      <td>📦 ${item.qty}</td>
      <td>
        <button class="update-btn" onclick="updateQty(${index})">✏️ Update</button>
        <button class="remove-btn" onclick="removeItem(${index})">🗑️ Remove</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

function updateQty(index) {
  const newQty = prompt("Enter new quantity:");
  if (!newQty) return;

  inventory[index].qty = parseInt(newQty);
  localStorage.setItem("inventory", JSON.stringify(inventory));
  renderTable();
}

function removeItem(index) {
  inventory.splice(index, 1);
  localStorage.setItem("inventory", JSON.stringify(inventory));
  renderTable();
}

renderTable();
