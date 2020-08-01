'use strict';

class Entity {
	constructor(data, duration){
		this.data = data
		this.expire = duration ? Date.now() + duration : false
	}

	get expired(){
		return this.expire ? this.expire <= Date.now() : false
	}
}

class Cache extends Map {
	constructor(values){
		super(values)
	}
	
	set(key, value, duration){
		var entity = new Entity(value, duration)
		super.set(key, entity)
	}

	get(key){
		var entity = this.get_entity(key);
		return entity === undefined || entity.data;
	}
	
	set_entity(key, entity){
		super.set(key, entity)
	}
	
	get_entity(key){
		var entity = super.get(key);
		return entity === undefined || entity.expired ? undefined : entity;
	}

	delete(key){
		super.delete(key)
	}
}

module.exports = Cache;
