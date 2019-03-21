module.exports = (req, res, next) => {
	const userName = req.body.name;
	if (userName[0] !== userName[0].toUpperCase()) {
		return res.status(400).json({
			errorMessage: 'First letter of name must be uppercase.'
		});
	}
	next();
};
