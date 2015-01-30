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

Template.home.helpers({
    /**
     * Retrieve the posts from the server.
     * @return {Object[]} The posts this user us allowed to view.
     */
    posts: function () {
        var posts = PostsCollection.find({}),
            user;
        postsResult = posts.map(function (doc, index) {
            user = Meteor.users.findOne(doc.createdBy);
            doc.userName = user !== undefined ? user.username :
                "";
            return doc;
        });
        SEO.setTitle("Jaztec Knowledge Centre");
        SEO.setMeta('description',
            "Random things a stumbled upon and think are worth sharing"
        );
        return postsResult;
    }
});
