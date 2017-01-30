/*
 * @author Joshua Miller <josh@thesitemill.com>
 */

Selectize.define('create_on_blur', function(options) {
		var self = this;

		options.text = options.text || function(option) {
			return option[this.settings.labelField];
		};

		this.onBlur = (function(e) {
			if (!this.items.length){
				if (typeof this.lastItem.title == "undefined"){
					this.lastItem.title = "";
				}
				if (this.currentResults.query == this.lastItem.title.toLowerCase()){
					this.addItem(this.lastItem.id);
				} else {
					var newOption = {};
					var title = this.currentResults.query;
					//newOption.categoryId = "_" + ((Math.random() * 9999999999999) + 9999999).toFixed(0);
					newOption.categoryId = "_" + (md5(title));
					newOption.title = title;
					newOption.parentTitle = "";
					this.addOption(newOption);
					this.addItem(newOption.categoryId);
				}
				this.close();
				this.refreshItems();
			}
		});
	});