CategoriesSchema = new SimpleSchema({
    name: {
        type: String,
        label: 'Naam',
        max: 255
    },
    description: {
        type: String,
        label: 'Omschrijving',
        max: 511
    },
    parent: {
        type: String,
        max: 511,
        optional: true
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
    published: {
        type: Boolean,
        label: 'Publiceren'
    }
});

CategoriesCollection = new Mongo.Collection('categories');
CategoriesCollection.attachSchema(CategoriesSchema);
