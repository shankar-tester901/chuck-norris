# chuck-norris
Applogic Example using Zoho Catalyst Serverless Compute Environment


So let us give Catalyst a spin alright. 

There is only so much that we can explain in theory ;-).



Let us build something that we can relate to and understand Catalyst better. 

So hmm, let us build an application that shows us jokes about Chuck Norris. 

This application will have a client which shows us the joke and it will have a server to get the jokes from the ICNDB database and show us the jokes.

Catalyst assets used :-

1. Client

2. Applogic


Let us begin.

 This application contains a single HTML page that has :-

A button that when clicked gets a Chuck Norris joke and shows the joke on the screen
Simple isn’t it ?



So let us begin :-



A. Create a project and name it Chuck Norris Jokes

B. Install the CLI by referring this - https://www.zoho.com/catalyst/help/installing-catalyst-cli.html#Install

C. Create an empty directory called chucknorrisjokes

D. Initialize your project with catalyst login command

E. As we had discussed earlier, this application will have a client and a server, so Select client and App Logic [psst, this is the server part] by pressing the space bar and click Enter.  Since we have already created a project ‘Chuck Norris Jokes' via the web console earlier, just choose that again.

F. Now, you will be asked for the Client (static content) name. Just choose any name or just click Enter.

G. Then you will be asked for a package name, entry point and author of your App Logic. Here, click Enter so that the default values will be applied. Next, you will be asked to install the required dependencies. Just click Enter which will install the required dependencies as shown below,

H. Now you will find the following inside the chucknorrisjokes folder :-

applogic	catalyst.json	client



I. Inside apologic, you will find a folder chuck_norris_jokes


J. Inside chuck_norris_jokes folder, you will have the following :-

        catalyst-config.json
	index.js		
	node_modules	
        package-lock.json
	package.json


K. Now, let us see what does the client folder hold -

        client-package.json
	index.html	
	main.css	
	main.js



The index.html is where you make your client. As I had said, our client for this example is nothing more than a Button and then adding an action to be triggered when the button is clicked. So let us have a look at the code. 



The logic will be like this -

I click the button

The action invokes a code in the main.js file

The main.js file invokes the server side code present in the index.js file present under the apologia folder. Alright ?



So let us got the  index.html folder and add a button. Plus let us also add an empty div . Now this empty div is going to be the place where we show the joke that is being sent by the server. Okay till here?



So here is the code for the index.html file.


<!DOCTYPE html>

<html>



<head>

    <meta charset="utf-8" />

    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <title>Chuck Norris Jokes </title>

    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link rel="stylesheet" type="text/css" media="screen" href="main.css" />

    <script src="https://code.jquery.com/jquery-3.4.1.min.js"> </script>

    <script src="main.js"></script>

</head>



<body>

    <h1>Chuck Norris Jokes</h1>







    <button id="submit" type="submit" onclick="getJokes();return false;">Tell a Joke</button>





    <div id="jokes_Details">



    </div>



</body>



</html>



So let us look at the above code.

I have added the jquery library

I have also referred the main.js file so that the button action can be invoked in main.js file.
I have added a button called Tell a Joke. Upon button click, I have invoked getJokes() method.
I have added, as promised, an empty div called jokes_Details.
So that is all to this file.


Now, let us look at the main.js file. This file is the heart of the client operations. So all the client-side magic goes here.


function getJokes() {

  //alert(' here to getJokes ');

  console.log("in here getJokes");

  $("#jokes_Details").html(

    '<img src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif"/>'

  );



  $.ajax({

    type: "GET",

    url: "/server/chuck_norris_jokes/getJokes",

    contentType: "application/json",

    success: function (data) {

      //  alert(data);

      $("#jokes_Details").html(data);

    },

    error: function (error) {

      alert(error);

    }

  });

}



Let us look at the above file. This is nothing but a function call happening. This is being invoked up button-click from the index.html file.

So what really happens here?

When the button is clicked, I show a page-loader gif to show that something is happening and you need to wait a bit. 

(Remember, we are having a cold-start now. So it will take around 4 secs to get a response back the first time you run this function. The subsequent button-clicks will be warm-starts so you will get almost instant responses)


Now, we have an Ajax call happening to server. This way the page does not reload, right? So I am making a ‘GET’ call to the getJokes method on the index.js file in apologic folder on the server side. 

I am also telling the server that I am sending data type json. 


