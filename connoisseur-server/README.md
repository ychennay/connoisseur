# Route Descriptions:

```
/addRestaurant: POST route to add new restaurant to db
/addUser: POST route to add new user to db
/addRating: POST route to add new rating for restaurant to db
/users, /ratings, /restaurants: View data for corresponding db model
```


# How to run:


=======
```

From connoisseur-server/ directory
$ npm install
$ mkdir data
$ mongod --dbpath /data
$ npm start
$ chrome localhost:3000/<routename>
```
