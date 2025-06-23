import tours from "../data/Tours.js"; 
import TourCard from "./TourCard.js";

function ToursPage() {
  const container = document.createElement("div");
  container.className = "tours-page";

  const filterBar = document.createElement("div");
  filterBar.className = "filter-bar";

  const regionSelect = document.createElement("select");
  regionSelect.innerHTML = `
    <option value="all">ყველა რეგიონი</option>
    <option>საქართველო</option>
    <option>აჭარა</option>
    <option>გურია</option>
    <option>იმერეთი</option>
    <option>სამეგრელო</option>
    <option>რაჭა</option>
    <option>სვანეთი</option>
    <option>კახეთი</option>
    <option>მცხეთა-მთიანეთი</option>
    <option>თუშეთი</option>
    <option>სამცხე-ჯავახეთი</option>
    <option>შიდა ქართლი</option>
    <option>ხევსურეთი</option>
    <option>თბილისი</option>
    <option>სტეფანწმინდა</option>
    <option>ბორჯომი</option>
    <option>ქუთაისი</option>
  `;

  const priceRange = document.createElement("input");
  priceRange.type = "range";
  priceRange.min = 0;
  priceRange.max = 1000;
  priceRange.value = 1000;

  const priceLabel = document.createElement("span");
  priceLabel.textContent = `ბიუჯეტი: ${priceRange.value} ₾`;

  filterBar.appendChild(regionSelect);
  filterBar.appendChild(priceLabel);
  filterBar.appendChild(priceRange);
  container.appendChild(filterBar);

  const grid = document.createElement("div");
  grid.className = "tour-grid";

  function renderTours() {
    grid.innerHTML = "";

    const selectedRegion = regionSelect.value;
    const selectedPrice = parseInt(priceRange.value);

    const filtered = tours.filter(t => {
      const regionMatch = selectedRegion === "all" || t.region === selectedRegion;
      const priceMatch = t.price <= selectedPrice;
      return regionMatch && priceMatch;
    });

    filtered.forEach(tour => {
      const card = TourCard(tour, window.renderApp); // 🟢 აქ ჩავუთვი renderApp
      grid.appendChild(card);
    });
  }

  regionSelect.addEventListener("change", renderTours);
  priceRange.addEventListener("input", () => {
    priceLabel.textContent = `ბიუჯეტი: ${priceRange.value} ₾`;
    renderTours();
  });

  container.appendChild(grid);
  renderTours();

  return container;
}

export default ToursPage;
