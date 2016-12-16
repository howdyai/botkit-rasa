# Botkit / rasa NLU plugin

This plugin provides Botkit developers a way to use the [rasa NLU](https://rasa.ai/) open source, self hosted natural language API.


```
var rasa = require('botkit-rasa')({rasa_uri: 'http://localhost:5000'});
controller.middleware.receive.use(rasa.receive);

controller.hears(['my_intent'],'message_received', rasa.hears, function(bot, message) {

    console.log('Intent:', message.intent);
    console.log('Entities:', message.entities);    

});
```
