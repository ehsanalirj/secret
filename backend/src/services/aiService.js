// Simple AI service for review moderation and suggestions (demo)

// Sentiment analysis (very basic demo)
export function analyzeSentiment(text) {
  const positiveWords = ['good', 'great', 'excellent', 'love', 'amazing', 'awesome'];
  const negativeWords = ['bad', 'terrible', 'hate', 'awful', 'poor', 'worst'];
  let score = 0;
  for (const word of positiveWords) if (text.toLowerCase().includes(word)) score++;
  for (const word of negativeWords) if (text.toLowerCase().includes(word)) score--;
  if (score > 0) return 'positive';
  if (score < 0) return 'negative';
  return 'neutral';
}

// Suggest trending or recommended blocks (demo logic)
export async function suggestBlocks(userId, BlockModel) {
  // In real use, analyze user activity, preferences, etc.
  // For demo: return top 3 trending blocks
  const trending = await BlockModel.find().sort({ installs: -1 }).limit(3);
  return trending;
}


