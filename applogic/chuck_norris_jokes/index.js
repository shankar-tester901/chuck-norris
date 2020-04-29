'use strict';

var express=require('express');
const axios=require('axios');

var app=express();

app.get('/getJokes',(req,res) => {

	axios.get('https://api.icndb.com/jokes')
		.then(jokeResp => {
			var randomNum=Math.floor(Math.random()*20);
			// console.log(res.data.value[randomNum].categories);
			res.send(jokeResp.data.value[randomNum].joke)
			// console.log(jokeResp.data.value[randomNum].joke);
		})
		.catch(err => {
			console.log("Error received : "+err);
			res.send("Seems something fishy! Bad Joke!");
		});

});


module.exports=app;
