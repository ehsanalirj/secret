import dotenv from 'dotenv';
dotenv.config();

console.log('Loaded MONGODB_URI:', process.env.MONGODB_URI);

import mongoose from 'mongoose';
import Tenant from '../src/models/tenant.js';
import Role from '../src/models/role.js';
import Plan from '../src/models/plan.js';
import FeatureFlag from '../src/models/featureFlag.js';

const MONGODB_URI = process.env.MONGODB_URI;

async function seed() {
  await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

  // Plans
  const plans = [
    { name: 'Free', features: ['basic'], price: 0 },
    { name: 'Pro', features: ['basic', 'analytics', 'ai'], price: 99 },
    { name: 'Enterprise', features: ['all'], price: 499 }
  ];
  await Plan.deleteMany({});
  await Plan.insertMany(plans);

  // Tenants
  const tenants = [
    { name: 'Demo Restaurant', domain: 'demo.vontres.com', country: 'US', plan: 'pro', departments: ['Ops', 'HR'] }
  ];
  await Tenant.deleteMany({});
  const tenantDocs = await Tenant.insertMany(tenants);

  // Roles
  const roles = [
    { name: 'admin', permissions: ['*'], tenant: tenantDocs[0]._id },
    { name: 'manager', permissions: ['menu:edit', 'order:view'], tenant: tenantDocs[0]._id },
    { name: 'staff', permissions: ['order:view'], tenant: tenantDocs[0]._id }
  ];
  await Role.deleteMany({});
  await Role.insertMany(roles);

  // Feature Flags
  const flags = [
    { key: 'loyalty_program', enabled: true, tenant: tenantDocs[0]._id },
    { key: 'promo_codes', enabled: false, tenant: tenantDocs[0]._id }
  ];
  await FeatureFlag.deleteMany({});
  await FeatureFlag.insertMany(flags);

  console.log('Seed complete');
  process.exit(0);
}

seed().catch(e => { console.error(e); process.exit(1); });
