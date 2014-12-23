Meteor.startup(function () {
    // Remove notifications after 3 seconds.
    _.extend(Notifications.defaultOptions, {
        timeout: 3000
    });
});
