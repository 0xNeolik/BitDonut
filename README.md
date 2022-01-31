# BitDonut
# App Demo 

https://user-images.githubusercontent.com/85538875/151788787-0a8914cb-7e6a-4098-b98e-9f3b42fe2360.mp4

# Overview

BitDonut is a website based on the use of the API provided by CoinGecko.

It is therefore a portal for real-time visualisation of the fluctuation of the cryptocurrency market, with its corresponding visual display in charts and the creation of a portfolio. Among the utilities that BitDonut deploys are:
-Real-time visualisation of the price, market volume and market capitalisation of each cryptocurrency.
-Display of information in real time, in addition to 1 day, 7 days, 30 days and 90 days data.
-Cryptocurrency converter between them and US Dollar.
-Creation of a portfolio.
-Calculation of the total value of your portfolio.
-Calculation of the variation in the price of your portfolio.
-Percentage of each cryptocurrency in your portfolio.

# Tecnologías
<ul >
<li>React</li> 
<li>Axios</li>  
<li>Chart 2 Js</li> 
<li>HTML</li>
<li>CSS</li>  
</ul>

# Server Install
```
npm install
```

# Server Usage
```
npm run dev
```

Access the client path of the project and type the following commands.

# Cient Install
```
npm install
```

# Client Usage
```
npm run start
```


# Backend Endpoints
 
|	Method	|	Path	|	Description	|
|	-	|	-	|	-	|	
|	GET	|	https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${databaseTimeSelected}	|Access the API to get the information to create the chart of the selected cryptocurrency.|
|	GET	|	https://api.coingecko.com/api/v3/coins/${id}/ohlc?vs_currency=usd&days=${databaseTimeSelected}	|Access to the API to get the information of the closing and opening price of the selected cryptocurrency market.|
|	GET	|	https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false	|Access the API to get all the information about cryptocurrencies.|

# Front Endpoints 

|	Path	|	Description	|
|	-	|	-	|	
|	/	|	Home page	|
|	/coins	|	All cryptocurrencies	|
|	:id	|	Details of the selected cryptocurrency	|
|	/convert	|	Cryptocurrency converter	|
|	/portfolio	|	Display the user's portfolio.	|
