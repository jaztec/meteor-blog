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
