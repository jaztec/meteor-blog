Router.configure({
    layoutTemplate: 'mainLayout'
});

Router.route('/', function () {
    Router.go('route.home');
});

Router.route('/home', function () {
    this.render('home');
}, {
    name: 'route.home'
});

Router.route('/add-post', function () {
    this.render('addPost');
}, {
    name: 'route.add-post'
});

Router.route('/edit-post/:_id', function () {
    this.render('editPost');
}, {
    name: 'route.edit-post'
});

Router.route('/v/:slug/:_id', function () {
    Session.set('viewPostId', this.params._id);
    this.render('viewPost');
}, {
    name: 'route.view-post'
});
