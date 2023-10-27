let encryptState: boolean = true;
console.log(encryptState);

// pages

const encryptPage = document.getElementById("encrypt-page") as HTMLInputElement;
const decryptPage = document.getElementById("decrypt-page") as HTMLInputElement;
//elements encryption
const masterElement = document.getElementById("master") as HTMLInputElement;
const textElement = document.getElementById("text") as HTMLInputElement;

// changeable portion b/w page
const cryptionType = document.querySelector(
  'label[for="text"]'
) as HTMLInputElement;

console.log(cryptionType);

// result element section

const resultElement = document.getElementById(
  "result-element"
) as HTMLInputElement;
const resultBox = document.getElementById("result") as HTMLInputElement;

// adding event listeners to the page
encryptPage.addEventListener("click", (e) => {
  encryptState = true;
  textElement.value = "";
  resultElement.classList.add("hidden");

  changeState(encryptState);
});

decryptPage.addEventListener("click", (e) => {
  encryptState = false;
  textElement.value = "";
  resultElement.classList.add("hidden");
  changeState(encryptState);
});

// changing data
function changeState(encryptState: boolean) {
  const encryptBtn = document.getElementById("encrypt") as HTMLInputElement;
  const decryptBtn = document.getElementById("decrypt") as HTMLInputElement;

  if (encryptState) {
    encryptPage.classList.add("text-my-orange", "font-extrabold");

    decryptPage.classList.add("hover:text-white");
    decryptPage.classList.remove("text-my-green", "font-extrabold");

    encryptBtn.classList.remove("hidden");
    decryptBtn.classList.add("hidden");

    cryptionType.innerText = "Encryption Data";

    encryptBtn.addEventListener("click", function (event) {
      event.preventDefault();
      const master = masterElement.value;
      const text = textElement.value;
      const cryptDetail = {
        master: master,
        text: text,
      };

      //   console.log(cryptDetail);

      fetch("http://127.0.0.1:3000/encrypt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cryptDetail),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }
          // console.log(response,'from res')
          return res.text(); // Parse the response as plain text
        })
        .then((text) => {
          resultElement.classList.remove("hidden");
          resultBox.value = text;
        });
    });
  } else {
    encryptPage.classList.remove("text-my-orange", "font-extrabold");

    decryptPage.classList.remove("hover:text-white");
    decryptPage.classList.add("text-my-green", "font-extrabold");

    encryptBtn.classList.add("hidden");
    decryptBtn.classList.remove("hidden");

    cryptionType.innerText = "Decryption Data";

    decryptBtn.addEventListener("click", function (event) {
      event.preventDefault();
      const master = masterElement.value;
      const text = textElement.value;
      const cryptDetail = {
        master: master,
        text: text,
      };
      fetch("http://127.0.0.1:3000/decrypt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cryptDetail),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }
          // console.log(response,'from res')
          return res.text(); // Parse the response as plain text
        })
        .then((text) => {
          resultElement.classList.remove("hidden");
          resultBox.value = text;
        });
    });
  }
}

changeState(encryptState);
