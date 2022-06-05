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
Following
https://www.youtube.com/watch?v=fEZE3rm8Ma8
Install sam cli, docker, aws cli, 
In ./aws/lambdas folder
    sam init
choose create from hello world template
modify app.js, in function folder, install dependencies, when ready to test, modify event.json, this is where the test input will be.
    sam validate
Then to build .aws-sam folder,
    sam build 
To test locally, it will create a docker, with input -e
    sam local invoke -e ./events/event.json

When ready to deploy, for the first time, use guided,
    sam deploy --guided
This will create 2 stacks in cloudformation, and 1 lambda function.
For some reason, going to the api gateway endpoint says internal server error, but creating a function url works.

To delete lambda
    aws lambda delete-function --function-name <function name>
Then delete cloud formation
    aws cloudformation 