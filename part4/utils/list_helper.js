const blog = require("../models/blog")

const dummy = (blogs) => {
	return 1;
};

const totalLikes = blogs => {
	return blogs.reduce((sum, value) => sum + value.likes, 0) || 0
}

const favoriteBlog = blogs => {
	const likes = blogs.map((blog) => blog.likes);
	const favoriteIndex = likes.indexOf(Math.max(...likes))

	return blogs[favoriteIndex]
}

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog
};