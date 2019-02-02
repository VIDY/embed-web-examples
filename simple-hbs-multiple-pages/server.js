const express = require('express');
const hbs = require('hbs');
const fs = require('fs');


const port = process.env.PORT || 3000;
var app = express();
hbs.registerPartials(__dirname + '/views/partials');

// this app uses HBS 
app.set('view engine', 'hbs');


app.use((req, res, next)=> {
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;
	console.log(log);
	fs.appendFile('server.log', log + '\n', (err) => {
		if(err){
			console.log('Unable to append to server.log');
		}
	});
	next();
});

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});

/*Set up hbs Vidy SDK helper. 
*/
hbs.registerHelper('get_Vidy', (postid) => {
	return `<script src="https://unpkg.com/@vidy/embed/dist/embed.min.js"></script>
	<script>
		document.addEventListener("DOMContentLoaded", function(event) {
			console.log('Page loaded');
			let pathname = location.pathname;
			let vidy = new Vidy({
				appid: 'ff915b11-d1c1-41ec-a630-103dbb4ab0a0',
				postid: \'${postid}\',
				autoload: true
			});
		});
	</script>`
});


/* For this example, the url path name is used for the postid. each pathname must be unique afterall.
*/
app.get("/", (req, res, next) => {
	res.redirect('/home');
});


/*Set up simple routes*/
	
app.get('/home', (req,res) =>{
	res.render('home.hbs',{  
		pageTitle: 'Simple Home Page Example',
		postid: req.url.replace(/^\/|\/$/g, '')
	});
});

app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle: 'Simple About Page Example',
		postid: req.url.replace(/^\/|\/$/g, '')
	});
});


app.get('/projects', (req, res) => {
	res.render('projects.hbs', {
		pageTitle: 'Last Simple Page Example  ',
		postid: req.url.replace(/^\/|\/$/g, '')
	});
});

app.listen(port, () => {
	console.log(`Server is up on port ${port}`);
});
