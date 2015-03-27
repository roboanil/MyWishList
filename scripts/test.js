
function updateLocalStorageData(){
	if(localStorage["violetstreet"]){
		console.log("Data found");
		data = localStorage["violetstreet"];
		dataParse = JSON.parse(data);
		if(dataParse[0].image.length < 10)
			saveLocalStorageData();
	}else{
		saveLocalStorageData();
	}
};

function saveLocalStorageData(){
	data = [];
	for (var i = 0; i < imageFiles.length; i++) {
		var img = new Image();
		img.src = "images/" + imageFiles[i];
		var imageData = {"itemID": imageIds[i],"image":getBase64Image(img)};
		data.push(imageData);
	}
	console.log(data);

	// if(data[0].image.length < 10){
	// 	console.log("error");
	// 	saveLocalStorageData();
	// }
	
	localStorage.setItem("violetstreet", JSON.stringify(data));
}

function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = "200";
    canvas.height = "200";
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL("image/png");
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
};

function updateLocalStorageWishListData(){
	if (wishListData != null && JSON != null) {
		console.log("Wishlist data found");
		$("select").empty();
		try{
			wishListData = JSON.parse(wishListData);
			for(var i = 0; i < wishListData.length; i++){
				wishlists[i] = new wishList(wishListData[i].wishListName);
				wishlists[i].itemIds = wishListData[i].itemIds;
				wishlists[i].update();
				upDatePopList(i,wishlists[i].wishListName);
			}	
		}
		catch(error){
			console.log(error);
		}
	}else{

	}
};

function upDatePopList(value,name){	
	var option = document.createElement("option");
	option.value = value;
	option.innerHTML = name;
	console.log(name);
	$("select").append(option);
};

function popUpList(){
	var lastValue = $('select option:last-child').val();
	lastValue = parseInt(lastValue) + 1;
	var option = document.createElement("option");
	option.value = lastValue;
	option.innerHTML = $(".newWishlistName").val();
	// var newwishlist = '<option value="'+lastValue.toString()+'">'+$(".newWishlistName").val()+'</option>';
	wishlists[wishlists.length] = new wishList($(".newWishlistName").val());
	$("select").append(option);
};

// adding wishlist data to localstorage
function addLocalStorageWishListData(){
	var violetstreetWishlist = [];
	for(var i = 0; i < wishlists.length; i++){		
		violetstreetWishlist.push(wishlists[i].dataStr);
		// wishListData.push();
		console.log(violetstreetWishlist);
	}
	localStorage.setItem("violetstreetWishlist", JSON.stringify(violetstreetWishlist));
};

function itemsLoader(){
	try{
		data = JSON.parse(data);
	}
	catch(error){
		console.log(error);
	}
	for (var i = 0; i < data.length; i++) {
		var imgSrc = data[i].image;
		var itemID = data[i].itemID;
		DOMCreater(imgSrc, itemID);
	};
}

function DOMCreater(imageSource, itemID){
	var listDiv = document.createElement("div");
	listDiv.className = "list";
	$(listDiv).css("min-width","30%");
	$(listDiv).css("display","inline-block");
	$(listDiv).css("margin","1em 0");
	$(listDiv).css("padding","0 0.5em");

	var itemsDiv = document.createElement("div");
	itemsDiv.className = "items";
	$(itemsDiv).css("text-align","center");
	$(itemsDiv).css("border","1px solid #CCC");

	var firstPara = document.createElement("p");
	var secPara = document.createElement("p");
	var thirdPara = document.createElement("p");

	$(firstPara,secPara,thirdPara).css("font-size","12px");
	$(firstPara,secPara,thirdPara).css("font-family","Arial,Helvetica, sans-serif");

	var image = document.createElement("img");
	console.log(imageSource);
	var str = "data:image/jpeg;base64,"+imageSource;
	// image.className = "itemImage";
	image.setAttribute('crossOrigin', 'anonymous');
	// image.crossOrigin = "anonymous";
	image.src=str;
	// image.src = str;
	$(image).css("height","150px");
	$(image).css("border-bottom","1px solid #CCC");

	var h4 = document.createElement("h4");
	$(h4).css("color","#428BCA");
	$(h4).css("font-family","Arial, Helvetica, sans-serif");
	$(h4).append("Funkalicious Print T-Shirt");

	var inputHid = document.createElement("input");
	inputHid.className = "itemIdValue";
	inputHid.type = "hidden";
	inputHid.value = itemID;

	var button = document.createElement("button");
	button.className = "addToWishList";
	$(button).append("Add to wishlist");

	$(secPara).append("Lorem ipsum dolor sit amet,<br />consectetur adipisicing elit. Aut,<br />minima!");

	$(firstPara).append(image);
	// $(thirdPara).append(input);
	$(thirdPara).append(button);
	$(thirdPara).append(inputHid);

	$(itemsDiv).append(firstPara);
	$(itemsDiv).append(h4);
	$(itemsDiv).append(secPara);
	$(itemsDiv).append(thirdPara);

	$(listDiv).append(itemsDiv);
	$(".row").append(listDiv);

}

$(document).ready(function(){

	wishListData = localStorage != null ? localStorage["violetstreetWishlist"] : null;
	wishlists = [];
	itemAdded = false;
	itemId = 0;
	wishListSelected = 0;

	imageIds = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
	imageFiles = [ "item_1.jpg",
				   "item_2.jpg", 
				   "item_3.jpg",
				   "item_4.jpg",
				   "item_5.jpg",
				   "item_6.jpg",
				   "item_7.jpg",
				   "item_8.jpg",
				   "item_9.jpg",
				   "item_10.jpg",
				   "item_11.jpg",
				   "item_12.jpg",
				   "item_13.jpg",
				   "item_14.jpg",
				   "item_15.jpg",
				   "item_16.jpg",
				   "item_17.jpg",
				   "item_18.jpg",
				   "item_19.jpg",
				   "item_20.jpg",];
	data = [];

	$("#notify").hide();

	updateLocalStorageData();

	itemsLoader();

	updateLocalStorageWishListData();

});