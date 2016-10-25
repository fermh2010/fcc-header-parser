const express = require('express');
const app = express();

app.set('port', process.env.port || 8080);

app.listen(app.get('port'), function() {
   console.log('Server ready') ;
});