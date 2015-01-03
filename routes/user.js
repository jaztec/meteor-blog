Router.route('/user-profile', function () {
    SEO.setTitle('Gebruikersprofiel bewerken');
    SEO.setMeta(
        'description',
        'Wijzigen van het gebruikersprofiel en het wachtwoord');
    this.render('userProfile');
}, {
    name: 'route.user-profile'
});
