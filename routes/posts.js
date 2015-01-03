Router.route('/add-post', function () {
    SEO.setTitle('Artikel toevoegen');
    SEO.setMeta('description', 'Toevoegen van artikelen aan het blog');
    this.render('addPost');
}, {
    name: 'route.add-post',
    onBeforeAction: function (hook, options) {
        if (!Meteor.userId()) {
            this.render('notAllowed');
        } else {
            this.next();
        }
    }
});

Router.route('/edit-post/:_id', function () {
    Session.set('selectedPostId', this.params._id);
    this.render('editPost');
}, {
    name: 'route.edit-post',
    onBeforeAction: function (hook, options) {
        if (!Meteor.userId()) {
            this.render('notAllowed');
        } else {
            this.next();
        }
    }
});

Router.route('/v/:slug/:_id', function () {
    Session.set('selectedPostId', this.params._id);
    this.render('viewPost');
}, {
    name: 'route.view-post'
});
