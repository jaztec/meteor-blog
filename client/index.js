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

AutoForm.debug();

Template.home.helpers({
    posts: function () {
        Meteor.subscribe('posts');
        return Collections.Posts.find({});
    }
});
