# PiccUp

An app that helps people communicate with locals and plan pick-up baskbetball games. Utilizes [Yelp Fusion APi](https://www.yelp.com/fusion) and [Google Maps API](https://cloud.google.com/maps-platform/).

<br>

**[Live Demo](http://piccup.kennyquan.com/)**

**Libraries:**

Front End: React, Redux, [socket.io-client](https://github.com/socketio/socket.io-client), [lodash](https://github.com/lodash/lodash)  
Back End: Express.js, MongoDB, [socket.io](https://github.com/socketio/socket.io)
[mongoose](https://github.com/Automattic/mongoose), [bcrypt](https://www.npmjs.com/package/bcrypt-nodejs)

<br>

**Tools:** npm

<br>

## Getting started

**Note: You need MongoDB set up and running to run the code locally. [Installation instructions](https://docs.mongodb.com/manual/installation/)**

Once you've installed MongoDB, start up the MongoDB server in a new terminal with the following commands:

```
mongod
```

To stop the Mongo daemon hit ctrl-c

**Now install the project**

```
git clone https://github.com/kayqq/PiccUp.git my-project
cd my-project
npm install
```

**Start the project**

```
npm start
```

The backend server will be hosted on `http://localhost:4001/`

Open up `http://localhost:3000/` to see the app.
