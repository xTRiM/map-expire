const EventEmitter = require('events');

class Entity {
	constructor(data, duration){
		this.data = data
		this.expire = duration && (Date.now() + duration)
	}

	get expired(){
		return this.expire ? (this.expire < Date.now()) : false;
	}
}

class Cache extends Map {
	constructor(values, capacity = 100, duration){
		super()
		this.events = new EventEmitter()
        this.capacity = capacity
        this.duration = duration
        if(values) values.forEach(item => this.set(...item))
	}
	set(key, value, duration){
		var entity = new Entity(value, duration === undefined ? this.duration : duration)
		super.set(key, entity)
		this.events.emit('save', key, value, duration)
		this.clean()
	}

	get(key){
        const entity = super.get(key);
        return entity ? (entity.expired ? undefined : entity.data) : undefined
	}

	clean(){
		if(this.size < this.capacity) return;
		this.forEach(function(item, key){
			if(item.expired) this.delete(key)
		}, this)
		var keys = this.keys();
		while(this.size > this.capacity){
			var key = keys.next().value;
			this.delete(key)
		}
	}

	on(event, callback){
		this.events.on(event, callback);
	}
}

module.exports = Cache;
