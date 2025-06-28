let quotes = [];
const SERVER_URL = "https://yourapi.mockapi.io/api/v1/quotes"; // ← بدّلها بالرابط ديالك الحقيقي

// ✅ تحميل الاقتباسات من localStorage
function loadQuotes() {
  const stored = localStorage.getItem("quotes");
  quotes = stored ? JSON.parse(stored) : [];
}

// ✅ حفظ الاقتباسات فـ localStorage
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// ✅ عرض اقتباس من الفئة المختارة
function filterQuotes() {
  const selectedCategory = document.getElementById("categoryFilter").value;
  localStorage.setItem("selectedCategory", selectedCategory);

  const filtered = selectedCategory === "all"
    ? quotes
    : quotes.filter(q => q.category === selectedCategory);

  const quoteDisplay = document.getElementById("quoteDisplay");
  if (filtered.length === 0) {
    quoteDisplay.innerHTML = "<p>No quotes in this category.</p>";
    return;
  }

  const quote = filtered[Math.floor(Math.random() * filtered.length)];
  quoteDisplay.innerHTML = `
    <p><strong>Quote:</strong> "${quote.text}"</p>
    <p><em>Category:</em> ${quote.category}</p>
  `;

  sessionStorage.setItem("lastQuote", JSON.stringify(quote));
}

// ✅ عرض عشوائي كامل
function showRandomQuote() {
  if (quotes.length === 0) return;
  const quote = quotes[Math.floor(Math.random() * quotes.length)];
  document.getElementById("quoteDisplay").innerHTML = `
    <p><strong>Quote:</strong> "${quote.text}"</p>
    <p><em>Category:</em> ${quote.category}</p>
  `;
  sessionStorage.setItem("lastQuote", JSON.stringify(quote));
}

// ✅ إضافة اقتباس وتحديث السيرفر
async function addQuote() {
  const text = document.getElementById("newQuoteText").value.trim();
  const category = document.getElementById("newQuoteCategory").value.trim();
  if (!text || !category) {
    alert("Please fill in both fields.");
    return;
  }

  const newQuote = { text, category };
  quotes.push(newQuote);
  saveQuotes();
  populateCategories();
  filterQuotes();

  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";

  await syncQuoteToServer(newQuote);
  showSyncNotification("Quote added and synced to server.");
}

// ✅ إرسال اقتباس جديد للسيرفر
async function syncQuoteToServer(quote) {
  try {
    await fetch(SERVER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(quote)
    });
  } catch (err) {
    console.error("Failed to sync to server", err);
  }
}

// ✅ جلب البيانات من السيرفر (تزامن)
async function fetchServerQuotes() {
  try {
    const res = await fetch(SERVER_URL);
    const serverQuotes = await res.json();

    const localQuotes = JSON.parse(localStorage.getItem("quotes")) || [];
    const different = JSON.stringify(localQuotes) !== JSON.stringify(serverQuotes);

    if (different) {
      quotes = serverQuotes;
      saveQuotes();
      populateCategories();
      filterQuotes();
      showSyncNotification("Server data synced. Local data updated.");
    }
  } catch (err) {
    console.error("Server fetch failed:", err);
  }
}

// ✅ إشعار المستخدم
function showSyncNotification(msg) {
  const note = document.createElement("div");
  note.textContent = msg;
  note.style.cssText =
    "background:#e0f7fa;border:1px solid #00acc1;padding:10px;margin:10px 0;border-radius:5px;";
  document.body.insertBefore(note, document.getElementById("quoteDisplay"));
  setTimeout(() => note.remove(), 5000);
}

// ✅ تحديث لائحة الفئات
function populateCategories() {
  const categories = ["all"];
  quotes.forEach(q => {
    if (!categories.includes(q.category)) categories.push(q.category);
  });

  const select = document.getElementById("categoryFilter");
  select.innerHTML = categories.map(cat => 
    `<option value="${cat}">${cat}</option>`
  ).join("");

  const saved = localStorage.getItem("selectedCategory");
  if (saved && categories.includes(saved)) {
    select.value = saved;
  } else {
    select.value = "all";
  }
}

// ✅ تصدير بصيغة JSON
function exportToJsonFile() {
  const dataStr = JSON.stringify(quotes, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json";
  a.click();
  URL.revokeObjectURL(url);
}

// ✅ استيراد JSON من ملف
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = async function(event) {
    try {
      const imported = JSON.parse(event.target.result);
      if (Array.isArray(imported)) {
        quotes.push(...imported);
        saveQuotes();
        populateCategories();
        filterQuotes();
        showSyncNotification("Quotes imported and stored locally.");
        for (let quote of imported) {
          await syncQuoteToServer(quote);
        }
      } else {
        alert("Invalid JSON format.");
      }
    } catch (err) {
      alert("Import failed: " + err.message);
    }
  };
  fileReader.readAsText(event.target.files[0]);
}

// ✅ تشغيل أولي عند تحميل الصفحة
window.onload = () => {
  loadQuotes();
  populateCategories();
  filterQuotes();
  fetchServerQuotes(); // أول مزامنة
  setInterval(fetchServerQuotes, 60000); // كل دقيقة
};




    ["createAddQuoteForm"]
    ["createElement", "appendChild"]
    ["addEventListener"]
    ["Export Quotes"]
    ["textContent"]
  
  