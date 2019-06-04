let express = require('express');
let router = express.Router();

let sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database("data.db", (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the SQlite database.');
});

/* GET checkout page. */
router.get('/', function(req, res, next) {
  res.render('checkout');
});
/* GET add customer */
router.get('/addCustomer/:name/:email', function(req, res, next) {
    let ps = db.prepare("INSERT OR REPLACE INTO Customers (email, name) VALUES (?, ?)");
    let res1 = "OK";
    console.log("The name " + req.params.name + " and the email " + req.params.email )
    ps.run(req.params.email, req.params.name,function(err) {
              if (err) {
              	console.log(err.message);
                res1 = err.message;
              }
          }
    );
    ps.finalize();
    res.send(res1);
});
//AddItemslist
router.get('/addItem/:email/:id/:totalPrice/:quantity', function(req, res, next) {
	let date = new Date();
	let sqliteDate = date.toISOString();
    console.log("email: " + req.params.email + " id: " + req.params.id + " totalPrice: " + req.params.totalPrice + " qty: " + req.params.quantity  );
     db.run(`INSERT INTO customers_items(custEmail, itemId, totalPrice, quantity, orderDate) VALUES(?, ? , ? , ? , ?)`,
     	[ "'" + req.params.email + "'" , "'" + req.params.id + "'" , "'" + req.params.totalPrice + "'" , "'" + req.params.quantity + "'" , "'" + sqliteDate + "'"]
     	, function(err) {
    if (err) {
      return console.log(err.message);
    }
    // get the last insert id
    console.log('A row has been inserted');
  });
    res.send("OK");
});
module.exports = router;
