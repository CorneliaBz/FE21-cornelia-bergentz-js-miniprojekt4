//Lägg till din egna KEY
const KEY = 'bfba7b00bd13b5f5a597dca92c4f36f8';


//User input variabler
const btn = document.querySelector(`button`);
const btn2 = document.getElementById(`reset`);

const txtInput = document.getElementById(`text`);
const nrInput = document.getElementById(`nr`);
const sizeInput = document.getElementById(`size`);

let searchText = txtInput;
let message = document.querySelector(`#message`);

//Gör knappen klickbar
btn.addEventListener(`click`, function(){

    setMessage("Searching...");

    anime({
        targets: '#message',
        color: 'hsl(100, 100%, 100%)',
        translateY: '10px',
        borderRadius: ['0%', '50%'],
        duration: 250,
        easing: 'linear',
        loop: true,
        direction: 'alternate',
      });
    //Send searchvalue to function 
    searchImg(txtInput.value);
}
);

//Skapar funktion för knappen reset
btn2.addEventListener(`click`, function(){

    const li = document.querySelector('li');
    const liAll = document.querySelectorAll('li *');

    //Tar bort alla bilder
    for(let i = 0; i<liAll.length; i++){
        const all = liAll[i];
        all.remove();
    }

}
);

//Lägg till user input i URL
//Fetch url för request data

function searchImg(searchText){
    const url = `https://www.flickr.com/services/rest/?api_key=${KEY}&method=flickr.photos.search&text=${searchText}&format=json&nojsoncallback=1&per_page=${nrInput.value}&page=1`;

    fetch(url).then(
        function(response){
            console.log(response);
            if(response.status>=200 && response.status<300){
                return response.json();
            }
            else{
                throw 'Something went wrong. :(';
            }
        }
    ).then(
        function(data){

            const h2 = document.querySelector("#message");
            h2.style.display = "none";

            //Vi hämtar första bilden
            for(let i=0; i<data.photos.photo.length; i++){
                getImageUrl(data.photos.photo[i],i)
                // console.log(data.photos.photo.length);
            };
        }
    ).catch(
        function(error) {
            console.log(error);
            setMessage('Cannot find the image you are looking for. Try again!');
        }
    );
}


//Bild-URLen
function getImageUrl(photoObject, i){
    let photo = photoObject;
    let size = sizeInput.value; 

    let imgUrl = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_${size}.jpg`;

    // console.log(imgUrl);
    displayImg(imgUrl, i);
}

function displayImg(url, i){
  const img = document.createElement('img');
  const ul = document.querySelector('ul');
  const li = document.createElement('li');
  img.src = url;
  img.classList.add(`img${i}`);
  
  ul.appendChild(li);
  li.appendChild(img);

  //for the slide
    let liEls = document.querySelectorAll('ul li');
    let index = 0;
    window.show = function(increase) {
    index = index + increase;
    index = Math.min(
    Math.max(index,0),
    liEls.length-1
  );
  liEls[index].scrollIntoView({behavior: 'smooth'});
    }
  
}

//message function
function setMessage(message) {
    const h3 = document.querySelector("#message");
    h3.style.display = "block";
    h3.innerText = message;
}
