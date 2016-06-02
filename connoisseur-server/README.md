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

# How to run (via Local Machine):
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

# How to run (via AWS):
```
$ ssh -i mongo.pem mms-user@con-db-0.connoisseur.3043.mongodbdns.com
$ cd connoisseur/connoisseur-server
$ sudo mongod --dbpath data/
In another tab...
$ ssh -i connoisseurKeyPair.pem ec2-user@ec2-54-187-107-93.us-west-2.compute.amazonaws.com
$ cd connoisseur/connoisseur-server
$ npm start

Check out routes by 
$ chrome ec2-54-187-107-93.us-west-2.compute.amazonaws.com:3000/<routename>
```

# Update application on servers:
```
$ ssh -i mongo.pem mms-user@con-db-0.connoisseur.3043.mongodbdns.com
$ cd connoisseur
$ git pull
$ ssh -i connoisseurKeyPair.pem ec2-user@ec2-54-187-107-93.us-west-2.compute.amazonaws.com
$ cd connoisseur
$ git pull
```

# Shut down server/database
```
$ ssh -i mongo.pem mms-user@con-db-0.connoisseur.3043.mongodbdns.com
$ screen -R (this reconnects to the existing terminal session where the db is running)
$ (Make your changes)

$ ssh -i connoisseurKeyPair.pem ec2-user@ec2-54-187-107-93.us-west-2.compute.amazonaws.com
$ screen -R (this reconnects to the existing terminal session where the app is running)
$ (Make your changes)
```


# Start server/database
```
$ ssh -i mongo.pem mms-user@con-db-0.connoisseur.3043.mongodbdns.com
$ screen (creates a terminal session that won't close when ssh closes)
$ mongod --dbpath data
rs
$ ssh -i connoisseurKeyPair.pem ec2-user@ec2-54-187-107-93.us-west-2.compute.amazonaws.com
$ screen (creates a terminal session that won't close when ssh closes)
$ nodemon start
```