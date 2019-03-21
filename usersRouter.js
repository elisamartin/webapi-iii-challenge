const express = require('express');

const dbu = require('./data/helpers/userdb.js');
const validateUsername = require('./validateUsernameMiddleware');

const router = express.Router();

//  /api/users
router.get('/', (req, res) => {
	dbu
		.get()
		.then((users) => {
			res.status(200).json(users);
		})
		.catch((err) => res.status(500).json({ error: err }));
});

// /api/users/:id
router.get('/:id', (req, res) => {
	const id = req.params.id;

	dbu
		.getById(id)
		.then((user) => {
			if (!user) {
				res.status(404).json({ error: 'User not found' });
			} else {
				res.status(200).json(user);
			}
		})
		.catch((err) => res.status(500).json({ error: err }));
});

// /api/users/:id/posts
router.get('/:id/posts', (req, res) => {
	const id = req.params.id;

	dbu
		.getUserPosts(id)
		.then((user) => {
			if (!user) {
				res.status(404).json({ error: 'User not found' });
			} else {
				res.status(200).json(user);
			}
		})
		.catch((err) => res.status(500).json({ error: err }));
});

// /api/users
router.post('/', validateUsername, (req, res) => {
	const { name } = req.body;
	const newUser = { name };
	dbu
		.insert(newUser)
		.then((result) => res.status(201).json(result))
		.catch((err) => res.status(500).json({ error: err }));
});

// /api/users/:id
router.delete('/:id', (req, res) => {
	const id = req.params.id;
	dbu
		.remove(id)
		.then((user) => {
			if (user) {
				res.json(id);
			} else {
				res.status(404).json({ error: 'The user with the specific ID does not exist' });
			}
		})
		.catch((err) => res.status(500).json({ error: err }));
});

// /api/users/:id
router.put('/:id', validateUsername, (req, res) => {
	const id = req.params.id;
	const changes = req.body;

	dbu.update(id, changes).then((updated) => {
		if (!updated) {
			res.status(400).json({ message: 'The post with the specified ID does not exist ' });
		} else {
			res.status(200).json(id);
		}
	});
});

module.exports = router;
