// Load express
const express = require('express');
let app = express();

var counter = 1;

// Add body parser/json and url encode 
const bodyParser = require('body-parser'); 
app.use(bodyParser.json());           
app.use(bodyParser.urlencoded({ extended: true })); 

// Create Database Connection
const pgp = require('pg-promise')();

let dbConfig = {
    host: 'localhost',
    port: '4000',
    database: 'noahweiss',
    user: 'postgres',
    password:'Password'
};

const isProduction = process.env.NODE_ENV === 'production';
dbConfig = isProduction ? process.env.DATABASE_URL : dbConfig;

let db = pgp(dbConfig);

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Use res.render to load up an ejs view file
app.get('/', function(req, res) {
    res.render('Pages/main');
});



app.get('/Reviews', function(req, res) {
	var list_reviews = 'select * from finalstable;';

  db.task('get-everything', task => {
        return task.batch([
            task.any(list_reviews),
        ]);
    })
    .then(data => {
    	res.render('Pages/Reviews',{
				my_title: "Reviews",
			})
    })
    .catch(error => {
        // display error message in case an error
            request.flash('error', err);
            response.render('pages/Reviews', {
                title: 'Reviews',
            })
    });

});








app.use("/Resources", express.static('./Resources/'));

// Local host
app.listen(4000);
console.log('4000 is the magic port');

