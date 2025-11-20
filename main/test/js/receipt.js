// receipt.js - reads latestOrder from sessionStorage and shows receipt
document.addEventListener('DOMContentLoaded', function(){
  const orderJson = sessionStorage.getItem('latestOrder');
  if(!orderJson){ document.querySelector('.container').innerHTML = '<p class="muted">No order found. Go to <a href="order.html">Order</a>.</p>'; return; }
  const order = JSON.parse(orderJson);
  const tbody = document.querySelector('#items tbody');
  (order.items||[]).forEach(it=>{
    const tr = document.createElement('tr');
    const line = (it.unit * it.qty).toFixed(2);
    tr.innerHTML = `<td>${it.name}</td><td>${it.size.toUpperCase()}</td><td>${it.qty}</td><td>$${it.unit.toFixed(2)}</td><td>$${line}</td>`;
    tbody.appendChild(tr);
  });
  const od = new Date(order.date);
  const dd = new Date(od); dd.setDate(dd.getDate()+1);
  document.getElementById('dates').innerHTML = `Order: ${od.toLocaleString()} &nbsp; Delivery: ${dd.toLocaleDateString()}`;
  document.getElementById('r-subtotal') && (document.getElementById('r-subtotal').textContent = (order.subtotal||0).toFixed(2));
  document.getElementById('r-tax') && (document.getElementById('r-tax').textContent = (order.tax||0).toFixed(2));
  document.getElementById('r-total') && (document.getElementById('r-total').textContent = (order.total||0).toFixed(2));
});
