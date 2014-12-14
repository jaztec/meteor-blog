Template.loginForm.events({
    'submit #login-form': function (e, tmpl) {
        var email = tmpl.find('#login-email').value,
            password = tmpl.find('#login-password').value;
        e.preventDefault();

        Meteor.loginWithPassword(
            email,
            password,
            function (err, b, c) {
                if (!err) {
                    return;
                }
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

        return false;
    }
});

Template.userInfo.helpers({
    emailAddress: function () {
        var user = Meteor.user();
        if (!user) {
            return 'Undefined';
        }
        return user.emails[0].address;
    }
});
