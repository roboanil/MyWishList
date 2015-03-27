
function updateLocalStorageData(){
	if(localStorage["violetstreet"]){
		console.log("Data found");
		data = localStorage["violetstreet"];
		console.log(data);
		itemsLoader();
		updateLocalStorageWishListData();
		assignClicks();
	}else{
		saveLocalStorageData();
	}
};

function saveLocalStorageData(){
	data = [];
	var maxLen = imageFiles.length;

	function repeatLoad(ind){
		var img = new Image();
		img.onload = function(){
			var imageData = {"itemID": imageIds[ind],"image":getBase64Image(img)};
			data.push(imageData);
			if(ind < maxLen-1)
				repeatLoad(ind+1);
			else{
				localStorage.setItem("violetstreet", JSON.stringify(data));
				itemsLoader();
				updateLocalStorageWishListData();
				assignClicks();
			}
		}
		img.src = "images/" + imageFiles[ind];
	}

	repeatLoad(0);
	
}

function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
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
		violetstreetWishlist.push(wishlists[i]);
		console.log(wishlists[i]);
		console.log(violetstreetWishlist);
	}
	localStorage.setItem("violetstreetWishlist", JSON.stringify(violetstreetWishlist));
};

function itemsLoader(){

	if(typeof(data) === "string")
		data = JSON.parse(data);
	// try{
	// 	console.log(data);
	// 	// data = JSON.parse(data);
	// }
	// catch(error){
	// 	console.log(error);
	// }
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
	image.src = "data:image/png;base64," + imageSource;
	$(image).css("height","150px");
	$(image).css("border-bottom","1px solid #CCC");

	var h4 = document.createElement("h4");
	$(h4).css("color","#428BCA");
	$(h4).css("font-family","Arial, Helvetica, sans-serif");
	$(h4).append("Funkalicious Print T-Shirt");

	/*
	var input = document.createElement("input");
	input.text = "text";
	input.placeholder = "$ 99.96";
	$(input).css("margin",0);
	$(input).css("width","50px");
	$(input).css("text-align","center");
	$(input).css("padding","6px 12px");
	$(input).css("font-family","Arial, Helvetica, sans-serif");
	*/

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

function assignClicks () {
		// delete item from wishlist
	$('.deleteItem').click(function(){
		wishlists[wishListSelected].deleteItem(itemId);
	});

	// $('#myForm input').on('change', function() {
	//    alert($('input[name="myRadio"]:checked', '#myForm').val()); 
	// });

	$(".new-wishlist-input").hide();

	$("select").on("click", function(){
		$(".new-wishlist-input").hide();
	});

	$(".add-wishlist").on("click", function(){
		$(".newWishlistName").val("");
		$(".new-wishlist-input").toggle();
	});

	$("#addNewWishlist").on("click", function(e){
		e.stopPropagation();
		if($(".newWishlistName").val() == ""){
			return;
		}else{
			popUpList();
			$(".new-wishlist-input").hide();
		}
	});

	$(document).on("click", function(){
		$(".wishlist-list-names").hide();
	});

	$(".close-popup").on("click", function(){
		$(".popup-window, .blur-mask").hide();
	});

	$(".blur-mask").on("click", function(e){
		e.stopPropagation();	
		$(".popup-window, .blur-mask").hide();
	});

	$(".addToWishList").on("click", function(e){
		e.stopPropagation();
		console.log("Add to wishlist");
		itemId = $(this).parent().find(".itemIdValue").val();

		for (var j = 0; j < data.length; j++) {
			if(itemId == data[j].itemID){
				var imgSrc = data[j].image;
				var itemID = data[j].itemID;
				$("#itemDisp").attr("src","data:image/png;base64," + imgSrc);
			}
		}		
		// console.log($(this).parent().find(".itemIdValue").val());
		
		$(".popup-window, .blur-mask").show();
	});

	$(".add-item-wishlist").on("click", function(e){
		e.stopPropagation();
		var ind = $("select option:selected").val();
		var name = $("select option:selected").text();
		ind = parseInt(ind);
		if(wishlists.length == 0)
			wishlists[ind] = new wishList(name);
		wishlists[ind].insertItem(itemId);
		addLocalStorageWishListData();	
		$(".popup-window, .blur-mask").hide();
		$("#notify").show();
		setTimeout(function(){ 
			$("#notify").hide();
		}, 3000);
	});
}

$(document).ready(function(){

	wishListData = localStorage != null ? localStorage["violetstreetWishlist"] : null;
	wishlists = [];
	wishlists[0] = new wishList("Main");

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

});