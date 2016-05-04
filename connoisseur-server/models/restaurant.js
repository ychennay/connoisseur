/**
 * Created by tygiacalone on 4/22/16.
 */

// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var restaurantSchema = new Schema({
    name: String,
    username: { type: String, required: true, unique: true },
    tags: {
        afternoon: {type: Boolean, default: false},
        authentic: {type: Boolean, default: false},
        authentic_takeout: {type: Boolean, default: false},
        baked_goods: {type: Boolean, default: false},
        bar_area: {type: Boolean, default: false},
        bar_scene: {type: Boolean, default: false},
        bar_seating: {type: Boolean, default: false},
        beer_and_wine: {type: Boolean, default: false},
        beer_selection: {type: Boolean, default: false},
        casual: {type: Boolean, default: false},
        celeb_spotting: {type: Boolean, default: false},
        chef_inventive: {type: Boolean, default: false},
        classy: {type: Boolean, default: false},
        communal_tables: {type: Boolean, default: false},
        date_night: {type: Boolean, default: false},
        date_spot: {type: Boolean, default: false},
        dietary_restriction_friendly: {type: Boolean, default: false},
        dog_friendly: {type: Boolean, default: false},
        family_friendly: {type: Boolean, default: false},
        famous_chef: {type: Boolean, default: false},
        fancy: {type: Boolean, default: false},
        farm_to_table: {type: Boolean, default: false},
        first_date: {type: Boolean, default: false},
        foodie_famous: {type: Boolean, default: false},
        fun: {type: Boolean, default: false},
        fusion: {type: Boolean, default: false},
        gastropub: {type: Boolean, default: false},
        gluten_free_options: {type: Boolean, default: false},
        good_ambiance: {type: Boolean, default: false},
        good_drinks : {type: Boolean, default: false},
        good_for_groups: {type: Boolean, default: false},
        good_for_lunch: {type: Boolean, default: false},
        good_for_parents: {type: Boolean, default: false},
        great_view: {type: Boolean, default: false},
        happy_hour: {type: Boolean, default: false},
        hard_to_get_a_table: {type: Boolean, default: false},
        healthy_options: {type: Boolean, default: false},
        hidden_gem: {type: Boolean, default: false},
        hotel_dining: {type: Boolean, default: false},
        hotspot: {type: Boolean, default: false},
        innovative: {type: Boolean, default: false},
        karaoke: {type: Boolean, default: false},
        lively: {type: Boolean, default: false},
        lively_bar_area: {type: Boolean, default: false},
        locals: {type: Boolean, default: false},
        new_restaurant: {type: Boolean, default: false},
        no_reservations: {type: Boolean, default: false},
        open_late: {type: Boolean, default: false},
        order_at_counter: {type: Boolean, default: false},
        organic: {type: Boolean, default: false},
        organic_beer_and_wine: {type: Boolean, default: false},
        outdoor_dining: {type: Boolean, default: false},
        outdoor_seating: {type: Boolean, default: false},
        pastries: {type: Boolean, default: false},
        prime_location: {type: Boolean, default: false},
        private_room: {type: Boolean, default: false},
        quiet: {type: Boolean, default: false},
        romantic: {type: Boolean, default: false},
        rotating_menu: {type: Boolean, default: false},
        scenery: {type: Boolean, default: false},
        seat_yourself: {type: Boolean, default: false},
        secret: {type: Boolean, default: false},
        share_plates: {type: Boolean, default: false},
        shareable: {type: Boolean, default: false},
        small_plates: {type: Boolean, default: false},
        snack: {type: Boolean, default: false},
        special_occasion: {type: Boolean, default: false},
        swanky: {type: Boolean, default: false},
        sweet_treat: {type: Boolean, default: false},
        take_out_options: {type: Boolean, default: false},
        takes_dinner_reservations: {type: Boolean, default: false},
        takes_walk_ins: {type: Boolean, default: false},
        tasting_menu: {type: Boolean, default: false},
        trendy: {type: Boolean, default: false},
        upscale: {type: Boolean, default: false},
        vegan_options: {type: Boolean, default: false},
        vegetarian_options: {type: Boolean, default: false},
        wine_bar: {type: Boolean, default: false},
        worth_the_lines: {type: Boolean, default: false}
    },
    food_types: {
        all_american: {type: Boolean, default: false},
        asian: {type: Boolean, default: false},
        bakery: {type: Boolean, default: false},
        british: {type: Boolean, default: false},
        chinese: {type: Boolean, default: false},
        french: {type: Boolean, default: false},
        fusion: {type: Boolean, default: false},
        german: {type: Boolean, default: false},
        greek: {type: Boolean, default: false},
        indian: {type: Boolean, default: false},
        italian: {type: Boolean, default: false},
        japanese: {type: Boolean, default: false},
        korean: {type: Boolean, default: false},
        mexican: {type: Boolean, default: false},
        middle_eastern: {type: Boolean, default: false},
        pizza: {type: Boolean, default: false},
        seafood: {type: Boolean, default: false},
        seasonal_or_local: {type: Boolean, default: false},
        south_american: {type: Boolean, default: false},
        steakhouse: {type: Boolean, default: false},
        sushi: {type: Boolean, default: false},
        sushi_bar: {type: Boolean, default: false},
        tapas: {type: Boolean, default: false},
        thai: {type: Boolean, default: false},
        vegan: {type: Boolean, default: false}
    },
    meals: {
        breakfast: {type: Boolean, default: false},
        brunch: {type: Boolean, default: false},
        coffee: {type: Boolean, default: false},
        dinner: {type: Boolean, default: false},
        drinks: {type: Boolean, default: false},
        happy_hour: {type: Boolean, default: false},
        lunch: {type: Boolean, default: false}
    },
    location: String,
    notes: String,
    created_at: Date,
    updated_at: Date
});

// the schema is useless so far
// we need to create a model using it
var Restaurant = mongoose.model('Restaurant', restaurantSchema);

// make this available to our users in our Node applications
module.exports = Restaurant;