enyo.kind({
	name: "enyo.sample.ListAroundSample",
	kind: "FittableRows",
	classes: "enyo-fit enyo-unselectable",
	components: [
		{name: "list", kind: "List", classes: "list-sample-around", fit: true, touch:true, ontap: "ArtistSelected", onSetupItem: "setupItem", components: [
			{name: "divider", classes: "list-sample-around-divider"},
			{name: "item", kind: "AroundListContactItem", classes: "list-sample-around-item enyo-border-box"},
		]},
	],
	events:{
		onArtistSelect: ""
	},

	artists: [
		{
			name: "Raghu Dixit",
			avatar: "https://i1.sndcdn.com/avatars-000060922235-xcg19p-large.jpg?435a760",
			id: "1710745",
			country: "India"
		},
		{
			name: "Lorde",
			avatar: "https://i1.sndcdn.com/avatars-000026090656-utpgs7-large.jpg?435a760",
			id: "27622444",
			country: "New Zealand"
		},
		{
			name: "Pitbull",
			avatar: "https://i1.sndcdn.com/avatars-000070301787-m10nps-large.jpg?435a760",
			id: "9942298",
			country: "United States"
		},
		{
			name: "Rihanna",
			avatar: "https://i1.sndcdn.com/avatars-000032005423-4jevhv-large.jpg?435a760",
			id: "7081873",
			country: "United States"
		},
		{
			name: "Pharrell Williams",
			avatar: "https://i1.sndcdn.com/avatars-000071457794-5hsuiv-large.jpg?435a760",
			id: "60285198",
			country: "United States"
		},
		/*{
			name: "Justin Timberlake",
			avatar: "https://i1.sndcdn.com/avatars-000015283631-n16djd-large.jpg?435a760",
			id: "16948903",
			country: "United States"
		},*/
		{
			name: "Mike Shinoda",
			avatar: "https://i1.sndcdn.com/avatars-000013026644-mqi235-large.jpg?435a760",
			id: "541787",
			country: "United States"
		},
		{
			name: "Avicii",
			avatar: "https://i1.sndcdn.com/avatars-000038735777-c6m3tq-large.jpg?435a760",
			id: "1861068",
			country: "Sweden"
		},
		{
			name: "John Legend",
			avatar: "https://i1.sndcdn.com/avatars-000051492568-pvqlfa-large.jpg?435a760",
			id: "1358400",
			country: "United States"
		},
		{
			name: "AWOLNATION",
			avatar: "https://i1.sndcdn.com/avatars-000002840895-iqj48k-large.jpg?435a760",
			id: "165530",
			country: "United States"
		},
		{
			name: "Britney Spears",
			avatar: "https://i1.sndcdn.com/avatars-000058917494-wns9sd-large.jpg?435a760",
			id: "3349708",
			country: "United States"
		},
		{
			name: "Big Sean",
			avatar: "https://i1.sndcdn.com/avatars-000045695469-ad9cpe-large.jpg?435a760",
			id: "4803918",
			country: "United States"
		},
		{
			name: "American Authors",
			avatar: "https://i1.sndcdn.com/avatars-000043237522-jesqy0-large.jpg?435a760",
			id: "17637357",
			country: "United States"
		},
		/*{
			name: "Random",
			avatar: "https://i1.sndcdn.com/avatars-000015808476-eldxfo-large.jpg?435a760",
			id: "17474388",
			country: "WORLD"
		},*/
	],

	ArtistSelected: function(inSender, inEvent){
		this.doArtistSelect(this.db[inEvent.rowIndex]);
	},

	rendered: function() {
		this.inherited(arguments);
		this.populateList();
	},
	setupItem: function(inSender, inEvent) {
		var i = inEvent.index;
		var data = this.filter ? this.filtered : this.db;
		var item = data[i];
		// content
		this.$.item.setContact(item);
		// selection
		this.$.item.setSelected(inSender.isSelected(i));
		// divider
		if (!this.hideDivider) {
			var d = item.name[0];
			var prev = data[i-1];
			var showd = d != (prev && prev.name[0]);
			this.$.divider.setContent(d);
			this.$.divider.canGenerate = showd;
			this.$.item.applyStyle("border-top", showd ? "none" : null);
		}
	},

	populateList: function() {
		this.createDb(this.artists.length);

		this.$.list.setCount(this.db.length);
		//this.$.list.setRowsPerPage(50);

		this.hideDivider = false;
		this.$.divider.canGenerate = !this.hideDivider;

		this.$.list.reset();
		//this.$.list.scrollToContentStart();
	},
	createDb: function(inCount) {
		this.db = [];
		for (var i=0; i<inCount; i++) {
			this.db.push(this.artists[i]);
		}
		this.sortDb();
	},
	sortDb: function() {
		this.db.sort(function(a, b) {
			if (a.name < b.name) return -1;
			else if (a.name > b.name) return 1;
			else return 0;
		});
	},
});

// It's convenient to create a kind for the item we'll render in the contacts list.
enyo.kind({
	name: "AroundListContactItem",
	components: [
		{name: "avatar", kind: "Image", classes: "list-sample-around-avatar"},
		{components: [
			{name: "name", classes: "list-sample-around-name"},
			{name: "id", classes: "list-sample-around-description"},
			{name: "country", classes: "list-sample-around-description"}
		]},
	],
	setContact: function(inContact) {
		this.$.name.setContent(inContact.name);
		this.$.avatar.setSrc(inContact.avatar);
		this.$.id.setContent(inContact.id);
		this.$.country.setContent(inContact.country);
	},
	setSelected: function(inSelected) {
		this.addRemoveClass("list-sample-around-item-selected", inSelected);
	},
});