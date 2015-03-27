function wishList(wishListName) {
	this.wishListName = wishListName;
	this.itemIds = [];
	this.dataStr = {"wishListName":wishListName,itemIds:[]};
	this.update = function(){
		this.dataStr.itemIds = this.itemIds;
	};	
}

wishList.prototype.deleteItem = function(itemId){	
	var index = this.itemIds.indexOf(itemId);
	if(index > -1)
		this.itemIds.splice(index, 1);
};

wishList.prototype.insertItem = function(itemId){
	this.itemIds.push(itemId);
	this.update();
};
