const jsonServer=require('json-server');
const server=jsonServer.create();
const path=require('path');
const router=jsonServer.router(path.join(__dirname,'api.json'));
const cors=require('cors');
//configure static file serving. 
const middlewares=jsonServer.defaults({static: './public'});



//configure cors first to allow cross-origin
server.use(cors());
server.use(middlewares);
server.use(jsonServer.bodyParser);

//configure router
server.use(router);


const port=5000;
server.listen(port,()=>{
	console.log(`JSON server is up and running at 'http://localhost:${port}'`);
});