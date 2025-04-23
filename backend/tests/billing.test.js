import request from 'supertest';
import app from '../src/app.js';
import mongoose from 'mongoose';
import Billing from '../src/models/billing.js';
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
const testBilling = { invoiceNumber: 'INV-001', amount: 100, currency: 'USD', status: 'pending', dueDate: new Date() };

let tenantId;
let token;
let billingId;

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

describe('Billing API', () => {
  it('should create a billing record', async () => {
    const res = await request(app)
      .post('/api/billing')
      .set('Authorization', `Bearer ${token}`)
      .send({ ...testBilling, tenant: tenantId });
    expect(res.statusCode).toBe(201);
    expect(res.body.invoiceNumber).toBe(testBilling.invoiceNumber);
    billingId = res.body._id;
  });

  it('should get all billing records for a tenant', async () => {
    const res = await request(app)
      .get('/api/billing')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
