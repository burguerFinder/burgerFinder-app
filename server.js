var express = require('express');
var app = express();

/* aquí le decimos que use los archivos estáticos y se muestren al llamar la ruta '/'*/
app.use('/', express.static('public'));

app.get("/", function(req, res){
	res.sendFile(__dirname +"/src" +"/index.html");
});
// aquí le decimos al framework desde que puerto
app.listen(process.env.PORT || 5000, () => {
	console.log("Listening on 5000");
});