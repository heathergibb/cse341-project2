const cors = require('cors');
const express = require('express');
const mongodb = require('./data/connect');
const routes = require('./routes');
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;

const app = express();
const PORT = process.env.PORT || 5500;

// Middleware
app.use(cors())
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(
        session({
            secret: 'secret',
            resave: false,
            saveUninitialized: true
        })
    )
    .use(passport.initialize())
    .use(passport.session())
    .use('/', routes);

passport.use(
    new GitHubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: process.env.CALLBACK_URL
        },
        function(accessToken, refreshToken, profile, done) {
            return done(null, profile);
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});

app.get('/', (req, res) => {
    res.send(
        req.session.user !== undefined
            ? `Logged in as ${req.session.user.displayName}`
            : 'Logged Out'
    );
});

app.get(
    '/github/callback',
    passport.authenticate('github', {
        failureRedirect: '/api-docs',
        session: false
    }),
    (req, res) => {
        req.session.user = req.user;
        res.redirect('/');
    }
);
// Error Handling
process.on('uncaughtException', (err, origin) => {
    console.log(
        process.stderr.fd,
        `Caught exception: ${err}\n` + `Exception origin: ${origin}`
    );
});

mongodb.connectToDB((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(PORT);
        console.log(`Server is running on port ${PORT}.`);
    }
});
