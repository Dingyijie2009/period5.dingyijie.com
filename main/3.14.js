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

  alert(
        "Product Registration Info:\n\n" +
        "Name: " + first + " " + last + "\n" +
        "City: " + city + "\n" +
        "Country: " + country + "\n" +
        "Item: " + item + "\n" +
        "Serial: " + serial + "\n" +
        "Date: " + date + "\n" +
        "Comment: " + comment
      );
}