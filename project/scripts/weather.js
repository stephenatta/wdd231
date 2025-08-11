// scripts/weather.js
// Exports fetchForecast and fetchCurrent - tries OpenWeatherMap if window.OWM_API_KEY present, else uses local JSON fallback.

const LOCAL_JSON = 'scripts/data/forecast.json'; // path relative to project root

async function fetchFromOWM(endpoint) {
  const key = window.OWM_API_KEY;
  if (!key) throw new Error('No OpenWeatherMap API key provided on window.OWM_API_KEY');
  const url = `https://api.openweathermap.org/data/2.5/${endpoint}&appid=${key}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`OWM error ${res.status}`);
  return res.json();
}

// helper to try OWM and fallback
async function safeFetch(endpoint, transformIfNeeded) {
  try {
    // endpoint expected like 'forecast?q=Accra,GH&units=metric' (no &appid)
    const key = window.OWM_API_KEY;
    if (key) {
      const url = `https://api.openweathermap.org/data/2.5/${endpoint}&appid=${key}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('OWM fetch failed: ' + res.status);
      const json = await res.json();
      return json;
    }
    // else fallback to local json
    const res = await fetch(LOCAL_JSON);
    if (!res.ok) throw new Error('local json fetch failed');
    const local = await res.json();
    return local;
  } catch (err) {
    console.error(err);
    // rethrow for callers
    throw err;
  }
}

export async function getForecastForAccra(units = 'metric') {
  // using OWM 5-day/3-hour endpoint format
  const endpoint = `forecast?q=Accra,GH&units=${units}`;
  const data = await safeFetch(endpoint);
  // if the local JSON has same structure, return it, else transform
  return data;
}

export async function getCurrentForAccra(units = 'metric') {
  const endpoint = `weather?q=Accra,GH&units=${units}`;
  const data = await safeFetch(endpoint);
  return data;
}
