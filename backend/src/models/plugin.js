// Minimal Plugin model stub for backend startup
import mongoose from 'mongoose';

const PluginSchema = new mongoose.Schema({
  name: { type: String, required: true },
  author: { type: String, required: true },
  url: { type: String, required: true },
  registeredAt: { type: Date, default: Date.now }
});

const Plugin = mongoose.models.Plugin || mongoose.model('Plugin', PluginSchema);
export default Plugin;
