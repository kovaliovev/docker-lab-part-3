// Load environment variables
import dotenv from 'dotenv';
dotenv.config();

// Importing required packages
import chalk from 'chalk';
import figlet from 'figlet';
import cowsay from 'cowsay';
import axios from 'axios';
import moment from 'moment';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import _ from 'lodash';
import express from 'express';
import createDebug from 'debug';

const debug = createDebug('hello-world');

// Setting up command line arguments
const argv = yargs(hideBin(process.argv))
    .option('name', {
        alias: 'n',
        description: 'Your name',
        type: 'string'
    })
    .help()
    .alias('help', 'h')
    .argv;

// Creating a simple express server
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Start the server
app.listen(port, () => {
    debug(`Server running on http://localhost:${port}`);
});

// Fetching some data using axios
axios.get('https://api.github.com')
    .then(response => {
        debug('Fetched data from GitHub API');
    })
    .catch(error => {
        debug('Error fetching data:', error);
    });

// Displaying a styled "Hello, World!" message using figlet, chalk, and cowsay
figlet('Hello, World!', (err, data) => {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }

    const name = argv.name || 'Stranger';
    const greeting = chalk.blue(data);
    const time = chalk.green(moment().format('LLLL'));
    const cowMessage = cowsay.say({
        text: `Hello, ${name}!`,
        e: "oO",
        T: "U "
    });

    console.log(greeting);
    console.log(cowMessage);
    console.log(chalk.yellow('Current Time:'), time);
		console.log('Happy Friday!');

    // Using lodash to capitalize a string
    const capitalized = _.capitalize(name);
    console.log(chalk.magenta(`Capitalized Name: ${capitalized}`));
});
