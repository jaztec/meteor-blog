if (Meteor.App) {
    throw new Meteor.Error(
        'Meteor.App already defined? see client/lib/constants.js');
}

Meteor.App = {
    name: 'Jaztec Knowledge',
    description: 'A simple CMS'
};
