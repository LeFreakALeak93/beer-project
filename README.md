Crafty Brews
This is a web application for browsing and rating craft beers. Users can create accounts, search for beers by name or style, view beer details, rate beers, and more.

Technologies Used
The following technologies were used to develop this project:

HTML
CSS
JavaScript (ES6)
Express
Handlebars
Bootstrap
Mongo Atlas
Getting Started
To run this project locally, follow these steps:

Clone this repository to your local machine.

Install the dependencies using npm install.

Set up a Mongo Atlas account and create a new cluster.

Create a .env file in the root directory of the project and add the following variables:

makefile
Copy code
MONGODB_URI=<your_mongo_atlas_uri>
SESSION_SECRET=<your_session_secret_key>
Replace <your_mongo_atlas_uri> with your Mongo Atlas connection string and <your_session_secret_key> with a secret key for the session middleware.

Run the server using npm start.

Open your web browser and navigate to http://localhost:3000.

Project Structure
The project is structured as follows:

public/ contains static assets such as images, CSS, and JavaScript files.
views/ contains Handlebars templates for rendering HTML pages.
controllers/ contains Express middleware functions for handling HTTP requests.
models/ contains Mongoose models for interacting with the Mongo Atlas database.
middlewares/ contains custom middleware functions for authentication and session management.
routes/ contains Express routers for defining the application routes.
app.js is the main entry point of the application.
License
This project is licensed under the MIT License. See the LICENSE file for details.

Contributors
Joshua Beck
https://github.com/JoshRBeck
Lukas Julich
https://github.com/LeFreakALeak93
Silvia Sarmiento
https://github.com/silviflare

Acknowledgements
Open Brewery DB API for providing the beer data used in this project.
MongoDB for providing the database infrastructure.
Express for providing the web application framework.
Handlebars for providing the templating engine.
Bootstrap for providing the CSS frame
