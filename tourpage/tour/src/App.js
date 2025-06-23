import ToursPage from "./components/ToursPage.js";
import TourDetailPage from "./components/TourDetailPage.js";
import tours from "./data/Tours.js"; 

function App() {
  const container = document.createElement("div");

  const path = window.location.pathname;

  if (path.startsWith("/tour/")) {
    const tourId = path.split("/tour/")[1];
    container.appendChild(TourDetailPage(tourId));
  } else {
    container.appendChild(ToursPage());
  }

  return container;
}

function renderApp() {
  document.body.innerHTML = "";
  document.body.appendChild(App());
}

window.onpopstate = renderApp;

window.renderApp = renderApp;

export default App;
export { renderApp };

