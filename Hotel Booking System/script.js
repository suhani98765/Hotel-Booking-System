// ====== HIGHLIGHT ACTIVE NAV LINK ======
document.querySelectorAll("nav a").forEach(link => {
  if (link.href === window.location.href) {
    link.classList.add("active");
  }
});

// ====== BOOKING PAGE LOGIC ======
const params = new URLSearchParams(window.location.search);
const roomName = params.get("room");
const roomPrice = params.get("price");

if (document.getElementById("roomName")) {
  // Pre-fill room details from URL
  if (roomName && roomPrice) {
    document.getElementById("roomName").value = roomName;
    document.getElementById("roomPrice").value = roomPrice;
  }

  // Elements
  const checkinInput = document.getElementById("checkin");
  const checkoutInput = document.getElementById("checkout");
  const totalPriceInput = document.getElementById("totalPrice");
  const bookingForm = document.getElementById("bookingForm");
  const resultDiv = document.getElementById("bookingResult");

  // ====== Calculate Total Price ======
  function calculatePrice() {
    const checkin = new Date(checkinInput.value);
    const checkout = new Date(checkoutInput.value);
    const pricePerNight = parseFloat(roomPrice);

    if (checkout > checkin) {
      const days = (checkout - checkin) / (1000 * 60 * 60 * 24);
      const total = days * pricePerNight;
      totalPriceInput.value = total;
    } else {
      totalPriceInput.value = "";
    }
  }

  checkinInput.addEventListener("change", calculatePrice);
  checkoutInput.addEventListener("change", calculatePrice);

  // ====== Handle Form Submission ======
  bookingForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const guestName = document.getElementById("guestName").value.trim();
    const checkinDate = checkinInput.value;
    const checkoutDate = checkoutInput.value;
    const totalPrice = totalPriceInput.value;

    if (!guestName || !checkinDate || !checkoutDate || !totalPrice) {
      alert("⚠️ Please fill in all fields correctly.");
      return;
    }

    // Display confirmation
    resultDiv.innerHTML = `
      <div class="confirmation">
        <h3>✅ Booking Confirmed!</h3>
        <p>Thank you, <strong>${guestName}</strong>.</p>
        <p>Your <strong>${roomName}</strong> is booked from 
        <strong>${checkinDate}</strong> to <strong>${checkoutDate}</strong>.</p>
        <p>Total Cost: ₹${totalPrice}</p>
        <a href="index.html" class="btn">Go Back Home</a>
      </div>
    `;

    // Clear form
    bookingForm.reset();
  });
}

// ====== CONTACT FORM HANDLER (Optional) ======
const contactForm = document.querySelector(".contact form");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    alert("📨 Thank you for contacting us! We'll get back to you soon.");
    contactForm.reset();
  });
}
