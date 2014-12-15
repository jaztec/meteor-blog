Handlebars.registerHelper('date', function (timestamp, format) {
    if (moment) {
        switch (format) {
        case 'full':
            return moment(timestamp).format('DD-MM-YYYY HH:mm:SS');
            break;
        case 'dateOnly':
            return moment(timestamp).format('DD-MM-YYYY');
            break;
        default:
            return timestamp.toLocaleString();
        }
    }
    return timestamp.toLocaleString();
});

Meteor.methods({
    goToHome: function () {
        Router.go('route.home');
    }
});
