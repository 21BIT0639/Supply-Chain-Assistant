async function search() {
  const input = document.getElementById("productInput").value.toLowerCase();
  const res = await fetch("data/product_queries.json");
  const queries = await res.json();

  const matched = queries.filter(q => q.product_name.toLowerCase().includes(input));
  const resultsDiv = document.getElementById("results");

  if (matched.length === 0) {
    logQuery(input, false);
    resultsDiv.innerHTML = `<p>No match found for "<b>${input}</b>". We'll forward this to the support team!</p>`;
  } else {
    logQuery(input, true);
    resultsDiv.innerHTML = `<h3>Results for "<b>${input}</b>":</h3>`;
    matched.forEach(q => {
      resultsDiv.innerHTML += `
        <p><b>Q:</b> ${q.question}</p>
        <p><b>SQL:</b> <code>${q.sql}</code></p>
        <p><a href="${q.reference}" target="_blank">Reference Link</a></p><hr/>
      `;
    });
  }
}

// Log queries in localStorage
function logQuery(product, matched) {
  let logs = JSON.parse(localStorage.getItem("query_logs") || "[]");
  logs.push({
    product: product,
    matched: matched,
    time: new Date().toISOString()
  });
  localStorage.setItem("query_logs", JSON.stringify(logs));
}
