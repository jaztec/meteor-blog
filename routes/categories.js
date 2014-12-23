Router.route('/add-category', function () {
    this.render('addCategory');
}, {
    name: 'route.add-category',
    onBeforeAction: function (hook, options) {
        if (!Meteor.userId()) {
            this.render('notAllowed');
        } else {
            this.next();
        }
    }
});
