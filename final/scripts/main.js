// scripts/main.js
import { getForecastForAccra, getCurrentForAccra } from './weather.js';
import { getUnits, setUnits, getDismissedModal, setDismissedModal } from './storage.js';

const unitSelect = document.getElementById('unit-select');
const refreshBtn = document.getElementById('refresh-btn');
const forecastList = document.getElementById('forecast-list');
const currentSummary = document.getElementById('current-summary');

function formatTemp(t, units) {
  if (units === 'imperial') return `${Math.round(t)} °F`;
  return `${Math.round(t)} °C`;
}

async function renderCurrent(units) {
  if (!currentSummary) return;
  try {
    const data = await getCurrentForAccra(units);
    // If using forecast.json fallback, it may not have "main" at top level — handle both shapes
    const main = data?.main || (data.list && data.list[0]?.main);
    const wind = data?.wind || (data.list && data.list[0]?.wind);
    const weatherDesc = data?.weather?.[0]?.description || (data.list && data.list[0]?.weather?.[0]?.description) || 'N/A';
    currentSummary.innerHTML = `
      <h2>Current Conditions — Accra</h2>
      <p><strong>Temperature:</strong> ${main ? formatTemp(main.temp, units) : 'N/A'}</p>
      <p><strong>Humidity:</strong> ${main ? main.humidity + '%' : 'N/A'}</p>
      <p><strong>Wind Speed:</strong> ${wind ? (wind.speed + (units === 'imperial' ? ' mph' : ' m/s')) : 'N/A'}</p>
      <p><strong>Conditions:</strong> ${weatherDesc}</p>
    `;
    // accessible announce
    currentSummary.setAttribute('aria-busy', 'false');
  } catch (err) {
    currentSummary.innerHTML = '<p>Unable to load current weather. Please try again later.</p>';
    console.error(err);
  }
}

async function renderForecast(units) {
  if (!forecastList) return;
  forecastList.innerHTML = '<p>Loading forecast...</p>';
  try {
    const data = await getForecastForAccra(units);
    // data.list expected for forecast endpoint; if local fallback has .list, use it
    const items = data.list || data; // fallback if data is already an array in local file
    // ensure we have at least 15 items; take first 15
    const slice = items.slice(0, 15);
    forecastList.innerHTML = '';
    slice.forEach((item) => {
      // handle both shapes: item.main vs item.temp
      const dt = item.dt_txt || (item.dt ? new Date(item.dt * 1000).toLocaleString() : 'Unknown time');
      const temp = item.main?.temp ?? item.temp ?? 'N/A';
      const humidity = item.main?.humidity ?? item.humidity ?? 'N/A';
      const wind = item.wind?.speed ?? item.windSpeed ?? 'N/A';
      const desc = item.weather?.[0]?.description ?? 'N/A';

      const div = document.createElement('div');
      div.className = 'forecast-item';
      div.innerHTML = `
        <h3>${dt}</h3>
        <p><strong>Temp:</strong> ${temp !== 'N/A' ? formatTemp(temp, units) : 'N/A'}</p>
        <p><strong>Humidity:</strong> ${humidity}%</p>
        <p><strong>Wind:</strong> ${wind} ${units === 'imperial' ? 'mph' : 'm/s'}</p>
        <p><strong>Condition:</strong> ${desc}</p>
      `;
      forecastList.appendChild(div);
    });
  } catch (err) {
    forecastList.innerHTML = '<p>Unable to load forecast data. Please try again later.</p>';
    console.error(err);
  }
}

// Responsive nav toggle
function setupNav() {
  const btn = document.getElementById('nav-toggle');
  const nav = document.getElementById('primary-nav');
  if (!btn || !nav) return;
  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
    const isHidden = nav.getAttribute('aria-hidden') === 'true' || nav.getAttribute('aria-hidden') === null;
    nav.setAttribute('aria-hidden', String(!isHidden));
  });
}

function setupUnitControl() {
  const sel = document.getElementById('unit-select');
  if (!sel) return;
  sel.value = getUnits();
  sel.addEventListener('change', async () => {
    const units = sel.value;
    setUnits(units);
    await renderCurrent(units);
    await renderForecast(units);
  });
}

async function setupPage() {
  setupNav();
  setupUnitControl();
  const units = getUnits();
  // render current and forecast when the page loads
  await renderCurrent(units);
  await renderForecast(units);

  const refresh = document.getElementById('refresh-btn');
  if (refresh) refresh.addEventListener('click', async () => {
    refresh.disabled = true;
    await renderCurrent(getUnits());
    await renderForecast(getUnits());
    refresh.disabled = false;
  });
}

// run when DOM loaded
document.addEventListener('DOMContentLoaded', () => {
  setupPage().catch(err => console.error(err));
});
