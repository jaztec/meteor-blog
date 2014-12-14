Template.editPost.helpers({
    selectedPostDoc: function () {
        if (Session.equals('retrievedPostId', Session.get(
                'selectedPostId'))) {
            return Session.get('retrievedPost');
        }
        var doc = Collections.Posts.findOne(
            Session.get(
                'selectedPostId'
            )
        );
        Session.set('retrievedPostId', doc._id);
        Session.set('retrievedPost', doc);

        return doc;
    }
});

Template.viewPost.helpers({
    post: function () {
        if (Session.equals('retrievedPostId', Session.get(
                'viewPostId'))) {
            return Session.get('retrievedPost');
        }
        var post = Collections.Posts.findOne(
            Session.get(
                'viewPostId'
            )
        );
        Session.set('retrievedPostId', post._id);
        Session.set('retrievedPost', post);

        return post;
    }
});

Template.viewPost.events({
    'click #back-to-overview': function () {
        Router.go('route.home');
    }
});
