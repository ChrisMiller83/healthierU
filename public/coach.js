const { response } = require("../app")


function getName(coachName) {
  const html = `
    <li>${coachName.firstName}</li>
  `
}


axios.get("/coaches_list")
  .then((response) => {
    const htmlArray = response.data.map((coachName) => {
      return getName(coachName)
    })
  })