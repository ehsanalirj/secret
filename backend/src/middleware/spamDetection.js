// Simple spam/abuse detection middleware for reviews
const SPAM_KEYWORDS = ['spam', 'scam', 'abuse', 'fake', 'offensive'];

function detectSpam(req, res, next) {
  const comment = req.body.comment || '';
  const found = SPAM_KEYWORDS.find(word => comment.toLowerCase().includes(word));
  if (found) {
    req.isSpam = true;
    req.spamReason = `Contains banned word: ${found}`;
  }
  next();
}

export default detectSpam;
