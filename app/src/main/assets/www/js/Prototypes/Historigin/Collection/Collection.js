function Collection(name){
	this.collection = {};
	if(name){
		this.name = name;
		this.load();
	}
}
Collection.prototype.setCollection = function(items){
	this.collection = items;
	this.save();
}
Collection.prototype.removeItem = function (key){
	delete this.collection[key];
	this.save();
}
Collection.prototype.save = function(){
    hconsole.log('Do we have local storage to save?   ' + JSON.stringify(this.name));
	if(this.name){
	    hconsole.log('SAVING Name: ' +  JSON.stringify(this.name));
		localStorage.setItem(this.name, JSON.stringify(this.collection));
	} else {
		hconsole.log('No localstorage key to save :(');
	}
}
Collection.prototype.addItem = function (key, item){
	this.collection[key] = item;
	this.save();
}
Collection.prototype.getItem = function(key){
	return this.collection[key];
}
Collection.prototype.getAllItems = function(){
	return this.collection;
}
Collection.prototype.removeAllItems = function(){
	delete this.collection;
	this.collection = {};
	this.save();
}
Collection.prototype.diff = function(item){
	return array_diff_key(item, this.collection);
}
Collection.prototype.merge = function(items){
	this.collection = array_merge(this.collection, items);
	this.save();
}

Collection.prototype.load = function(key){
	if(this.name){
	    //hconsole.log('This is this.name: ' + this.name + '    ');

		if(localStorage.getItem(this.name)){
			if(isJSON(localStorage.getItem(this.name))){
				this.collection = $.parseJSON(localStorage.getItem(this.name));
			} else {
				localStorage.setItem(this.name,'');
				this.collection = {};
				hconsole.log('Unable to load ' + this.name + ' collection');
			}
			
		}
	} else {
		hconsole.log('No localstorage key to load :(');
	}
	/*
	data = encodeURIComponent(data);
	$.get(TYPEF_HOST + '/app/collection/load?' + data, function(response){
		response = $.parseJSON(response);
		this.collection = response.collection;
		callback(response);
	});
	*/
}
Collection.prototype.empty = function(){
	//console.debug(empty(this.collection));
	return empty(this.collection);
}

function isJSON(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}
