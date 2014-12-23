Meteor.publish("categories", function () {
    if (this.userId) {
        CategoriesCollection.allow({
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
        return CategoriesCollection.find();
    }
    return CategoriesCollection.find({
        published: true
    });
});
