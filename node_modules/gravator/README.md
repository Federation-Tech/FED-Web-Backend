<h1 align="center">
<img src="https://raw.githubusercontent.com/CodeDotJS/gravator/master/media/gravator.png" alt="GRAVATOR" width="400">
<br>
<img src="https://travis-ci.org/CodeDotJS/gravator.svg?branch=master">
<img src="https://img.shields.io/badge/code_style-XO-5ed9c7.svg">
</h1>

<p align="center"><b>An unofficial API for Gravatar.com mostly for scrapping user data.</b></p>

## Install

```
$ npm install --save gravator
```

## Usage

- `username` of a gravatar user is always __`foo`__`@example.com`
```js
'use strict';

const gravator = require('gravator');

gravator('username', 'options').then(res => {
	console.log(res);
	// {opts: 'data'}
});

gravator('foo', 'hash').then(res => {
	console.log(res);
	// {opts: 'foo'}
})
```

## API

### `gravator(username, options)`

#### __`username`__

Type: `string`

#### __`options`__

Type: `string`

Options:

- `id`

__`Example `__

```js
gravator('matt', 'id').then(res => {
	console.log(res);
	// // {opts: '5'}
});
```

- `hash`

- `requestHash`

- `profileUrl`

- `preferredUsername`

- `thumbnailUrl`

- `photos`

- `name`

- `ims`

- `displayName`

- `aboutMe`

- `currentLocation`

- `emails`

- `accounts`

- `urls`

## Related

- __[`gravator-cli`](https://github.com/CodeDotJS/gravator-cli)__ `: CLI Tool for Gravator.`

- __[`twifo`](https://github.com/CodeDotJS/whatiz-cli)__ `: Get user information of a twitter user.`

## License

MIT &copy; [Rishi Giri](http://rishigiri.com)
