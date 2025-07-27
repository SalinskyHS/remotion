const DATA_ENDPOINT = "./data/data.json";

async function loadData() {
  try {
    const res = await fetch(DATA_ENDPOINT, {cache:"no-store"});
    if (!res.ok) throw new Error(res.statusText);
    return await res.json();
  } catch (e) {
    console.error("Fetch error:", e);
    return null;
  }
}

function renderKPIs(kpi) {
  const container = document.getElementById('kpi-cards');
  container.innerHTML = '';
  const items = [
    ["Applied", kpi.applied],
    ["Responses", kpi.responses],
    ["Interviews", kpi.interviews],
    ["Offers", kpi.offers],
    ["Avg Resp Days", kpi.avgResponseDays],
    ["Follow-ups Today", kpi.followUpsDueToday]
  ];
  items.forEach(([label, val]) => {
    const el = document.createElement('div');
    el.className = "card";
    el.innerHTML = `<h3>${label}</h3><p>${val}</p>`;
    container.appendChild(el);
  });
}

function renderTable(apps) {
  const tbody = document.querySelector('#tableApps tbody');
  tbody.innerHTML = '';
  apps.forEach(r => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${r.date}</td>
      <td>${r.company}</td>
      <td>${r.role}</td>
      <td>${r.status}</td>
      <td>${r.fup}</td>
      <td>${r.kw.map(k=>`<span class="tag">${k}</span>`).join('')}</td>`;
    tr.className = 'table-row';
    tbody.appendChild(tr);
  });
}

function renderPipelineChart(kpi) {
  const ctx = document.getElementById('chartPipeline').getContext('2d');
  new Chart(ctx, {
    type:'bar',
    data:{
      labels:["Applied","Responses","Interviews","Offers"],
      datasets:[{label:"Pipeline",data:[kpi.applied,kpi.responses,kpi.interviews,kpi.offers]}]
    },
    options:{
      responsive:true,
      scales:{y:{beginAtZero:true,ticks:{color:'#e2e8f0'},grid:{color:'#334155'}},
              x:{ticks:{color:'#e2e8f0'},grid:{color:'#334155'}}}
    }
  });
}

function renderStatusPie(apps) {
  const counts = apps.reduce((acc, a) => { acc[a.status] = (acc[a.status]||0)+1; return acc; }, {});
  const labels = Object.keys(counts);
  const data = Object.values(counts);
  const ctx = document.getElementById('chartStatus').getContext('2d');
  new Chart(ctx, {
    type:'pie',
    data:{labels,datasets:[{data,backgroundColor:labels.map((_,i)=>`hsl(${i*60},70%,50%)`)}]},
    options:{responsive:true,plugins:{legend:{position:'bottom',labels:{color:'#e2e8f0'}}}}
  });
}

function setupControls(apps) {
  const searchInput = document.getElementById('search');
  const statusSelect = document.getElementById('filterStatus');

  searchInput.addEventListener('input', () => applyFilters(apps));
  statusSelect.addEventListener('change', () => applyFilters(apps));
}

function applyFilters(original) {
  const searchTerm = document.getElementById('search').value.toLowerCase();
  const status = document.getElementById('filterStatus').value;
  const filtered = original.filter(r => {
    return (r.company.toLowerCase().includes(searchTerm) || r.role.toLowerCase().includes(searchTerm))
           && (status==='All' || r.status===status);
  });
  renderTable(filtered);
  renderStatusPie(filtered);
}

(async function init(){
  const data = await loadData();
  if(!data) {
    document.getElementById('error').textContent = "Failed to load JSON.";
    return;
  }
  renderKPIs(data.kpi);
  renderPipelineChart(data.kpi);
  renderTable(data.apps);
  renderStatusPie(data.apps);

  // populate status filter
  const statuses = ["All", ...new Set(data.apps.map(a=>a.status))];
  const statusSelect = document.getElementById('filterStatus');
  statuses.forEach(s => {
    const opt = document.createElement('option');
    opt.value = s;
    opt.textContent = s;
    statusSelect.appendChild(opt);
  });

  setupControls(data.apps);
})();