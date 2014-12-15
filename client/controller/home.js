Template.home.events({
    'click .post-edit-button': function () {
        // Send the browser to the edit page.
        Router.go('route.edit-post', {
            _id: this._id
        })
    },
    'click .post-delete-button': function () {
        if (!Meteor.userId()) {
            Notification.error(
                'Het is niet toegestaan om berichten te verwijderen'
            );
            return;
        }
        // Delete the post
        Collections.Posts.remove(this._id);
        Notifications.info('Artikel verwijderd');
    },
    'click .post-row': function () {
        // Goto the view page, add a nice slug to the url
        var slug = this.title.replace(/\s+/g, '-').toLowerCase();
        Router.go('route.view-post', {
            slug: slug,
            _id: this._id
        })
    }
});

Meteor.subscribe('posts');

Template.home.helpers({
    /**
     * Retrieve the posts from the server.
     * @return {Object[]} The posts this user us allowed to view.
     */
    posts: function () {
        return Collections.Posts.find({});
    }
});

Meteor.startup(function () {
    // Remove notifications after 3 seconds.
    _.extend(Notifications.defaultOptions, {
        timeout: 3000
    });
});
