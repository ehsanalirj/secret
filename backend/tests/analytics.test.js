import request from 'supertest';
import app from '../src/app.js';
import mongoose from 'mongoose';
import Analytics from '../src/models/analytics.js';
import Tenant from '../src/models/tenant.js';

const testTenant = {
  name: 'TestTenant',
  domain: 'testtenant.com',
  country: 'US',
  dataResidency: 'EU',
  complianceTags: ['PCI'],
  dataClassification: 'internal',
  complianceStatus: 'approved'
};
const testAnalytics = { block: 'main', installs: 10, ratings: 5, events: [], metrics: {} };

let tenantId;
let token;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI || process.env.MONGODB_URI || 'mongodb://localhost:27017/vontres_test');
  const tenant = await Tenant.create(testTenant);
  tenantId = tenant._id;
  // Register user
  const testUser = {
    name: 'Test User',
    email: 'testuser@example.com',
    password: 'TestPass123!',
    roles: ['admin'],
    permissions: ['admin'],
    tenant: tenantId,
    dataResidency: 'US',
    status: 'active'
  };
  await request(app)
    .post('/api/auth/register')
    .send(testUser);
  // Ensure user is active and has correct roles
  const User = (await import('../src/models/user.js')).default;
  await User.updateOne(
    { email: testUser.email },
    { $set: { status: 'active', roles: ['admin'], permissions: ['admin'] } }
  );
  // Simulate login to get token
  const res = await request(app)
    .post('/api/auth/login')
    .send({ email: testUser.email, password: testUser.password });
  token = res.body.token;
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe('Analytics API', () => {
  it('should create analytics data', async () => {
    const blockId = 'main';
    const res = await request(app)
      .post(`/api/analytics/block/${blockId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ ...testAnalytics, tenant: tenantId });
    expect(res.statusCode).toBe(201);
    expect(res.body.block).toBe(blockId);
  });

  it('should get analytics for a block', async () => {
    const blockId = 'main';
    const res = await request(app)
      .get(`/api/analytics/block/${blockId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.block).toBe(blockId);
  });
});
