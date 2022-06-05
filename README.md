https://www.electronjs.org/docs/latest/tutorial/quick-start

/////////////////////////////////////////
.env doesn't get included in the out folder when npm run make. even if you include a .env in the same folder as the .exe it won't work. It works hardcoded in index.js new Pool() though.


////////////////////////////////////////////
the .exe wont run if it's outside of its folder when doing electron-forge

///////////////////////////////////////
workflow
    npm start
Then when ready to deploy
    npm run make
This will produce an out folder

///////////////////////////////////////////////
For lambda, Following
https://www.youtube.com/watch?v=fEZE3rm8Ma8
Install sam cli, docker, aws cli, 
In ./aws/lambdas folder
    sam init
choose create from hello world template
modify app.js, in function folder, install dependencies, when ready to test, modify event.json, this is where the test input will be.
    sam validate
Then to build .aws-sam folder,
    sam build 
To test locally, it will create a docker, stuff in event.json are the inputs to the lambda,
    sam local invoke -e ./events/event.json
When ready to deploy, for the first time, use guided,
    sam deploy --guided
This will create 2 stacks in cloudformation, 1 lambda function, 1 api gateway. and samconfig.toml.
For some reason, going to the api gateway endpoint says internal server error, but creating a function url works.
Turns out, the response in the lambda needed to be an object with a body property, then the data needs to be stringified. Now api endpoint also works. The difference of function url and api gateway is, I guess there are more auth methods with api gateway, and can use api keys?

/////////////////////////////////////////////
I'm also able to use api keys
In api gateway, Have to set the api > resources > method request > api key required true,
then in settings the api key source should be header, create an api key, create a usage plan and link those to the endpoint. Make sure to redeploy the end point for changes to take effect.
Can use requestly chrome extension to test if putting the api key in the headers work, or postman,



To delete lambda
    aws lambda delete-function --function-name <function name>
Then delete cloud formation
    aws cloudformation 

