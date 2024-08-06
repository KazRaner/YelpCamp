if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}

const mongoose = require("mongoose");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");
const cities = require("./cities");

const dbUrl = process.env.DB_URL;
//mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');
mongoose.connect(dbUrl);
const db = mongoose.connection;
db.on("error", (error) => {
	console.error("Connection error:", error);
});
db.once("open", () => {
	console.log("Database connected!");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
	await Campground.deleteMany({});
	for (let i = 0; i < 300; i++) {
		const rand1000 = Math.floor(Math.random() * 1000);
		const price = Math.floor(Math.random() * 30) + 10;
		const camp = new Campground({
			author: "66af8d6e6284d99a19529283",
			title: `${sample(descriptors)} ${sample(places)}`,
			location: `${cities[rand1000].city}, ${cities[rand1000].state}`,
			geometry: {
				type: "Point",
				coordinates: [
					cities[rand1000].longitude,
					cities[rand1000].latitude,
				],
			},
			images: [
				{
					url: "https://res.cloudinary.com/dz74jeww6/image/upload/v1722781219/YelpCamp/ridwan-kosasih-vXzSkC3-n5I-unsplash.jpg.jpg",
					filename:
						"YelpCamp/ridwan-kosasih-vXzSkC3-n5I-unsplash.jpg",
				},
				{
					url: "https://res.cloudinary.com/dz74jeww6/image/upload/v1722781220/YelpCamp/adrian-infernus-FAJr9FVJunQ-unsplash.jpg.jpg",
					filename:
						"YelpCamp/adrian-infernus-FAJr9FVJunQ-unsplash.jpg",
				},
			],
			description:
				"Discover serenity in our natural haven, where spacious campsites and modern amenities await, providing an ideal escape into the great outdoors.",
			price,
		});
		await camp.save();
	}
};

seedDB().then(() => {
	mongoose.connection.close();
});
