const express = require('express'), bodyParser = require('body-parser');
const http = require('http');
const url = require('url');
const WebSocket = require('ws');
const app = express();
app.use(bodyParser.json())
var exec = require('child_process').exec;

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
var fs = require('fs')

wss.broadcast = function broadcast(msg) {
   console.log(msg);
   wss.clients.forEach(function each(client) {
       client.send(msg);
    });
};

wss.on('connection', function connection(ws, req) {
	const location = url.parse(req.url, true);
	// You might use location.query.access_token to authenticate or share sessions
	// or req.headers.cookie (see http://stackoverflow.com/a/16395220/151312)
        console.log('Server is connected');

  	// PIPE LISTENER
	const fd = fs.openSync('/var/www/medium-demo-angular/server/blocks.fifo', 'r+')
	const stream = fs.createReadStream(null, {fd})
	stream.on('data', data => {
        function puts(error, stdout, stderr) { sys.puts(stdout) }
        exec("multichain-cli medium-demo-blockchain liststreamitems root", function(error, stdout, stderr) {
          if (!error) {

            // things worked!
            // console.log(stdout)
	    wss.broadcast(stdout);


          } else {
                console.log(stderr)
            // things failed :(



          }
        });

	})

	ws.on('close', function(code, reason) {
	    console.log(code);
	    console.log(reason);
	});

});

app.get("/retrieve-database" , function (request, response) {

	function puts(error, stdout, stderr) { sys.puts(stdout) }
	exec("multichain-cli medium-demo-blockchain liststreamitems root", function(error, stdout, stderr) {
	  if (!error) {

	    // things worked!
	    console.log(stdout)
		response.send(stdout)

	  } else {
	  	console.log(error)
	    // things failed :(

	  }
	});
});


server.listen(3500, function listening() {
  console.log('Listening on %d', server.address().port);
});	

