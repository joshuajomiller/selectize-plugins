/*
 * @author Joshua Miller <josh@thesitemill.com>
 */

Selectize.define('restore_on_click', function(options) {
        
		var self = this;

		options.text = options.text || function(option) {
			return option[this.settings.labelField];
		};

		this.onMouseDown = (function() {
			var original = self.onMouseDown;
			return function(e) {
				var index, option;
				//save last item value
				if (typeof this.items[0] != "undefined" && typeof this.lastItem.id != "undefined") {
					this.lastItem.id = this.items[0];
					this.lastItem.title = this.options[this.lastItem.id].title;
				}

				e.preventDefault();
                index = this.caretPos - 1;
                var $input = this.$control_input;
                option = this.options[this.items[index]];
                if (this.deleteSelection(e)) {
                    this.setTextboxValue(options.text.apply(this, [option]));
                    this.refreshOptions(true);
                }
                $input.select();
			};
		})();

		this.onBlur = (function(e) {
            var addFlag = false;
            if (this.items.length){
                this.lastItem = this.items[0];
                addFlag = true;
            } else if (this.currentResults.items.length == 1){
                this.lastItem = this.currentResults.items[0].id;
                addFlag = true;
            } else {
                this.close();
            }
            if (addFlag) {
                this.addItem(this.lastItem);
                this.close();
                this.refreshItems();
            }
		});
	});