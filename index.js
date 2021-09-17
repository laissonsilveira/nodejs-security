import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cookieSession from 'cookie-session';
import routes from './src/routes/crmRoutes';

const app = express();
const PORT = 3000;

// mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/CRMdb');

// helmet
app.use(helmet())

// express-rate-limit
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message:
        "Too many accounts created from this IP, please try again after an hour"
});
app.use(limiter);

// cookie
const myKey = 'nodeSecurityKey';
app.use(cookieSession({
    name: 'session',
    keys: [myKey],
    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

// bodyparser setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

routes(app);

// serving static files
app.use(express.static('public'));

app.get('/', (req, res) =>
    res.send(`Node and express server is running on port ${PORT}`)
);

app.listen(PORT, () =>
    console.log(`your server is running on port ${PORT}`)
);