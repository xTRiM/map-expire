# map-expire

Extended Map object with capacity and expire features

## install


```sh
npm install --save map-expire
```

## usage

```javascript

const Cache = require('map-expire');
const new Cache()

cache.set(key, value, duration)

var value = cache.get(key)

```

## API

- set(key, value, duration)
	if duration (second) is falsy or not given this item will never be expired.

- get(key)
	return undefined if not exists or expired

## test

```sh
npm test
```
