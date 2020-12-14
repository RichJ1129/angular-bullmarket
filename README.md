# Bull Market Investment Simulator

# Final Report

```
CS 467 Online Capstone Project
December 4, 2020
```
**Austin Henry | Richard Joseph | Trevor Mathwick**


## I. Introduction

```
11 weeks and hundreds of combined hours and our project is complete! Aptly named
“Bull Market”, this project is an investment simulation where a user invests in virtual
assets which change in value over time. Proceeds from the investments are used to take
care of a virtual bull or bear pet. The goal is to keep their happiness from decreasing to
0.
```
```
Available investments include Bonds, Commodities, Currency, Real Estate and Stocks
across 100+ countries, 70+ stocks, and 50+ currencies. The game is designed to be a
reasonable and dynamic approximation of the major investment opportunities around the
world.
```
## II. Usage

```
Bull Market is hosted on AWS at the following URL:
```
```
http://angularbullmarket-env.eba-ngp4xesd.us-east-2.elasticbeanstalk.com​.
```
```
The link will bring you to a login page shown below. If you don't have an account you can
sign up by clicking the sign up link. After logging in, a user is brought to the home page
where they can open different pages and look for assets to buy. Over time, the prices of
these virtual assets change in a way that matches or approximates their value changes
in the real world. For example, stock prices update at the end of each trading day, and
national interest rates update each quarter. A user will have the option to check their
portfolio, feed their animal, buy additional assets, or sell assets.
```

**Home Page:** ​ This is the first page a user sees after login. The home page has a widget
to search for prices of any asset, a map to link to country-specific investment
information, and a pet-image which links to the profile page. In addition, there are links to
asset-specific pages for Bonds, Commodities, Currency, Real Estate, and Stocks. To
return to the home page from another page, click “MARKETPLACE”.

The user’s current balance is displayed in the upper right-hand corner along with links to
the Investment Portfolio, Profile Page, About Page, and Logout. The dynamic ticker
scrolling across the top displays price updates for Stocks, Currency, and Commodities
which update daily. Clicking on an asset symbol in the ticker opens one of the individual
asset pages detailed below.


**Stock Page:** ​Upon navigating to the stock page the user is greeted with a table in which
can be sorted by company name or ticker symbol. There is also a universal buy widget
on the right hand side where a user can search and buy assets directly. The pagination
for the table is done client-side as it allows for pages to be changed more quickly. The
downside to this approach is that the initial load times are slower. Since the collection is
so short with only 82 documents the longer initial load time is only a minor problem.

