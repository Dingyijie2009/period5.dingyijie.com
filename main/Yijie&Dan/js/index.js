document.addEventListener('DOMContentLoaded', function() {
    const next = document.getElementById('right-arrow');
    const prev = document.getElementById('left-arrow');
    const dateDisplay = document.getElementById('date-display');
    const dishList = document.getElementById('dish-list');

    // Master list: 21 dishes (3 per day for 7 days)
    const masterDishes = [
        { name: 'Autumn Harvest Bowl', price: 12.00, desc: 'Roasted squash, quinoa, seeds', page: 'dish/1.html' },
        { name: 'Spicy Miso Ramen', price: 13.50, desc: 'Rich broth with chili oil', page: 'dish/2.html' },
        { name: 'Grilled Salmon Bento', price: 15.00, desc: 'Teriyaki glaze and rice', page: 'dish/3.html' },
        { name: 'Veggie Tacos', price: 10.00, desc: 'Black beans, corn, pico', page: 'dish/4.html' },
        { name: 'Citrus Chicken Salad', price: 11.50, desc: 'Orange vinaigrette', page: 'dish/5.html' },
        { name: 'Margherita Flatbread', price: 9.50, desc: 'Fresh basil, tomato', page: 'dish/6.html' },
        { name: 'Beef Bulgogi Bowl', price: 14.00, desc: 'Korean-style marinated beef', page: 'dish/7.html' },
        { name: 'Shrimp Pad Thai', price: 13.00, desc: 'Tamarind, peanuts', page: 'dish/1.html' },
        { name: 'Mushroom Risotto', price: 12.50, desc: 'Creamy arborio rice', page: 'dish/2.html' },
        { name: 'Lemon Herb Pasta', price: 10.50, desc: 'Light garlic lemon sauce', page: 'dish/3.html' },
        { name: 'Coconut Curry', price: 12.00, desc: 'Coconut milk and spices', page: 'dish/4.html' },
        { name: 'Steak Frites', price: 18.00, desc: 'Charred steak with fries', page: 'dish/5.html' },
        { name: 'Falafel Plate', price: 9.00, desc: 'Tahini and pickles', page: 'dish/6.html' },
        { name: 'Seafood Paella', price: 16.50, desc: 'Saffron rice and shellfish', page: 'dish/7.html' },
        { name: 'BBQ Pulled Pork', price: 11.00, desc: 'Slow-cooked with slaw', page: 'dish/1.html' },
        { name: 'Greek Mezze', price: 10.00, desc: 'Hummus, olives, pita', page: 'dish/2.html' },
        { name: 'Poke Bowl', price: 13.00, desc: 'Fresh tuna, avocado', page: 'dish/3.html' },
        { name: 'Teriyaki Tofu', price: 9.50, desc: 'Sticky teriyaki glaze', page: 'dish/4.html' },
        { name: 'Gnocchi Pomodoro', price: 11.00, desc: 'Tomato sauce and basil', page: 'dish/5.html' },
        { name: 'Ratatouille Tart', price: 10.50, desc: 'Layered vegetable tart', page: 'dish/6.html' },
        { name: 'Chicken Shawarma', price: 12.00, desc: 'Garlic sauce and rice', page: 'dish/7.html' }
    ];

    // Pre-split into 7 groups (3 per day)
    const days = [];
    for (let i = 0; i < 7; i++) {
        days[i] = masterDishes.slice(i * 3, i * 3 + 3);
    }

    let dayIndex = 0; // 0 = today, up to 6

    function formatDisplayDate(indexOffset) {
        const d = new Date();
        d.setDate(d.getDate() + indexOffset);
        const opts = { month: 'long', day: 'numeric', year: 'numeric' };
        return d.toLocaleDateString(undefined, opts);
    }

    function render() {
        if (!dateDisplay || !dishList) return;
        dateDisplay.textContent = formatDisplayDate(dayIndex);

        const group = days[dayIndex] || [];
        dishList.innerHTML = group.map(d => {
            const special = (d.price * 0.95).toFixed(2);
            const orig = d.price.toFixed(2);
            return `
                <li>
                    <div class="dish-card">
                        <h3><a href="${d.page}">${d.name}</a></h3>
                        <p>${d.desc}</p>
                        <div class="price-row">
                            <span class="orig-price">$${orig}</span>
                            <span class="special-price">$${special}</span>
                        </div>
                    </div>
                </li>
            `;
        }).join('');
    }

    // Navigation handlers
    if (next) {
        next.addEventListener('click', function() {
            dayIndex = (dayIndex + 1) % 7;
            render();
        });
    }
    if (prev) {
        prev.addEventListener('click', function() {
            dayIndex = (dayIndex - 1 + 7) % 7;
            render();
        });
    }

    // Initial render
    render();
});
