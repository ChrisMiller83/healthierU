# <p align="center"> HealthierU </p>
<br>
<br>

## Checklist 📋
<hr>

## Your task is to build something awesome with your team!
<hr>
<br>

### Frontend Requirements
* It is recommended that you do not focus on CSS. Please (gently) use a library (ie. Bulma, Bootstrap, Foundation, Materialize) for your styling.
    * [Bulma](https://bulma.io/)
    * [Bootstrap](https://getbootstrap.com/)
    * [Foundation](https://get.foundation/)
    * [Materialize](https://materializecss.com/)
* Implement a simple Responsive Web Design that works on Chrome on OSX, iOS devices, and Android devices at 360px, 768px, and 1200+ px wide

<br>

### Backend Requirements
* Use Express for your HTTP framework.
* Use a view engine for your templating
* Use PostgreSQL for your database
* Create at least 3 tables, with Model classes as is appropriate
* Make sure that at least 2 of the tables are related (via foreign keys)

<br>

Work in groups
Use agile methodolgy (daily standups)
Create github repo (add all group members as collaborators)
Collaborate using PRs (Pull Requests), making sure to tag a reviewer for approval
Reviewer must code review through Github and approve before the PR can be merged. If there are no comments, the code has spaghetti, or has difficult to read spots, code review didn't happen.
<br>
<br>
Use a feature tracking system, such as:
Github Projects or
Trello.

<br>
<br>

## About our project 📝
<hr>
HealthierU was created for coaches and atheletes to be able to communicate outside of the gym. HealthierU allows a coach to assign workouts and recipes for meals to their atheletes to allow them to be at their peak level of fitness. The website has a a easy user interface, allowing coaches to easily edit and delete assigned workouts. In the future we want the coach to be able to assign mealplans to their atheletes and make it more of a social media site where athletes and coaches can follow and communicate with eachother.
<br>
<br>
<br>
<br>

## languages Used and technology 💻
<hr>
<br>

<img alt="HTML5" src="https://img.shields.io/badge/html5%20-%23E34F26.svg?&style=for-the-badge&logo=html5&logoColor=white"/>
<img alt="JavaScript" src="https://img.shields.io/badge/javascript%20-%23323330.svg?&style=for-the-badge&logo=javascript&logoColor=%23F7DF1E"/>
<img alt="CSS3" src="https://img.shields.io/badge/css3%20-%231572B6.svg?&style=for-the-badge&logo=css3&logoColor=white"/>
<img alt="NodeJs" src="https://camo.githubusercontent.com/cc96d7d28a6ca21ddbb1f2521d751d375230ed840271e6a4c8694cf87cc60c14/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6e6f64652e6a732532302d2532333433383533442e7376673f267374796c653d666f722d7468652d6261646765266c6f676f3d6e6f64652e6a73266c6f676f436f6c6f723d7768697465">
<img alt="Heroku" src="https://camo.githubusercontent.com/865b9493c6eccbcaedacf295b96adb9acd97e7088bdc982d8d225f3581bb4582/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6865726f6b752532302d2532333433303039382e7376673f267374796c653d666f722d7468652d6261646765266c6f676f3d6865726f6b75266c6f676f436f6c6f723d7768697465">
<br>
<br>

## Frameworks Used
<hr>
<br>

<img alt="Express" src="https://camo.githubusercontent.com/87d8d88ac087f77c5b56509373a2dd49e5439722d7ad59c3f39a577907053152/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f657870726573732e6a732532302d2532333430346435392e7376673f267374796c653d666f722d7468652d6261646765">
<img alt="Bootstrap" src="https://img.shields.io/badge/bootstrap%20-%23563D7C.svg?&style=for-the-badge&logo=bootstrap&logoColor=white"/>

<br>
<br>
<br>

## Code snipets
<hr>


<p> This is a post route that allows a coach to create a workout and add it to the database
<br>

```js
//allows coach to create workout and add it to db
router.post('/addworkout', async (req, res) => {
  if (!req.body.exercise) {
    return res.status(422).render('workout', {
      locals: {
        error: 'please include all required fields'
      }
    })
  } else {
    const newWorkout = await db.Workout.create({
      exercise: req.body.exercise,
      sets: req.body.sets,
      reps: req.body.reps,
      weight: req.body.weight
    })
    res.json(newWorkout)
  }
})

```

<br>
<br>

## List of API's used
<hr>
<br>

* [The meal DB API](https://www.themealdb.com/)

<br>
<br>


## Group
<hr>
 
* [Jake Luecke](https://github.com/jrluecke95)
* [Willie Rose](https://github.com/willis719)
* [Kendall Oliver](https://github.com/kndllransom)
* [Chris Miller](https://github.com/ChrisMiller83)

<br>
<br>

## License
<hr>


* [MIT](https://opensource.org/licenses/MIT)