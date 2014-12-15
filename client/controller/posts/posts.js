Template.postMetaData.events({
    'click .post-edit-button': function () {
        // Send the browser to the edit page.
        Router.go('route.edit-post', {
            _id: this._id
        })
    },
    'click .post-delete-button': function () {
        if (!Meteor.userId()) {
            Notification.error(
                'Het is niet toegestaan om berichten te verwijderen'
            );
            return;
        }
        if (confirm(
                'Weet je zeker dat je dit artikel wilt verwijderen?'
            )) {
            // Delete the post
            Collections.Posts.remove(this._id, function (err) {
                if (err) {
                    console.error(err);
                    Notifications.error(
                        'Een fout is voorgevallen bij het verwijderen van het artikel'
                    );
                    return;
                }
                Notifications.warn('Artikel verwijderd');
            });
        } else {
            Notifications.info('Verwijderen geannuleerd');
        }
    },
});

Template.registerHelper('selectedPostDoc', function () {
    var id = Session.get('selectedPostId'),
        post = Collections.Posts.findOne(id);
    return post;
});

// Hooks for changing updatedate and stuff
AutoForm.addHooks(['add-post-form', 'edit-post-form'], {
    before: {
        /**
         * Fires before updating an existing record.
         * @param  {Number} docId
         * @param  {Object} modifier The document to be persisted
         * @param  {Object} tmpl
         */
        update: function (docId, modifier, tmpl) {
            return modifier;
        }
    },
    after: {
        /**
         * Fires after updating an existing post
         * @param  {Object} err
         * @param  {Number} result
         * @param  {Object} tmpl
         */
        insert: function (err, result, tmpl) {
            if (err) {
                console.error("Insert Error:", err);
                Notifications.error(
                    'Er is een fout voorgevallen');
            } else {
                Notifications.info(
                    'Het artikel is opgeslagen');
            }
        },
        /**
         * Fires after updating an existing post
         * @param  {Object} err
         * @param  {Number} result
         * @param  {Object} tmpl
         */
        update: function (err, result, tmpl) {
            if (err) {
                console.error("Update Error:", err);
                Notifications.error(
                    'Er is een fout voorgevallen');
            } else {
                Notifications.info(
                    'Het artikel is opgeslagen');
            }
        }
    }
});
