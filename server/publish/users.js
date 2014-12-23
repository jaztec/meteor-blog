Meteor.publish("users", function () {
    if (this.userId) {
        Meteor.users.allow({
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
        return Meteor.users.find();
    }
    return Meteor.users.find({}, {
        fields: {
            username: 1
        }
    });
});