Upon the successful response from the server, I will render the response in the jokes_Details div in the client.

If there is a failure, I will throw up an alert in the client.

Simple, no?



L. 

K. Now this is the place where you need to install any package that you may need to run your server side code. This is the heart of the operation literally. So anytime you want to add any third-party package for server side, you install it here. If you are using nodejs, you need to install packages here using the nam install —save xyzzy.


So  let us look at what our index.js looks like.





'use strict';



var express=require('express');

const axios=require('axios');



var app=express();



var catalyst=require('zcatalyst-sdk-node');





app.get('/getJokes',(req,res) => {



    axios.get('https://api.icndb.com/jokes')

        .then(jokeResp => {

            var randomNum=Math.floor(Math.random()*20);

            res.send(jokeResp.data.value[randomNum].joke)

            console.log(jokeResp.data.value[randomNum].joke);

        })

        .catch(err => {

            console.log("Error received : "+err);

            res.send("Seems something fishy! Bad Joke!");

        });



});





module.exports=app;



This is quite interesting. Let us look at it closely.

So first things first.

We are using express and axis packages for this program. So we invoke them.
As we are dealing with Catalyst, we need to have the node sdk of catalyst involved. Hence we add that.



Now, we are to receive a GET request from the client and we need to act upon that. So we write a GET method and inside that method is where we do the actual server-side logic.


The logic is very simple actually. All we need to do is to make a GET call to the ICNDB jokes database. This is a publicly accessible database. 

To make that GET call within Express, I chose to use Axios package as it makes my life simpler for handling the GET calls. Now this GET call actually sends me a full list of jokes. I want some random joke only.

So we generate a random number and fetch a single random joke.
Remember, we are using server less approach here so we need to mandatorily export this as shown in the final line above. It is a must.

And send that joke to the client. Simple.



M. Now, before we go trigger-happy, we need to install the various packages that we have used. Remember, we are doing heart-surgery here ;-) so we need to get all the relevant packages. 

So now we need to install packages used in the code here as follows :-

 npm install —save express

 npm install —save axios



N. Now we are ready to run the program.

There are 2 ways of testing this. We can test in live or we can test locally. It often makes sense to test locally so that we can fix the errors if any and then push it to server.

So let us now go back to the chucknorrisjokes folder and run the command -


catalyst serve


This will show us the following -

shankarr-0701@shankarr-0701 chucknorrisjokes % catalyst serve



ℹ server will start at port 3000

ℹ you can test your applogic[chuck_norris_jokes] with URL : http://localhost:3000/server/chuck_norris_jokes

ℹ you can test your client[ChuckNorrisJokesClient] with URL : http://localhost:3000/app/



So now we can go to http://localhost:3000/app/ and see our creation!


So now we see it working in our test setup.

While you are seeing this in the browser, you will see the following prints on the client console as well -



ℹ you can test your client[ChuckNorrisJokesClient] with URL : http://localhost:3000/app/

[1577085106623] "GET"  "/app"

[1577085106638] "GET"  "/app/"

[1577085106719] "GET"  "/app/main.css"

[1577085106721] "GET"  "/app/main.js"

[1577085108364] "GET"  "/server/chuck_norris_jokes/getJokes"

Chuck Norris sheds his skin twice a year.

[1577085115923] "GET"  "/server/chuck_norris_jokes/getJokes"

In an average living room there are 1,242 objects Chuck Norris could use to kill you, including the room itself.

[1577085117608] "GET"  "/server/chuck_norris_jokes/getJokes"

Time waits for no man. Unless that man is Chuck Norris.



Now let us deploy on the server. Ready?




Go the chucknorrisjokes folder and type the following command -

catalyst deploy



This will take sometime to respond as deploying on the server takes time. In a little over say 15secs, you will see the following on your screen.



shankarr-0701@shankarr-0701 chucknorrisjokes % catalyst deploy



ℹ functions(chuck_norris_jokes): URL => https://chucknorrisjokes-698653107.development.zohocatalyst.com/server/chuck_norris_jokes/

✔ functions(chuck_norris_jokes): deploy successful



✔ client: deploy successful

ℹ client: URL => https://chucknorrisjokes-698653107.development.zohocatalyst.com/app/index.html



So that is about it. Now, take the client URL that is - https://chucknorrisjokes-698653107.development.zohocatalyst.com/app/index.html



Paste this in a new tab in the browser and .. Voila! Your app is live now.
