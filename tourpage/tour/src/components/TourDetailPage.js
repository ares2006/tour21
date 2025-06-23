import tours from "../data/Tours.js";
import "../styles/TourDetail.css";

function TourDetailPage(tourId) {
  const tour = tours.find(t => t.id === parseInt(tourId));
  if (!tour) return document.createTextNode("ტური ვერ მოიძებნა");

  const container = document.createElement("div");
  container.className = "tour-detail fade-in";

  const img = document.createElement("img");
  img.src = `/${tour.image}`;
  img.alt = tour.title;
  img.className = "tour-detail-img";

  const title = document.createElement("h2");
  title.textContent = tour.title;
  title.className = "tour-detail-title";

  const region = document.createElement("p");
  region.textContent = `რეგიონი: ${tour.region}`;
  region.className = "tour-detail-info";

  const price = document.createElement("p");
  price.textContent = `ფასი: ${tour.price} ₾`;
  price.className = "tour-detail-info";

  const views = document.createElement("p");
  views.textContent = `ნახვები: ${tour.views}`;
  views.className = "tour-detail-info";

  const info = document.createElement("p");
  info.textContent = tour.info || "ინფორმაცია არ არის.";
  info.className = "tour-detail-description";

  const btn = document.createElement("button");
  btn.textContent = "დაჯავშნა";
  btn.className = "book-btn";
  btn.onclick = () => {
    overlay.style.display = "flex";
  };

  const overlay = document.createElement("div");
  overlay.className = "modal-overlay";
  overlay.style.display = "none";

  const modal = document.createElement("div");
  modal.className = "modal";

  const close = document.createElement("span");
  close.textContent = "×";
  close.className = "close-btn";
  close.onclick = () => {
    overlay.style.display = "none";
    form.reset();
    form.style.display = "block";
    paymentSection.style.display = "none";
  };

  const form = document.createElement("form");
  form.className = "booking-form";

  form.innerHTML = `
    <h3>დაჯავშნის ფორმა</h3>
    <label>სახელი: <input type="text" name="name" required /></label>
    <label>ტელეფონი: <input type="tel" name="phone" required /></label>
    <label>თარიღი: <input type="date" name="date" required /></label>
    <label>რაოდენობა: <input type="number" name="count" value="1" min="1" required /></label>
    <label>ხანგრძლივობა:
      <select name="days">
        <option>1</option><option>2</option><option>3</option><option>5</option><option>7</option>
      </select> დღე
    </label>
    <button type="button" id="nextStep">გაგრძელება</button>
  `;

  const paymentSection = document.createElement("div");
  paymentSection.className = "payment-fields";
  paymentSection.style.display = "none";
  paymentSection.innerHTML = `
    <h4>გადახდის ინფორმაცია</h4>
    <label>💳 ბარათის ნომერი:
      <input type="text" name="cardNumber" placeholder="1234 5678 9012 3456" maxlength="19" required />
    </label>
    <label>📅 ვადა (MM/YY):
      <input type="text" name="expiry" placeholder="08/25" maxlength="5" required />
    </label>
    <label>🔒 CVC:
      <input type="text" name="cvc" placeholder="123" maxlength="3" required />
    </label>
    <button type="submit">გადახდა და დაჯავშნა</button>
  `;

  form.querySelector("#nextStep").onclick = () => {
    const name = form.name.value.trim();
    const phone = form.phone.value.trim();
    const date = form.date.value;
    const count = form.count.value;

    if (!name || !phone || !date || !count) {
      alert("გთხოვთ შეავსოთ ყველა ველი.");
      return;
    }

    form.style.display = "none";
    paymentSection.style.display = "block";
  };

  paymentSection.querySelector("button[type='submit']").onclick = (e) => {
    e.preventDefault();

    const cardNumber = paymentSection.querySelector("input[name='cardNumber']").value;
    const expiry = paymentSection.querySelector("input[name='expiry']").value;
    const cvc = paymentSection.querySelector("input[name='cvc']").value;

    if (!cardNumber || !expiry || !cvc) {
      alert("გთხოვთ შეავსოთ გადახდის ყველა ველი.");
      return;
    }

    alert(`✅ გადახდა შესრულდა:
👤 ${form.name.value}
📞 ${form.phone.value}
📅 თარიღი: ${form.date.value}
👥 ადამიანი: ${form.count.value}
🗓️ დღეები: ${form.days.value}
💳 ბარათი: ${cardNumber}`);

    form.reset();
    paymentSection.style.display = "none";
    overlay.style.display = "none";
  };

  modal.append(close, form, paymentSection);
  overlay.appendChild(modal);

  container.append(img, title, region, price, views, info, btn, overlay);
  return container;
}

export default TourDetailPage;
