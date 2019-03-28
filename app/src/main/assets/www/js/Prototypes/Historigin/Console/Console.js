function Console(el){
	if ($(el)) {
		this.element = el;
		$(el).scroll(function() {
			$(this).attr('scrolled', 'scrolled');
			if ($(el).height() == ($(el).prop('scrollHeight') - $(el).scrollTop())) {
				$(el).removeAttr('scrolled');
			}
		});
	} else {
		this.element = null;
	}
	this.enabled = false;

		
}
Console.prototype.log = function(data) {
	console.debug(data);
	//if (this.enabled) {
		$(this.element).append('<div>[' + Date('Y-m-d H:i:s') + '] ' + data + '</div>');
		if ($(this.element).attr('scrolled') !== 'scrolled') {
			$(this.element).stop();
			$(this.element).animate({scrollTop: $(this.element).prop("scrollHeight")}, 600);
		}
	//}
}
Console.prototype.send = function() {
	//send to remote server.
}
Console.prototype.enable = function(bool) {
	this.enabled = bool;
}
Console.prototype.isEnabled = function() {
	return this.enabled;
}
Console.prototype.isEnabled = function() {
	return this.enabled;
}
Console.prototype.show = function(){
	$(this.element).show();
}
Console.prototype.hide = function(){
	$(this.element).hide();
}