// Simple index script for test folder
document.addEventListener('DOMContentLoaded', function(){
  const prev = document.getElementById('left-arrow');
  const next = document.getElementById('right-arrow');
  const dateDisplay = document.getElementById('date-display');
  const dishList = document.getElementById('dish-list');

  // Master dishes (make at least 21 items, we'll reuse if needed)
  const master = [
    {id:'d1',name:'Autumn Harvest Bowl',price:12,desc:'Roasted squash & quinoa',page:'dish/1.html'},
    {id:'d2',name:'Spicy Miso Ramen',price:13.5,desc:'Miso broth & egg',page:'dish/2.html'},
    {id:'d3',name:'Grilled Salmon Bento',price:15,desc:'Teriyaki glaze',page:'dish/3.html'},
    {id:'d4',name:'Veggie Tacos',price:10,desc:'Roasted veg',page:'dish/4.html'},
    {id:'d5',name:'Citrus Chicken Salad',price:11.5,desc:'Citrus vinaigrette',page:'dish/5.html'},
    {id:'d6',name:'Margherita Flatbread',price:9.5,desc:'Tomato & basil',page:'dish/6.html'},
    {id:'d7',name:'Beef Bulgogi Bowl',price:14,desc:'Korean marinated beef',page:'dish/7.html'}
  ];

  // Build 7 groups of 3 dishes each (reuse master as needed)
  const days = [];
  for(let i=0;i<7;i++){
    const start = (i*3) % master.length;
    days.push([master[start], master[(start+1)%master.length], master[(start+2)%master.length]]);
  }

  let dayIndex = 0;

  function fmtDate(offset){
    const d = new Date(); d.setDate(d.getDate()+offset);
    return d.toLocaleDateString(undefined,{month:'long',day:'numeric',year:'numeric'});
  }

  function render(){
    dateDisplay.textContent = fmtDate(dayIndex);
    const group = days[dayIndex] || [];
    dishList.innerHTML = group.map(d=>{
      const special = (d.price*0.95).toFixed(2);
      return `<li><div class="dish-card"><h3>${d.name}</h3><p class="muted">${d.desc}</p><div class="price-row"><span class="orig-price">$${d.price.toFixed(2)}</span><span class="special-price">$${special}</span></div><div style="margin-top:8px"><button data-id="${d.id}" data-name="${encodeURIComponent(d.name)}" data-price="${d.price}" class="select-btn">Select</button></div></div></li>`;
    }).join('');

    // wire select buttons
    document.querySelectorAll('.select-btn').forEach(b=>{
      b.addEventListener('click', function(){
        const id = this.getAttribute('data-id');
        const name = decodeURIComponent(this.getAttribute('data-name'));
        const price = parseFloat(this.getAttribute('data-price'));
        // store preselected in sessionStorage (array)
        const pre = JSON.parse(sessionStorage.getItem('preselect')||'[]');
        pre.push({id,name,price,size:'m',qty:1});
        sessionStorage.setItem('preselect', JSON.stringify(pre));
        // go to order page
        location.href = 'order.html';
      });
    });
  }

  prev && prev.addEventListener('click', ()=>{ dayIndex = (dayIndex-1+7)%7; render(); });
  next && next.addEventListener('click', ()=>{ dayIndex = (dayIndex+1)%7; render(); });

  // always show today's date on load
  render();
});
