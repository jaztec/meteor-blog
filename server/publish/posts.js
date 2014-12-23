Meteor.publish("posts", function () {
    if (this.userId) {
        PostsCollection.allow({
            insert: function (userId, post) {
                return true;
            },
            update: function (userId, post) {
                return true;
            },
            remove: function (userId, post) {
                return true;
            }
        });
        return PostsCollection.find();
    }
    return PostsCollection.find({
        published: true
    });
});
