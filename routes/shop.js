let express = require('express');
let router = express.Router();

let sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database("data.db", (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the SQlite database.');
});


food_list = [];
fdprices_list = [];
fdimages_list = [];

db.all("select * from Shop", show);
function show(err, rows) {
  if (err) throw err;
  for(let i = 0; i < rows.length; i++) {
    food_list.push(rows[i]["name"]);
    console.log(rows[i]["name"]);
    fdprices_list.push(rows[i]["price"]);
    console.log(rows[i]["price"]);
    fdimages_list.push(rows[i]["image"]);
    console.log(rows[i]["image"]);
  }
}

/* GET shop page. */
router.get('/', function(req, res, next) {
  res.render('shop', { title1: 'Treats', title2: 'Vegan Chocolate Bars',
  item1: food_list[0], item2: food_list[1], item3: food_list[2],
  item4: food_list[3], item5: food_list[4], item6: food_list[5],
  item7: food_list[6], item8: food_list[7], item9: food_list[8],
  item10: food_list[9], item11: food_list[10],
  price1: fdprices_list[0], price2: fdprices_list[1], price3: fdprices_list[2],
  price4: fdprices_list[3], price5: fdprices_list[4], price6: fdprices_list[5],
  price7: fdprices_list[6], price8: fdprices_list[7], price9: fdprices_list[8],
  price10: fdprices_list[9], price11: fdprices_list[10],
  image1: fdimages_list[0], image2: fdimages_list[1], image3: fdimages_list[2],
  image4: fdimages_list[3], image5: fdimages_list[4], image6: fdimages_list[5],
  image7: fdimages_list[6], image8: fdimages_list[7], image9: fdimages_list[8],
  image10: fdimages_list[9], image11: fdimages_list[10]});
});

/* GET ID Product */
router.get('/getID/:name', function(req, res, next) {
    db.get("SELECT id FROM Shop WHERE name = ?", req.params.name, (err, result) => {
        if (err) {
          console.log('Error running sql: ' + sql);
          console.log(err);
          res.send("Not ok");
        } else {
          console.log(result.id);
          res.send(result.id.toString());
        }
    });
});

module.exports = router;
