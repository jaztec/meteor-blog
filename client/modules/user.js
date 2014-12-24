Meteor.subscribe('users');

/**
 * Marks a certain field in the change password form to invalif with an error message
 * @param {Element} field
 * @param {String} errorMsg [description]
 */
var setPasswordErrorField = function (field, errorMsg) {
    field.parentNode.getElementsByTagName('span')[
            0].textContent =
        errorMsg;
    field.parentNode.attributes.class.value =
        field.parentNode.attributes.class.value +
        " has-error";
    field.value = "";
};

/**
 * Removes any error messages and notations from a field in the change password form
 * @param {Element} field
 * @param {Boolean} clearField True if the field value has to be cleared as well
 */
var clearPasswordErrorField = function (field, clearField) {
    field.parentNode.getElementsByTagName(
        'span')[0].textContent = "";
    field.parentNode.attributes.class.value =
        field.parentNode.attributes.class
        .value.replace("has-error", "");
    if (clearField) {
        field.value = "";
    }
}

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
    /**
     * Validate the password and change it when all validation succeeds.
     * @param  {Object} e The event
     * @param  {Object} tmpl Current template
     * @return {Boolean|undefined} Will return true on success, false on
     *                             failure or undefined when the changePassword
     *                             was submitted
     */
    'submit #user-profile-change-password': function (e, tmpl) {
        // Test if a user is logged in.
        if (!Meteor.userId()) {
            return false;
        }

        // Declare variables
        var proceed = true,
            oldPassword = $('input[name=oldPassword]')[0],
            newPassword = $('input[name=newPassword]')[0],
            newPassConfirm = $('input[name=newPasswordConfirm]')[0],
            userEmail = Meteor.user().emails[0].address,
            errorMsg = "";

        // Test if the fields match
        if (!newPassword.value.match(newPassConfirm.value)) {
            errorMsg =
                'Het nieuwe wachtwoord komt niet overeen met de verificatie'
            setPasswordErrorField(newPassConfirm, errorMsg);
            proceed = false;
        } else {
            clearPasswordErrorField(newPassConfirm);
        }

        // Test if the password can live up to our standards
        if (!newPassword.value.match(
                /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,15}$/)) {
            errorMsg =
                'Het wachtwoord moet tussen de 6 en 15 karakters lang zijn en tenminste \
                1 hoofdletter, 1 kleine letter een getal en geen spaties bevatten'
            setPasswordErrorField(newPassword, errorMsg);
            setPasswordErrorField(newPassConfirm, errorMsg);
            proceed = false;
        } else {
            clearPasswordErrorField(newPassword);
        }

        // If we already encountered errors we should stop now.
        if (!proceed) {
            return false;
        }

        // Change the password.
        Accounts.changePassword(
            oldPassword.value,
            newPassword.value,
            function (err) {
                // When no error was encountered we can notify the user and reset the form
                if (!err) {
                    Notifications.success(
                        "Het wachtwoord is gewijzigd");
                    $('#user-profile-change')[0].attributes
                        .class.value = $(
                            '#user-profile-change')[0].attributes
                        .class.value.replace(" in", "");
                    clearPasswordErrorField(oldPassword, true);
                    clearPasswordErrorField(newPassword, true);
                    clearPasswordErrorField(newPassConfirm,
                        true);
                    return true;
                }

                // Else an error has been encountered. We should mark the field as error.
                if (err.reason === "Incorrect password" ||
                    err.error === 403) {
                    errorMsg = 'Het wachtwoord is onjuist'
                } else {
                    console.log("An error occured:", err);
                    errorMsg =
                        'Het wachtwoord is niet gewijzigd. Fout: ' +
                        err.message;
                }
                setPasswordErrorField(oldPassword, errorMsg);
                Notifications.error(
                    errorMsg);
                return false;
            }
        );
    }
});

Template.userProfile.helpers({

});
