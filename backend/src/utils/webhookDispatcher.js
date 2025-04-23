import Webhook from '../models/webhook.js';
import crypto from 'crypto';
import fetch from 'node-fetch';

// Dispatch webhooks for a given event and payload
export async function dispatchWebhooks(event, tenant, payload) {
  const webhooks = await Webhook.find({ event, tenant, enabled: true });
  for (const webhook of webhooks) {
    const signature = crypto.createHmac('sha256', webhook.secret).update(JSON.stringify(payload)).digest('hex');
    try {
      await fetch(webhook.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Webhook-Signature': signature,
        },
        body: JSON.stringify(payload),
      });
      webhook.lastSuccess = new Date();
      webhook.failureCount = 0;
    } catch (err) {
      webhook.lastFailure = new Date();
      webhook.failureCount = (webhook.failureCount || 0) + 1;
    }
    await webhook.save();
  }
}
