import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import BusinessHubLayout from '../layouts/BusinessHubLayout.jsx';
import Dashboard from './businesshub/Dashboard.jsx';
import Departments from './businesshub/Departments.jsx';
import Employees from './businesshub/Employees.jsx';
import Menu from './businesshub/Menu.jsx';
import Orders from './businesshub/Orders.jsx';
import HR from './businesshub/HR.jsx';
import Inventory from './businesshub/Inventory.jsx';
import Analytics from './businesshub/Analytics.jsx';
import WebsiteBuilder from './businesshub/WebsiteBuilder.jsx';
import ControlCenter from './businesshub/ControlCenter.jsx';
import Settings from './businesshub/Settings.jsx';

import useCurrentUser from '../hooks/useCurrentUser';
import { useEffect } from 'react';


// Deprecated: BusinessHub removed. Redirecting to /olo
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
export default function BusinessHub() {
  const navigate = useNavigate();
  useEffect(() => { navigate('/olo', { replace: true }); }, [navigate]);
  return null;
}
