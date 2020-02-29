(function($) {

	var $window = $(window),
		$body = $('body'),
		$wrapper = $('#wrapper'),
		$main = $('#main'),
		$panels = $main.children('.panel'),
		$practicles = $('#particles-js'),
		$nav = $('#nav'), $nav_links = $nav.children('a')
		$x = $('.cancel'), $overlay = $('.overlay'), $projects = $('.project'),
		$Werewolf = $('#Werewolf'), $COPE = $('#COPE'), $PingPong = $('#PingPong'), 
		$SlidingPuzzle = $('#SlidingPuzzle'), $MouseController = $('#MouseController'), $Graphing = $('#Graphing');

	// Breakpoints.
		breakpoints({
			xlarge:  [ '1281px',  '1680px' ],
			large:   [ '981px',   '1280px' ],
			medium:  [ '737px',   '980px'  ],
			small:   [ '361px',   '736px'  ],
			xsmall:  [ null,      '360px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Nav.
		$nav_links
			.on('click', function(event) {

				var href = $(this).attr('href');

				// Not a panel link? Bail.
					if (href.charAt(0) != '#'
					||	$panels.filter(href).length == 0)
						return;

				// Prevent default.
					event.preventDefault();
					event.stopPropagation();

				// Change panels.
					if (window.location.hash != href)
						window.location.hash = href;

			});

	// Panels.

		// Initialize.
			(function() {

				var $panel, $link;

				// Get panel, link.
					if (window.location.hash) {

				 		$panel = $panels.filter(window.location.hash);
						$link = $nav_links.filter('[href="' + window.location.hash + '"]');

					}

				// No panel/link? Default to first.
					if (!$panel
					||	$panel.length == 0) {

						$panel = $panels.first();
						$link = $nav_links.first();

					}

				// Deactivate all panels except this one.
					$panels.not($panel)
						.addClass('inactive')
						.hide();

				// Activate link.
					$link
						.addClass('active');

				// Reset scroll.
					$window.scrollTop(0);

			})();

		// Hashchange event.
			$window.on('hashchange', function(event) {

				var $panel, $link;

				// Get panel, link.
					if (window.location.hash) {

				 		$panel = $panels.filter(window.location.hash);
						$link = $nav_links.filter('[href="' + window.location.hash + '"]');

						// No target panel? Bail.
							if ($panel.length == 0)
								return;

					}

				// No panel/link? Default to first.
					else {

						$panel = $panels.first();
						$link = $nav_links.first();

					}

				// Deactivate all panels.
					$panels.addClass('inactive');

				// Deactivate all links.
					$nav_links.removeClass('active');

				// Activate target link.
					$link.addClass('active');

				// Set max/min height.
					$main
						.css('max-height', $main.height() + 'px')
						.css('min-height', $main.height() + 'px');

				// Delay.
					setTimeout(function() {

						// Hide all panels.
							$panels.hide();

						// Show target panel.
							$panel.show();

						// Set new max/min height.
							$main
								.css('max-height', $panel.outerHeight() + 'px')
								.css('min-height', $panel.outerHeight() + 'px');

						// Reset scroll.
							$window.scrollTop(0);

						// Delay.
							window.setTimeout(function() {

								// Activate target panel.
									$panel.removeClass('inactive');

								// Clear max/min height.
									$main
										.css('max-height', '')
										.css('min-height', '');

								// IE: Refresh.
									$window.triggerHandler('--refresh');

								// Unlock.
									locked = false;

							}, (breakpoints.active('small') ? 0 : 500));

					}, 250);

			});

	// IE: Fixes.
		if (browser.name == 'ie') {

			// Fix min-height/flexbox.
				$window.on('--refresh', function() {

					$wrapper.css('height', 'auto');

					window.setTimeout(function() {

						var h = $wrapper.height(),
							wh = $window.height();

						if (h < wh)
							$wrapper.css('height', '100vh');

					}, 0);

				});

				$window.on('resize load', function() {
					$window.triggerHandler('--refresh');
				});

			// Fix intro pic.
				$('.panel.intro').each(function() {

					var $pic = $(this).children('.pic'),
						$img = $pic.children('img');

					$pic
						.css('background-image', 'url(' + $img.attr('src') + ')')
						.css('background-size', 'cover')
						.css('background-position', 'center');

					$img
						.css('visibility', 'hidden');

				});

		}

		// Close 
			$x.on('click', function(e) {
				console.log("clicked");
				$overlay.fadeTo('slow', 0);
				$overlay.css('z-index', -1);
				$wrapper.fadeTo('fast', 1);
				$wrapper.css('z-index', 999);
				$Werewolf.css('display', 'none');
				$COPE.css('display', 'none');
				$PingPong.css('display', 'none');
				$SlidingPuzzle.css('display', 'none');
				$MouseController.css('display', 'none');
				$Graphing.css('display', 'none');
			});


		// View project
			$projects.on('click', function(e) {
				console.log("view project");
				switch ($(this).attr('id')) {
					case 'aWerewolf':
						$Werewolf.css('display', 'block');
						break;
					case 'aCOPE':
						$COPE.css('display', 'block');
						break;
					case 'aPingPong':
						$PingPong.css('display', 'block');
						break;
					case 'aSlidingPuzzle':
						$SlidingPuzzle.css('display', 'block');
						break;
					case 'aMouseController':
						$MouseController.css('display', 'block');
						break;
					case 'aGraphing':
						console.log($Graphing);
						$Graphing.css('display', 'block');
						break;
				}
				$overlay.fadeTo('slow', 1);
				$overlay.css('z-index', 999);
				$wrapper.fadeTo(1, 0);
				$wrapper.css('z-index', 0);
			});


		particlesJS('particles-js', {
			"particles": {
			"number": {
				"value": 80,
				"density": {
				"enable": true,
				"value_area": 800
				}
			},
			"color": {
				"value": "#ffffff"
			},
			"shape": {
				"type": "circle",
				"stroke": {
				"width": 0,
				"color": "#000000"
				},
				"polygon": {
				"nb_sides": 5
				},
				"image": {
				"src": "img/github.svg",
				"width": 100,
				"height": 100
				}
			},
			"opacity": {
				"value": 0.5,
				"random": false,
				"anim": {
				"enable": false,
				"speed": 1,
				"opacity_min": 0.1,
				"sync": false
				}
			},
			"size": {
				"value": 5,
				"random": true,
				"anim": {
				"enable": false,
				"speed": 40,
				"size_min": 0.1,
				"sync": false
				}
			},
			"line_linked": {
				"enable": true,
				"distance": 150,
				"color": "#ffffff",
				"opacity": 0.4,
				"width": 1
			},
			"move": {
				"enable": true,
				"speed": 6,
				"direction": "none",
				"random": false,
				"straight": false,
				"out_mode": "out",
				"attract": {
				"enable": false,
				"rotateX": 600,
				"rotateY": 1200
				}
			}
			},
			"interactivity": {
			"detect_on": "canvas",
			"events": {
				"onhover": {
				"enable": true,
				"mode": "repulse"
				},
				"onclick": {
				"enable": true,
				"mode": "push"
				},
				"resize": true
			},
			"modes": {
				"grab": {
				"distance": 400,
				"line_linked": {
					"opacity": 1
				}
				},
				"bubble": {
				"distance": 400,
				"size": 40,
				"duration": 2,
				"opacity": 8,
				"speed": 3
				},
				"repulse": {
				"distance": 200
				},
				"push": {
				"particles_nb": 4
				},
				"remove": {
				"particles_nb": 2
				}
			}
			},
			"retina_detect": true,
			"config_demo": {
			"hide_card": false,
			"background_color": "#b61924",
			"background_image": "",
			"background_position": "50% 50%",
			"background_repeat": "no-repeat",
			"background_size": "cover"
			}
		});
		
})(jQuery);