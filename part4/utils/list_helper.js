const blog = require("../models/blog")

const dummy = (blogs) => {
	return 1;
};

const totalLikes = blogs => {
	return blogs.reduce((sum, value) => sum + value.likes, 0) || 0
}

const favoriteBlog = blogs => {
}

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog
};