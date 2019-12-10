const astrosUrl = 'http://api.open-notify.org/astros.json';
const wikiUrl = 'https://en.wikipedia.org/api/rest_v1/page/summary/';
const peopleList = document.getElementById('people');
const btn = document.querySelector('button');

// Handle all fetch requests
async function getJSON(url){
  try{
       const response =  await fetch(url)
       return await response.json();
  } catch(error) {
       throw error;
  }
}

async function getPeopleInSpace(){

   const peopleJson = await getJSON(astrosUrl)
   
   const profiles = peopleJson.people.map( async (person) => {
     const craft = person.craft;
     const profileJson = await getJSON(wikiUrl + person.name);

     return { ...profileJson, craft };
   });

   return Promise.all(profiles);
}

// Generate the markup for each profile
function generateHTML(data) {
  console.log(data);
  data.map( person => {
    const section = document.createElement('section');
    peopleList.appendChild(section);
    var source;
    if(person.thumbnail){
      source = person.thumbnail.source;
    }
    section.innerHTML = `
      <img src=${source}>
      <span>${person.craft}</span>
      <h2>${person.title}</h2>
      <p>${person.description}</p>
      <p>${person.extract}</p>
    `;
  });
}

btn.addEventListener('click', (event) => {
  event.target.textContent = "Loading...";

  getPeopleInSpace()
  .then(generateHTML)
  .catch( err => {
    peopleList.innerHTML = '<h3>Something went wrong!</h3>';
    console.log(err)
  })
  .finally( () =>   event.target.remove());
});