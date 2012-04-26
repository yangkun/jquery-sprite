$(function() {
	var googleOpts = {
		cellSize: [52,37],
		cells: [7, 7],
		initCell: [0,0],
		wrap: false,
		interval: 50
	};
	$('#animate span.google-sprite').each(function(i) {
		var sprite = $(this).sprite(googleOpts).hover(function() {
			sprite.go();
		},function() {
			sprite.revert();
		});
		sprite.row(i);
	});

	$('#swap span.google-sprite').each(function(i) {
		var sprite = $(this).sprite(googleOpts).hover(function() {
			sprite.col(6);
		},function() {
			sprite.col(0);
		});
		sprite.row(i);
	});

	var player = $('#player1').sprite({
		cellSize: [32,32],
		cells: [4, 3],
		initCell: [0,0],
		offset: [0, 0],
		wrap: true
	}).css({left: 0, top:0});

	var UP = 87,
		DOWN = 83,
		LEFT = 65,
		RIGHT = 68,
		direct = DOWN,
		speed = 4,
		prop = 'top',
		BOARD_WIDTH = 400,
		BOARD_HEIGHT = 200,
		char = false;

	$(window).keydown(function(e) {
		var key = e.which;
		console.log(key);
		if($.inArray(key, [UP,DOWN,LEFT,RIGHT]) >= 0) {
			if (key == direct) {
				player.next();
				var nextPos = parseInt(player.css(prop),10) + speed;
				if (prop == 'top') {
					if(nextPos < 0) nextPos = BOARD_HEIGHT - 1;
					player.css(prop, nextPos % BOARD_HEIGHT);
				} else if (prop == 'left') {
					if(nextPos < 0) nextPos = BOARD_WIDTH - 1;
					player.css(prop, nextPos % BOARD_WIDTH);
				}
			} else {
				switch(key) {
					case UP: player.row(3); speed = -4; prop = 'top'; break;
					case DOWN: player.row(0); speed = 4; prop = 'top'; break;
					case LEFT: player.row(1); speed = -4; prop = 'left'; break;
					case RIGHT: player.row(2); speed = 4; prop = 'left'; break;
				}
				direct = key;
			}
		} else if (key == 13) {
			char = !char;
			player.offset(char ? 93 : 0,0);
		}
	});
});
