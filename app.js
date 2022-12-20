// Ajax , caalback , http requests

class Request {
  constructor() {
    this.xhr = new XMLHttpRequest();
  }
  // GET Request
  get(url, callback) {
    this.xhr.open("GET", url); //Bağlant açık

    //this'in nereyi kapsadığı ile ilgili sorun oluyor o sorunu cözmek için çeşitli yöntemler var
    // Yöntem 1
    //const temp = this;
    //this.xhr.onload = function () {
    //  if (temp.xhr.status === 200) {
    //    console.log(temp.xhr.responseText);
    //  }
    //};

    // Yöntem 2
    // this.xhr.onload = function () {
    //   if (this.status === 200) {
    //     console.log(this.responseText);
    //   }
    // };

    // Yöntem 3
    // this.xhr.onload = () => {
    //   if (this.xhr.status === 200) {
    //     console.log(this.xhr.responseText);
    //   }
    // };

    // Yöntem 4
    this.xhr.onload = function () {
      if (this.xhr.status === 200) {
        callback(null, this.xhr.responseText); // İsteğimiz bitti
      } else {
        // Hata durumu
        callback("Herhangi bir hata oluştu", null);
      }
    }.bind(this);

    this.xhr.send(); //istek gönder
  }
  // POST Request
  post(url, data, callback) {
    this.xhr.open("POST", url); // Bağlantı açık
    this.xhr.setRequestHeader("Content-type", "application/json"); //JSON Verisi
    this.xhr.onload = () => {
      if (this.xhr.status === 201) {
        // Başarılı
        callback(null, this.xhr.responseText);
      } else {
        callback("Post Request: Bir hata oluştu", null);
      }
    };
    this.xhr.send(JSON.stringify(data));
  }
}
const request = new Request();

// request.get(
//   "https://jsonplaceholder.typicode.com/albums",
//   function (err, response) {
//     if (err == null) {
//       // Başarılı
//       console.log(response);
//     } else {
//       // Hata
//       console.log(err);
//     }
//   }
// );

// request.get(
//   "https://jsonplaceholder.typicode.com/albums/50",
//   function (err, response) {
//     if (err == null) {
//       // Başarılı
//       console.log(response);
//     } else {
//       // Hata
//       console.log(err);
//     }
//   }
// );

// request.post(
//   "https://jsonplaceholder.typicode.com/albums",
//   { userId: 2, title: "Kelebeğin Rüyası" },
//   function (err, album) {
//     if (err === null) {
//       console.log(album);
//     } else {
//       // Hata
//       console.log(err);
//     }
//   }
// );
