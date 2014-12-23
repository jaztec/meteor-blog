Template.loginForm.events({
    'submit #login-form': function (e, tmpl) {
        var email = tmpl.find('#login-email'),
            password = tmpl.find('#login-password');
        e.preventDefault();

        Meteor.loginWithPassword(
            email.value,
            password.value,
            function (err, b, c) {
                if (!err) {
                    Notifications.success('Ingelogd');
                    return;
                }
                Notifications.error('Gebruiker niet bekent');
            }
        );

        return false;
    }
});

Template.logoutForm.events({
    'submit #logout-form': function (e, tmpl) {
        e.preventDefault();
        Meteor.logout(function (err) {
            if (!err) {
                return
            }
        });

        Router.go('route.home');
        return false;
    }
});

Template.userInfo.helpers({
    emailAddress: function () {
        var user = Meteor.user();
        if (!user || !user.emails) {
            return 'Uitloggen...';
        }
        return user.emails[0].address;
    }
});