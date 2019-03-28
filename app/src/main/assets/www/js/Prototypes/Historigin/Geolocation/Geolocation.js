function Geolocation() {
	this.enabled = true;
	this.watchid = null;
	this.radius = 3;
	this.threshold = .04;
	this.filter = [];
}
Geolocation.prototype.enable = function(bool, callback) {
	this.enabled = bool;
	if(this.enabled){
		if(this.watchid){
			//wtf?
			hconsole.log("clearwatch from geolocation.js");
			navigator.geolocation.clearWatch(this.watchid);
		} 
		this.watchid = callback();
	} else {
		if(this.watchid){
			navigator.geolocation.clearWatch(this.watchid);
			hconsole.log("clearwatch from geolocation.js");
		}
	}
}
Geolocation.prototype.isEnabled = function(bool) {
	return this.enabled;
}

Geolocation.prototype.setRadius = function(rad) {
	this.radius = rad;
}
Geolocation.prototype.setFilter = function(filterstring) {
	this.filter.push(filterstring);
}
Geolocation.prototype.getFilter = function(filterstring) {
	return this.filter;
}
Geolocation.prototype.removeFilter = function(filterstring) {
	x = this.filter.indexOf(filterstring);
	if(x > -1){
		this.filter.splice(x, 1);
	}
}
Geolocation.prototype.getRadius = function(rad) {
	return this.radius;
}
Geolocation.prototype.getCollection = function(lat, lng, callback) {
	$.get(TYPEF_HOST + "/app/refresh?lat=" + encodeURIComponent(lat) + '&lng=' + encodeURIComponent(lng) + '&radius=' + encodeURIComponent(this.radius) + '&filter=' + JSON.stringify(this.filter), function(data) {
		//console.log(data);
		if (!empty(data)) {
			//console.log('Data return for: ' + lat + ' ' + lng);
			//debug(data);
			data = $.parseJSON(data);
			collection = new Collection();
			collection.setCollection(data);
			callback(collection);
		}
	});
}
Geolocation.prototype.getCollectionByScope = function(lat1, lng2, lat2, lng2, centerlat, centerlng, callback) {
	$.get(TYPEF_HOST + "/app/scope?lat1=" + encodeURIComponent(lat1) + '&lng1=' + encodeURIComponent(lng1) + '&lat2=' + encodeURIComponent(lat2) + '&lng2=' + encodeURIComponent(lng2) + '&lat=' + centerlat + '&lng=' + centerlng + '&filter=' + JSON.stringify(this.filter), function(data) {
		if (!empty(data)) {
			//console.log('Data return for: ' + lat + ' ' + lng);
			//console.debug(data);
			data = $.parseJSON(data);
			collection = new Collection();
			collection.setCollection(data);
			callback(collection);
		}
	});
}

Geolocation.prototype.getStory = function(storyid, callback){
	$.get(TYPEF_HOST + "/app/story?storyid=" + storyid, function(data) {
		if (!empty(data)) {
			data = $.parseJSON(data);
			callback(data);
		}
	});
}

