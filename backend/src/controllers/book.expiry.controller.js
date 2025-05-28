const IssuedBook = require('../models/issued.book');
const { sendEmail } = require('../utils/emailService');

const checkBookExpiry = async () => {
  const today = new Date();

  const booksExpiringSoon = await IssuedBook.find({
    status: "issued", // Check for books with 'issued' status
    dueDate: { $lte: new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000) },
  }).populate('user book');

  for (const record of booksExpiringSoon) {
    if (!record.dueDate || !(record.dueDate instanceof Date) || isNaN(record.dueDate)) {
      continue; // Skip if dueDate is missing or invalid
    }

    const userEmail = record.user.email;
    const bookTitle = record.book.title;

    const subject = `Book Expiry Reminder`;
    const message = `Dear ${record.user.name},\n\nYour book "${bookTitle}" will expire soon on ${record.dueDate.toDateString()}. Please return it on time.\n\nThanks,\nLibrary Management`;

    await sendEmail(userEmail, subject, message);
  }
};


module.exports = { checkBookExpiry };
