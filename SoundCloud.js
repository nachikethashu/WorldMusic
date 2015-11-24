enyo.kind({
	name: "MainDiv",
	classes: "mainDiv",
	components: [
		{name: "MainApp", kind:"app",},
	]

});

enyo.kind({
	name: "app",
	kind: "enyo.Panels",
	fit:true,
	wrap: false,
	animate: false,
	style: "height: 100%;",

	components: [
		{name:"HomeScreen", kind:"MediaCards"}
	],

	handlers:{
		onRandomTap: "getRandom",
		onGenreTap: "getGenre",
		onCustomTap: "getSearch",
		onArtistTap: "getArtist"
	},

	rendered: enyo.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
			this.screenHeight = this.getBounds().height;
			this.screenWidth = this.getBounds().width;
		};
	}),

	XRandomise: function(length){
		this.ar = [];
		for (var i = 0; i < length; i++) {
			this.ar[i] = i;
		}

		// randomize the array
		this.ar.sort(function () {
			return Math.random() - 0.5;
		});
	},

	getRandom: function(){
		var ajax = new enyo.Ajax({
			url: "https://api.soundcloud.com/users/17474388/favorites",
			cacheBust: false,
			contentType:"application/x-www-form-urlencoded",
			method:'GET',
			sync:false
		});
		ajax.go({consumer_key: '51087545c4a7d4b93cd0da48a51cb699', "format": "json"});
		ajax.response(this, function(inSender, inResponse){
			console.log(inResponse);
			for (var i = 0; i < inResponse.length; i++) {
				this.songUrls.push(inResponse[i].uri);
			}
			this.XRandomise(this.songUrls.length);
			this.fetchEmbed(inResponse[this.ar[this.songCtr]].uri);
		});
	},

	goToHome: function(){
		this.setIndex(0);
	},

	songUrls: [],
	songCtr: 0,
	widget: undefined,
	screenHeight: 0,
	screenWidth: 0,

	getGenre: function(){
		var panelsCnt = this.getPanels().length;
		var p = this.createComponent({
			name: "GenreDisp",
			kind: "Scroller",
			strategyKind: "TouchScrollStrategy",
			classes: "genre-disp",
			components:[
				{content: "Genres", ontap: "goToHome", classes: "header"},
				{name: "rock", classes: "block1 blockHeader", content: "Rock", ontap: "fetchGenreSongs"},
				{name: "alternativerock", classes: "block2 blockHeader", content: "Alternative Rock", ontap: "fetchGenreSongs", style:"width: 55%;"},
				{name: "rap", classes: "block1 blockHeader", content: "Rap", ontap: "fetchGenreSongs"},
				{name: "soul", classes: "block1 blockHeader", content: "Soul", ontap: "fetchGenreSongs"},
				{name: "punk", classes: "block1 blockHeader", content: "Punk", ontap: "fetchGenreSongs"},
				{name: "r&b", classes: "block1 blockHeader", content: "R&B", ontap: "fetchGenreSongs"},
				{name: "metal", classes: "block1 blockHeader", content: "Metal", ontap: "fetchGenreSongs"},
				{name: "blues", classes: "block1 blockHeader", content: "Blues", ontap: "fetchGenreSongs"},
				{name: "bollywood", classes: "block2 blockHeader", content: "Bollywood", ontap: "fetchGenreSongs"},
				{name: "world", classes: "block1 blockHeader", content: "World", ontap: "fetchGenreSongs", style:"width: 30%;"},
				{name: "dance", classes: "block1 blockHeader", content: "Dance", ontap: "fetchGenreSongs", style:"width: 40%;"},
				{name: "ambient", classes: "block2 blockHeader", content: "Ambient", ontap: "fetchGenreSongs", style:"width: 40%;"},
				{name: "classical", classes: "block2 blockHeader", content: "Classical", ontap: "fetchGenreSongs"},
				{name: "disco", classes: "block1 blockHeader", content: "Disco", ontap: "fetchGenreSongs", style:"width: 30%;"},
				{name: "jazz", classes: "block1 blockHeader", content: "Jazz", ontap: "fetchGenreSongs", style:"width: 30%;"},
				{name: "drum&bass", classes: "block2 blockHeader", content: "Drum & Bass", ontap: "fetchGenreSongs"},
				{name: "dubstep", classes: "block1 blockHeader", content: "Dubstep", ontap: "fetchGenreSongs", style:"width: 40%;"},
				{name: "electro", classes: "block1 blockHeader", content: "Electro", ontap: "fetchGenreSongs", style:"width: 40%;"},
				{name: "electronic", classes: "block2 blockHeader", content: "Electronic", ontap: "fetchGenreSongs"},
				{name: "folk", classes: "block1 blockHeader", content: "Folk", ontap: "fetchGenreSongs", style:"width: 30%;"},
				{name: "hiphop", classes: "block1 blockHeader", content: "Hip Hop", ontap: "fetchGenreSongs", style:"width: 40%;"},
				{name: "indierock", classes: "block1 blockHeader", content: "Indie Rock", ontap: "fetchGenreSongs", style:"width: 40%;"},
				{name: "latin", classes: "block1 blockHeader", content: "Latin", ontap: "fetchGenreSongs"},
				{name: "piano", classes: "block1 blockHeader", content: "Piano", ontap: "fetchGenreSongs"},
				{name: "trap", classes: "block1 blockHeader", content: "Trap", ontap: "fetchGenreSongs"},
				{name: "trance", classes: "block1 blockHeader", content: "Trance", ontap: "fetchGenreSongs"},
				{name: "reggae", classes: "block1 blockHeader", content: "Reggae", ontap: "fetchGenreSongs"},
			]
		});
		p.render();

		this.refresh();
		this.render();
		//this.next();
		this.setIndex(panelsCnt);
	},

	fetchGenreSongs: function(inSender, inEvent){
		console.log(inSender.name);
		var ajax = new enyo.Ajax({
			url: "https://api.soundcloud.com/tracks/",
			cacheBust: false,
			contentType:"application/x-www-form-urlencoded",
			method:'GET',
			sync:false
		});
		ajax.go({consumer_key: '51087545c4a7d4b93cd0da48a51cb699', "format": "json", "genres": inSender.name, "order" : "hotness", "duration[from]": 120000,
		"offset": 0 /*from where to start the results*/});
		this.$.GenreDisp.addClass("show-scrim");
		ajax.response(this, function(inSender, inResponse){
			console.log(inResponse);
			for (var i = 0; i < inResponse.length; i++) {
				this.songUrls.push(inResponse[i].uri);
			}
			this.XRandomise(this.songUrls.length);
			this.fetchEmbed(inResponse[this.ar[this.songCtr]].uri);
		});
	},

	fetchEmbed: function(songUrl){

		var ajax = new enyo.Ajax({
			url: "https://soundcloud.com/oembed",
			cacheBust: false,
			contentType:"application/x-www-form-urlencoded",
			method:'GET',
			sync:false
		});
		ajax.go({consumer_key: '51087545c4a7d4b93cd0da48a51cb699', "format": "json", "maxheight": this.screenHeight*0.6, /*"auto_play": "true",*/ "url": songUrl});
		ajax.response(this, function(inSender, inResponse){
			var p = this.createComponent({
				name: "PlayerPanel",
				kind: "Scroller",
				strategyKind: "TouchScrollStrategy",
				style : "background: rgb(240, 232, 232);",
				components:[
					{content: "HOME", ontap: "goToHome", classes: "header"},
					{name: "player", content: inResponse.html, allowHtml: true, ontap: "getCtr", classes: "cloudPlayer"},
					{name: "playerControl", kind: "playerControl", onNext: "PlayNext", onPrev: "PlayPrev"}
				]
			});
			p.render();
			this.refresh();
			this.render();
			this.next();
			//this.setIndex(panelsCnt);

			//* start attaching the widget Finish event
			var _this = this;
			var playerCreatedTimer = setInterval(enyo.bind(this,function(){
				if(_this.$.player.eventNode !== undefined){
					clearInterval(playerCreatedTimer);
					_this.widget = SC.Widget(_this.$.player.eventNode.firstChild);
					_this.widget.bind(SC.Widget.Events.FINISH, function(){
						enyo.log('FINISH');
						_this.widget.load(_this.songUrls[_this.ar[++_this.songCtr]], {"auto_play": "true","maxheight": _this.screenHeight*0.6, "show_artwork": "true", "visual": "true"});
					});
					_this.widget.bind(SC.Widget.Events.READY, function(){
						enyo.log('READY');
						_this.widget.toggle();
					});
				}
			}), 500);
			//* end attaching the widget Finish event

		});
		ajax.error(this, function(inSender, inResponse) {
			enyo.log('ERRRRRRRRRRRRRRR trying next song');
			this.fetchEmbed(this.songUrls[this.ar[++this.songCtr]].uri);
		});
	},

	PlayNext: function(){
		this.widget.load(this.songUrls[this.ar[++this.songCtr]], {"auto_play": "true","maxheight": this.screenHeight*0.6, "show_artwork": "true", "visual": "true"});
	},
	PlayPrev: function(){
		if(this.songCtr !== 0){
			this.widget.load(this.songUrls[this.ar[--this.songCtr]], {"auto_play": "true","maxheight": this.screenHeight*0.6, "show_artwork": "true", "visual": "true"});
		}
	},

	getSearch: function(){
		var panelsCnt = this.getPanels().length;

		var p = this.createComponent({
			name: "CustomDisp",
			components:[
				{name: "searchQuery", kind: "Input", placeholder: "What do you want to listen!?",
					onchange:"inputChanged", classes: "Picker", style: "top: 35%"},
				{content: "Select the search criteria", classes: "selectText"},
				{name:"order", kind:"enyo.Select", classes: "Picker", onchange:"selectionChanged", components:[
					{content:"Hotness",value: "hotness"},
					{content:"Time",value: "created_at"}
				]},
				{name: "search", kind: "Button", content: "Search", classes: "SearchBtn", ontap: "getSearchRes"}
			]
		});
		p.render();

		this.refresh();
		this.render();
		//this.next();
		this.setIndex(panelsCnt);
	},

	getSearchRes: function(){
		console.log(this.$.order.getValue());
		console.log(this.$.searchQuery.getValue());

		var ajax = new enyo.Ajax({
			url: "https://api.soundcloud.com/tracks",
			cacheBust: false,
			contentType:"application/x-www-form-urlencoded",
			method:'GET',
			sync:false
		});
		ajax.go({consumer_key: '51087545c4a7d4b93cd0da48a51cb699', "format": "json", "q": this.$.searchQuery.getValue() ,"order": this.$.order.getValue(), "duration[from]": 120000});
		ajax.response(this, function(inSender, inResponse){
			console.log(inResponse);
			for (var i = 0; i < inResponse.length; i++) {
				this.songUrls.push(inResponse[i].uri);
				enyo.log(inResponse[i].duration);
			}
			this.XRandomise(this.songUrls.length);
			this.fetchEmbed(inResponse[this.ar[this.songCtr]].uri);
		});
	},

	getArtist: function(){
		var panelsCnt = this.getPanels().length;

		var p = this.createComponent({
			name: "ArtistDisp",
			components:[
				{kind: "enyo.sample.ListAroundSample", onArtistSelect: "artistSelected"}
			]
		});
		p.render();

		this.refresh();
		this.render();
		//this.next();
		this.setIndex(panelsCnt);
	},

	artistSelected: function(inSender, inEvent){
		console.log(inEvent.name);
		var ajax = new enyo.Ajax({
			url: "https://api.soundcloud.com/users/" + inEvent.id + "/tracks",
			cacheBust: false,
			contentType:"application/x-www-form-urlencoded",
			method:'GET',
			sync:false
		});
		ajax.go({consumer_key: '51087545c4a7d4b93cd0da48a51cb699', "format": "json", "duration[from]": 90000});
		ajax.response(this, function(inSender, inResponse){
			console.log(inResponse);
			for (var i = 0; i < inResponse.length; i++) {
				this.songUrls.push(inResponse[i].uri);
			}
			this.XRandomise(this.songUrls.length);
			this.fetchEmbed(inResponse[this.ar[this.songCtr]].uri);
		});
	}

});

