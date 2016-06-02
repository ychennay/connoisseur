#!/bin/bash

# Mock User 1: meatlovermichael

# create user
curl -X POST -H "Content-Type: application/json" -d '{
    "username": "meatlovermichael",
    "password": "asdf",
    "location": [{
        "latitude": 34,
        "longitude": -118
    }]
}' "http://localhost:3000/addUser"

# # get authorization token
# token=$(curl -X POST -H "Content-Type: application/json" -d '{
#     "username": "meatlovermichael",
#     "password": "asdf"
# }' "http://localhost:3000/auth" |
# 	grep -o '"token":".*' |
# 	sed 's/"token":"/''/g' | 
# 	sed 's/"}/''/g')

# # search for steakhouses
# curl -i -H "Authorization: $token" "http://localhost:3000/search?food_types=\{"'"'"steakhouse"'"'":true\}"

# # rate the steakhouses after trying them
# curl -X POST -H "Authorization: $token" -H "Content-Type: application/json" -d '{
#     "restaurantId": "2",
#     "rating": "love"
# }' "http://localhost:3000/addRating"

# curl -X POST -H "Authorization: $token" -H "Content-Type: application/json" -d '{
#     "restaurantId": "16",
#     "rating": "like"
# }' "http://localhost:3000/addRating"

# curl -X POST -H "Authorization: $token" -H "Content-Type: application/json" -d '{
#     "restaurantId": "24",
#     "rating": "love"
# }' "http://localhost:3000/addRating"

# # search for Mexican restaurants
# curl -i -H "Authorization: $token" "http://localhost:3000/search?food_types=\{"'"'"mexican"'"'":true\}"

# curl -X POST -H "Authorization: $token" -H "Content-Type: application/json" -d '{
#     "restaurantId": "17",
#     "rating": "dislike"
# }' "http://localhost:3000/addRating"

# curl -X POST -H "Authorization: $token" -H "Content-Type: application/json" -d '{
#     "restaurantId": "38",
#     "rating": "like"
# }' "http://localhost:3000/addRating"

# curl -X POST -H "Authorization: $token" -H "Content-Type: application/json" -d '{
#     "restaurantId": "8",
#     "rating": "like"
# }' "http://localhost:3000/addRating"

# # search for restaurants with happy hour
# curl -i -H "Authorization: $token" "http://localhost:3000/search?tags=\{"'"'"happy_hour"'"'":true\}"

# curl -X POST -H "Authorization: $token" -H "Content-Type: application/json" -d '{
#     "restaurantId": "51",
#     "rating": "love"
# }' "http://localhost:3000/addRating"

# curl -X POST -H "Authorization: $token" -H "Content-Type: application/json" -d '{
#     "restaurantId": "52",
#     "rating": "love"
# }' "http://localhost:3000/addRating"






# # Mock User 2: trendytrevor

# # create user
# curl -X POST -H "Content-Type: application/json" -d '{
#     "username": "trendytrevor",
#     "password": "1234",
#     "location": [{
#         "latitude": 34,
#         "longitude": -118
#     }]
# }' "http://localhost:3000/addUser"

# # get authorization token
# token=$(curl -X POST -H "Content-Type: application/json" -d '{
#     "username": "trendytrevor",
#     "password": "1234"
# }' "http://localhost:3000/auth" |
# 	grep -o '"token":".*' |
# 	sed 's/"token":"/''/g' | 
# 	sed 's/"}/''/g')

# # search for trendy restaurants
# curl -i -H "Authorization: $token" "http://localhost:3000/search?tags=\{"'"'"trendy"'"'":true\}"

# curl -X POST -H "Authorization: $token" -H "Content-Type: application/json" -d '{
#     "restaurantId": "0",
#     "rating": "love"
# }' "http://localhost:3000/addRating"

# curl -X POST -H "Authorization: $token" -H "Content-Type: application/json" -d '{
#     "restaurantId": "7",
#     "rating": "love"
# }' "http://localhost:3000/addRating"

# curl -X POST -H "Authorization: $token" -H "Content-Type: application/json" -d '{
#     "restaurantId": "9",
#     "rating": "love"
# }' "http://localhost:3000/addRating"

# curl -X POST -H "Authorization: $token" -H "Content-Type: application/json" -d '{
#     "restaurantId": "11",
#     "rating": "love"
# }' "http://localhost:3000/addRating"

# curl -X POST -H "Authorization: $token" -H "Content-Type: application/json" -d '{
#     "restaurantId": "38",
#     "rating": "like"
# }' "http://localhost:3000/addRating"





# # Mock User 3: sashimisam

# # create user
# curl -X POST -H "Content-Type: application/json" -d '{
#     "username": "sashimisam",
#     "password": "7890",
#     "location": [{
#         "latitude": 34,
#         "longitude": -118
#     }]
# }' "http://localhost:3000/addUser"

