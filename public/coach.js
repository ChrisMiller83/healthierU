

function getName(coachName) {
  const html = `
    <li>${coachName.firstName}</li>
  `
}

// axios.get("/coaches_list")
//   .then((response) => {
//     const htmlArray = response.data.map((coachName) => {
//       return getName(coachName)
//     })
//   })

const deleteButton = document.querySelector('.reload');
deleteButton.addEventListener('click', () => {
  console.log('working')
  console.log(location)
  setTimeout(() => {
    window.location.reload(true);
  },500)  
})

const editButton = document.getElementsByClassName('edit');
console.log(editButton)
const form = document.querySelector('.editForm')
for (let i = 0; i < editButton.length; i++) {
  editButton[i].addEventListener('click', (e) => {
    e.preventDefault();
    form.classList.toggle('hidden')
})
}

const editSubmitButton = document.querySelector('.editSubmit');
editSubmitButton.addEventListener('click', () => {
  setTimeout(() => {
    window.location.reload(true);
  },500)  
})

const addSubmitButton = document.querySelector('.addSubmit');
addSubmitButton.addEventListener('click', () => {
  setTimeout(() => {
    window.location.reload(true)
  }, 500)
})