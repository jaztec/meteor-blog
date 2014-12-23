Meteor.publish("posts", function () {
    if (this.userId) {
        return PostsCollection.find();
    }
    return PostsCollection.find({
        published: true
    });
});

Meteor.publish("categories", function () {
    if (this.userId) {
        return CategoriesCollection.find();
    }
    returnCategoriesCollection.find({
        published: true
    });
});
