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
            Session.set('retrievedPost', modifier.$set);
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
