# Vontres API Overview

This document provides a summary of the core API endpoints for the Vontres Online Ordering Ecosystem backend. Each endpoint supports multi-tenancy, RBAC, feature toggles, and white-labeling.

---

## Core Service Endpoints

### Tenant Management
- `POST /api/tenant/` — Create tenant
- `GET /api/tenant/` — List tenants
- `GET /api/tenant/:id` — Get tenant by ID
- `PUT /api/tenant/:id` — Update tenant
- `DELETE /api/tenant/:id` — Delete tenant

### Role Management
- `POST /api/role/` — Create role
- `GET /api/role/` — List roles
- `PUT /api/role/:id` — Update role
- `DELETE /api/role/:id` — Delete role

### Feature Flags
- `POST /api/feature-flag/` — Create feature flag
- `GET /api/feature-flag/` — List feature flags
- `PUT /api/feature-flag/:id` — Update feature flag
- `DELETE /api/feature-flag/:id` — Delete feature flag

### Audit Logs
- `POST /api/audit-log/` — Log action
- `GET /api/audit-log/` — List audit logs

### Plan Management
- `POST /api/plan/` — Create plan
- `GET /api/plan/` — List plans
- `PUT /api/plan/:id` — Update plan
- `DELETE /api/plan/:id` — Delete plan

### Department Management
- `POST /api/department/` — Create department
- `GET /api/department/` — List departments
- `PUT /api/department/:id` — Update department
- `DELETE /api/department/:id` — Delete department

### Branding & White-Labeling
- `POST /api/branding/` — Create/update branding
- `GET /api/branding/:tenant` — Get branding for tenant
- `POST /api/white-label/` — Create/update white-label config
- `GET /api/white-label/:tenant` — Get white-label config for tenant

### Organization Management
- `POST /api/organization/` — Create organization
- `GET /api/organization/` — List organizations
- `GET /api/organization/:id` — Get organization by ID
- `PUT /api/organization/:id` — Update organization
- `DELETE /api/organization/:id` — Delete organization

---

## Next Steps
- Add OpenAPI/Swagger documentation for all endpoints
- Provide request/response examples
- Document authentication, RBAC, and error handling
- Update with additional modules as they are built
