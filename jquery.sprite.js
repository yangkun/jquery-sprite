/**
 * A jQuery plugin for sprite animation
 *
 * Version 1.0
 * 2012-03-22
 *
 * Copyright (c) 2006 Luke Lutman (http://www.lukelutman.com)
 * Dual licensed under the MIT and GPL licenses.
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.opensource.org/licenses/gpl-license.php
 *
 * http://guny.kr
 */
;(function($) {
	$.fn.sprite = function(options) {
		var base = this,
				opts = $.extend(true, {}, $.fn.sprite.defaults, options || {}),
				w = opts.cellSize[0],
				h = opts.cellSize[1],
				ys = opts.cells[0],
				xs = opts.cells[1],
				row = opts.initCell[0],
				col = opts.initCell[1],
				timer = null;

		// PUBLIC FUNCTIONS
		this.next = function() {
			var lookup = col + 1;
			if (lookup > xs -1) {
				if(!opts.wrap) {
					base.stop();
					return;
				}
				lookup = 0;
			}
			col = lookup;
			_setSprite(base,row,col);
		};

		this.prev = function() {
			var lookup = col - 1;
			if (lookup < 0) {
				if(!opts.wrap) {
					base.stop();
					return;
				}
				lookup = xs - 1;
			}
			col = lookup;
			_setSprite(base,row,col);
		};

		this.go = function() {
			if(timer) base.stop();
			if(!timer) timer = setInterval(this.next, opts.interval);
		};

		this.revert = function() {
			if(timer) base.stop();
			if(!timer) timer = setInterval(this.prev, opts.interval);
		};

		this.stop = function() {
			if(timer) {
				clearTimeout(timer);
				timer = null;
			}
		};

		return this.each(function(index, el) {
			var $this = $(this);
			// apply css as cell options
			$this.css({'width':w, 'height':h});
			if($this.css('display') == 'inline') $this.css('display', 'inline-block');
			_setSprite(this, row, col);
		});

		function _setSprite(el, row, col) {
			$(el).css({
				'background-position-x': ((-1 * w * col) + opts.offset[0]) + 'px',
				'background-position-y': ((-1 * h * row) + opts.offset[1]) + 'px'
			});
		}
	};
	// default options
	$.fn.sprite.defaults = {
		cellSize: [0,0], // width, height
		cells: [1,1], // count of [rows, cols]
		initCell: [0,0], // init cell [row, col]
		offset: [0,0], // sprite's offset [x,y]
		interval: 50, // animate speed
		wrap: true
	};

})(jQuery);