// load latest exchanges
var xhr = new XMLHttpRequest();

xhr.onload = function() {
  if (xhr.status >= 200 && xhr.status < 300) {
    var res = JSON.parse(xhr.response);
    console.log(res);

    var selectors = document.getElementsByClassName("exchange-selector");
    for (var i = 0; i < res.rates.length; i++) {
      var option = document.createElement("option");
      option.text = "Text";
      option.value = "myvalue";
      selectors[0].appendChild(option);
      selectors[1].appendChild(option);
    }
  } else {
    // put popup
  }
};

xhr.open("GET", "https://api.exchangeratesapi.io/latest");
xhr.send();

// convert exchange rates
function convert() {
  var nativeOption = document.getElementById("native").value;
  var foreignOption = document.getElementById("foreign").value;

  var xhr = new XMLHttpRequest();

  xhr.onload = function() {
    if (xhr.status >= 200 && xhr.status < 300) {
      var res = JSON.parse(xhr.response);
      var nativeInput = document.getElementById("native-input").value;

      var foreignRate = res.rates[foreignOption];

      document.getElementById("foreign-output").value = nativeInput / foreignRate;
    } else {
      // put popup
    }
  };

  xhr.open("GET", `https://api.exchangeratesapi.io/latest?symbols=${nativeOption},${foreignOption}`);
  xhr.send();
}
