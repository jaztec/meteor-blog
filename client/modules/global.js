Template.registerHelper('hideForRelease', function () {
    return true;
})

Template.mainLayout.events({
    'click .go-to-home': function () {
        Router.go('route.home');
    },
    'click .go-back': function () {
        // Call HTML5 history object
        history.back();
    }
});
