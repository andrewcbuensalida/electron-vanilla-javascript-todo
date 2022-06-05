const axios = require("axios");
require('dotenv').config()
/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */
exports.lambdaHandler = async (event, context) => {
	console.log(`This is event in `);
	console.log(event.body);

    console.log(`This is process.env.myEnvironmentVariable in `)
    console.log(process.env.myEnvironmentVariable)
    

	let response;
	try {
		const pokemonJSON = await axios(
			`https://pokeapi.co/api/v2/pokemon/${
				Math.floor(Math.random() * 152) + 1
			}`
		);
		response = {
			statusCode: 200,
			body:  JSON.stringify(pokemonJSON.data),
			
		};
		
	} catch (err) {
		console.log("This is an error:" + err);
		return err;
	}

	return response;
};
