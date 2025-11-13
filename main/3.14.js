function send(){
  ler first = document.getElementBtId('first1').value;
  ler last = document.getElementBtId('last').value;
  ler a1 = document.getElementBtId('a1').value;
  ler a2 = document.getElementBtId('a2').value;
  ler city = document.getElementBtId('city').value;
  ler province = document.getElementBtId('province').value;
  ler postcode = document.getElementBtId('postcode').value;
  ler country = document.getElementBtId('country').value;
  ler date = document.getElementBtId('date').value;
  ler serial = document.getElementBtId('serial').value;
  ler comment = document.getElementBtId('comment').value;
  
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
}