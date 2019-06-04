let express = require('express');
let router = express.Router();

let sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database("data.db", (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the SQlite database.');
});

treats_list = [];
trprices_list = [];
trimages_list = [];

db.all("select * from Treats", show);
function show(err, rows) {
  if (err) throw err;
  for(let i = 0; i < rows.length; i++) {
    treats_list.push(rows[i]["name"]);
    console.log(rows[i]["name"]);
    trprices_list.push(rows[i]["price"]);
    console.log(rows[i]["price"]);
    trimages_list.push(rows[i]["image"]);
    console.log(rows[i]["image"]);
  }
}

/* GET treats page. */
router.get('/', function(req, res, next) {
  res.render('items', { title1: 'Cakes/Cupcakes',  title2: 'Cookies & Brownies',
  item1: treats_list[0], item2: treats_list[1], item3: treats_list[2],
  item4: treats_list[3], item5: treats_list[4], item6: treats_list[5],
  item7: treats_list[6], item8: treats_list[7], item9: treats_list[8],
  item10: treats_list[9], item11: treats_list[10], item12: treats_list[11],
  price1: trprices_list[0], price2: trprices_list[1], price3: trprices_list[2],
  price4: trprices_list[3], price5: trprices_list[4], price6: trprices_list[5],
  price7: trprices_list[6], price8: trprices_list[7], price9: trprices_list[8],
  price10: trprices_list[9], price11: trprices_list[10], price12: trprices_list[11],
  image1: trimages_list[0], image2: trimages_list[1], image3: trimages_list[2],
  image4: trimages_list[3], image5: trimages_list[4], image6: trimages_list[5],
  image7: trimages_list[6], image8: trimages_list[7], image9: trimages_list[8],
  image10: trimages_list[9], image11: trimages_list[10], image12: trimages_list[11]});
});

module.exports = router;
