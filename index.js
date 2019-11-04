var express = require('express')
const path = require('path');
var app = express()

const angularPath = '/SelfHostedAssistant/dist/SelfHostedAssistant'
app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + angularPath))

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + angularPath + '/index.html'));
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
