let express = require('express');
let router = express.Router();

/* GET layout page. */
router.get('/layout', function(req, res, next) {
  res.render('layout');
});

module.exports = router;
