const express = require('express');
const app = express();

app.set('port', process.env.port || 8080);

app.get('/', function(req, res) {
    res.redirect("/api/whoami");
})

app.get('/api/whoami', function(req, res) {
    var regex_result;
    
    var ip = req.headers['x-forwarded-for']
        || req.connection.remoteAddress;
    
    const lang_raw = req.headers['accept-language'];
    regex_result = /^([a-zA-Z-]+),/.exec(lang_raw);
    var lang = null;
    if(regex_result && regex_result.length > 1) {
        lang = regex_result[1];
    }
    
    const agent_raw = req.headers['user-agent'];
    regex_result = /\(([^\)]+)\)/.exec(agent_raw);
    var os = null;
    if(regex_result && regex_result.length > 1) {
        os = regex_result[1];
    }
    
    var out = {
        ipaddress: ip,
        language: lang,
        software: os
    };
    res.json(out);
});

app.listen(app.get('port'), function() {
   console.log('Server ready') ;
});