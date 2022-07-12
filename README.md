<span align="center">

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]


</span>

<br />
<p align="center">

  <h1 align="center">CSV Boxes</h1>

  <p align="center">
    A simple App for viewing and uploading .csv files using a Mongodb Database, it comes with a Client and a Server. 
    <br />
    <!--<a href="https://raw.githubusercontent.com/AshMagill/Readme/main/images/Pern%20C4%20Diagram.png?token=AQZ3OBXAICRLYNCWHRXRGITAYA4OM"><strong>C4 Diagram »</strong></a>-->
    <!--<br />-->
    <br />
    <!--<a href="https://github.com/AshMagill/boxes">View Demo</a>-->
    <!--·-->
    <a href="https://github.com/AshMagill/boxes/issues">Report Bug</a>
    ·
    <a href="https://github.com/AshMagill/boxes/issues">Request Feature</a>
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

I used Multer to store the csv files in a folder on the server, the files are referenced in mongo and they can be downloaded from the client side individually as they are mapped.

I have made the client simple and tidy by using bootstrap, I'm using state to update the webpage whenever any tables are edited. 


### Built With
* [MongoDB](https://www.mongodb.org/)
* [Express](https://expressjs.com/)
* [React](https://reactjs.org/)
* [NodeJS](https://nodejs.org/en/)
* [Bootstrap](https://getbootstrap.com/)
* [Docker](https://hub.docker.com/_/postgres)
* [Multer](https://www.npmjs.com/package/multer)


<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

* npm 
  https://www.npmjs.com/get-npm

* Docker (to run mongodb)
  https://docs.docker.com/engine/install/

### Installation

I know its never a good idea to share your .env credentials on github if your repo is being deployed, I have included it to speed up installation

1. Clone the repo
   ```sh
   git clone git@github.com:AshMagill/boxes.git
   ```
2. Individually CD into server and client, and install npm packages 
   ```sh
   npm install
   ```
3. Spin up MongoDB with Docker using your terminal
   ```sh
   docker run -d  --name mongo-on-docker  -p 27888:27017 -e MONGO_INITDB_ROOT_USERNAME=mongoadmin -e MONGO_INITDB_ROOT_PASSWORD=secret mongo

   ```
3. In your database manager, you can connect to the database with this URI (again I dont usually share this stuff online)
   ```sh
   MONGO_URI=mongodb://mongoadmin:secret@localhost:27888/?authSource=admin
   ```
4. Individually CD into server and client, and start them
   ```sh
   npm start
   ```
5. Start up your browser and look up the localhosts for the client
   ```sh
   localhost:3000
   ```
6. The file name lengths are limited, so make sure you use a small file name

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

Project Link - [https://github.com/AshMagill/boxes](https://github.com/AshMagill/boxes)

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/AshMagill/boxes.svg?style=for-the-badge
[contributors-url]: https://github.com/AshMagill/boxes/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/AshMagill/boxes.svg?style=for-the-badge
[forks-url]: https://github.com/AshMagill/boxes/network/members
[stars-shield]: https://img.shields.io/github/stars/AshMagill/boxes.svg?style=for-the-badge
[stars-url]: https://github.com/AshMagill/boxes/stargazers
[issues-shield]: https://img.shields.io/github/issues/AshMagill/boxes.svg?style=for-the-badge
[issues-url]: https://github.com/AshMagill/boxes/issues
