const mongoose = require('mongoose');
const citeis = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');
const cities = require('./cities');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');

const db = mongoose.connection;
db.on("error", (error) => {
    console.error('Connection error:', error);
});
db.once("open", () => {
    console.log('Database connected!');
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const rand1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 30) + 10;
        const camp = new Campground({
            author: '659046f31efd96493bf25cc7',
            title: `${sample(descriptors)} ${sample(places)}`,
            location: `${citeis[rand1000].city}, ${citeis[rand1000].state}`,
            geometry:{
                type: "Point",
                coordinates: [cities[rand1000].longitude, cities[rand1000].latitude]
            },
            images: [
                {
                  url: 'https://res-console.cloudinary.com/dz74jeww6/media_explorer_thumbnails/ea4921f5ac678d4bdab11988fdab3c9c/detailed',
                  filename: 'YelpCamp/ytjiac7hcpe0jyvnejtv'
                },
                {
                    url: 'https://res-console.cloudinary.com/dz74jeww6/media_explorer_thumbnails/dd95b4f708fe3864024d209650df2681/detailed',
                    filename: 'YelpCamp/jejtytmpcoksczfpgumk'
                }

            ],
            description: "Discover serenity in our natural haven, where spacious campsites and modern amenities await, providing an ideal escape into the great outdoors.",
            price
        });
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});