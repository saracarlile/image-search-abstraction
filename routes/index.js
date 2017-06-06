var express = require('express');
var router = express.Router();
var request = require('request');
var db = require('../config/db');
var History = require('../models/history');



router.get('/', function (req, res) {
  res.render('index', { title: 'Image Search Abstratction', message: 'FreeCodeCamp API Basejump: Image Search Abstratction' })
});



router.get('/recent', function (req, res) {
  History.find({}).sort('-when').limit(10).exec().then(function (found) {
    if (found) {
      res.json(found);  
    } else {
      res.send({ error: "Did not find" });
    }
  });
});




router.get('/search/:term', function (req, res) {
  var params = req.params;
  var options = {
    url: 'https://api.imgur.com/3/gallery/search/' + req.query.offset + '?q=' + params['term'],
    headers: { Authorization: 'Client-ID ' + process.env.IMGURCLIENTID },
    json: true,
  };

  new History({ term: req.params.term }).save();

  function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
      var info = body;
      var noAlbums = body.data.filter(function (image) {
        if (!image.is_album) {
          return image;
        }
      });
      var results = noAlbums.map(function (image) {
        return {
          url: image.link,
          snippet: image.title,
          context: 'https://imgur.com/' + image.id
        };
      });

      if (results.length > req.query.offset) {   //sometimes paginate returns more/less results from Imgur, manual workaround to limit results
        var newResults = results.slice(0, req.query.offset);
        results = newResults;
      }
      res.json(results);
    }
  }
  request(options, callback);

});


module.exports = router;