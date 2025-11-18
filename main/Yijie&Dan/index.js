// Dishes data for 7 days (sample)
const dishesByDay = [
  [
    { name: "Spicy Tuna Roll", price: 12.99 },
    { name: "Miso Ramen", price: 10.99 },
    { name: "Teriyaki Chicken", price: 13.99 }
  ],
  [
    { name: "Salmon Sashimi", price: 14.99 },
    { name: "Tempura Udon", price: 11.99 },
    { name: "Beef Bulgogi", price: 15.99 }
  ],
  [
    { name: "Pork Katsu", price: 12.49 },
    { name: "Shrimp Tempura", price: 13.49 },
    { name: "Chicken Karaage", price: 11.99 }
  ],
  [
    { name: "Unagi Don", price: 16.99 },
    { name: "Vegetable Curry", price: 9.99 },
    { name: "Soba Noodles", price: 10.49 }
  ],
  [
    { name: "Okonomiyaki", price: 12.99 },
    { name: "Takoyaki", price: 8.99 },
    { name: "Gyoza", price: 7.99 }
  ],
  [
    { name: "Chicken Yakitori", price: 10.99 },
    { name: "Seafood Hotpot", price: 17.99 },
    { name: "Eggplant Miso", price: 9.49 }
  ],
  [
    { name: "Sashimi Platter", price: 18.99 },
    { name: "Tonkotsu Ramen", price: 13.99 },
    { name: "Matcha Cheesecake", price: 6.99 }
  ]
];

function getTodayIndex() {
  // Always start from today (0), then next 6 days
  return 0;
}

function getDateString(offset) {
  const today = new Date();
  today.setDate(today.getDate() + offset);
  return today.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function renderDishes(dayIndex) {
  const dishes = dishesByDay[dayIndex];
  const dishList = document.getElementById('dish-list');
  dishList.innerHTML = '';
  dishes.forEach((dish, i) => {
    const li = document.createElement('li');
    li.className = 'dish-item';
    li.innerHTML = `
      <label>
        <input type="checkbox" class="dish-select" value="${dish.name}" data-price="${dish.price}" />
        <span class="dish-name">${dish.name}</span> - <span class="dish-price">$${(dish.price * 0.95).toFixed(2)}</span> <span class="discount">(5% off)</span>
      </label>
    `;
    dishList.appendChild(li);
  });
}

function updateDateDisplay(dayIndex) {
  const dateDisplay = document.getElementById('date-display');
  dateDisplay.textContent = getDateString(dayIndex);
}

function setupNavigation() {
  let dayIndex = 0;
  const leftArrow = document.getElementById('left-arrow');
  const rightArrow = document.getElementById('right-arrow');
  leftArrow.onclick = () => {
    if (dayIndex > 0) {
      dayIndex--;
      updateDateDisplay(dayIndex);
      renderDishes(dayIndex);
    }
  };
  rightArrow.onclick = () => {
    if (dayIndex < 6) {
      dayIndex++;
      updateDateDisplay(dayIndex);
      renderDishes(dayIndex);
    }
  };
}

function saveSelectedDishes() {
  const selected = Array.from(document.querySelectorAll('.dish-select:checked')).map(input => ({
    name: input.value,
    price: input.getAttribute('data-price')
  }));
  localStorage.setItem('selectedDishes', JSON.stringify(selected));
}

document.addEventListener('DOMContentLoaded', () => {
  updateDateDisplay(0);
  renderDishes(0);
  setupNavigation();
  document.getElementById('dish-list').addEventListener('change', saveSelectedDishes);
});
