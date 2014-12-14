Template.home.events({
    'click .post-edit-button': function () {
        Session.set('selectedPostId', this._id);
        Router.go('route.edit-post', {
            _id: this._id
        })
    },
    'click .post-row': function () {
        var slug = this.title.replace(/\s+/g, '-').toLowerCase();
        Router.go('route.view-post', {
            slug: slug,
            _id: this._id
        })
    }
});