# # get authorization token
# token=$(curl -X POST -H "Content-Type: application/json" -d '{
#     "username": "sashimisam",
#     "password": "7890"
# }' "http://localhost:3000/auth" |
# 	grep -o '"token":".*' |
# 	sed 's/"token":"/''/g' | 
# 	sed 's/"}/''/g')

# # search for sushi restaurants
# curl -i -H "Authorization: $token" "http://localhost:3000/search?food_types=\{"'"'"sushi"'"'":true\}"

# curl -X POST -H "Authorization: $token" -H "Content-Type: application/json" -d '{
#     "restaurantId": "45",
#     "rating": "love"
# }' "http://localhost:3000/addRating"

# curl -X POST -H "Authorization: $token" -H "Content-Type: application/json" -d '{
#     "restaurantId": "46",
#     "rating": "like"
# }' "http://localhost:3000/addRating"

# curl -X POST -H "Authorization: $token" -H "Content-Type: application/json" -d '{
#     "restaurantId": "56",
#     "rating": "love"
# }' "http://localhost:3000/addRating"

# # search for Japanese restaurants
# curl -i -H "Authorization: $token" "http://localhost:3000/search?food_types=\{"'"'"japanese"'"'":true\}"

# curl -X POST -H "Authorization: $token" -H "Content-Type: application/json" -d '{
#     "restaurantId": "3",
#     "rating": "like"
# }' "http://localhost:3000/addRating"

# curl -X POST -H "Authorization: $token" -H "Content-Type: application/json" -d '{
#     "restaurantId": "28",
#     "rating": "dislike"
# }' "http://localhost:3000/addRating"

# # search for romantic restaurants
# curl -i -H "Authorization: $token" "http://localhost:3000/search?tags=\{"'"'"romantic"'"'":true\}"

# curl -X POST -H "Authorization: $token" -H "Content-Type: application/json" -d '{
#     "restaurantId": "10",
#     "rating": "dislike"
# }' "http://localhost:3000/addRating"






# # Mock User 4: fatheroffive

# # create user
# curl -X POST -H "Content-Type: application/json" -d '{
#     "username": "fatheroffive",
#     "password": "ilovemywife",
#     "location": [{
#         "latitude": 34,
#         "longitude": -118
#     }]
# }' "http://localhost:3000/addUser"

# # get authorization token
# token=$(curl -X POST -H "Content-Type: application/json" -d '{
#     "username": "fatheroffive",
#     "password": "ilovemywife"
# }' "http://localhost:3000/auth" |
# 	grep -o '"token":".*' |
# 	sed 's/"token":"/''/g' | 
# 	sed 's/"}/''/g')

# # search for family-friendly restaurants
# curl -i -H "Authorization: $token" "http://localhost:3000/search?tags=\{"'"'"family_friendly"'"'":true\}"

# curl -X POST -H "Authorization: $token" -H "Content-Type: application/json" -d '{
#     "restaurantId": "37",
#     "rating": "love"
# }' "http://localhost:3000/addRating"

# curl -X POST -H "Authorization: $token" -H "Content-Type: application/json" -d '{
#     "restaurantId": "39",
#     "rating": "dislike"
# }' "http://localhost:3000/addRating"

# curl -X POST -H "Authorization: $token" -H "Content-Type: application/json" -d '{
#     "restaurantId": "44",
#     "rating": "love"
# }' "http://localhost:3000/addRating"

# curl -X POST -H "Authorization: $token" -H "Content-Type: application/json" -d '{
#     "restaurantId": "53",
#     "rating": "love"
# }' "http://localhost:3000/addRating"

# # search for restaurants that are good for groups
# curl -i -H "Authorization: $token" "http://localhost:3000/search?tags=\{"'"'"food_for_groups"'"'":true\}"

# curl -X POST -H "Authorization: $token" -H "Content-Type: application/json" -d '{
#     "restaurantId": "3",
#     "rating": "love"
# }' "http://localhost:3000/addRating"

# curl -X POST -H "Authorization: $token" -H "Content-Type: application/json" -d '{
#     "restaurantId": "8",
#     "rating": "love"
# }' "http://localhost:3000/addRating"

# curl -X POST -H "Authorization: $token" -H "Content-Type: application/json" -d '{
#     "restaurantId": "16",
#     "rating": "like"
# }' "http://localhost:3000/addRating"

# curl -X POST -H "Authorization: $token" -H "Content-Type: application/json" -d '{
#     "restaurantId": "17",
#     "rating": "dislike"
# }' "http://localhost:3000/addRating"

# curl -X POST -H "Authorization: $token" -H "Content-Type: application/json" -d '{
#     "restaurantId": "18",
#     "rating": "like"
# }' "http://localhost:3000/addRating"


