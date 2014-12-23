Meteor.publish("posts", function () {
    if (this.userId) {
        return PostsCollection.find();
    }
    return PostsCollection.find({
        published: true
    });
});
