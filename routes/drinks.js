let express = require('express');
let router = express.Router();

let sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database("data.db", (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the SQlite database.');
});

drinks_list = [];
drprices_list = [];
drimages_list = [];

db.all("select * from Drinks", show);
function show(err, rows) {
  if (err) throw err;
  for(let i = 0; i < rows.length; i++) {
    drinks_list.push(rows[i]["name"]);
    console.log(rows[i]["name"]);
    drprices_list.push(rows[i]["price"]);
    console.log(rows[i]["price"]);
    drimages_list.push(rows[i]["image"]);
    console.log(rows[i]["image"]);
  }
}

/* GET drinks page. */
router.get('/', function(req, res, next) {
  res.render('items', { title1: 'Hot Chocolate',  title2: 'Coffee',
  item1: drinks_list[0], item2: drinks_list[1], item3: drinks_list[2],
  item4: drinks_list[3], item5: drinks_list[4], item6: drinks_list[5],
  item7: drinks_list[6], item8: drinks_list[7], item9: drinks_list[8],
  item10: drinks_list[9], item11: drinks_list[10], item12: drinks_list[11],
  price1: drprices_list[0], price2: drprices_list[1], price3: drprices_list[2],
  price4: drprices_list[3], price5: drprices_list[4], price6: drprices_list[5],
  price7: drprices_list[6], price8: drprices_list[7], price9: drprices_list[8],
  price10: drprices_list[9], price11: drprices_list[10], price12: drprices_list[11],
  image1: drimages_list[0], image2: drimages_list[1], image3: drimages_list[2],
  image4: drimages_list[3], image5: drimages_list[4], image6: drimages_list[5],
  image7: drimages_list[6], image8: drimages_list[7], image9: drimages_list[8],
  image10: drimages_list[9], image11: drimages_list[10], image12: drimages_list[11]});
});

module.exports = router;
