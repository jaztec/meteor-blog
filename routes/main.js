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
