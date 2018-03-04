const express = require('express');
const path = require('path');
const cors = require('cors');
const yelp = require('yelp-fusion');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: false}));

app.get('/',(req,res)=>{
	res.send('Testing');
})

//yelp search api
app.post('/search', (req,res)=>{
	if(req.body.access_token==undefined){
		res.json({"Success": false, errors: "No API key received"});
	}
	const client = yelp.client(req.body.access_token);
	var params = {
		term: req.body.term,
		location: req.body.location
	}
	client.search(params).then(response=>{
		res.json(response.jsonBody);
	}).catch(e=>{
		let errors = [];
		if(req.body.term ==undefined) errors.push("enter a valid term");
		if(req.body.location==undefined) errors.push("enter a valid location");
		res.json({"Success": false, errors});
	});
});

// const client = yelp.client(/*APIKey*/);

// client.search({
// 	term: 'food',
// 	location: '92620'
// }).then(response=>{
// 	console.log(response);
// }).catch(e=>{
// 	console.log(e);
// });

app.listen(PORT, ()=>{
	console.log("Server is listening on PORT ", PORT);
})
