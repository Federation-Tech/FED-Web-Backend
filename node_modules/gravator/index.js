'use strict';

const got = require('got');

module.exports = (username, opts) => {
	if (typeof username !== 'string') {
		throw new TypeError(`Expected a string, got ${typeof username}`);
	}

	if (typeof opts !== 'string') {
		throw new TypeError(`Expected a string, got ${typeof opts}`);
	}

	const url = `https://en.gravatar.com/${username}.json`;

	return got(url, {json: true}).then(res => {
		const val = res.body;
		return {
			opts: val.entry[0][opts]
		};
	}).catch(err => {
		if (err) {
			err.message = `${username} is not a gravatar user`;
		}
		return err.message;
	});
};
