function product(productID, productCat, productImage){
	this.ID = productID;
	this.Cat = productCat;
	this.Img = productImage;
}

function store () {
	this.items = [
		new product(123,12,"images/1.jpg"),
		new product(124,12,"images/1.jpg"),
		new product(125,12,"images/1.jpg")
	];
}

store.prototype.getProduct = function(itemID){
	for(var i = 0; i < this.items.length; i++){
		if(this.items[i].ID = itemID){
			return this.items[i];
		}
	}
	return null;
}