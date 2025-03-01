//import EscPosEncoder from "./js/esc-pos-encoder.esm.js";

var user = GetURLParameter('user');
var akses = GetURLParameter('level');
var acess = '?level=' + akses + '&user=' + user;
var valueblueth = '';
var listBluetooth = [];
var connectedbluth = 0;
// var UrlApi = 'http://localhost:5001/iot/';
var UrlApi = 'http://45.32.121.28:5001/iot/';

document.addEventListener('backbutton', function (e) {
  e.preventDefault();
});

function GetURLParameter(sParam) {
  var sPageURL = window.location.search.substring(1);
  var sURLVariables = sPageURL.split('&');
  for (var i = 0; i < sURLVariables.length; i++) {
    var sParameterName = sURLVariables[i].split('=');
    if (sParameterName[0] == sParam) {
      return sParameterName[1];
    }
  }
}

function bacaDataDariFileGlo() {
  window.resolveLocalFileSystemURL(
    cordova.file.externalDataDirectory,
    function (dirEntry) {
      // Membuka file yang telah disimpan (misalnya, "bluetooth.txt")
      dirEntry.getFile(
        'bluetooth.txt',
        { create: false },
        function (fileEntry) {
          // Mendapatkan objek file
          fileEntry.file(
            function (file) {
              var reader = new FileReader();
              reader.onloadend = function () {
                console.log('Isi file: ' + this.result);
                globalValueBluethOnly(this.result);
                // document.getElementById(
                //   "idbuth"
                // ).innerHTML = `Bluetooth Serial : ${this.result}`;
                // Lakukan sesuatu dengan isi file di sini
              };
              // Membaca isi file sebagai teks
              reader.readAsText(file);
            },
            function (error) {
              alert('Bluetooth Serial Empty');
              console.log('Gagal membaca file: ' + error);
              return;
            },
          );
        },
        function (error) {
          alert('Bluetooth Serial Empty');
          console.log('Gagal mendapatkan file read: ' + error);
          return;
        },
      );
    },
    function (error) {
      alert('Bluetooth Serial Empty');
      console.log(
        'Gagal mendapatkan akses ke direktori data eksternal: ' + error,
      );
      return;
    },
  );
}

function globalValueBluethOnly(data) {
  valueblueth = data;
  // console.log(valueblueth);
  // bluetoothSerial.list(function (results) {
  //   // var addarray = {
  //   //   name: "qw:er:tu:io:po:ad",
  //   //   address: "qw:er:tu:io:po:ad",
  //   // };
  //   results.forEach(function (device) {
  //     // Menambahkan nama dan alamat perangkat ke dalam listBluetooth
  //     listBluetooth.push({
  //       name: device.name,
  //       address: device.address,
  //     });
  //   });
  // });
  // console.log(listBluetooth);
  //connectToDevice();
}
function globalValueBlueth(data) {
  valueblueth = data;
  console.log(valueblueth);
  bluetoothSerial.list(function (results) {
    // var addarray = {
    //   name: "qw:er:tu:io:po:ad",
    //   address: "qw:er:tu:io:po:ad",
    // };
    results.forEach(function (device) {
      // Menambahkan nama dan alamat perangkat ke dalam listBluetooth
      listBluetooth.push({
        name: device.name,
        address: device.address,
      });
    });

    // Mendapatkan elemen dropdown-container
    var dropdownContainer = document.getElementById('dropdown-container');

    // Menghapus semua elemen yang ada di dalam dropdown-container
    dropdownContainer.innerHTML = '';

    // Membuat elemen dropdown
    var dropdown = document.createElement('select');
    dropdown.id = 'bluetoothDevices';
    //dropdown.classList.add("form-select")
    dropdown.className = 'form-select';

    dropdown.addEventListener('change', function () {
      getValueBluetooth(this.value);
    });

    listBluetooth.forEach((item, i) => {
      var option = document.createElement('option');
      option.text = item.name;
      option.value = item.address;
      dropdown.appendChild(option);
    });

    // Menambahkan dropdown baru ke dalam elemen dropdown-container
    dropdownContainer.appendChild(dropdown);
  });
  console.log(listBluetooth, valueblueth);
  //connectToDevice();
}

const getValueBluetooth = (val) => {
  var pieces = val.split(':');
  (document.getElementById('id1').value = pieces[0]),
    (document.getElementById('id2').value = pieces[1]),
    (document.getElementById('id3').value = pieces[2]),
    (document.getElementById('id4').value = pieces[3]),
    (document.getElementById('id5').value = pieces[4]),
    (document.getElementById('id6').value = pieces[5]);
};

function connectToDevice() {
  // Menampilkan tanda loading
  showLoading();

  // Connect to the device
  bluetoothSerial.connect(
    valueblueth,
    function () {
      alert('Connected to printer');
      connectedbluth = 1;
      console.log('Connected to printer');
      $('#myModal').modal('hide');
      hideLoading();
    },
    function (error) {
      connectedbluth = 0;
      alert('Failed to connect the printer');
      console.error('Failed to printer: ' + error);
      hideLoading();
    },
  );
}

// Fungsi untuk menampilkan loading
function showLoading() {
  document.getElementById('loading-overlay').style.display = 'block';
}

// Fungsi untuk menyembunyikan loading
function hideLoading() {
  document.getElementById('loading-overlay').style.display = 'none';
}
