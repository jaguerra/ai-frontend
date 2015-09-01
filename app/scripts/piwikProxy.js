define([], function(){
  'use strict';

	var global = window;

	var piwikProxy = (function() {
		var trackers = [],
			queue = [];

		function addTracker(tracker) {
			trackers.push(tracker);
		}

		function isTrackerAvailable() {
			return trackers.length > 0;
		}

		function executeCommand(fn, args) {
			var ln = trackers.length,
				i = 0;
			for (i=0; i < ln; i++) {
				trackers[i][fn].apply(global, args);
			}
		}

		function enqueueCommand(fn, args) {
			queue.push({
				fn: fn,
				args: args
			});
		}

		function command(fn, args) {
			if (isTrackerAvailable()) {
				executeCommand(fn, args);
			} else {
				enqueueCommand(fn, args);
			}
		}

		function flushQueue() {
			var commandObj = {};
			if (isTrackerAvailable()) {
				while (queue.length > 0) {
					commandObj = queue.pop();
					executeCommand( commandObj.fn, commandObj.args);
				}
			}
		}

		function trackEvent() {
			command('trackEvent', [].slice.apply(arguments));
		}

		return {
			addTracker: addTracker,
			flushQueue: flushQueue,
			trackEvent: trackEvent
		};
	}());

	global.PiwikProxy = piwikProxy;
	return piwikProxy;

});
