const express = require('express');

const dbp = require('./data/helpers/postdb.js');

const router = express.Router();

// /api/posts
router.get('/', (req, res) => {
	dbp
		.get()
		.then((users) => {
			res.status(200).json(users);
		})
		.catch((err) => res.status(500).json({ error: err }));
});

// /api/posts/:id
router.get('/:id', (req, res) => {
	const id = req.params.id;
	dbp
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

// /api/posts
router.post('/', async (req, res) => {
	try {
		const post = await dbp.insert(req.body);
		res.status(201).json(post);
	} catch (error) {
		res.status(500).json({
			message: 'Error adding the post'
		});
	}
});

// /api/posts/:id
router.delete('/:id', (req, res) => {
	const { id } = req.params;
	dbp
		.remove(id)
		.then((post) => {
			if (post) {
				res.status(200).json(post);
			} else {
				res.status(404).json({ error: 'The post with the specific ID does not exist' });
			}
		})
		.catch((err) => res.status(500).json({ error: err }));
});

// /api/posts/:id
router.put('/:id', (req, res) => {
	const id = req.params.id;
	const changes = req.body;
	dbp
		.update(id, changes)
		.then((updated) => {
			if (updated) {
				res.status(200).json(updated);
			} else {
				res.status(404).json({ error: 'The post with the specific ID does not exist' });
			}
		})
		.catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;
