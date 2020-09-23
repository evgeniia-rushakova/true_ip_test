const {schema} = require('./app/graphql/resolvers')

const express = require('express');
const app = express();
const passport = require('passport')
const session = require('express-session')
const bodyParser = require('body-parser')
const env = require('dotenv').config({
    path: 'app/.env'
});
const graphTools = require('graphql-tools')
const exphbs = require('express-handlebars');
const path = require('path');
const opn = require('opn');
var { graphqlHTTP } = require('express-graphql');


const port = 3000;

app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

const authRoute = require('./app/routes/authRouter')(app, passport);
const indexRoute = require('./app/routes/indexRouter')(app);
const uploadRoute = require('./app/routes/uploadFileRouter')(app);

const models = require("./app/models");
models.sequelize.sync().then(function () {
    console.log('Database created')
}).catch(function (err) {
    console.log(err, "Something went wrong with the Database Update!")
});
require('./app/config/passport/passport.js')(passport, models.user);
var root = {
    hello: () => {
        return 'Hello world!';
    },
};
app.set('views', './app/views')
app.engine('hbs', exphbs({
    extname: '.hbs',
    defaultLayout: null
}));
app.set('view engine', '.hbs');
app.use(express.static(path.join('app/public')));
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
    formatError: error => ({
        message: error.message,
        locations: error.locations,
        stack: error.stack ? error.stack.split('\n') : [],
        path: error.path
    })
}));
app.listen(port, function (err) {
    if (!err) {
        console.log(`App started on http://localhost:${port}`);
        opn(`http://localhost:${port}`);
    } else console.log(err)
});
