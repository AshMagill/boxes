<span align="center">

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]


</span>

<br />
<p align="center">

  <h3 align="center">CSV Boxes</h3>

  <p align="center">
    A simple web page for displaying images, it comes with a CMS and a Server that uses basic auth middleware to protect CRUD operations
    <br />
    <!--<a href="https://raw.githubusercontent.com/AshMagill/Readme/main/images/Pern%20C4%20Diagram.png?token=AQZ3OBXAICRLYNCWHRXRGITAYA4OM"><strong>C4 Diagram »</strong></a>-->
    <!--<br />-->
    <br />
    <!--<a href="https://github.com/AshMagill/pern-art-gallery">View Demo</a>-->
    <!--·-->
    <a href="https://github.com/AshMagill/pern-art-gallery/issues">Report Bug</a>
    ·
    <a href="https://github.com/AshMagill/pern-art-gallery/issues">Request Feature</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
<details open="open">
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

A while back I made my brother a simple one pager to showcase his artwork, shown here:

<a href="https://tylarwaterman.co.nz">tylarwaterman.co.nz</a>

Currenty I have to manually add images to his repo whenever he creates new artwork. Im working on this PERN stack version of it so he can upload his images via CMS whenever he wants. Here is a link to a C4 diagram for a technical overview:

<a href="https://raw.githubusercontent.com/AshMagill/pern-art-gallery/main/c4.png"><p>C4 diagram link</p></a> 


### Built With
* [Postgres](https://www.postgresql.org/)
* [Express](https://expressjs.com/)
* [React](https://reactjs.org/)
* [NodeJS](https://nodejs.org/en/)
* [Bootstrap](https://getbootstrap.com/)
* [Docker](https://hub.docker.com/_/postgres)

<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

* npm 
  https://www.npmjs.com/get-npm

* Docker (to run postgres)
  https://docs.docker.com/engine/install/

* A database manager (I use Beekeeper)
  https://docs.beekeeperstudio.io/installation

### Installation

**I'm working on getting docker-compose set up at the moment, but this will work for now** 
<br>

(Also its never a good idea to share your postgres credentials on github if your repo is being deployed)

1. Clone the repo
   ```sh
   git clone git@github.com:AshMagill/pern-art-gallery.git
   ```
2. Individually CD into server, cms, website, and install npm packages 
   ```sh
   npm install
   ```
3. Spin up postgres with docker using your terminal
   ```sh
   docker run -d --name  cms-server -p 5432:5432 -e POSTGRES_PASSWORD=password -v cms-server:/var/lib/postgresql/data -d postgres
   ```
3. In your database manager, connect to the database with these credentials
   ```
   Connection Type: Postgres
   Host: Localhost
   Port: 5432
   User: postgres
   Password: password
   Default Database: postgres
   ```
7. In your database manager, install uuid-ossp extension
   ```
   create extension if not exists "uuid-ossp";
   ```
6. In your database manager, create the user table and the article table
   ```sh
   CREATE TABLE users (
   user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
   user_name VARCHAR(255) NOT NULL,
   user_email VARCHAR(255) NOT NULL,
   user_password VARCHAR(255) NOT NULL
   )
   ```
   ```sh
   CREATE table images(
   id SERIAL NOT NULL PRIMARY KEY,
   title VARCHAR(255),
   description VARCHAR(255),
   filename TEXT UNIQUE,
   filepath TEXT,
   mimetype TEXT,
   size BIGINT
   )
   ```
8. In your database manager, insert a user
   ```
   INSERT INTO users (user_name, user_email, user_password)
   VALUES('user','user@email.com','$argon2i$v=19$m=4096,t=3,p=1$DDy+ddirjxRcDR46CUcVyg$axkNtlqYQSmfUiaUDGQbEK6Mn6AsqOGEKeL8TBpQ23U')
   ```
2. Individually CD into server, cms, website, and start them
   <br>
   (you are running two clients, so when npm asks to run the second one in another port, say yes)
   ```sh
   npm start
   ```
3. Start up your browser and look up the localhosts the two clients are on
   ```
   localhost:3000
   localhost:3001
   ```
4. In the cms, log in with the user email and password we made earlier
   ```
   email: email@email.com
   password: password
   ```
<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- CONTACT -->
## Contact

Ash Magill - ashmagillnewzealand@gmail.com

Project Link: [https://github.com/AshMagill/pern-art-gallery](https://github.com/AshMagill/pern-art-gallery)

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/AshMagill/pern-art-gallery.svg?style=for-the-badge
[contributors-url]: https://github.com/AshMagill/pern-art-gallery/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/AshMagill/pern-art-gallery.svg?style=for-the-badge
[forks-url]: https://github.com/AshMagill/pern-art-gallery/network/members
[stars-shield]: https://img.shields.io/github/stars/AshMagill/pern-art-gallery.svg?style=for-the-badge
[stars-url]: https://github.com/AshMagill/pern-art-gallery/stargazers
[issues-shield]: https://img.shields.io/github/issues/AshMagill/pern-art-gallery.svg?style=for-the-badge
[issues-url]: https://github.com/AshMagill/pern-art-gallery/issues
[license-shield]: https://img.shields.io/github/license/AshMagill/pern-art-gallery.svg?style=for-the-badge
[license-url]: https://github.com/AshMagill/pern-art-gallery/blob/master/LICENSE.txt
