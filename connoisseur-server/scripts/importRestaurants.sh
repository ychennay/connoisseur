#!/bin/bash

listToBoolMap () {
	map=''
	for item in $1
	do
		item=$(echo "$item" | tr '[:upper:]' '[:lower:]')
		map=$map'"'"$item"'":true,'
	done
	map='[{'${map%?}'}]'
	echo $map
}

# image URLs for the 57 restaurants
im[0]='https://drive.google.com/uc?export=view&id=0B7Q--fIbe5tbVE5Cd0k0M0dzWms'
im[1]='https://drive.google.com/uc?export=view&id=0B7Q--fIbe5tbTkJzVVBoSGdkazQ'
im[2]='https://drive.google.com/uc?export=view&id=0B7Q--fIbe5tbTVR0blRxTlRxTDA'
im[3]='https://drive.google.com/uc?export=view&id=0B7Q--fIbe5tbSFZoYnZLdlRaVzQ'
im[4]='https://drive.google.com/uc?export=view&id=0B7Q--fIbe5tbUEVQV21JaWxjMjg'
im[5]='https://drive.google.com/uc?export=view&id=0B7Q--fIbe5tbeVdnVUdwSHZqYWM'
im[6]='https://drive.google.com/uc?export=view&id=0B7Q--fIbe5tbTXB2NEZyUlJnaW8'
im[7]='https://drive.google.com/uc?export=view&id=0B7Q--fIbe5tbaVdnbzFiSG9tWFk'
im[8]='https://drive.google.com/uc?export=view&id=0B7Q--fIbe5tbb0hRWkNDU1lHc0E'
im[9]='https://drive.google.com/uc?export=view&id=0B7Q--fIbe5tbbDBFVXVmblI3c00'
im[10]='https://drive.google.com/uc?export=view&id=0B7Q--fIbe5tbRXJBOG9WeEhGQzA'
im[11]='https://drive.google.com/uc?export=view&id=0B7Q--fIbe5tbSTJnX0llUzhUZzA'
im[12]='https://drive.google.com/uc?export=view&id=0B7Q--fIbe5tbX18xTmpOc1lobXM'
im[13]='https://drive.google.com/uc?export=view&id=0B7Q--fIbe5tbWFA3T3pjaVNNVUU'
im[14]='https://drive.google.com/uc?export=view&id=0B7Q--fIbe5tbZTFnMzJfUjNFOGs'
im[15]='https://drive.google.com/uc?export=view&id=0B7Q--fIbe5tbMHRvaDJCTGV4c28'
im[16]='https://drive.google.com/uc?export=view&id=0B7Q--fIbe5tbVUlwTTk3Sm4zeEU'
im[17]='https://drive.google.com/uc?export=view&id=0B7Q--fIbe5tbTGFlVG4yZENVV0k'
im[18]='https://drive.google.com/uc?export=view&id=0B7Q--fIbe5tbT21CNExaYzYyZzg'
im[19]='https://drive.google.com/uc?export=view&id=0B7Q--fIbe5tbQnp3QUpoWDdQTzQ'
im[20]='https://drive.google.com/uc?export=view&id=0B7Q--fIbe5tbbDdvenRKVUdoTnc'
im[21]='https://drive.google.com/uc?export=view&id=0B7Q--fIbe5tbLWdQZl9MX0RXdVE'
im[22]='https://drive.google.com/uc?export=view&id=0B7Q--fIbe5tbY2t5bUc5MHVZWGM'
im[23]='https://drive.google.com/uc?export=view&id=0B7Q--fIbe5tbUzVZUnNvdEtDTjg'
im[24]='https://drive.google.com/uc?export=view&id=0B7Q--fIbe5tbUUE1Vi14eDZybnc'
im[25]='https://drive.google.com/uc?export=view&id=0B7Q--fIbe5tbd1VUYy1Sa3NIS1E'
im[26]='https://drive.google.com/uc?export=view&id=0B7Q--fIbe5tbMm1Jd2JwNFVKNjQ'
im[27]='https://drive.google.com/uc?export=view&id=0B7Q--fIbe5tbcndqUkVDajh1d0k'
im[28]='https://drive.google.com/uc?export=view&id=0B7Q--fIbe5tbWTIxcENqMVRtdDQ'
im[29]='https://drive.google.com/uc?export=view&id=0B7Q--fIbe5tbR0RscF9PYUtGaGM'
im[30]='https://drive.google.com/uc?export=view&id=0B7Q--fIbe5tbWVVEM0dtQ1M3MU0'
im[31]='https://drive.google.com/uc?export=view&id=0B7Q--fIbe5tbYXRiQ2Vscjhsekk'
im[32]='https://drive.google.com/uc?export=view&id=0B7Q--fIbe5tbZ3otb3Z2NHpzRE0'
im[33]='https://drive.google.com/uc?export=view&id=0B7Q--fIbe5tbbmpKbU1DUHhZN2c'
im[34]='https://drive.google.com/uc?export=view&id=0B7Q--fIbe5tbYUNKOXNHUWFudFE'
im[35]='https://drive.google.com/uc?export=view&id=0B7Q--fIbe5tbeUgzMnlGQ3NsODg'
im[36]='https://drive.google.com/uc?export=view&id=0B7Q--fIbe5tbMDZJbXNhQ2pTWHM'
im[37]='https://drive.google.com/uc?export=view&id=0B7Q--fIbe5tbZ0RDSlZmYXlGVUE'
im[38]='https://drive.google.com/uc?export=view&id=0B7Q--fIbe5tbT2x4UkY0d1lXdEU'
im[39]='https://drive.google.com/uc?export=view&id=0B7Q--fIbe5tbV1MtYUdKV2V5VUU'
im[40]='https://drive.google.com/uc?export=view&id=0B7Q--fIbe5tbVXo0ZmZNMHNMZ00'
im[41]='https://drive.google.com/uc?export=view&id=0B7Q--fIbe5tbWVE1UTJXSjJ5ZDQ'
im[42]='https://drive.google.com/uc?export=view&id=0B7Q--fIbe5tbYV9LNFdUc1NmSkE'
im[43]='https://drive.google.com/uc?export=view&id=0B7Q--fIbe5tbYnU4RW80UkNvUDA'
im[44]='https://drive.google.com/uc?export=view&id=0B7Q--fIbe5tbazZhRG1yX0dBUTg'
im[45]='https://drive.google.com/uc?export=view&id=0B7Q--fIbe5tbeEZyZVowWGl3TUU'
im[46]='https://drive.google.com/uc?export=view&id=0B7Q--fIbe5tbR0lmOXRFbE5jQkk'
im[47]='https://drive.google.com/uc?export=view&id=0B7Q--fIbe5tbMXZuejJHU3JaWmM'
im[48]='https://drive.google.com/uc?export=view&id=0B7Q--fIbe5tbZHJxcXg4QTRBakE'
im[49]='https://drive.google.com/uc?export=view&id=0B7Q--fIbe5tbSXJLMFdFb0VCMHc'
im[50]='https://drive.google.com/uc?export=view&id=0B7Q--fIbe5tbVzlSbGxVV0lWZGs'
im[51]='https://drive.google.com/uc?export=view&id=0B7Q--fIbe5tbZzNCclh2ODRGNmc'
im[52]='https://drive.google.com/uc?export=view&id=0B7Q--fIbe5tbVFZNNGN6ZnZpUkk'
im[53]='https://drive.google.com/uc?export=view&id=0B7Q--fIbe5tbdVNfZW4yMWNEQzQ'
im[54]='https://drive.google.com/uc?export=view&id=0B7Q--fIbe5tbNjNnVEZHN19OeWc'
im[55]='https://drive.google.com/uc?export=view&id=0B7Q--fIbe5tbSzlOZGpaVTgxbXc'
im[56]='https://drive.google.com/uc?export=view&id=0B7Q--fIbe5tbWW96em45dWVidmM'

