const jsonServer=require('json-server');
const server=jsonServer.create();
const path=require('path');
const router=jsonServer.router(path.join(__dirname,'api.json'));
const middlewares=jsonServer.defaults();
const cors=require('cors');
const express=require('express');

//serves, in this case static files for resumes/
//server.use('/static',express.static(path.join(__dirname,'public')));
//configure server to accept all origins.
server.use(cors());
server.use(middlewares);
server.use(jsonServer.bodyParser);

//configure router
server.use(jsonServer.defaults(['./images'])); //for static files
server.use(router);


const port=5000;
server.listen(port,()=>{
	console.log(`JSON server is up and running at 'http://localhost:${port}'`);
});