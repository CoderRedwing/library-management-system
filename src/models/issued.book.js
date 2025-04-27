const mongoose = require('mongoose');

const issuedBookSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },

    issueDate: {
        type: Date,
        default: Date.now,
    },

    dueDate: {
        type: Date,
        required: true
    },

    returnDate: { type: Date },
    status: { 
        type: String, 
        enum: ['issued', 'returned', 'expired'], 
        default: 'issued' 
    }
    
}, { timestamps: true });

const IssueBook = mongoose.model('IssueBook', issuedBookSchema);

module.exports = IssueBook;