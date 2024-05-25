# tech-blog

[![License: MIT](https://shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description

tech-blog is a CMS style blog site where tech industry enthusiasts can create a secure account, publish blogs, view other user's blogs and post comments. 

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)

## Installation

In order to run the application the user must have [node.js](https://nodejs.org/en/download/current) installed. Then the user must install dependencies (Express.js, bcrypt, express-session, express-handlebars, dotenv, pg, sequelize and connect-session-sequelize) by running `npm i` on the command line in the root directory of the repository.

Users must also have [PostgreSQL](https://www.postgresql.org/download/) installed and open an instance of the psql shell in the /db directory.
From there, in order to create the database run the following commands:
- `\i schema.sql`
- `\q` to exit the shell

To allow Sequelize to connect to the database, users must
- Make a copy of `.env.EXAMPLE`
- Rename it to `.env`
- Update the environment variables for `DB_USER`, `DB_PASSWORD` and `SESSION_SECRET`

In order to create tables and seed, run the `seed` script with:
- `npm run seed`

## Usage

To use the application the user must start the server by running `npm start`.

The user must then navigate to [http://localhost:3001/](http://localhost:3001/). This will take them to the techBlog landing page with a list of all existing blogs. Unauthenticated users are able to view existing blogs and comments by clicking on the desired post. For all other functionality Users must Login/Signup. To login, click the `login` link in the navbar and enter `Username` and `Password`. To signup, click the `Signup instead` link located at the bottom of the `Login` page and enter the desired `Username` and `Password`.

Once logged in, users are free to leave comments on existing blogs by navigating to the desired blog from the homepage and filling out the `Add Comment` form bellow the blog. To post a new blog, navigate to the `Dashboard` in the navbar and click the `Add New Blog` button. Then enter the desired `Title` and `Content` and click `Submit`. The new blog will now appear in the user's dashboard. To update the blog, users can click on the desired blog then make desired changes on the `Edit Blog` form. Users can also delete their blog by clicking the `Delete` button on the same page.

When the user has finished they can logout using the `Logout` link on the navbar. Otherwise users will be logged out automatically after an hour.

> Deployed application:
[https://note-taker-zet7.onrender.com](https://note-taker-zet7.onrender.com)

Screenshot of deployed application:
![Deployed screenshot](./public/assets/images/deployed-screenshot.png)

## Credits

[simonjbr](https://github.com/simonjbr)

[Node.js](https://nodejs.org/en)

[Express.js](https://expressjs.com/)

[bcrypt](https://www.npmjs.com/package/bcrypt)

[nodemon](https://nodemon.io/)

Deployed using [Render](https://render.com/)

[express-handlebars](https://www.npmjs.com/package/express-handlebars)

[dotenv](https://www.npmjs.com/package/dotenv)

[pg](https://www.npmjs.com/package/pg)

[express-session](https://www.npmjs.com/package/express-session)

[sequelize](https://www.npmjs.com/package/sequelize)

## License

Please refer to [MIT license](./LICENSE) information in the repository.