if [ $# -gt 0 ]
then
	echo "Importing restaurants from '$1'..."
	let idx=0

	while IFS=$"†" read name location tags price meals menu address phone_number reviews food_types notes website
	do
		restaurantIdField='"restaurantId":"'"$idx"'"'
		imgPathField='"imgPath":"'"${im[$idx]}"'"'
		nameField='"name":"'"$name"'"'
		locationField='"location":"'"$location"'"'
		tagsField='"tags":'$(listToBoolMap "$tags")
		priceField='"price":"'"$price"'"'
		mealsField='"meals":'$(listToBoolMap "$meals")
		
		# MENU IS HARDCODED FOR NOW
		menuField='"menu": [{
			"meal": "Lunch",
			"categories": [{
				"category_name": "Small Plates",
				"dishes": [{
					"dish_name": "Marinated Olives",
					"description": "orange, thyme",
					"Price": 6
				},{
					"dish_name": "Nantes Carrot Soup",
					"description": "ginger, lemongrass, yogurt, mint",
					"Price": 11
				},{
					"dish_name": "Smoked Salmon Dip",
					"description": "celery, scallions, aioli",
					"Price": 11
				},{
					"dish_name": "Hamachi Crudo",
					"description": "kumquat, radish, yuzu kosho, celtuse, wood sorrel",
					"Price": 16
				},{
					"dish_name": "Root Vegertables",
					"description": "weiser farms carrots, pink turnips, celery root, radish",
					"Price": 8
				},{
					"dish_name": "Charcuterie Board",
					"description": "selection of house made items",
					"Price": 22
				}]
			},{
				"category_name": "Sandwiches",
				"dishes": [{
					"dish_name": "Pulled Chicken Sandwich",
					"description": "house bbq sauce, slaw, pickle",
					"Price": 14
				},{
					"dish_name": "Grilled Cheese",
					"description": "raclette, gruyere, cheddar, bechamel",
					"Price": 12
				},{
					"dish_name": "Steak Sandwich",
					"description": "shallot marmalade, horseradish, cream, arugula, steak sauce",
					"Price": 18
				},{
					"dish_name": "Grass Fed Cheeseburger",
					"description": "lettuce, tomato, onion, marmalade, 1000 island, fries ",
					"Price": 16
				},{
					"dish_name": "Albacore Burger",
					"description": "sriracha aoili, scallion, ginger, soy, avocado, furikake, sesame bun, fries",
					"Price": 18
				}]
			},{
				"category_name": "Salads",
				"dishes": [{
					"dish_name": "Golden Quinoa Bowl",
					"description": "roasted fennel, tangerine, almonds",
					"Price": 11
				},{
					"dish_name": "Coleman Farms Green Salad",
					"description": "beets, apple radish, pistachio, tarragon",
					"Price": 12
				},{
					"dish_name": "Kale Salad",
					"description": "red cabbage, carrots, radish, blood orange",
					"Price": 14
				},{
					"dish_name": "Waldorf Salad",
					"description": "potatoes, grapes, walnuts, mixed greens, herbed buttlermilk",
					"Price": 12
				},{
					"dish_name": "Nicoise",
					"description": "albacore, egg, olives, beans, tomatoes",
					"Price": 16
				}]
			},{
				"category_name": "Mains",
				"dishes": [{
					"dish_name": "Housemade Tagliatelle",
					"description": "lamb bolognese, parmesan",
					"Price": 22
				},{
					"dish_name": "Octopus",
					"description": "salted potatoes, eggplant, aji verde",
					"Price": 18
				},{
					"dish_name": "Omelette",
					"description": "cheddar, toast, greens",
					"Price": 14
				}]
			},{
				"category_name": "Sides",
				"dishes": [{
					"dish_name": "Brussel Sprouts",
					"description": "oro blanco, pear mostarda",
					"Price": 6
				},{
					"dish_name": "Herbed French Fries",
					"description": "",
					"Price": 6
				}]
			}]
		},{
			"meal": "Dinner",
			"categories": [{
				"category_name": "For the Table",
				"dishes": [{
					"dish_name": "Marinated Olives",
					"description": "orange, thyme",
					"Price": 7
				},{
					"dish_name": "Eggplant Caponata",
					"description": "peppers, onions, olives, capers",
					"Price": 7
				},{
					"dish_name": "Chicken Fritters",
					"description": "adoba, black pepper aoili, serrano, pickled green garlic",
					"Price": 14
				},{
					"dish_name": "Smoked Salmon Rillettes",
					"description": "celery, scallions, aioli",
					"Price": 11
				},{
					"dish_name": "Charcuterie Board",
					"description": "selection of house made items",
					"Price": 22
				}]
			},{
				"category_name": "Small Plates",
				"dishes": [{
					"dish_name": "Nantes Carrot Soup",
					"description": "ginger, lemongrass, yogurt, mint",
					"Price": 11
				},{
					"dish_name": "Golden Quinoa Bowl",
					"description": "roasted fennel, tangerine, almonds",
					"Price": 13
				},{
					"dish_name": "Coleman Farms Green Salad",
					"description": "beets, apple radish, pistachio, tarragon",
					"Price": 11
				},{
					"dish_name": "Kale Salad",
					"description": "red cabbage, carrots, radish, blood orange",
					"Price": 14
				},{
					"dish_name": "English Pea Risotto",
					"description": "carrots, bacon, meyer lemon, pea tendrils",
					"Price": 14
				},{
					"dish_name": "Hamachi Crudo",
					"description": "kumquat, radish, celtuse, sorrel",
					"Price": 16
				},{
					"dish_name": "Octopus",
					"description": "salted potatoes, eggplant, aji verde",
					"Price": 18
				},{
					"dish_name": "Root Vegertables",
					"description": "weiser farms carrots, pink turnips, celery root, radish",
					"Price": 8
				}]
			},{
				"category_name": "Main",
				"dishes": [{
					"dish_name": "Housemade Fettuccine",
					"description": "lamb bolognese, parmesan",
					"Price": 22
				},{
					"dish_name": "Grilled Branzino",
					"description": "chermoula, braised escarole, lemon",
					"Price": 28
				},{
					"dish_name": "Wood'"'"'s Fishery Shrimp",
					"description": "romesco, asparagus, aioli, parsley",
					"Price": 26
				},{
					"dish_name": "Fire-roasted Chicken",
					"description": "hummus, cucumber raita, grilled bread",
					"Price": 24
				},{
					"dish_name": "Peads & Barnetts Pork Chop",
					"description": "flageolets ragout, baby carrots, mustardd",
					"Price": 28
				},{
					"dish_name": "Steak Frites",
					"description": "8 oz. new york prime, au poivre",
					"Price": 36
				},{
					"dish_name": "Grass Fed Cheeseburger",
					"description": "lettuce, tomato, onion, marmalade, 1000 island, fries",
					"Price": 16
				}]
			},{
				"category_name": "Sides",
				"dishes": [{
					"dish_name": "Brussel Sprouts",
					"description": "oro blanco, pear mostarda",
					"Price": 6
				},{
					"dish_name": "Herbed French Fries",
					"description": "",
					"Price": 6
				},{
					"dish_name": "Grilled Sprouted Broccoli",
					"description": "meyer lemon, basil",
					"Price": 8
				},{
					"dish_name": "Roasted Fingerling Potatoes",
					"description": "",
					"Price": 0
				}]
			},{
				"category_name": "Desserts",
				"dishes": [{
					"dish_name": "Chocolate Chip Cookies and Cinnamon Milk",
					"description": "",
					"Price": 6
				},{
					"dish_name": "Lemon Posset",
					"description": "",
					"Price": 6
				},{
					"dish_name": "Chocolate Cake",
					"description": "",
					"Price": 8
				},{
					"dish_name": "Blackberry Cobbler",
					"description": "",
					"Price": 9
				}]
			}]
		}]'
		# menuField='"menu":"'"$menu"'"'

		addressField='"address":"'"$address"'"'
		phoneNumberField='"phone_number":"'"$phone_number"'"'
		reviewsField='"reviews":"'"$reviews"'"'
		foodTypesField='"food_types":'$(listToBoolMap "$food_types")
		notesField='"notes":"'"$notes"'"'
		websiteField='"website":"'"$website"'"'
		jsonRequestBody='{'"$restaurantIdField"','"$imgPathField"','"$nameField"','"$locationField"','"$tagsField"','"$priceField"','"$mealsField"','"$menuField"','"$addressField"','"$phoneNumberField"','"$reviewsField"','"$foodTypesField"','"$notesField"','"$websiteField"'}'
		echo $jsonRequestBody
		curl -X POST -H "Content-Type: application/json" -H "Cache-Control: no-cache" -d "$jsonRequestBody" "http://52.11.254.37:3000/addRestaurant"
		idx=$((idx+1))
	done <$1
else
	echo "Usage: importRestaurants.sh <Restaurants Data DSV(Dagger Separated Values) File>"
fi
