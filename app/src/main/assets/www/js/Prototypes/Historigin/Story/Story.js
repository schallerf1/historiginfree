function Story(el){
}
Map.prototype.addMarker = function(lat, lng){
	marker = new google.maps.Marker({
		optimized: false,
		position: new google.maps.LatLng(lat, lng),
		map: this.map
	});
	this.markers.push(marker);
	return (this.markers.length - 1);
}
Map.prototype.removeMarker = function(markerid){
	this.markers[markerid].setMap(null);
	this.markers = this.markers.splice(markerid, 1);
}
Map.prototype.getMarkers = function(){
	return this.markers;
}
Map.prototype.clearMarkers = function(){
	for(x in this.markers){
		this.markers[x].setMap(null);
	}
	this.markers.length = 0;
}
Map.prototype.setHeadingPin = function(lat, lng, heading){
	 this.headingPin = new google.maps.Marker({
		optimized: false,
		position: new google.maps.LatLng(lat, lng),
		map: this.map,
		icon: {url: '/img/pins/heading/0.png'}
	});
	if(heading){
		this.headingPin.setIcon('/img/pins/heading/' + heading + '.png');
	}
}
Map.prototype.setCenter = function(lat, lng){
	this.map.setCenter(new google.maps.LatLng(lat, lng));
}