Link to page:
[http://angularbullmarket-env.eba-ngp4xesd.us-east-2.elasticbeanstalk.com/stock-table​.](http://angularbullmarket-env.eba-ngp4xesd.us-east-2.elasticbeanstalk.com/stock-table​)


**Individual Stock Pages:** ​ If a row on the stock-table is clicked on, or if a user clicks on a
scrolling stock ticker symbol, they are brought to an individual stock page. Here users
can get a more in depth look at the health of the company. This information includes a
graph which shows the closing price for the last 10 business days. The page also shows
the company’s headquarters, PE ratio, and market cap. There is an about section at the
bottom which gives additional information about the company. The individual stock page
provides a widget to buy that company’s stock.

Link to Individual Stock Page:
[http://angularbullmarket-env.eba-ngp4xesd.us-east-2.elasticbeanstalk.com/stock-page/AMZN](http://angularbullmarket-env.eba-ngp4xesd.us-east-2.elasticbeanstalk.com/stock-page/AMZN)


**Real Estate Page:** ​After navigating to the real estate page the user is greeted with a
table similar to the one found on the stock page. Real estate assets are sold as one-unit
rural or urban apartments. Each apartment has an associated rent value which is paid
out while the user owns the asset.

There is a universal buy widget on the right hand side in which a user can search for any
asset and buy it directly. Pagination is done client-side.

Link to Real Estate page:
[http://angularbullmarket-env.eba-ngp4xesd.us-east-2.elasticbeanstalk.com/realestate​](http://angularbullmarket-env.eba-ngp4xesd.us-east-2.elasticbeanstalk.com/realestate​)**.**


**Country Information Page:** ​If a row on the Real Estate Page is clicked, or if a country
on the home page map is clicked, the user is brought to a country-specific page. The
page shows a vector map of the country as well as country statistics. There is also an
about section.

Link to Country Page:
[http://angularbullmarket-env.eba-ngp4xesd.us-east-2.elasticbeanstalk.com/country/Brazil](http://angularbullmarket-env.eba-ngp4xesd.us-east-2.elasticbeanstalk.com/country/Brazil)



**Currency Page:** ​ Similar page to all other pages. There is also a universal buy widget on
the right hand side in which a user can search for any asset and buy it directly.
Pagination is done client-side. Link to the currency Page:
[http://angularbullmarket-env.eba-ngp4xesd.us-east-2.elasticbeanstalk.com/currency-table](http://angularbullmarket-env.eba-ngp4xesd.us-east-2.elasticbeanstalk.com/currency-table)


**Individual Currency Page:** ​If a row on the currency table is clicked on you will be
brought to the individual currencies page. Here you can get a more in depth look at the
USD vs that currency. This information includes a graph in which shows the closing rate
for the last 10 business days. The page also provides a widget to buy that currency. Link
to one of the currency pages:
[http://angularbullmarket-env.eba-ngp4xesd.us-east-2.elasticbeanstalk.com/currency-page/USDEUR](http://angularbullmarket-env.eba-ngp4xesd.us-east-2.elasticbeanstalk.com/currency-page/USDEUR)


**Commodities Page:** ​ Similar page to all other pages. There is also a universal buy
widget on the right hand side in which a user can search for any asset and buy it directly.
Link to the commodity page:
[http://angularbullmarket-env.eba-ngp4xesd.us-east-2.elasticbeanstalk.com/commodity-table](http://angularbullmarket-env.eba-ngp4xesd.us-east-2.elasticbeanstalk.com/commodity-table)


**Individual Commodity Page:** ​ If a row on the commodity table is clicked on you will be
brought to the individual commodity’s page. Here you can get a more in depth look at the
commodity This information includes a graph in which shows the closing price for the last
10 business days. The page also provides a widget to buy that commodity. Link to one
of the commodity pages:
[http://angularbullmarket-env.eba-ngp4xesd.us-east-2.elasticbeanstalk.com/commodities-page/USO](http://angularbullmarket-env.eba-ngp4xesd.us-east-2.elasticbeanstalk.com/commodities-page/USO)

**Bonds Page:** ​ Similar page to all other pages. There is also a universal buy widget on
the right hand side in which a user can search for any asset and buy it directly. Link to
the bond page:
[http://angularbullmarket-env.eba-ngp4xesd.us-east-2.elasticbeanstalk.com/bond-table](http://angularbullmarket-env.eba-ngp4xesd.us-east-2.elasticbeanstalk.com/bond-table)

**Investment Page:** ​ Table showing a user’s investments. All the assets bought by the
user is shown on the table as well as its value. Link to the investment page:
[http://angularbullmarket-env.eba-ngp4xesd.us-east-2.elasticbeanstalk.com/portfolio](http://angularbullmarket-env.eba-ngp4xesd.us-east-2.elasticbeanstalk.com/portfolio)


**Profile Page:** ​ Page allows you to change your animal to either a bull or bear, as well as
rename the animal. Here your animal’s happiness gauge is shown and this gauge can
be replenished with the buying of food.

Link to Profile Page:
[http://angularbullmarket-env.eba-ngp4xesd.us-east-2.elasticbeanstalk.com/profile](http://angularbullmarket-env.eba-ngp4xesd.us-east-2.elasticbeanstalk.com/profile)


## III. Software

```
This project was developed using the "MEAN" stack.
```
```
● M: MongoDB
● E: Express
● A: Angular
● N: NodeJS
```
```
MongoDB: ​ Open source database management program. NoSQL database as opposed
to a relational database. A document is the basic unit in MongoDB composed of
field-value pairs (binary json). Mongoose was used on top of MongoDB to model the
data. BullMarket has several collections. The collections include bonds, commodities,
companies, countries, currencies, investments, stocks, and users.
```
```
Express: ​ Express is a framework for Node. In the “MEAN” stack, Express handles all
the interaction between the front-end and the database.
```
```
Angular: ​Angular is a TypeScript based framework developed by Google by the same
team that developed AngularJS. The front-end development, routing, and data modeling
is handled by Angular using the Angular standard structure.
```
```
Node.js: ​Open Source JavaScript framework which allows developers to build web
applications on top of it.
```
## IV. Additional Tools, APIs, and Libraries

```
MarketStack API ​: Stock and Commodity calls were made using the MarketStack API.
We were allocated only 1000 calls per month so we restricted our calls to once a day per
stock and commodity. The data received from these calls were stored in our database.
Storing this data in the database allows us to have historical data so we can keep a
catalog of previous prices of the stock or commodity.
```
```
FreeForexAPI: ​ Currency calls were made using FreeForexAPI. We restricted our calls
to once a day to align with stock and commodity calls. The data received from these
calls were stored in our database. Storing this data in the database allows us to have
historical data so we can keep a catalog of previous rates of the currency vs the USD.
```
```
DevExtreme: ​This library allowed us to use the vector map throughout our project. The
documentation provided by this library was great and allowed us to make customizations
to our map that more aligned with our minimalist design choice.
```
```
WikiJs: ​Allowed us to obtain summaries from wikipedia to store in our database and
constantly update. These summaries pertained to the country and stock pages.
```

```
GitHub for Version Control: ​Throughout the 10 weeks our group used GitHub
extensively for creating branches and committing to the master branch. GitHub
Workflows allowed us to deploy automatically based on commits to the master branch.
This feature of automatic deployment saved us countless hours of time as well as
allowing for consistent deployments.
```

## V. Teammate Contributions

### Richard Joseph:

```
● Initial setup of AWS for hosting the project live.
```
```
● Initial setup of Github workflow for automatically deploying the project to AWS.
```
```
● Signup and Login Authentication pages and error handling including ensuring
unique user properties.
```
```
● Imported the Cron package which is used to schedule all jobs performed by the
site.
```
```
● Stock pages including individual stock views, stock historical tracking, setting up 
API calls for stocks, and all related services to the page.
```
```
● Currency table, API calls and related services to the page.
```
```
● Setting up the country map and functions related to the map including formatting
of the map.
```
```
● Individual tracking for commodities.
```
```
● Created the about page.
```
```
● Final project report.
```

### Trevor Mathwick:

```
● Initial setup of the webpage, including the general structure that is currently being
used.
```
```
● User Investing page including the portfolio and balance tracking for each user.
```
● Buying and selling functionality for all assets across the project.
```
● Real estate table, API calls and related services.
```
● Individual pages for the real estate table that utilize the map interface.
```
● Management of all user investments and portfolio including error handling,
restrictions, and exporting logic to other portions of the site.
```
```
● Setting up user balance to be used across the site.
```
```
● Initial project proposal and supporting documentation.
```

### Austin Henry:

```
● Initial setup of MongoDB
```
```
● Setting up the commodity table, API calls and related services.
```
```
● Setting up the bonds table and related services.
```
```
● Creating the user profile page and related services.
```
```
● Functionality to change the animal and feed the animal including automatically
updating the animal’s levels of happiness.
```
```
● Art for the feed animal page in addition to formatting art used for the bull and bear.
```
```
● Project poster.
```

### All Members participated in the following:

```
● Code reviewing and debugging.
```
```
● Creating schemas to be used for the DB.
```
```
● Participating in weekly meetings to discuss the project.
```

## VI. Conclusion

This project was a challenging and well-balanced assignment which produced an interesting
simulation game. We gained valuable experience with the Angular framework. For the most part
the project followed our initial plan and I think we exceeded our expectations. The project was
complicated both in terms of the front end and core development as well as in the back end
database and data structures. Development of this project will continue after the term.


