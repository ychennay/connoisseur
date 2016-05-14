# Route Descriptions:

```
/addRestaurant: POST route to add new restaurant to db
/addUser: POST route to add new user to db
/addRating: POST route to add new rating for restaurant to db
/users, /ratings, /restaurants: View data for corresponding db model
```

# Set-up:
```
$ npm install
```

# How to run:
=======
```
From /connoisseur-server
$ mkdir data
$ sudo mongod --dbpath data/
$ npm start

Check out routes by 
$ chrome localhost:3000/<routename>
```
