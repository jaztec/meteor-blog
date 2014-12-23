Template.home.events({
    'click .post-row': function () {
        // Goto the view page, add a nice slug to the url
        var slug = this.title.replace(/\s+/g, '-').toLowerCase();
        Router.go('route.view-post', {
            slug: slug,
            _id: this._id
        })
    }
});

Template.mainLayout.events({
    'click .go-to-home': function () {
        Router.go('route.home');
    },
    'click .go-back': function () {
        // Call HTML5 history object
        history.back();
    }
});

Meteor.subscribe('posts');

Template.home.helpers({
    /**
     * Retrieve the posts from the server.
     * @return {Object[]} The posts this user us allowed to view.
     */
    posts: function () {
        return PostsCollection.find({});
    }
});

Meteor.startup(function () {
    // Remove notifications after 3 seconds.
    _.extend(Notifications.defaultOptions, {
        timeout: 3000
    });
});

Template.registerHelper('hideForRelease', function () {
    return true;
})
