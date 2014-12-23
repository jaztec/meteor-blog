Meteor.subscribe('posts');

Template.registerHelper('selectedPostDoc', function () {
    var id = Session.get('selectedPostId'),
        post = PostsCollection.findOne(id),
        user = Meteor.users.findOne(post.createdBy);
    post.userName = user !== undefined ? user.username :
        "";;
    return post;
});

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
            PostsCollection.remove(this._id, function (err) {
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
    'click .post-revoke-button': function () {
        Meteor.call('publishPost', this._id, false);
        Notifications.warn('Artikel niet meer gepubliceerd');
    },
    'click .post-publish-button': function () {
        Meteor.call('publishPost', this._id, true);
        Notifications.info('Artikel gepubliceerd');
    }
});

Template.postMetaData.helpers({
    titleSizeHeader: function () {
        if (Router.current().route.getName() === 'route.home') {
            return false;
        }
        return true;
    }
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
         * @param  {Number} docId
         * @param  {Object} tmpl
         */
        insert: function (err, docId, tmpl) {
            if (err) {
                console.error("Insert Error:", err);
                Notifications.error(
                    'Er is een fout voorgevallen');
            } else {
                Notifications.info(
                    'Het artikel is opgeslagen');
                // Goto the view page, add a nice slug to the url
                Router.go('route.view-post', {
                    slug: 'new-post',
                    _id: docId
                });
            }
        },
        /**
         * Fires after updating an existing post
         * @param  {Object} err
         * @param  {Number} docId
         * @param  {Object} tmpl
         */
        update: function (err, docId, tmpl) {
            if (err) {
                console.error("Update Error:", err);
                Notifications.error(
                    'Er is een fout voorgevallen');
            } else {
                Notifications.info(
                    'Het artikel is opgeslagen');
            }
            // Goto the view page, add a nice slug to the url
            Router.go('route.view-post', {
                slug: 'editted-post',
                _id: Session.get('selectedPostId')
            });
        }
    }
});
