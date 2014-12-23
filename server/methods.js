Meteor.methods({
    /**
     * @param {String}  id The Mongo id of the to be altered post
     * @param {Boolean} publish Publish the post yes/no
     */
    publishPost: function (id, publish) {
        PostsCollection.update({
            _id: id
        }, {
            $set: {
                published: publish
            }
        });
    }
});
