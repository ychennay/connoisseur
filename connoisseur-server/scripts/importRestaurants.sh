#!/bin/bash

# takes in
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

if [ $# -gt 0 ]
then
	echo "Importing restaurants from '$1'..."
	let idx=0
	while IFS=$"†" read name location tags price meals menu address phone_number reviews food_types notes website
	do
		restaurantIdField='"restaurantId":"'"$idx"'"'
		nameField='"name":"'"$name"'"'
		locationField='"location":"'"$location"'"'
		tagsField='"tags":'$(listToBoolMap "$tags")
		priceField='"price":"'"$price"'"'
		mealsField='"meals":'$(listToBoolMap "$meals")
		menuField='"menu":"'"$menu"'"'
		addressField='"address":"'"$address"'"'
		phoneNumberField='"phone_number":"'"$phone_number"'"'
		reviewsField='"reviews":"'"$reviews"'"'
		foodTypesField='"food_types":'$(listToBoolMap "$food_types")
		notesField='"notes":"'"$notes"'"'
		websiteField='"website":"'"$website"'"'
		jsonRequestBody='{'"$restaurantIdField"','"$nameField"','"$locationField"','"$tagsField"','"$priceField"','"$mealsField"','"$menuField"','"$addressField"','"$phoneNumberField"','"$reviewsField"','"$foodTypesField"','"$notesField"','"$websiteField"'}'
		echo $jsonRequestBody
		curl -X POST -H "Content-Type: application/json" -H "Cache-Control: no-cache" -d "$jsonRequestBody" "http://localhost:3000/addRestaurant"
		idx=$((idx+1))
	done <$1
else
	echo "Usage: importRestaurants.sh <Restaurants Data DSV(Dagger Separated Values) File>"
fi