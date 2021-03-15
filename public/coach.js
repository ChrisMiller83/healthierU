const { response } = require('../app');


function getName(coachName) {
  const html = `
    <li>${coachName.firstName}</li>
  `
}

function getAthlete(athlete) {
  const item = `<h1>${athlete.firstName}</h1>`;
  const header = document.getElementById('header');
  header.innerHTML = item;
}

axios.get("/coaches_list")
  .then((response) => {
    const htmlArray = response.data.map((coachName) => {
      return getName(coachName)
    })
  })

axios.get("/api/athlete/:${id}")
  .then((res) => {
    return getAthlete(res.data)
  })