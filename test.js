'use strict';
const map = require('./index')
const MapExpire = require('./Map')
const assert = require('assert')

describe.skip('Extended Map Object', function(){
	before('initialize', function(done){
		for(var i = 0; i < 10; i++){
			map.set(i, i*100, i*50 + 100)
		}
		done()
	})
	
	it('update item', function(done){
		map.set(5, 'five');
		assert.equal(map.get(5), 'five', 'it should be "five"');
		done()
	})
	
	it('expire test', function(done){
		setTimeout(function(){
			assert.equal(map.get(1), undefined, 'it should be undefined')
			assert.equal(map.get(9), 900, 'it should be 900')
			done()
		}, 200)
	})
	
	it('capacity test', function(done){
		for(var i = 0; i<200; i++){
			map.set(`key_${i}`, `value_${i}`);
		}
		assert.equal(map.size, map.capacity, `it should be ${map.capacity}`)
		done()
	})
})

describe('Extended Map Object v1', function(){

	it('capacity test', function(done){
		const mapEx = new MapExpire()
		for(var i = 0; i<200; i++){
			mapEx.set(i, i * 100);
		}
		assert.equal(mapEx.size, mapEx.capacity, `it should be ${map.capacity}`)
		done()
	})

	it('expire test', function(done){
		const mapEx = new MapExpire()
		mapEx.set('A', 'a');
		mapEx.set('B', 'b', 5)
		setTimeout(() => assert.strict.equal(mapEx.get('B'), 'b'), 0)
		setTimeout(() => assert.strict.equal(mapEx.get('B'), undefined), 6)
		setTimeout(() => {
			assert.strict.equal(mapEx.get('A'), 'a', 'should be exists')
			done()
		}, 7)
	})

	it('expire test with default expire', function(done){
		const mapEx = new MapExpire([], 100, 5)
		mapEx.set('A', 'a');
		mapEx.set('B', 'b', 10)
		setTimeout(() => assert.strict.equal(mapEx.get('A'), 'a'), 0)
		setTimeout(() => assert.strict.equal(mapEx.get('A'), undefined), 6)
		setTimeout(() => assert.strict.equal(mapEx.get('B'), 'b'), 7)
		setTimeout(() => {
			assert.strict.equal(mapEx.get('B'), undefined, 'should be undefined')
			done()
		}, 12)
	})

})