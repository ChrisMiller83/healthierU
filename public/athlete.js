const { response } = require('../app');


function getName(athleteName) {
  const html = `
    <li>${athleteName.firstName}</li>
  `
}

function getCoach(coach) {
  const item = `<h1>${coach.firstName}</h1>`;
  const header = document.getElementById('header');
  header.innerHTML = item;
}

axios.get("/athlete_list")
  .then((response) => {
    const htmlArray = response.data.map((aathleteName) => {
      return getName(athleteName)
    })
  })

axios.get("/api/coach/:${id}")
  .then((res) => {
    return getCoach(res.data)
  })