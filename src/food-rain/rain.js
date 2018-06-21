export { makeItRain, makeItStop };
function makeItRain(member) {
  var dropCount = 40;
  var temp = document.createDocumentFragment();
  for(var r = 0; r < dropCount; r++) {

    var randomX = Math.round(Math.random() * 80) + 10; // random position (left to right)
    var randomY = Math.round(Math.random() * 50); // random start time
    var randomD = Math.round(Math.random() * 30) + 60; // random duration 

    var rain = document.createElement('span');
    rain.classList.add('rain');                         // Might not works
    rain.style = 'left: ' + randomX + '%; top: -100px;';
    rain.style.setProperty('animation-delay', randomY + '00ms');
    rain.style.setProperty('animation-duration', randomD + '00ms');

    // rain.addEventListener('animationiteration', () => {
    //   const drip = new Audio('sounds/drip' + (parseInt(Math.random() * 2) + 1) + '.wav'); // plays sound every time a falling mole restarts
    //   drip.play();
    // });

    // Bobby - Pineapples
    // Mark - Cucumbers
    // Robyn - 
    // Erik - Turkeys
    rain.innerHTML = '<img>';
    console.log('the rain is', rain.innerHTML);
    rain.querySelector('img').src = '../images/food-' + member + '.png';
    rain.querySelector('img').style.width = parseInt(Math.random() * 100) + 10 + 'px'; // random mole size
    temp.appendChild(rain);
  }
  document.body.appendChild(temp);
}
function makeItStop() {
  var el = document.getElementsByTagName('span');

  for(let i = el.length - 1; i >= 0; i--) {
    el[i].parentNode.removeChild(el[i]);
  }
}