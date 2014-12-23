Meteor.subscribe('categories');

Template.categoriesListing.helpers({
    categories: function () {
        return CategoriesCollection.find();
    }
});
