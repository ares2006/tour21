function TourCard(tour, renderApp) {
  const card = document.createElement("div");
  card.className = "tour-card";

  const img = document.createElement("img");
  img.src = tour.image;
  img.alt = tour.title;

  const title = document.createElement("div");
  title.className = "tour-title";
  title.textContent = tour.title;

  const footer = document.createElement("div");
  footer.className = "tour-footer";
  footer.innerHTML = `👁️ ${tour.views} ნახვა`;

  const btn = document.createElement("button");
  btn.textContent = "დაწვრილებით";
  btn.className = "tour-btn";

  btn.onclick = () => {
    window.history.pushState({}, "", `/tour/${tour.id}`);
    if (typeof renderApp === "function") {
      renderApp();
    } else {
      window.location.href = `/tour/${tour.id}`;
    }
  };

  card.append(img, title, footer, btn);
  return card;
}

export default TourCard;
