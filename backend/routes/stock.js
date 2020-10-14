const express = require("express");
const jwt = require("jsonwebtoken");
const Stock = require("../models/stock");
const router = express.Router();

router.get("", (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const stockQuery = Stock.find(
    { "Date"}
  );
  let fetchedStocks;
  if (pageSize && currentPage) {
    stockQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  stockQuery
    .then(documents => {
      fetchedStocks = documents;
      return Stock.count();
    })
    .then(count => {
      res.status(200).json({
        message: "Stocks fetched successfully!",
        stocks: fetchedStocks,
        maxStocks: count
      });
    });
});


module.exports = router;
