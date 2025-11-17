function get_date(){
  const current_time = new Date();
  const year = current_time.getFullYear();
  const month = current_time.getMonth() + 1;
  const day = current_time.getDate();
  const formula = day + "/" + month + "/" + year;
  return formula;
}


const handle = window.location.search; 


  const each = new URLSearchParams(handle);

  const first = each.get('first');
  const last = each.get('last');
  const a1 = each.get('a1');
  const a2 = each.get('a2');
  const city = each.get('city');
  const province = each.get('province');
  const postcode = each.get('postcode');
  const country = each.get('country');
  const date = each.get('date');
  const serial = each.get('serial');
  const comment = each.get('comment');
  const items = each.get('items');
  const os = each.get('os');
  document.getElementById('registration_info').innerHTML = `
  <p><strong>First Name:</strong> ${first}</p>
  <p><strong>Last Name:</strong> ${last}</p>
  <p><strong>Address Line 1:</strong> ${a1}</p>
  <p><strong>Address Line 2:</strong> ${a2}</p>
  <p><strong>City:</strong> ${city}</p>
  <p><strong>Province/State:</strong> ${province}</p>
  <p><strong>Postal/Zip Code:</strong> ${postcode}</p>
  <p><strong>Country:</strong> ${country}</p>
  <p><strong>Date of Purchase:</strong> ${date}</p>
  <p><strong>Product Serial Number:</strong> ${serial}</p>
  <p><strong>Comments:</strong> ${comment}</p>
  <p><strong>Items Purchased:</strong> ${items}</p>
  <p><strong>Operating System:</strong> ${os}</p>
  <p style="text-align:center;color:#d84315;"><em>Completed on: ${get_date()}</em></p>
`;
