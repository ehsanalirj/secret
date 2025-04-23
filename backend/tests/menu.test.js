import request from 'supertest';
import app from '../src/app.js';
import mongoose from 'mongoose';
import Menu from '../src/models/menu.js';
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
const testMenu = { name: 'Lunch Menu', items: [], status: 'active' };

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

describe('Menu API', () => {
  it('should create a menu', async () => {
    const res = await request(app)
      .post('/api/menu')
      .set('Authorization', `Bearer ${token}`)
      .send({ ...testMenu, tenant: tenantId });
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe(testMenu.name);
  });

  it('should get all menus for a tenant', async () => {
    const res = await request(app)
      .get('/api/menu')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
