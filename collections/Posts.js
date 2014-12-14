Posts = new Mongo.Collection('posts');
Posts.attachSchema(new SimpleSchema({
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
    createdAt: {
        type: Date,
        label: 'Gemaakt',
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
        }
    },
    updatedAt: {
        type: Date,
        label: 'Laatst geüpdate',
        denyInsert: true,
        optional: true,
        autoValue: function () {
            if (this.isUpdate) {
                new new Date();
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
}));
