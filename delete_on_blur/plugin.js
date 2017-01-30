/*
 * @author Joshua Miller <josh@thesitemill.com>
 */

Selectize.define('delete_on_blur', function() {
		this.onBlur = (function(e) {
			if (!this.items.length) {
				this.$control_input.val("");
				this.updatePlaceholder();
			}
		});
	});