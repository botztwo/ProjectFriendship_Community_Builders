
var express = require('express');
var bodyParser = require('body-parser');
const { Pool } = require('pg');
const fs = require('fs')

var app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(bodyParser.json({ limit: '15MB' }))

//app.use(bodyParser.raw());

// RETRIEVE names - send name oof current user 
app.post('/Curr_name', (request, response) => {
    console.log(`Got request for names`);
    console.log(request.body.postBody);
    let email = request.body.postBody;
    console.log(email);
    pool.query('SELECT name, mid FROM mentor WHERE email = $1', [email])
	.then(res => {
	    let arr =[];
      //console.log(res.rows[0].name,res.rows[0].mid);
     // response.send(res.rows[0].name,res.rows[0].mid);
	    res.rows.forEach(val => {
        arr.push(val.name); 
        arr.push(val.mid); 
   
	    });
	    response.send(arr)
	})
	/*.cch(err =>
	       setImmediate(() => {
		   throw err;
	       }));*/
})
//Server request for the directory
app.get('/names', (request, response) => {
  console.log(`Got request for names`);
  pool.query('SELECT * FROM mentor ORDER BY name ASC;')
.then(res => {
 let allmentors = [];
 console.log('Show names: ');
 res.rows.forEach(val => {
let arr = [];
console.log(val.name);
arr.push(val.name);
arr.push(val.pronouns);
arr.push(val.email);
arr.push(val.school);
arr.push(val.class_year);
arr.push(val.bio);
allmentors.push(arr);
 
 });
 response.send(allmentors)
 console.log(allmentors);
})
.catch(err =>
    setImmediate(() => {
throw err;
    }));
})

//hey kaz

//Adds a post
app.post('/update', (request, response) => {
  console.log(request.body.postBody);
  console.log("whats up");
  let name=  [];
  request.body.postBody.split(",").map(item=>name.push(item));
  console.log(request.body.postBody); //change
  console.log(name);
  let post_info = name[0];
  let tags = name[1];
  let Email = name[2];
  //let def =  'DEFAULT';
  console.log(post_info);
  console.log(Email);
  console.log(tags);
  pool.query('INSERT INTO post VALUES ($1, $2, $3)', [post_info,Email,tags])
.then(res => {
    console.log('DB response: ' /*+ res.rows[0]*/);
    response.sendStatus(200)
})
.catch(err =>
       setImmediate(() => {
     throw err;
       }));
})

//retrieves all posts from socials table 
app.get('/allposts', (request, response) => {
  console.log('Got request for Post Body');
  //pool.query('SELECT post_info FROM post WHERE pid=8')
 pool.query(`SELECT p.email, m.email, p.post_info,m.name,p.tags, p.pid, TO_CHAR(posting_date:: DATE, 'Mon dd, yyyy') FROM post p, mentor m WHERE p.email = m.email ORDER BY pid DESC`)
  //pool.query('SELECT * FROM post ORDER BY pid DESC')
.then(res => {
   //let arr = [];
   /*arr.push(res.rows[0].name);
   arr.push(res.rows[0].post_info);
   arr.push(res.rows[0].to_char);
   console.log(res.rows[0].to_char);*/

  // console.log("Sending back to client the post bod: " + res.rows[0].post_info);
   //console.log("Sending back to client the post body: " + res.rows[0].name,res.rows[0].post_info);
   //response.send(arr);
    //console.log('Show names: ');
    let all_posts = [];
    res.rows.forEach(val => {
          //console.log(val.email);
          let arr = [];
          arr.push(val.name);
          arr.push(val.post_info);
          arr.push(val.to_char);
          arr.push(val.tags);
          all_posts.push(arr);
          //response.send(arr);
         // console.log(arr)
  //arr.push(val); 
    });
    console.log(all_posts);
    response.send(all_posts);
})

.catch(err =>
       setImmediate(() => {
     throw err;
       }));
})


//retrieves a singular post body for socials page not usiing anymore 
app.get('/postBody', (request, response) => {
  console.log('Got request for Post Body');
  //pool.query('SELECT post_info FROM post WHERE pid=8')
  pool.query(`SELECT p.email, m.email, p.post_info,m.name,p.pid, TO_CHAR(posting_date:: DATE, 'Mon dd, yyyy') FROM post p, mentor m WHERE p.email = m.email AND p.pid=8`)
.then(res => {
   let arr = [];
   arr.push(res.rows[0].name);
   arr.push(res.rows[0].post_info);
   arr.push(res.rows[0].to_char);
   console.log(res.rows[0].to_char);

  // console.log("Sending back to client the post body: " + res.rows[0].post_info);
   //console.log("Sending back to client the post body: " + res.rows[0].name,res.rows[0].post_info);
   response.send(arr);
    //let arr = [];
    //console.log('Show names: ');
    /*res.rows.forEach(val => {
  //console.log(val);
  arr.push(val); 
    });*/
    //console.log(arr);
   // response.send(arr)
})

.catch(err =>
       setImmediate(() => {
     throw err;
       }));
})


