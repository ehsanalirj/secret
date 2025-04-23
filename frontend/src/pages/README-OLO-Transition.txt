OLO Dashboard Transition Notes:

- BusinessHub and ControlCenter have been deprecated and removed from routing.
- All users are redirected to /olo after login.
- The Olo.jsx page is the new unified dashboard for both global and restaurant users.
- RBAC logic is handled in Olo.jsx (global users see more features).
- All old BusinessHub and ControlCenter files can be deleted after confirming no dependencies remain.

This file is a temporary note for developers during the transition.
