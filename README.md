# ShiftChange

Organized meetings prior to the start of a work shift are a major opportunity for retail store managers to share announcements, important reminders, and, especially, prepared training lessons to ensure routine and continued development of their coworkers. But, many managers do not have much time and perhaps enough expertise to regularly come up with ideas for instructive discussion topics focused on sales techniques, customer service, and more.

For this reason, I made an app that features a collection of training lessons that managers can browse and select from to add to an agenda form which they can reference during a pre-work team meeting. With this resource, they can maximize their morning meetings and be sure to get the most out of their retail staff and every work shift.

![ShiftChange App ScreenShot](https://drive.google.com/file/d/1pO7wet76Hpm7BE3S8pf9pYHp-G7l1-Nd/view?usp=sharing "home page screenshot")

## Built With

I built an API to interact with a list of games, events, and users and all of their properties.
The API was created with Node.js, Express, MongoDB, and Mongoose. Postman was used for testing routes, locally, throughout development. And, ultimately the API was deployed via Heroku and the database was hosted on MongoDB Atlas.

The [back-end](https://github.com/jmittelman/shift-change-api) was extended by a front-end, created using React. This was deployed and hosted on Surge.

## Dependencies

Back-End: Express, Mongoose, CORS, Body-Parser, JWT-Simple, Passport, Passport-JWT

Front-End: Axios, React, React-Dom, React-Router-Dom, React-Scripts

## Features

- User Authentication
- Utilizes models for Lessons, Agendas, and Users with relevant data fields for each.
- Incorporates complete CRUD functionality implemented with RESTful routes:
  [API Documentation](https://shift-change-api.herokuapp.com/)

## Process

Initial planning involved coming up with a project idea and developing data models and wireframes, creating repositories, and a work schedule. For more details, [visit the planning directory](https://github.com/jmittelman/shift-change/tree/master/Planning).

From there, I proceeded to collect data and use it to seed a database. The resulting API was deployed through Heroku.

For the front end, I set about creating components and an overall framework. Ultimately, I added CRUD implementation, User Authentication, and styling. The app was deployed on Surge.

## Known Issues

1. Accordion "lesson category" buttons on Build Agenda page does not open to reveal list of lessons with selectable checkboxes.
2. CRUD implementation is not fully functioning.
