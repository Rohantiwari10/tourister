const container = document.getElementById("places-container");
const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");

const UNSPLASH_KEY = "twIFGFv4SJfxcqqFe8UAdh9yoR2bYE986pz0dGd2vDM"; 
const GEOAPIFY_KEY = "292a3cfa439d4a8280851b64c0b40b0e";

// Get city coordinates from Geoapify
async function fetchCityCoordinates(city) {
  const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(city)}&limit=1&apiKey=${GEOAPIFY_KEY}`;
  const res = await fetch(url);
  const data = await res.json();
  const feature = data.features?.[0];
  if (!feature) throw new Error("City not found");
  return { lat: feature.properties.lat, lon: feature.properties.lon };
}

// Fetch top 4 tourist places in a city
async function fetchGeoPlaces(lat, lon) {
  const url = `https://api.geoapify.com/v2/places?categories=tourism.sights&filter=circle:${lon},${lat},10000&limit=4&apiKey=${GEOAPIFY_KEY}`;
  const res = await fetch(url);
  const data = await res.json();
  return data.features.map(place => ({
    name: place.properties.name || "Unnamed Place",
    address: place.properties.address_line2 || place.properties.address_line1 || "Address not available"
  }));
}

// Fetch image from Unsplash
async function fetchUnsplashImage(placeName) {
  const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(placeName)}&client_id=${UNSPLASH_KEY}&per_page=1`;
  const res = await fetch(url);
  const data = await res.json();
  return data.results[0]?.urls?.small || `https://via.placeholder.com/300x180?text=${encodeURIComponent(placeName)}`;
}

// Fetch Wikipedia page link
async function fetchWikiLink(placeName) {
  const url = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=info&titles=${encodeURIComponent(placeName)}&inprop=url&origin=*`;
  const res = await fetch(url);
  const data = await res.json();
  const pages = data.query.pages;
  const page = Object.values(pages)[0];
  return page.fullurl || "#";
}

// Render places
async function renderPlaces(city = "Delhi") {
  container.innerHTML = `<p>Loading...</p>`;
  try {
    const { lat, lon } = await fetchCityCoordinates(city);
    const places = await fetchGeoPlaces(lat, lon);

    if (places.length === 0) {
      container.innerHTML = `<p>No tourist places found for "${city}".</p>`;
      return;
    }

    const cards = await Promise.all(
      places.map(async place => {
        const image = await fetchUnsplashImage(place.name);
        const wikiLink = await fetchWikiLink(place.name);

        return `
          <div class="place-card">
            <img src="${image}" alt="${place.name}" />
            <div class="place-card-content">
              <h4>${place.name}</h4>
              <p>${place.address}</p>
              <a href="${wikiLink}" target="_blank" rel="noopener noreferrer">View More</a>
            </div>
          </div>
        `;
      })
    );

    container.innerHTML = `<div class="places-grid">${cards.join('')}</div>`;
  } catch (err) {
    container.innerHTML = `<p style="color:var(--extra-light)">Failed to load places. Check console for details.</p>`;
    console.error(err);
  }
}

// Initial render
renderPlaces();

// Search functionality
searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) renderPlaces(city);
});
