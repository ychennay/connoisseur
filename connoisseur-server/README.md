# Route Descriptions:

```
/addRestaurant: POST route to add new restaurant to db
/addUser: POST route to add new user to db
/addRating: POST route to add new rating for restaurant to db
/users, /ratings, /restaurants: View data for corresponding db model
```

# Set-up:
## General
```
$ git clone https://github.com/yingjia987/connoisseur
$ git pull
$ sudo npm install
```

##Loading data
```
From /connoisseur-server
$ mkdir data
$ sudo mongod --dbpath data/
$ npm start
$ ./scripts/importRestaurants.sh ./dsv/santamonica.dsv
```

# How to run:
```
From /connoisseur-server
$ sudo mongod --dbpath data/
$ npm start

Check out routes by 
$ chrome localhost:3000/<routename>
```

### Clearing data
```
From /connoisseur-server
$ sudo mongod --dbpath data/
In another tab...
$ mongo
> use gettingstarted
> db.restaurants.drop();
> exit
```
