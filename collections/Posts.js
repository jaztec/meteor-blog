Schemas = {};

Schemas.Posts = new SimpleSchema({
    title: {
        type: String,
        label: 'Titel',
        max: 255
    },
    description: {
        type: String,
        label: 'Omschrijving',
        max: 511
    },
    createdBy: {
        type: String,
        max: 255,
        autoValue: function () {
            if (this.isInsert) {
                return this.userId;
            } else if (this.isUpsert) {
                return {
                    $setOnInsert: this.userId
                };
            } else {
                this.unset();
            }
        },
        autoform: {
            afFieldInput: {
                type: 'hidden'
            }
        }

    },
    createdAt: {
        type: Date,
        label: 'Geplaatst',
        denyInsert: true,
        autoValue: function () {
            if (this.isInsert) {
                return new Date();
            } else if (this.isUpsert) {
                return {
                    $setOnInsert: new Date()
                };
            } else {
                this.unset();
            }
        },
        autoform: {
            afFieldInput: {
                type: 'hidden'
            }
        }
    },
    updatedAt: {
        type: Date,
        label: 'Laatst geüpdate',
        optional: true,
        autoValue: function () {
            if (this.isUpdate) {
                return new Date();
            }
        }
    },
    content: {
        type: String,
        label: 'Artikel',
        max: 8195,
        autoform: {
            afFieldInput: {
                type: 'textarea',
                rows: 10,
                class: 'edit'
            }
        }
    },
    published: {
        type: Boolean,
        label: 'Publiceren'
    }
});

Collections = {};

Posts = Collections.Posts = new Mongo.Collection('posts');
Posts.attachSchema(Schemas.Posts);
