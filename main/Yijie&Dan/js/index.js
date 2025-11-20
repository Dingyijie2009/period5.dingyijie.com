document.addEventListener('DOMContentLoaded', () => {
  const prev = document.getElementById('left-arrow');
  const next = document.getElementById('right-arrow');
  const dateDisplay = document.getElementById('date-display');
  const dishList = document.getElementById('dish-list');

  // Simple master list (3 dishes per day for 7 days)
  const master = [
    { name: 'Autumn Harvest Bowl', price: 12, desc: 'Roasted squash & quinoa', page: 'dish/1.html' },
    { name: 'Spicy Miso Ramen', price: 13.5, desc: 'Miso broth & egg', page: 'dish/2.html' },
    { name: 'Grilled Salmon Bento', price: 15, desc: 'Teriyaki glaze', page: 'dish/3.html' },
    { name: 'Veggie Tacos', price: 10, desc: 'Roasted veg & beans', page: 'dish/4.html' },
    { name: 'Citrus Chicken Salad', price: 11.5, desc: 'Citrus vinaigrette', page: 'dish/5.html' },
    { name: 'Margherita Flatbread', price: 9.5, desc: 'Tomato & basil', page: 'dish/6.html' },
    { name: 'Beef Bulgogi Bowl', price: 14, desc: 'Korean marinated beef', page: 'dish/7.html' },
    // the list continues but for simplicity we'll reuse items if needed
  ];

  // Build 7 day groups, 3 items each
  const days = Array.from({length:7}, (_,i) => master.slice(i*3, i*3+3).length ? master.slice(i*3, i*3+3) : master.slice(0,3));

  let dayIndex = 0;

  function formatDate(offset){
    const d = new Date(); d.setDate(d.getDate()+offset);
    return d.toLocaleDateString(undefined,{month:'long',day:'numeric',year:'numeric'});
  }

  function render(){
    if(!dateDisplay || !dishList) return;
    dateDisplay.textContent = formatDate(dayIndex);
    const group = days[dayIndex] || [];
    dishList.innerHTML = group.map(d=>{
      const special = (d.price*0.95).toFixed(2);
      return `
        <li>
          <div class="dish-card">
            <h3><a href="${d.page}">${d.name}</a></h3>
            <p>${d.desc}</p>
            <div class="price-row"><span class="orig-price">$${d.price.toFixed(2)}</span><span class="special-price">$${special}</span></div>
          </div>
        </li>`;
    }).join('');
  }

  prev && prev.addEventListener('click',()=>{ dayIndex = (dayIndex-1+7)%7; render(); });
  next && next.addEventListener('click',()=>{ dayIndex = (dayIndex+1)%7; render(); });

  render();
});
