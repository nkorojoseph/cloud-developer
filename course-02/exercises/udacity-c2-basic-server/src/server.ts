import express, { Router, Request, Response } from "express";
import bodyParser from "body-parser";

import { Car, cars as cars_list } from "./cars";

(async () => {
	let cars: Car[] = cars_list;

	//Create an express application
	const app = express();
	//default port to listen
	const port = 8082;

	//use middleware so post bodies
	//are accessable as req.body.{{variable}}
	app.use(bodyParser.json());

	// Root URI call
	app.get("/", (req: Request, res: Response) => {
		res.status(200).send("Welcome to the Cloud!");
	});

	// Get a greeting to a specific person
	// to demonstrate routing parameters
	// > try it {{host}}/persons/:the_name
	app.get("/persons/:name", (req: Request, res: Response) => {
		let { name } = req.params;

		if (!name) {
			return res.status(400).send(`name is required`);
		}

		return res.status(200).send(`Welcome to the Cloud, ${name}!`);
	});

	// Get a greeting to a specific person to demonstrate req.query
	// > try it {{host}}/persons?name=the_name
	app.get("/persons/", (req: Request, res: Response) => {
		let { name } = req.query;

		if (!name) {
			return res.status(400).send(`name is required`);
		}

		return res.status(200).send(`Welcome to the Cloud, ${name}!`);
	});

	// Post a greeting to a specific person
	// to demonstrate req.body
	// > try it by posting {"name": "the_name" } as
	// an application/json body to {{host}}/persons
	app.post("/persons", async (req: Request, res: Response) => {
		const { name } = req.body;

		if (!name) {
			return res.status(400).send(`name is required`);
		}

		return res.status(200).send(`Welcome to the Cloud, ${name}!`);
	});

	// @TODO Add an endpoint to GET a list of cars
	// it should be filterable by make with a query paramater
	app.get("/cars", async (req: Request, res: Response) => {
    const {query} = req.query
   

    if(!query){
      return res.status(400).send("No query sent or wrong query")
    }

    res.status(200).send({
      data: cars,
      message: "Cars returned"
    })
  });

	// @TODO Add an endpoint to get a specific car
	// it should require id
	// it should fail gracefully if no matching car is found

  app.get("/cars/:carid", async (req:Request, res:Response)=>{
    const {carid} = req.params
    const data = cars.filter((car)=>car.id===Number(carid))

    if(!carid)
      return res.status(400).send({message:"Error from the parameters sent to the server"})

    return res.status(200).send({
      message:"Success, data returned",
      payload: data
    })
  })

	/// @TODO Add an endpoint to post a new car to our list
	// it should require id, type, model, and cost

  app.post('/car',async (req:Request, res:Response)=>{
    const valueToSave = req.body

    const newCarList:Car[] = await cars.concat(valueToSave)

    return res.status(200).send({
      data:newCarList,
      message: "Successfully saved"
    })

  })

	// Start the Server
	app.listen(port, () => {
		console.log(`server running http://localhost:${port}`);
		console.log(`press CTRL+C to stop server`);
	});
})();
