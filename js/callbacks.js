const astrosUrl = 'http://api.open-notify.org/astros.json';
const wikiUrl = 'https://en.wikipedia.org/api/rest_v1/page/summary/';
const peopleList = document.getElementById('people');
const btn = document.querySelector('button');

// Make an AJAX request
function getJSON(url, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.onload = () => {
    if(xhr.status === 200) {
      let data = JSON.parse(xhr.responseText);
      callback(data);
    }
  };
  xhr.send();
}

function getProfiles(json) {
  json.people.map( person => {
    getJSON(wikiUrl + person.name, generateHTML);      
  }); 
}

// Generate the markup for each profile
function generateHTML(data) {
  console.log(data);
  const section = document.createElement('section');
  peopleList.appendChild(section);
  var src;
  if(data.thumbnail){
    src = data.thumbnail.source;
  }
  section.innerHTML = `
    <img src=${src}>
    <h2>${data.title}</h2>
    <p>${data.description}</p>
    <p>${data.extract}</p>
  `;
}

btn.addEventListener('click', (event) => {
  getJSON(astrosUrl, getProfiles);
  event.target.remove();
});
