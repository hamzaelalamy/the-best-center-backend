const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const actualitesSchema = new Schema({
  title: {
    type: String,
    required: true,
    max: 64
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ["actualite", "evenement"]
  },
  eventDate: {
    type: Date,
    required: true,
  },
  image: {
    type: String,
  },
}, {
  toJSON: {
    transform(doc, ret) {
      delete ret.__v;
      delete ret.updatedAt;
    }
  }
}, {timestamps: true});

const Actualites = mongoose.model('Actualites', actualitesSchema);

module.exports = Actualites;