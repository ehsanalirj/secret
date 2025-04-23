import request from 'supertest';
import app from '../src/app.js';
import mongoose from 'mongoose';
import Order from '../src/models/order.js';
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
const testOrder = { orderNumber: 'ORD-001', status: 'pending', items: [] };

let tenantId;
let token;

beforeAll(async () => {
  if (!process.env.MONGO_URI) throw new Error('MONGO_URI must be set for cloud database tests!');
  await mongoose.connect(process.env.MONGO_URI);
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

describe('Order API', () => {
  it('should create an order', async () => {
    const res = await request(app)
      .post('/api/order')
      .set('Authorization', `Bearer ${token}`)
      .send({ ...testOrder, tenant: tenantId });
    expect(res.statusCode).toBe(201);
    expect(res.body.orderNumber).toBe(testOrder.orderNumber);
  });

  it('should get all orders for a tenant', async () => {
    const res = await request(app)
      .get('/api/order')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
