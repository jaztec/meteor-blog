Meteor.subscribe('users');

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

Template.userInfo.events({
    'submit #user-profile-form': function (e, tmpl) {
        e.preventDefault();

        Router.go('route.user-profile');
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

Template.userProfile.events({
    'submit #user-profile-change-password': function (e, tmpl) {
        var proceed = true,
            oldPassword = $('input[name=oldPassword]')[0],
            newPassword = $('input[name=newPassword]')[0],
            newPassConfirm = $('input[name=newPasswordConfirm]')[0];

        if (!Meteor.userId()) {
            proceed = false;
        }

        if (newPassword.value !== newPassConfirm.value) {
            Notifications.error(
                'Het nieuwe wachtwoord komt niet overeen met de verificatie'
            );
            proceed = false;
        }
        if (newPassword.value.length < 9) {
            Notifications.error(
                'Het nieuwe wachtwoord is niet lang genoeg (8 karakters)'
            );
            proceed = false;
        }
        if (!proceed) {
            oldPassword.value = "";
            newPassword.value = "";
            newPassConfirm.value = "";
            return false;
        }

        Accounts.changePassword(oldPassword.value, newPassword.value,
            function (err) {
                if (!err) {
                    Notifications.success(
                        "Het wachtwoord is gewijzigd");
                    $('#user-profile-change')[0].attributes
                        .class.value = $(
                            '#user-profile-change')[0].attributes
                        .class.value.replace(" in", "");
                    return;
                }
                console.log("An error occured:", err);
                Notifications.error(
                    'Het wachtwoord is niet gewijzigd. Fout: ' +
                    err.message);
            });
        oldPassword.value = "";
        newPassword.value = "";
        newPasswordConfirm.value = "";
        return false;
    }
});

Template.userProfile.helpers({

});
