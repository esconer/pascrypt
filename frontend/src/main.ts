const masterElement= document.getElementById('master')  as HTMLInputElement
const textElement= document.getElementById('text')  as HTMLInputElement
const encryptBtn =document.getElementById('encrypt') as HTMLInputElement
const resultElement = document.getElementById('result-element') as HTMLInputElement
const resultBox = document.getElementById('result') as HTMLInputElement
encryptBtn.addEventListener("click", function (event) {
    event.preventDefault();
const master = masterElement.value
const text = masterElement.value
const cryptDetail ={
    master: master,
    text: text
}
fetch("http://127.0.0.1:3000/encrypt",{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cryptDetail),
}).then((res)=>{
    if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      // console.log(response,'from res')
      return res.text(); // Parse the response as plain text
    })
    .then((text) => {
        resultElement.classList.remove('hidden')
        resultBox.value=text

})

})
