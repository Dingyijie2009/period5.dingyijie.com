
document.addEventListener('DOMContentLoaded', function(){
  const TAX = 0.08;
  const menuEl = document.getElementById('menu');
  const cartList = document.getElementById('cart-list');
  const subtotalEl = document.getElementById('subtotal');
  const taxEl = document.getElementById('tax');
  const totalEl = document.getElementById('total');
  const proceedBtn = document.getElementById('proceed');


  const catalog = {
    beef:[{id:'b1',name:'Beef Bulgogi Bowl',price:{s:9,m:14,l:18}}],
    chicken:[{id:'c1',name:'Citrus Chicken Salad',price:{s:7.5,m:11.5,l:14.5}}],
    vegetable:[{id:'v1',name:'Margherita Flatbread',price:{s:6.5,m:9.5,l:12.5}}],
    soup:[{id:'s1',name:'Spicy Miso Ramen',price:{s:8.5,m:13.5,l:16.5}}]
  };

  let cart = [];

  function money(n){return n.toFixed(2)}

  function renderMenu(){
    menuEl.innerHTML = '';
    for(const cat in catalog){
      const div = document.createElement('div');
      div.innerHTML = `<h3>${cat}</h3>`;
      catalog[cat].forEach(item=>{
        const row = document.createElement('div');
        row.innerHTML = `
          <div><strong>${item.name}</strong></div>
          <div class="muted">$${money(item.price.s)} / $${money(item.price.m)} / $${money(item.price.l)} (S/M/L)</div>
          <div>
            <label><input type="radio" name="size_${item.id}" value="s" checked> S</label>
            <label><input type="radio" name="size_${item.id}" value="m"> M</label>
            <label><input type="radio" name="size_${item.id}" value="l"> L</label>
            <input type="number" id="qty_${item.id}" value="1" min="1" style="width:50px">
            <button data-id="${item.id}" class="add-btn">Add</button>
          </div>
        `;
        div.appendChild(row);
      });
      menuEl.appendChild(div);
    }


    menuEl.querySelectorAll('.add-btn').forEach(b=>b.addEventListener('click',function(){
      const id = this.getAttribute('data-id');
      const size = document.querySelector(`input[name="size_${id}"]:checked`).value;
      const qty = parseInt(document.getElementById(`qty_${id}`).value) || 1;

      let found = null;
      for(const cat in catalog){ found = catalog[cat].find(i=>i.id===id); if(found) break; }
      if(!found) return;
      const unit = found.price[size];
      const existing = cart.find(c=>c.id===id && c.size===size);
      if(existing) existing.qty += qty; else cart.push({id, name:found.name, size, qty, unit});
      renderCart();
    }));
  }

  function renderCart(){
    cartList.innerHTML = '';
    if(cart.length===0) cartList.innerHTML = '<div class="muted">Cart is empty</div>';
    cart.forEach((c,i)=>{
      const el = document.createElement('div');
      el.innerHTML = `<div><strong>${c.name}</strong> (${c.size.toUpperCase()}) x ${c.qty} — $${money(c.unit*c.qty)} <button data-i="${i}" class="remove-btn">Remove</button></div>`;
      cartList.appendChild(el);
    });
    cartList.querySelectorAll('.remove-btn').forEach(b=>b.addEventListener('click', function(){
      const i = parseInt(this.getAttribute('data-i')); cart.splice(i,1); renderCart();
    }));
    updateTotals();
  }

  function updateTotals(){
    const subtotal = cart.reduce((s,i)=>s + i.unit*i.qty,0);
    const tax = subtotal * TAX; const total = subtotal + tax;
    subtotalEl.textContent = money(subtotal); taxEl.textContent = money(tax); totalEl.textContent = money(total);
    proceedBtn.disabled = subtotal < 0.01;
  }

  
  const pre = JSON.parse(sessionStorage.getItem('preselect')||'[]');
  if(pre.length){
    pre.forEach(p=>{
      
      let found = null;
      for(const cat in catalog){ found = catalog[cat].find(i=>i.id===p.id); if(found) break; }
      if(found){ cart.push({id:found.id, name:found.name, size:p.size||'m', qty:p.qty||1, unit:found.price[p.size||'m']}); }
      else { cart.push({id:p.id, name:p.name, size:p.size||'m', qty:p.qty||1, unit:p.price||0}); }
    });
    sessionStorage.removeItem('preselect');
  }

  proceedBtn && proceedBtn.addEventListener('click', function(){
    const order = {date:new Date().toISOString(), items:cart, subtotal:parseFloat(subtotalEl.textContent), tax:parseFloat(taxEl.textContent), total:parseFloat(totalEl.textContent)};
    sessionStorage.setItem('latestOrder', JSON.stringify(order));
    location.href = 'receipt.html';
  });

  
  renderMenu(); renderCart();
});
