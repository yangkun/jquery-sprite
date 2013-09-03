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
 * http://ghophp.github.io/
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
				offx = opts.offset[0],
				offy = opts.offset[1],
				timer = null;

		// PUBLIC FUNCTIONS
		this.next = function() {

			var last = false;
			if (opts.vertical === true){
				last = row + 1 > ys -1;
				row = !last ? row+1 : 0;
			}else{
				last = col + 1 > xs -1;
				col = !last ? col+1 : 0;
			}
			_setSprite(base,row,col,last);
		};
		this.prev = function() {

			var last = false;
			if (opts.vertical === true){
				last = row - 1 < 0;
				row = !last ? row-1 : 0;
			}else{
				last = col - 1 < 0;
				col = !last ? col-1 : 0;
			}
			_setSprite(base,row,col,last);
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
		this.cell = function(r,c) {
			row = r;
			col = c;
			_setSprite(base, row, col, false);
		};
		this.row = function(r) {
			if (r > ys - 1) r = (opts.wrap) ? 0 : ys - 1;
			if (r < 0) r = (opts.wrap) ? ys -1 : 0;
			this.cell(r,0);
		};
		this.col = function(c) {
			if (c > xs - 1) c = (opts.wrap) ? 0 : xs - 1;
			if (c < 0) c = (opts.wrap) ? xs -1 : 0;
			this.cell(row,c);
		};
		this.offset = function(x,y) {
			offx = x;
			offy = y;
			_setSprite(0,0,false);
		};
		return this.each(function(index, el) {
			var $this = $(this);
			// apply css as cell options
			$this.css({'width':w, 'height':h});
			if($this.css('display') == 'inline') $this.css('display', 'inline-block');
			_setSprite(this, row, col, false, (opts.offsInitial ? true : false));
		});

		function _setSprite(el, row, col, last, initial) {

			if(last) {
				opts.complete();
				if(!opts.wrap) {
					base.stop();
					return;
				}
			}

			initial = typeof initial !== 'undefined' ? initial : true;//default value for initial offset
			var x = (-1 * ((w * col) + (initial ? 0 :offx ) )),
				y = (-1 * ((h * row) + (initial ? 0 :offy ) ));
			
			$(el).css('background-position', x + 'px ' + y + 'px');
		}
	};
	// default options
	$.fn.sprite.defaults = {
		cellSize: [0,0], // width, height
		cells: [1,1], // count of [rows, cols]
		initCell: [0,0], // init cell [row, col]
		offset: [0,0], // sprite's offset [x,y]
		interval: 50, // animate speed
		offsInitial: false,//offset initial sprite
		vertical: false, //vertical animation
		wrap: true,
		complete: function() {}
	};

})(jQuery);