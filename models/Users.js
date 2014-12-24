UserProfileSchema = new SimpleSchema({
    firstName: {
        type: String,
        regEx: /^[a-zA-Z-]{2,25}$/,
        optional: true,
        label: 'Voornaam'
    },
    lastName: {
        type: String,
        regEx: /^[a-zA-Z ]{2,25}$/,
        optional: true,
        label: 'Achternaam'
    },
    gender: {
        type: String,
        allowedValues: ['Man', 'Vrouw'],
        optional: true,
        label: 'Geslacht'
    },
    organization: {
        type: String,
        regEx: /^[a-z0-9A-z .]{3,30}$/,
        optional: true,
        label: 'Organisatie'
    },
    website: {
        type: String,
        regEx: SimpleSchema.RegEx.Url,
        optional: true
    },
    bio: {
        type: String,
        optional: true
    }
});

UserSchema = new SimpleSchema({
    username: {
        type: String,
        regEx: /^[a-z0-9A-Z_]{3,15}$/,
        label: "Gebruikersnaam"
    },
    emails: {
        type: [Object],
        optional: true
    },
    "emails.$.address": {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    "emails.$.verified": {
        type: Boolean
    },
    createdAt: {
        type: Date
    },
    profile: {
        type: UserProfileSchema,
        optional: true,
        label: 'Gebruikersprofiel'
    },
    services: {
        type: Object,
        optional: true,
        blackbox: true
    }
});

Meteor.users.attachSchema(UserSchema);
