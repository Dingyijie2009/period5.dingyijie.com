function send(){
  let first = document.getElementById('first').value;
  let last = document.getElementById('last').value;
  let a1 = document.getElementById('a1').value;
  let a2 = document.getElementById('a2').value;
  let city = document.getElementById('city').value;
  let province = document.getElementById('province').value;
  let postcode = document.getElementById('postcode').value;
  let country = document.getElementById('country').value;
  let date = document.getElementById('date').value;
  let serial = document.getElementById('serial').value;
  let comment = document.getElementById('comment').value;
  let items = document.getElementById('item').value;
  let checked = document.querySelectorAll('.os:checked');
  let values = Array.from(checked).map(checkbox => checkbox.value);
  alert(
        "Product Registration Info:\n\n" +
        "Name: " + first + " " + last + "\n" +
        "City: " + city + "\n" +
        "Country: " + country + "\n" +
        "Province: " + province + "\n" +
        "Postal Code: " + postcode + "\n" +
        "Item: " + items + "\n" +
        "Item Name: " + values.join(", ") + "\n" +
        "Serial: " + serial + "\n" +
        "Date: " + date + "\n" +
        "Comment: " + comment
      );
};

function get_date(){
  const current_time = new Date();
  const year = current_time.getFullYear();
  const month = current_time.getMonth() + 1;
  const day = current_time.getDate();
  const formula = day + "/" + month + "/" + year;
  document.getElementById('date').value = formula;
}

function dismiss() {
  window.location.reload();
}

function cancel() {
  const error = document.getElementById('error_message');
  error.style.display = "block";
  error.innerHTML = "<p>Your registration has been cancelled.</p>";


  document.getElementById('regForm').reset();

  
  document.getElementById('dismiss').style.display = "inline-block";
}
