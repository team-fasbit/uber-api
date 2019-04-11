const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const tableSchema = new Schema({
}, {
        strict: false,
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    });
module.exports = mongoose.model('Transaction', tableSchema);