
document.addEventListener('DOMContentLoaded', function(){
  
{
    const ok = confirm('Are you 18 years old or older? Click OK for Yes, Cancel for No.');
    if (!ok) {
      
      document.body.innerHTML = '<div style="padding:24px;max-width:800px;margin:40px auto;font-family:Arial,Helvetica,sans-serif;">\n+        <h2>Access Restricted</h2>\n+        <p>Sorry, you must be 18 years or older to view this site.</p>\n+        </div>';
      return;
    }
  }
  const prev = document.getElementById('left-arrow');
  const next = document.getElementById('right-arrow');
  const dateDisplay = document.getElementById('date-display');
  const dishList = document.getElementById('dish-list');
  const dailyContainer = document.getElementById('daily-images');

  
  const master = [
    {id:'d1',name:'Autumn Harvest Bowl',price:12,desc:'Roasted squash & quinoa',page:'dish/1.html'},
    {id:'d2',name:'Spicy Miso Ramen',price:13.5,desc:'Miso broth & egg',page:'dish/2.html'},
    {id:'d3',name:'Grilled Salmon Bento',price:15,desc:'Teriyaki glaze',page:'dish/3.html'},
    {id:'d4',name:'Veggie Tacos',price:10,desc:'Roasted veg',page:'dish/4.html'},
    {id:'d5',name:'Citrus Chicken Salad',price:11.5,desc:'Citrus vinaigrette',page:'dish/5.html'},
    {id:'d6',name:'Margherita Flatbread',price:9.5,desc:'Tomato & basil',page:'dish/6.html'},
    {id:'d7',name:'Beef Bulgogi Bowl',price:14,desc:'Korean marinated beef',page:'dish/7.html'}
  ];

  
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


  const images = [
    'image/1.png','image/2.png','image/3.png','image/4.png',
    'image/5.png','image/6.png','image/7.png','image/8.png'
  ];


  // seeded RNG helper (linear congruential) and seeded shuffle
  function seededRandom(seed){
    let s = seed % 2147483647;
    if (s <= 0) s += 2147483646;
    return function(){
      s = s * 16807 % 2147483647;
      return (s - 1) / 2147483646;
    };
  }

  function seededShuffle(arr, rand){
    const a = arr.slice();
    for(let i = a.length - 1; i > 0; i--){
      const j = Math.floor(rand() * (i + 1));
      const t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function chooseThreeIndices(offset){
    const key = fmtDate(offset);
    let sum = 0;
    for(let i=0;i<key.length;i++) sum = (sum * 31 + key.charCodeAt(i)) >>> 0;
    const rand = seededRandom(sum || 1);
    const indices = images.map((_,i)=>i);
    const shuffled = seededShuffle(indices, rand);
    return shuffled.slice(0, Math.min(3, shuffled.length));
  }

  function render(){
    dateDisplay.textContent = fmtDate(dayIndex);
    const group = days[dayIndex] || [];
  
    if(dailyContainer){
      const idxs = chooseThreeIndices(dayIndex);
      dailyContainer.innerHTML = idxs.map(i=>`<img src="${images[i]}" alt="Daily ${i+1}">`).join('');
    }
    dishList.innerHTML = group.map(d=>{
      const special = (d.price*0.95).toFixed(2);
      return `<li><div class="dish-card"><h3>${d.name}</h3><p class="muted">${d.desc}</p><div class="price-row"><span class="orig-price">$${d.price.toFixed(2)}</span><span class="special-price">$${special}</span></div><div style="margin-top:8px"><button data-id="${d.id}" data-name="${encodeURIComponent(d.name)}" data-price="${d.price}" class="select-btn">Select</button></div></div></li>`;
    }).join('');


    document.querySelectorAll('.select-btn').forEach(b=>{
      b.addEventListener('click', function(){
        const id = this.getAttribute('data-id');
        const name = decodeURIComponent(this.getAttribute('data-name'));
        const price = parseFloat(this.getAttribute('data-price'));
        
        const pre = JSON.parse(sessionStorage.getItem('preselect')||'[]');
        pre.push({id,name,price,size:'m',qty:1});
        sessionStorage.setItem('preselect', JSON.stringify(pre));
       
        location.href = 'order.html';
      });
    });
  }

  prev && prev.addEventListener('click', ()=>{ dayIndex = (dayIndex-1+7)%7; render(); });
  next && next.addEventListener('click', ()=>{ dayIndex = (dayIndex+1)%7; render(); });


  render();
});
