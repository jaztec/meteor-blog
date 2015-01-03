Router.route('/add-category', function () {
    SEO.setTitle('Categorie toevoegen');
    SEO.setMeta('description', 'Toevoegen van categorien aan het blog');
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
