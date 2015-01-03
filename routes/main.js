Router.configure({
    layoutTemplate: 'mainLayout'
});

Router.route('/', function () {
    Router.go('route.home');
});

Router.route('/home', function () {
    SEO.setTitle('Welcome to the Jaztec Knowledge page');
    SEO.setMeta(
        'description',
        'Little bits of knowledge about some things I have done in the past and present'
    );
    this.render('home');
}, {
    name: 'route.home'
});
