Meteor.publish("posts", function () {
    if (this.userId) {
        return Collections.Posts.find();
    }
    return Collections.Posts.find({
        published: true
    });
});
