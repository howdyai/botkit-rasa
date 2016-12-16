var request = require('request');
var debug = require('debug')('botkit:rasa');

module.exports = function(config) {

    if (!config) {
        config = {};
    }

    if (!config.rasa_uri) {
        config.rasa_uri = 'http://localhost:5000';
    }

    var middleware = {
        receive: function(bot, message, next) {

            debug('Sending message to rasa API', message.text);
            request.post(config.rasa_uri + '/parse',{form: {q: message.text }}, function(err, res, body) {
                if (err) {
                    console.error('rasa middleware error:',err);
                } else {
                    var json = null;
                    try {
                        json = JSON.parse(body);
                    } catch(err) {
                        console.error('rasa middleware error parsing json:',err);
                    }

                    // copy the entire payload into the message
                    if (json) {
                        debug('rasa API payload', json);
                        message.intent = json.intent;
                        message.entities = json.entities;
                    }
                }

                next();

            });

        },
        hears: function(patterns, message) {
             for (var t = 0; t < patterns.length; t++) {
               if (message.intent == patterns[t]){
                   return true;
               }
             }
        }

    }


    return middleware;


}