enyo.kind({
	name: "MediaCards",
	kind: "FittableRows",
	style: "height: 100%;",
	components:[
		{name: "Header",style: "height: 18%; background: rgb(240, 232, 232);", content: "Xplore", classes: "header" },
		{name: "Main",fit: true, kind: "FittableColumns", components:[
			{name: "leftMargin", style: "width: 10%; background: rgb(240, 232, 232);"},
			{name: "Middle", style: "background-color: white", fit: true, kind: "FittableRows", components:[
				{name: "Row1", style:"height: 50%; background: white;", kind: "FittableColumns", components:[
					{name: "Random", style:"width:50%;", classes: "random", ontap: "getRandom"},
					{name: "Genre", style:"width:50%;", classes: "genre", ontap: "getGenre"}
				] },
				{name: "Row2", style:"height: 50%; background: white;", kind: "FittableColumns", components:[
					{name: "Artist", style:"width:50%;", classes: "artist", ontap: "getArtist"},
					{name: "Custom", style:"width:50%;", classes: "custom", ontap: "getSearch"}
				] }
			]},
			{name: "rightMargin", style: "width: 10%; background: rgb(240, 232, 232);"}
		]},
		{name: "Footer",style: "height: 12%; background: rgb(240, 232, 232);" }
	],
	events:{
		onRandomTap: "",
		onArtistTap: "",
		onGenreTap: "",
		onCustomTap: ""
	},
	getRandom: function(){
		this.doRandomTap();
	},
	getGenre: function(){
		this.doGenreTap();
	},
	getArtist: function(){
		this.doArtistTap();
	},
	getSearch: function(){
		this.doCustomTap();
	}

});

enyo.kind({
	name: "playerControl",
	classes: "playerControl",
	components: [
		//{name: "PlayPause", classes: "PlayPause", ontap: "PlayPause"},
		{name: "Prev", classes: "Prev", ontap: "Prev"},
		{name: "Volume", classes: "Volume", ontap: "Volume"},
		{name: "Next", classes: "Next", ontap: "Next"},
	],
	events:{
		//onPlayPause: "",
		onPrev: "",
		onNext: "",
	},
	PlayPause: function(){
		this.doPlayPause();
	},
	Prev: function(){
		this.doPrev();
	},
	Next: function(){
		this.doNext();
	},
});