//Searchs for a similarity 
app.post('/search', (request, response) => {
  console.log('Got request for a search ');
  console.log(request.body);
  var test = request.body.postBody;
  pool.query(`SELECT p.email, m.email, p.post_info,m.name,p.tags, p.pid, TO_CHAR(posting_date:: DATE, 'Mon dd, yyyy') FROM post p, mentor m WHERE p.email = m.email AND (tags=$1 OR name = $1) ORDER BY pid DESC`,[test])
  .then(res => {
     let all_posts = [];
     res.rows.forEach(val => {
           let arr = [];
           arr.push(val.name);
           arr.push(val.post_info);
           arr.push(val.to_char);
           arr.push(val.tags);
           all_posts.push(arr);
     });
     console.log(all_posts);
     response.send(all_posts);
 })

 .catch(err =>
  setImmediate(() => {
throw err;
  }));
})





// RETRIEVE 0 or 1 - send value back if user /pass is in table. Logs in user 
app.post('/login',  (request, response) => {
  let name=  [];
  request.body.postBody.split(",").map(item=>name.push(item));
  //console.log(request.body)
 console.log(name)
 // console.log(request.body.postBody)
  //console.log(`Got request to add a post, will add ${name} to database`);
 // console.log(request.body);
let email = name[0];
let pass = name[1];
console.log(email);
console.log(pass);
console.log(`Got request for look`);
  pool.query('SELECT count(*) FROM mentor WHERE email = $1 AND password = $2 ', [email, pass])
  .then(res => {
    console.log(res.rows[0])
    response.send(res.rows[0]);  
})
.catch(err =>
       setImmediate(() => {
     throw err;
       }));
})



//Adds a new useer 

app.post('/new', (request, response) => {
  console.log("insert")
  let name=  [];
  request.body.postBody.split(",").map(item=>name.push(item));
  //console.log(request.body)
 console.log(name)
 let mentor_name = name[0];
 let pronouns = name[1];
 let email = name[2];
 let college = name[3];
 let class_year = name[4];
 let bio = name[5];
 let pass = name[6];
console.log("my name is "+ mentor_name + " and im studying "+ bio);
 // console.log(request.body.postBody)
  //console.log(`Got request to add a post, will add ${name} to database`);
  pool.query('INSERT INTO mentor VALUES ($1,$2,$3,$4,$5,$6,$7)',[ mentor_name, pronouns, email, college, class_year, bio, pass])
.then(res => { 
    response.sendStatus(200)
})
.catch(err =>
       setImmediate(() => {
     throw err;
       }));
})

app.post('/savePhoto', (req, res) => {
  console.log('saving photo')
	fs.writeFile('./out.png', req.body.imgsource, 'base64', (err) => {
		if (err) throw err
	})
	res.status(200)
})




// catch 404 and forward to error handler

app.use(function(request, response, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, request, response, next) {
  // set locals, only providing error in development
  response.locals.message = err.message;
  response.locals.error = request.app.get('env') === 'development' ? err : {};

  // render the error page
  response.status(err.status || 500);
});


/* Main program */

console.log(`Starting button-server-db app`);

const lib = require('./mcalib');
lib.setErrorPrefix(__filename);  // set label for lib error messages

// database connection parameters
const dbHost = "anansi.stolaf.edu";
const user = 'botz2';    // CHANGE to your username, e.g., jones1
//const password = lib.getPGPassword(dbHost);  // uncomment for Windows
const dbName = 'mca_f21';
const schema = 'mca_f21_comm';  // CHANGE to your username as schema for Lab 5
                       // CHANGE to team schema for project

const pool = new Pool({
    user: user,
//    password: password,                      // uncomment for Windows
    host: dbHost,
    database: dbName,
    port: 5432,
});

pool.on('connect', client => {
    client.query(`SET search_path = ${schema}, public;`)
});

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})

console.log(`Connected to database ${dbName} on ${dbHost}`);

console.log("IP addresses:  ", lib.getIPAddresses());

module.exports = app;
