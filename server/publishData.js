Meteor.publish("posts", function () {
    if (this.userId) {
        return Posts.find();
    }
    return Posts.find({
        published: true
    });
});
