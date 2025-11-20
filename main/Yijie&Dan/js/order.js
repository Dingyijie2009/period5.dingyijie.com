// Simple order manager (moved into Yijie&Dan/js)
(function(){
  const TAX_RATE = 0.08;

  // Catalog grouped by category with explicit small/medium/large prices
  const catalog = {
    beef: [
      { id: 'b1', name: 'Beef Bulgogi Bowl', price:{s:9.00,m:14.00,l:18.00} },
      { id: 'b2', name: 'BBQ Pulled Pork', price:{s:7.50,m:11.00,l:14.00} },
      { id: 'b3', name: 'Steak Frites', price:{s:12.00,m:18.00,l:24.00} }
    ],
    chicken: [
      { id: 'c1', name: 'Citrus Chicken Salad', price:{s:7.50,m:11.50,l:14.50} },
      { id: 'c2', name: 'Chicken Shawarma', price:{s:8.50,m:12.00,l:15.50} }
    ],
    vegetable: [
      { id: 'v1', name: 'Margherita Flatbread', price:{s:6.50,m:9.50,l:12.50} },
      { id: 'v2', name: 'Veggie Tacos', price:{s:6.00,m:9.00,l:11.50} },
      { id: 'v3', name: 'Falafel Plate', price:{s:6.00,m:9.00,l:11.00} }
    ],
    soup: [
      { id: 's1', name: 'Spicy Miso Ramen', price:{s:8.50,m:13.50,l:16.50} },
      { id: 's2', name: 'Coconut Curry Soup', price:{s:7.00,m:12.00,l:15.00} }
    ]
  };

  const menuEl = document.getElementById('menu');
  const cartListEl = document.getElementById('cart-list');
  const subtotalEl = document.getElementById('subtotal');
  const taxEl = document.getElementById('tax');
  const totalEl = document.getElementById('total');
  const proceedBtn = document.getElementById('proceed');

  let cart = [];

  function money(n){return n.toFixed(2)}

  function renderMenu(){
    menuEl.innerHTML = '';
    for(const cat of Object.keys(catalog)){
      const div = document.createElement('div');
      div.className = 'category';
      const title = document.createElement('h3');
      title.textContent = cat.charAt(0).toUpperCase()+cat.slice(1);
      div.appendChild(title);

      catalog[cat].forEach(item=>{
        const row = document.createElement('div');
        row.className = 'dish-row';

        const left = document.createElement('div'); left.className='dish-left';
        const name = document.createElement('div'); name.innerHTML = `<strong>${item.name}</strong><div class="small-muted">$${money(item.price.s)} / $${money(item.price.m)} / $${money(item.price.l)} (S/M/L)</div>`;
        left.appendChild(name);

        const form = document.createElement('div');
        form.className = 'form';
        form.innerHTML = `
          <div class="sizes">
            <label><input type="radio" name="size_${item.id}" value="s" checked> S</label>
            <label><input type="radio" name="size_${item.id}" value="m"> M</label>
            <label><input type="radio" name="size_${item.id}" value="l"> L</label>
          </div>
          <div style="margin-top:6px">
            <input class="qty" type="number" min="1" value="1" id="qty_${item.id}">
            <button class="btn btn-add" data-id="${item.id}">Add</button>
          </div>
        `;

        row.appendChild(left);
        row.appendChild(form);
        div.appendChild(row);
      });

      menuEl.appendChild(div);
    }

    // attach add handlers
    menuEl.querySelectorAll('.btn-add').forEach(btn=>{
      btn.addEventListener('click', function(){
        const id = this.getAttribute('data-id');
        const size = document.querySelector(`input[name="size_${id}"]:checked`).value;
        const qty = parseInt(document.getElementById(`qty_${id}`).value) || 1;
        addToCart(id, size, qty);
      });
    });
  }

  function findItem(id){
    for(const cat of Object.keys(catalog)){
      const found = catalog[cat].find(i=>i.id===id);
      if(found) return found;
    }
    return null;
  }

  function addToCart(id,size,qty){
    const item = findItem(id);
    if(!item) return;
    const existing = cart.find(c=>c.id===id && c.size===size);
    if(existing){ existing.qty += qty; }
    else cart.push({ id:item.id, name:item.name, size, qty, unit:item.price[size] });
    renderCart();
  }

  function removeFromCart(index){
    cart.splice(index,1);
    renderCart();
  }

  function renderCart(){
    cartListEl.innerHTML = '';
    if(cart.length===0){ cartListEl.innerHTML = '<div class="small-muted">Your cart is empty</div>'; }
    cart.forEach((c,i)=>{
      const el = document.createElement('div'); el.className='cart-item';
      const left = document.createElement('div'); left.innerHTML = `<div><strong>${c.name}</strong> <span class="small-muted">(${c.size.toUpperCase()})</span></div><div class="small-muted">Qty: ${c.qty}</div>`;
      const right = document.createElement('div'); right.innerHTML = `<div>$${money(c.unit)} ea</div><div><strong>$${money(c.unit*c.qty)}</strong></div><div style="margin-top:6px"><button class="btn btn-remove" data-index="${i}">Remove</button></div>`;
      el.appendChild(left); el.appendChild(right);
      cartListEl.appendChild(el);
    });

    // attach remove handlers
    cartListEl.querySelectorAll('.btn-remove').forEach(b=>b.addEventListener('click', e=>{
      const idx = parseInt(e.currentTarget.getAttribute('data-index'),10);
      removeFromCart(idx);
    }));

    updateTotals();
  }

  function updateTotals(){
    const subtotal = cart.reduce((s,i)=>s + i.unit * i.qty, 0);
    const tax = subtotal * TAX_RATE;
    const total = subtotal + tax;
    subtotalEl.textContent = money(subtotal);
    taxEl.textContent = money(tax);
    totalEl.textContent = money(total);
    proceedBtn.disabled = subtotal <= 0.001;
  }

  proceedBtn && proceedBtn.addEventListener('click', function(){
    // save to session and go to receipt
    const order = {
      date: new Date().toISOString(),
      items: cart.slice(),
      subtotal: parseFloat(subtotalEl.textContent),
      tax: parseFloat(taxEl.textContent),
      total: parseFloat(totalEl.textContent)
    };
    sessionStorage.setItem('latestOrder', JSON.stringify(order));
    window.location.href = 'receipt.html';
  });

  // initial render
  renderMenu();
  renderCart();

})();
