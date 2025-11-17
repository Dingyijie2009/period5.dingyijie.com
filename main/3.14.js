
const comment = document.getElementById('comment');

comment.addEventListener('input', function() {
    this.value = this.value.replace(/[<>]/g, '');
    alert("Why you want to use < or > in comments? They are not allowed.");
});

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
  let url= "3.14info.html?" +
    "first=" + encodeURIComponent(first) +
    "&last=" + encodeURIComponent(last) +
    "&a1=" + encodeURIComponent(a1) +
    "&a2=" + encodeURIComponent(a2) +
    "&city=" + encodeURIComponent(city) +
    "&province=" + encodeURIComponent(province) +
    "&postcode=" + encodeURIComponent(postcode) +
    "&country=" + encodeURIComponent(country) +
    "&date=" + encodeURIComponent(date) +
    "&serial=" + encodeURIComponent(serial) +
    "&comment=" + encodeURIComponent(comment) +
    "&items=" + encodeURIComponent(items) +
    "&os=" + encodeURIComponent(values);
  window.location.href = url
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
  error.setAttribute('tabindex', '-1');
  error.style.display = "block";
  error.innerHTML = `
  <p>Your registration has been cancelled.</p>
  <button type="button" id="dismiss">Dismiss</button>
`;
  error.focus(); 

  document.getElementById("dismiss").addEventListener("click", dismiss);

  document.getElementById('regForm').reset();
};
