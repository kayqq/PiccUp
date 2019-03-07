# PiccUp

An app that helps people communicate with locals and plan pick-up baskbetball games. Utilizes Yelp APi and Google API.

<br>

**[Live Demo](http://piccup-client.s3-website-us-west-1.amazonaws.com)**

**Libraries:**

Front End: React, Redux, [socket.io-client](https://github.com/socketio/socket.io-client), [lodash](https://github.com/lodash/lodash)
Back End: Express.js, MongoDB, [socket.io](https://github.com/socketio/socket.io)
[mongoose](https://github.com/Automattic/mongoose), [bcrypt](https://www.npmjs.com/package/bcrypt-nodejs)

**Tools:** npm

<!-- +++++++++++++++++++++++++++++++++++++ -->

## Getting started

**[Install](https://treehouse.github.io/installation-guides/mac/mongo-mac.html) MongoDB if you haven't already**

```
brew update
brew install mongodb
```

Create the “db” directory

```
mkdir -p /data/db
```

Make sure that the /data/db directory has the right permissions by running

```
> sudo chown -R `id -un` /data/db
> # Enter your password
```

Run the Mongo daemon, in one of your terminal windows run mongod. This should start the Mongo server.

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

server is hosted on `http://localhost:4001/` to see your app.
Then open `http://localhost:4001/` to see your app.
