// ============================================
// USER MANAGEMENT - RAILWAY DIGITAL TWIN
// ============================================

// ─── SAFETY CHECK - Ensure SIDEBAR_CONFIG exists ───
if (typeof SIDEBAR_CONFIG === 'undefined') {
  window.SIDEBAR_CONFIG = {
    assetManagement: [
      { id: 'asset-explorer', label: 'Asset Explorer' },
      { id: 'asset-details', label: 'Asset Details' },
      { id: 'metadata', label: 'Metadata' }
    ],
    monitoring: [
      { id: 'telemetry-center', label: 'Telemetry Center' },
      { id: 'gis-monitoring', label: 'GIS Monitoring' },
      { id: 'google-earth', label: 'Google Earth View' },
      { id: 'digital-twin', label: 'Digital Twin Viewer' },
      { id: 'route-visualization', label: 'Route Visualization' },
      { id: 'device-management', label: 'Device Management' }
    ],
    operations: [
      { id: 'alerts', label: 'Alerts' }
    ],
    administration: [
      { id: 'user-management', label: 'User Management' },
      { id: 'settings', label: 'Settings' }
    ]
  };
}

// ─── NAVIGATION ITEMS ───
const UM_NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: 'layout-dashboard' },
  { id: 'users', label: 'Users', icon: 'users' },
  { id: 'groups', label: 'Groups', icon: 'layers' },
  { id: 'roles', label: 'Roles', icon: 'badge' },
  { id: 'permissions', label: 'Permissions', icon: 'shield-check' },
  { id: 'access-scope', label: 'Access Scope', icon: 'target' },
  { id: 'activity-logs', label: 'Activity Logs', icon: 'clipboard-list' },
  { id: 'settings', label: 'User Settings', icon: 'settings' } 
];
// ─── CURRENT STATE ───
let currentTab = 'dashboard';
let editingUserId = null;
let selectedUser = null;

// ─── RENDER NAV ───
function renderUmNav() {
  return `
    <div class="um-nav-header">User Management</div>
    ${UM_NAV_ITEMS.map(item => `
      <button class="um-nav-item ${item.id === currentTab ? 'active' : ''}" data-tab="${item.id}" onclick="switchUmTab('${item.id}')">
        <i data-lucide="${item.icon}" class="nav-icon"></i>
        <span>${item.label}</span>
      </button>
    `).join('')}
  `;
}

// ─── SWITCH TAB ───
function switchUmTab(tabId) {
  currentTab = tabId;
  
  // Update nav
  document.querySelectorAll('.um-nav-item').forEach(item => {
    item.classList.remove('active');
    if (item.dataset.tab === tabId) {
      item.classList.add('active');
    }
  });

  // Update header
 const titles = {
    dashboard: 'Dashboard',
    users: 'Users',
    groups: 'Groups',
    roles: 'Roles',
    permissions: 'Permissions',
    'access-scope': 'Access Scope',
    'activity-logs': 'Activity Logs',
    settings: 'User Settings'
  };
  
  const descriptions = {
    dashboard: 'Overview of user management',
    users: 'Manage platform users',
    groups: 'Organize users into groups',
    roles: 'Define user roles and responsibilities',
    permissions: 'Configure access permissions',
    'access-scope': 'Assign access scope to users',
    'activity-logs': 'View user activity logs',
    settings: 'User management security and notification settings' 
  };

  document.getElementById('umTitle').textContent = titles[tabId] || 'Dashboard';
  document.getElementById('umDescription').textContent = descriptions[tabId] || '';

  // Load content based on tab
  const body = document.getElementById('umBody');
  if (!body) return;

  switch(tabId) {
    case 'dashboard':
      renderDashboard(body);
      break;
    case 'users':
      renderUsers(body);
      break;
    case 'groups':
      renderGroups(body);
      break;
    case 'roles':
      renderRoles(body);
      break;
    case 'permissions':
      renderPermissions(body);
      break;
    case 'access-scope':
      renderAccessScope(body);
      break;
    case 'activity-logs':
      renderActivityLogs(body);
      break;
    case 'settings':
      renderUmSettings(body);
      break;
    default:
      renderDashboard(body);
  }

  // Re-init Lucide icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}

// ─── DASHBOARD ───
function renderDashboard(container) {
  container.innerHTML = `
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-value">245</div>
        <div class="stat-label">Total Users</div>
        <span class="stat-change up">↑ 12% this month</span>
      </div>
      <div class="stat-card">
        <div class="stat-value">18</div>
        <div class="stat-label">Groups</div>
        <span class="stat-change up">↑ 2 new</span>
      </div>
      <div class="stat-card">
        <div class="stat-value">12</div>
        <div class="stat-label">Roles</div>
        <span class="stat-change">-</span>
      </div>
      <div class="stat-card">
        <div class="stat-value">5</div>
        <div class="stat-label">Pending Invitations</div>
        <span class="stat-change down">↓ 3 awaiting</span>
      </div>
      <div class="stat-card">
        <div class="stat-value">3</div>
        <div class="stat-label">Locked Accounts</div>
        <span class="stat-change down">↓ Needs review</span>
      </div>
      <div class="stat-card">
        <div class="stat-value">187</div>
        <div class="stat-label">Last Login Today</div>
        <span class="stat-change up">↑ Active</span>
      </div>
    </div>

    <div style="display:grid;grid-template-columns:2fr 1fr;gap:16px;">
      <div>
        <div style="font-size:13px;font-weight:600;color:var(--text-hi);margin-bottom:8px;">Recent Activity</div>
        <div class="activity-list">
          <div class="activity-item">
            <div class="activity-icon">👤</div>
            <div class="activity-text"><strong>John</strong> assigned to Operations group</div>
            <div class="activity-time">2 min ago</div>
          </div>
          <div class="activity-item">
            <div class="activity-icon">👤</div>
            <div class="activity-text"><strong>Anu</strong> added new Maintenance user</div>
            <div class="activity-time">15 min ago</div>
          </div>
          <div class="activity-item">
            <div class="activity-icon">⚙️</div>
            <div class="activity-text"><strong>Admin</strong> modified permissions</div>
            <div class="activity-time">1 hour ago</div>
          </div>
          <div class="activity-item">
            <div class="activity-icon">🔐</div>
            <div class="activity-text"><strong>System</strong> User login from new device detected</div>
            <div class="activity-time">2 hours ago</div>
          </div>
          <div class="activity-item">
            <div class="activity-icon">📊</div>
            <div class="activity-text"><strong>Sarah</strong> exported user report</div>
            <div class="activity-time">4 hours ago</div>
          </div>
        </div>
      </div>

      <div>
        <div style="font-size:13px;font-weight:600;color:var(--text-hi);margin-bottom:8px;">Quick Actions</div>
        <div class="quick-actions" style="flex-direction:column;">
          <button class="quick-action-btn primary" onclick="switchUmTab('users');setTimeout(() => openAddUserModal(), 100);">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 5v14"/><path d="M5 12h14"/>
            </svg>
            Add User
          </button>
          <button class="quick-action-btn" onclick="switchUmTab('groups')">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 5v14"/><path d="M5 12h14"/>
            </svg>
            Create Group
          </button>
          <button class="quick-action-btn" onclick="switchUmTab('roles')">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 5v14"/><path d="M5 12h14"/>
            </svg>
            Create Role
          </button>
          <button class="quick-action-btn" onclick="switchUmTab('activity-logs')">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
            </svg>
            View Logs
          </button>
        </div>
      </div>
    </div>
  `;
}

// ─── USERS ───
function renderUsers(container) {
  // Get header actions
  const actions = document.getElementById('umActions');
  if (actions) {
    actions.innerHTML = `
      <button class="um-add-btn" onclick="openAddUserModal()">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 5v14"/><path d="M5 12h14"/>
        </svg>
        Add User
      </button>
    `;
  }

  container.innerHTML = `
    <div class="um-toolbar">
      <div class="um-search">
        <input class="um-search-input" type="text" placeholder="Search users..." id="userSearch" onkeyup="filterUsers()">
        <select class="um-filter-select" id="roleFilter" onchange="filterUsers()">
          <option value="all">All Departments</option>
          <option value="Operations">Operations</option>
          <option value="Signalling">Signalling</option>
          <option value="Track Maintenance">Track Maintenance</option>
          <option value="Rolling Stock">Rolling Stock</option>
          <option value="Electrical">Electrical</option>
          <option value="Station Management">Station Management</option>
          <option value="Asset Management">Asset Management</option>
          <option value="BIM Team">BIM Team</option>
          <option value="IoT Team">IoT Team</option>
          <option value="Analytics">Analytics</option>
          <option value="Safety">Safety</option>
          <option value="Security">Security</option>
          <option value="Administration">Administration</option>
          <option value="Contractors">Contractors</option>
          <option value="Executive Management">Executive Management</option>
        </select>
        <select class="um-filter-select" id="statusFilter" onchange="filterUsers()">
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="pending">Pending</option>
        </select>
      </div>
    </div>

    <div class="table-container">
      <table class="um-table" id="userTable">
        <thead>
          <tr>
            <th>User</th>
            <th>Department</th>
            <th>Role</th>
            <th>Station</th>
            <th>Status</th>
            <th>Last Login</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody id="userTableBody">
          ${usersData.map(user => `
            <tr data-department="${user.department}" data-role="${user.role}" data-status="${user.status}">
              <td>
                <div class="user-cell">
                  <div class="user-avatar">${user.avatar}</div>
                  <div>
                    <div class="user-name">${user.name}</div>
                    <div class="user-email">${user.email}</div>
                  </div>
                </div>
              </td>
              <td>${user.department}</td>
              <td>${user.role}</td>
              <td>${user.station || '-'}</td>
              <td>
                <span class="status-badge ${user.status}">
                  <span class="status-dot"></span>
                  ${user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                </span>
              </td>
              <td style="font-size:11px;color:var(--text-mid);">${user.lastLogin}</td>
              <td>
                <div class="action-btns">
                  <button class="action-btn-icon edit" onclick="openUserDrawer(${user.id})" title="View Details">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  </button>
                  <button class="action-btn-icon edit" onclick="editUser(${user.id})" title="Edit">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                    </svg>
                  </button>
                  <button class="action-btn-icon disable" onclick="toggleUserStatus(${user.id})" title="${user.status === 'active' ? 'Disable' : 'Enable'}">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <circle cx="12" cy="12" r="10"/>
                      ${user.status === 'active' ? '<line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>' : '<path d="M8 12h8"/>'}
                    </svg>
                  </button>
                  <button class="action-btn-icon delete" onclick="deleteUser(${user.id})" title="Delete">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polyline points="3 6 5 6 21 6"/>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>

    <!-- Add/Edit User Modal -->
    <div class="modal-overlay" id="userModal">
      <div class="modal-content">
        <div class="modal-header">
          <div>
            <h3 id="userModalTitle">Add User</h3>
            <p id="userModalSubtitle">Create a new platform user</p>
          </div>
          <button class="modal-close" onclick="closeUserModal()">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
        <div class="modal-body" id="userModalBody">
          <div class="modal-field">
            <label>Full Name</label>
            <input type="text" id="userName" placeholder="Enter full name">
          </div>
          <div class="modal-field">
            <label>Email</label>
            <input type="email" id="userEmail" placeholder="Enter email address">
          </div>
          <div class="modal-field">
            <label>Employee ID</label>
            <input type="text" id="userEmployeeId" placeholder="Enter employee ID">
          </div>
          <div class="modal-field">
            <label>Department</label>
            <select id="userDepartment">
              <option value="Operations">Operations</option>
              <option value="Signalling">Signalling</option>
              <option value="Track Maintenance">Track Maintenance</option>
              <option value="Rolling Stock">Rolling Stock</option>
              <option value="Electrical">Electrical</option>
              <option value="Station Management">Station Management</option>
              <option value="Asset Management">Asset Management</option>
              <option value="BIM Team">BIM Team</option>
              <option value="IoT Team">IoT Team</option>
              <option value="Analytics">Analytics</option>
              <option value="Safety">Safety</option>
              <option value="Security">Security</option>
              <option value="Administration">Administration</option>
              <option value="Contractors">Contractors</option>
              <option value="Executive Management">Executive Management</option>
            </select>
          </div>
          <div class="modal-field">
            <label>Role</label>
            <select id="userRole">
              <option value="Super Admin">Super Admin</option>
              <option value="Operations Manager">Operations Manager</option>
              <option value="Station Operator">Station Operator</option>
              <option value="Track Engineer">Track Engineer</option>
              <option value="Signalling Engineer">Signalling Engineer</option>
              <option value="Electrical Engineer">Electrical Engineer</option>
              <option value="Asset Manager">Asset Manager</option>
              <option value="BIM Coordinator">BIM Coordinator</option>
              <option value="IoT Engineer">IoT Engineer</option>
              <option value="Analytics User">Analytics User</option>
              <option value="Executive">Executive</option>
              <option value="Contractor">Contractor</option>
            </select>
          </div>
          <div class="modal-field">
            <label>Station / Zone</label>
            <select id="userStation">
              <option value="Central Station">Central Station</option>
              <option value="North Division">North Division</option>
              <option value="South Division">South Division</option>
              <option value="East Division">East Division</option>
              <option value="West Division">West Division</option>
              <option value="Multiple Stations">Multiple Stations</option>
              <option value="Headquarters">Headquarters</option>
            </select>
          </div>
          <div class="modal-field">
            <label>Status</label>
            <select id="userStatus">
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
            </select>
          </div>
          <div class="modal-field">
            <div class="checkbox-group">
              <input type="checkbox" id="sendInvite" checked>
              <label for="sendInvite">Send Invitation Email</label>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="modal-btn modal-btn-secondary" onclick="closeUserModal()">Cancel</button>
          <button class="modal-btn modal-btn-primary" onclick="saveUser()">Save</button>
        </div>
      </div>
    </div>
  `;
}

// ─── USER DATA (Railway Specific) ───
const usersData = [
  {
    id: 1,
    name: 'John Mathew',
    email: 'john.m@railways.com',
    department: 'Operations',
    role: 'Station Operator',
    station: 'Central Station',
    status: 'active',
    lastLogin: '2026-07-04 14:30:22',
    avatar: 'JM',
    employeeId: 'EMP-001',
    phone: '+91 98765 43210',
    reportingManager: 'Sarah Johnson',
    zone: 'South Zone'
  },
  {
    id: 2,
    name: 'Anu Sharma',
    email: 'anu.s@railways.com',
    department: 'Track Maintenance',
    role: 'Track Engineer',
    station: 'South Division',
    status: 'active',
    lastLogin: '2026-07-04 12:15:08',
    avatar: 'AS',
    employeeId: 'EMP-002',
    phone: '+91 98765 43211',
    reportingManager: 'Michael Chen',
    zone: 'South Zone'
  },
  {
    id: 3,
    name: 'Rajesh Kumar',
    email: 'rajesh.k@railways.com',
    department: 'Signalling',
    role: 'Signalling Engineer',
    station: 'Central Station',
    status: 'inactive',
    lastLogin: '2026-07-02 09:20:45',
    avatar: 'RK',
    employeeId: 'EMP-003',
    phone: '+91 98765 43212',
    reportingManager: 'Sarah Johnson',
    zone: 'South Zone'
  },
  {
    id: 4,
    name: 'Priya Patel',
    email: 'priya.p@railways.com',
    department: 'Station Management',
    role: 'Station Manager',
    station: 'North Division',
    status: 'active',
    lastLogin: '2026-07-04 08:45:12',
    avatar: 'PP',
    employeeId: 'EMP-004',
    phone: '+91 98765 43213',
    reportingManager: 'David Kim',
    zone: 'North Zone'
  },
  {
    id: 5,
    name: 'Amit Singh',
    email: 'amit.s@railways.com',
    department: 'Rolling Stock',
    role: 'Maintenance Engineer',
    station: 'South Division',
    status: 'pending',
    lastLogin: 'Never',
    avatar: 'AS',
    employeeId: 'EMP-005',
    phone: '+91 98765 43214',
    reportingManager: 'Michael Chen',
    zone: 'South Zone'
  },
  {
    id: 6,
    name: 'Deepak Reddy',
    email: 'deepak.r@railways.com',
    department: 'Electrical',
    role: 'Electrical Engineer',
    station: 'East Division',
    status: 'active',
    lastLogin: '2026-07-04 10:20:33',
    avatar: 'DR',
    employeeId: 'EMP-006',
    phone: '+91 98765 43215',
    reportingManager: 'Sarah Johnson',
    zone: 'East Zone'
  },
  {
    id: 7,
    name: 'Sneha Menon',
    email: 'sneha.m@railways.com',
    department: 'BIM Team',
    role: 'BIM Coordinator',
    station: 'Headquarters',
    status: 'active',
    lastLogin: '2026-07-04 11:45:50',
    avatar: 'SM',
    employeeId: 'EMP-007',
    phone: '+91 98765 43216',
    reportingManager: 'David Kim',
    zone: 'Headquarters'
  },
  {
    id: 8,
    name: 'Vikram Raj',
    email: 'vikram.r@railways.com',
    department: 'IoT Team',
    role: 'IoT Engineer',
    station: 'Multiple Stations',
    status: 'active',
    lastLogin: '2026-07-04 09:30:15',
    avatar: 'VR',
    employeeId: 'EMP-008',
    phone: '+91 98765 43217',
    reportingManager: 'Anu Sharma',
    zone: 'South Zone'
  }
];

// ─── GROUPS DATA (Railway Departments) ───
const groupsData = [
  { id: 'g1', name: 'Operations', members: 52, description: 'Train operations and control' },
  { id: 'g2', name: 'Signalling', members: 38, description: 'Signalling systems and interlocking' },
  { id: 'g3', name: 'Track Maintenance', members: 68, description: 'Track inspection and maintenance' },
  { id: 'g4', name: 'Rolling Stock', members: 45, description: 'Train maintenance and repairs' },
  { id: 'g5', name: 'Electrical', members: 32, description: 'Electrical systems and power' },
  { id: 'g6', name: 'Station Management', members: 28, description: 'Station operations and facilities' },
  { id: 'g7', name: 'Asset Management', members: 22, description: 'Asset lifecycle management' },
  { id: 'g8', name: 'BIM Team', members: 15, description: 'Building Information Modeling' },
  { id: 'g9', name: 'IoT Team', members: 18, description: 'IoT sensors and connectivity' },
  { id: 'g10', name: 'Analytics', members: 12, description: 'Data analytics and reporting' },
  { id: 'g11', name: 'Safety', members: 20, description: 'Safety and compliance' },
  { id: 'g12', name: 'Security', members: 16, description: 'Security and access control' },
  { id: 'g13', name: 'Administration', members: 10, description: 'Administrative functions' },
  { id: 'g14', name: 'Contractors', members: 8, description: 'External contractors' },
  { id: 'g15', name: 'Executive Management', members: 6, description: 'Executive leadership' }
];

// ─── ROLES DATA ───
const rolesData = [
  { id: 'r1', name: 'Super Admin', users: 1, permissions: 45 },
  { id: 'r2', name: 'Operations Manager', users: 4, permissions: 28 },
  { id: 'r3', name: 'Station Operator', users: 32, permissions: 15 },
  { id: 'r4', name: 'Track Engineer', users: 54, permissions: 22 },
  { id: 'r5', name: 'Signalling Engineer', users: 28, permissions: 20 },
  { id: 'r6', name: 'Electrical Engineer', users: 25, permissions: 18 },
  { id: 'r7', name: 'Asset Manager', users: 12, permissions: 25 },
  { id: 'r8', name: 'BIM Coordinator', users: 10, permissions: 16 },
  { id: 'r9', name: 'IoT Engineer', users: 14, permissions: 19 },
  { id: 'r10', name: 'Analytics User', users: 8, permissions: 12 },
  { id: 'r11', name: 'Executive', users: 5, permissions: 10 },
  { id: 'r12', name: 'Contractor', users: 6, permissions: 6 }
];

// ─── PERMISSIONS DATA ───
const permissionsData = {
  modules: [
    { name: 'Asset Management', permissions: ['View Assets', 'Create Assets', 'Edit Assets', 'Delete Assets', 'Import Assets', 'Export Assets'] },
    { name: 'BIM', permissions: ['View Models', 'Upload Models', 'Edit Models', 'Delete Models', 'Manage LOD', 'Clash Detection'] },
    { name: 'Sensors', permissions: ['View Sensors', 'Register Sensor', 'Configure Sensor', 'Delete Sensor', 'Sensor Mapping', 'Live Data'] },
    { name: 'Railway Operations', permissions: ['View Trains', 'Track Train Position', 'Monitor Platform', 'View Route', 'Signal Status', 'Switch Status', 'Emergency Alerts', 'Operations Dashboard'] },
    { name: 'Maintenance', permissions: ['View Maintenance', 'Create Work Order', 'Assign Work Order', 'Close Work Order', 'Inspection Reports'] },
    { name: 'Station Management', permissions: ['View Station', 'Edit Station', 'Passenger Flow', 'Escalator Status', 'Lift Status', 'Lighting', 'Platform Information'] },
    { name: 'Analytics', permissions: ['View Dashboard', 'Create Dashboard', 'Reports', 'Export', 'Schedule Reports'] },
    { name: 'Administration', permissions: ['Manage Users', 'Manage Roles', 'Manage Groups', 'Audit Logs', 'System Settings', 'API Access'] }
  ],
  roles: ['Super Admin', 'Operations Manager', 'Station Operator', 'Track Engineer', 'Signalling Engineer', 'Electrical Engineer', 'Asset Manager', 'BIM Coordinator', 'IoT Engineer', 'Analytics User', 'Executive', 'Contractor']
};

// ─── GROUPS ───
function renderGroups(container) {
  const actions = document.getElementById('umActions');
  if (actions) {
    actions.innerHTML = `
      <button class="um-add-btn" onclick="addGroup()" style="background:var(--orange-dim);color:var(--orange);">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 5v14"/><path d="M5 12h14"/>
        </svg>
        New Group
      </button>
    `;
  }

  container.innerHTML = `
    <div style="margin-bottom:16px;">
      <div style="font-size:13px;font-weight:600;color:var(--text-hi);">Departments & Teams</div>
      <div style="font-size:11px;color:var(--text-mid);">${groupsData.length} groups configured</div>
    </div>

    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:12px;">
      ${groupsData.map(group => `
        <div style="background:rgba(255,255,255,0.03);border:1px solid var(--panel-border);border-radius:10px;padding:16px;transition:all .2s ease;" 
             onmouseover="this.style.background='rgba(255,255,255,0.06)'" 
             onmouseout="this.style.background='rgba(255,255,255,0.03)'">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;">
            <div>
              <div style="font-size:14px;font-weight:600;color:var(--text-hi);">${group.name}</div>
              <div style="font-size:11px;color:var(--text-mid);margin-top:2px;">${group.members} users</div>
              ${group.description ? `<div style="font-size:11px;color:var(--text-low);margin-top:4px;">${group.description}</div>` : ''}
            </div>
            <div style="display:flex;gap:4px;">
              <button class="action-btn-icon edit" onclick="editGroup('${group.id}')" title="Edit">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                </svg>
              </button>
              <button class="action-btn-icon delete" onclick="deleteGroup('${group.id}')" title="Delete">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="3 6 5 6 21 6"/>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                </svg>
              </button>
            </div>
          </div>
          <div style="margin-top:10px;display:flex;gap:4px;flex-wrap:wrap;">
            <span style="font-size:9px;background:var(--cyan-dim);color:var(--cyan);padding:2px 8px;border-radius:999px;">Station Operator</span>
            <span style="font-size:9px;background:var(--cyan-dim);color:var(--cyan);padding:2px 8px;border-radius:999px;">Control Officer</span>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

// ─── ROLES ───
function renderRoles(container) {
  const actions = document.getElementById('umActions');
  if (actions) {
    actions.innerHTML = `
      <button class="um-add-btn" onclick="addRole()" style="background:var(--cyan-dim);color:var(--cyan);">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 5v14"/><path d="M5 12h14"/>
        </svg>
        New Role
      </button>
    `;
  }

  container.innerHTML = `
    <div style="margin-bottom:16px;">
      <div style="font-size:13px;font-weight:600;color:var(--text-hi);">User Roles</div>
      <div style="font-size:11px;color:var(--text-mid);">${rolesData.length} roles configured</div>
    </div>

    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:12px;">
      ${rolesData.map(role => `
        <div style="background:rgba(255,255,255,0.03);border:1px solid var(--panel-border);border-radius:10px;padding:16px;transition:all .2s ease;"
             onmouseover="this.style.background='rgba(255,255,255,0.06)'" 
             onmouseout="this.style.background='rgba(255,255,255,0.03)'">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;">
            <div>
              <div style="font-size:14px;font-weight:600;color:var(--text-hi);">${role.name}</div>
              <div style="font-size:11px;color:var(--text-mid);margin-top:2px;">${role.users} users • ${role.permissions} permissions</div>
            </div>
            <div style="display:flex;gap:4px;">
              <button class="action-btn-icon edit" onclick="editRole('${role.id}')" title="Edit">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                </svg>
              </button>
              <button class="action-btn-icon delete" onclick="deleteRole('${role.id}')" title="Delete">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="3 6 5 6 21 6"/>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                </svg>
              </button>
            </div>
          </div>
          <div style="margin-top:8px;font-size:11px;color:var(--text-low);">
            ${role.name === 'Super Admin' ? 'Full system access' : 
              role.name === 'Operations Manager' ? 'Manage operations, view trains, stations, alerts' :
              role.name === 'Station Operator' ? 'View assigned station, monitor assets, create incidents' :
              role.name === 'Track Engineer' ? 'View tracks, update inspections, create maintenance' :
              role.name === 'Signalling Engineer' ? 'View signalling assets, diagnostics, alarm handling' :
              role.name === 'Electrical Engineer' ? 'View electrical assets, maintenance, inspections' :
              role.name === 'Asset Manager' ? 'Manage assets, lifecycle, hierarchy' :
              role.name === 'BIM Coordinator' ? 'Upload BIM, manage models, LOD, clash detection' :
              role.name === 'IoT Engineer' ? 'Register sensors, configure, device health' :
              role.name === 'Analytics User' ? 'Dashboards, reports, KPIs, export' :
              role.name === 'Executive' ? 'Read-only dashboards, KPIs, reports' :
              role.name === 'Contractor' ? 'Temporary access, assigned work only' : 'Role description'}
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

// ─── PERMISSIONS ───
function renderPermissions(container) {
  const actions = document.getElementById('umActions');
  if (actions) {
    actions.innerHTML = `
      <button class="um-add-btn" onclick="savePermissions()" style="background:var(--cyan);color:#0a0d12;">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
          <polyline points="17 21 17 13 7 13 7 21"/>
          <polyline points="7 3 7 8 15 8"/>
        </svg>
        Save Permissions
      </button>
    `;
  }

  const levelOptions = ['None', 'View', 'Create', 'Edit', 'Delete', 'Full'];
  
  container.innerHTML = `
    <div style="margin-bottom:16px;">
      <div style="font-size:13px;font-weight:600;color:var(--text-hi);">Permission Matrix</div>
      <div style="font-size:11px;color:var(--text-mid);">${permissionsData.modules.length} modules • ${permissionsData.roles.length} roles</div>
    </div>

    <div class="permissions-container">
      <table class="permissions-table">
        <thead>
          <tr>
            <th style="min-width:160px;">Module / Feature</th>
            ${permissionsData.roles.map(role => `
              <th style="text-align:center;min-width:80px;font-size:9px;">${role}</th>
            `).join('')}
          </tr>
        </thead>
        <tbody>
          ${permissionsData.modules.map(module => `
            <tr>
              <td class="perm-feature" style="font-weight:700;color:var(--text-hi);">${module.name}</td>
              ${permissionsData.roles.map(role => `
                <td style="text-align:center;">
                  <select class="perm-select" data-module="${module.name}" data-role="${role}" 
                    ${role === 'Super Admin' ? 'disabled' : ''}
                    onchange="updatePermissionLevel(this)">
                    ${levelOptions.map(level => `
                      <option value="${level}" ${role === 'Super Admin' && level === 'Full' ? 'selected' : ''}>
                        ${level}
                      </option>
                    `).join('')}
                  </select>
                </td>
              `).join('')}
            </tr>
            ${module.permissions.map(perm => `
              <tr>
                <td style="padding-left:24px;font-size:11px;color:var(--text-mid);">└ ${perm}</td>
                ${permissionsData.roles.map(role => `
                  <td style="text-align:center;">
                    <select class="perm-select" data-module="${module.name}" data-permission="${perm}" data-role="${role}"
                      ${role === 'Super Admin' ? 'disabled' : ''}
                      onchange="updatePermissionLevel(this)">
                      ${levelOptions.map(level => `
                        <option value="${level}" ${role === 'Super Admin' && level === 'Full' ? 'selected' : ''}>
                          ${level}
                        </option>
                      `).join('')}
                    </select>
                  </td>
                `).join('')}
              </tr>
            `).join('')}
          `).join('')}
        </tbody>
      </table>
    </div>

    <div style="margin-top:12px;font-size:11px;color:var(--text-low);display:flex;justify-content:space-between;flex-wrap:wrap;gap:8px;">
      <span>⚠️ Super Admin permissions are fixed and cannot be modified</span>
      <span>📊 ${permissionsData.modules.length} modules • ${permissionsData.roles.length} roles</span>
    </div>
  `;
}

// ─── ACCESS SCOPE ───
function renderAccessScope(container) {
  const actions = document.getElementById('umActions');
  if (actions) {
    actions.innerHTML = `
      <button class="um-add-btn" onclick="saveScope()" style="background:var(--cyan);color:#0a0d12;">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
          <polyline points="17 21 17 13 7 13 7 21"/>
          <polyline points="7 3 7 8 15 8"/>
        </svg>
        Save Scope
      </button>
    `;
  }

  container.innerHTML = `
    <div style="margin-bottom:16px;">
      <div style="font-size:13px;font-weight:600;color:var(--text-hi);">Access Scope Assignment</div>
      <div style="font-size:11px;color:var(--text-mid);">Assign access scope to users based on zones, stations, and assets</div>
    </div>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
      <div>
        <div style="font-size:13px;font-weight:600;color:var(--text-hi);margin-bottom:8px;">Select User</div>
        <select class="um-search-input" id="scopeUser" style="max-width:100%;">
          ${usersData.map(user => `
            <option value="${user.id}">${user.name} (${user.department})</option>
          `).join('')}
        </select>
        <div style="margin-top:8px;font-size:11px;color:var(--text-mid);">
          Current Scope: <span style="color:var(--text-hi);">South Zone • Central Station • Tracks, Signals</span>
        </div>
      </div>
      <div>
        <div style="font-size:13px;font-weight:600;color:var(--text-hi);margin-bottom:8px;">Quick Assign</div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;">
          <button class="quick-action-btn" onclick="alert('Assigned South Zone')">South Zone</button>
          <button class="quick-action-btn" onclick="alert('Assigned North Zone')">North Zone</button>
          <button class="quick-action-btn" onclick="alert('Assigned East Zone')">East Zone</button>
          <button class="quick-action-btn" onclick="alert('Assigned West Zone')">West Zone</button>
          <button class="quick-action-btn" onclick="alert('Assigned All Zones')">All Zones</button>
        </div>
      </div>
    </div>

    <hr class="settings-divider">

    <div class="scope-tree">
      <div class="scope-level">
        <div class="scope-level-title">🏢 Zones</div>
        <div class="scope-items">
          <label class="scope-item"><input type="checkbox" checked> South Zone</label>
          <label class="scope-item"><input type="checkbox"> North Zone</label>
          <label class="scope-item"><input type="checkbox"> East Zone</label>
          <label class="scope-item"><input type="checkbox"> West Zone</label>
          <label class="scope-item"><input type="checkbox"> Central Zone</label>
        </div>
      </div>

      <div class="scope-level">
        <div class="scope-level-title">🚉 Stations</div>
        <div class="scope-items">
          <label class="scope-item"><input type="checkbox" checked> Central Station</label>
          <label class="scope-item"><input type="checkbox"> Egmore</label>
          <label class="scope-item"><input type="checkbox"> Tambaram</label>
          <label class="scope-item"><input type="checkbox"> Chennai Beach</label>
          <label class="scope-item"><input type="checkbox"> Park Town</label>
          <label class="scope-item"><input type="checkbox"> Fort</label>
        </div>
      </div>

      <div class="scope-level">
        <div class="scope-level-title">🛤️ Assets</div>
        <div class="scope-items">
          <label class="scope-item"><input type="checkbox" checked> Tracks</label>
          <label class="scope-item"><input type="checkbox" checked> Signals</label>
          <label class="scope-item"><input type="checkbox"> Switches</label>
          <label class="scope-item"><input type="checkbox"> Bridges</label>
          <label class="scope-item"><input type="checkbox"> CCTV</label>
          <label class="scope-item"><input type="checkbox"> Escalators</label>
          <label class="scope-item"><input type="checkbox"> Lifts</label>
          <label class="scope-item"><input type="checkbox"> Electrical</label>
          <label class="scope-item"><input type="checkbox"> Rolling Stock</label>
        </div>
      </div>

      <div class="scope-level">
        <div class="scope-level-title">📋 Projects</div>
        <div class="scope-items">
          <label class="scope-item"><input type="checkbox"> Metro Extension</label>
          <label class="scope-item"><input type="checkbox"> Station Upgrade</label>
          <label class="scope-item"><input type="checkbox"> Track Renewal</label>
          <label class="scope-item"><input type="checkbox"> Signal Modernization</label>
        </div>
      </div>
    </div>
  `;
}

// ─── ACTIVITY LOGS ───
function renderActivityLogs(container) {
  const actions = document.getElementById('umActions');
  if (actions) {
    actions.innerHTML = `
      <button class="um-add-btn" onclick="exportLogs()" style="background:var(--cyan-dim);color:var(--cyan);">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="7 10 12 15 17 10"/>
          <line x1="12" y1="15" x2="12" y2="3"/>
        </svg>
        Export Logs
      </button>
    `;
  }

  const logs = [
    { date: '2026-07-04 14:30:22', user: 'John Mathew', action: 'Created Work Order #WO-2024-001', ip: '192.168.1.45', result: 'Success' },
    { date: '2026-07-04 13:15:08', user: 'Anu Sharma', action: 'Deleted Asset #AST-345', ip: '192.168.1.23', result: 'Success' },
    { date: '2026-07-04 12:45:50', user: 'Admin', action: 'Changed Permissions for Operations', ip: '192.168.1.1', result: 'Success' },
    { date: '2026-07-04 11:20:33', user: 'Rajesh Kumar', action: 'Login Failed - Invalid Password', ip: '192.168.1.67', result: 'Failed' },
    { date: '2026-07-04 10:05:12', user: 'Priya Patel', action: 'Updated Station Information', ip: '192.168.1.89', result: 'Success' },
    { date: '2026-07-04 09:30:15', user: 'Deepak Reddy', action: 'Created New User Account', ip: '192.168.1.34', result: 'Success' },
    { date: '2026-07-04 08:45:22', user: 'Sneha Menon', action: 'Exported BIM Report', ip: '192.168.1.56', result: 'Success' },
    { date: '2026-07-04 08:15:50', user: 'Vikram Raj', action: 'Registered New Sensor #SNS-789', ip: '192.168.1.78', result: 'Success' }
  ];

  container.innerHTML = `
    <div style="margin-bottom:16px;">
      <div style="font-size:13px;font-weight:600;color:var(--text-hi);">Activity Logs</div>
      <div style="font-size:11px;color:var(--text-mid);">${logs.length} recent activities</div>
    </div>

    <div class="activity-filters">
      <select>
        <option value="today">Today</option>
        <option value="yesterday">Yesterday</option>
        <option value="week">Last Week</option>
        <option value="month">Last Month</option>
      </select>
      <select>
        <option value="all">All Users</option>
        ${usersData.map(user => `<option value="${user.id}">${user.name}</option>`).join('')}
      </select>
      <select>
        <option value="all">All Actions</option>
        <option value="create">Create</option>
        <option value="update">Update</option>
        <option value="delete">Delete</option>
        <option value="login">Login</option>
        <option value="permission">Permission Change</option>
      </select>
      <select>
        <option value="all">All Results</option>
        <option value="success">Success</option>
        <option value="failed">Failed</option>
      </select>
      <input type="text" placeholder="Search logs..." class="um-search-input" style="flex:1;min-width:150px;">
    </div>

    <div class="table-container">
      <table class="log-table">
        <thead>
          <tr>
            <th>Date & Time</th>
            <th>User</th>
            <th>Action</th>
            <th>IP Address</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          ${logs.map(log => `
            <tr>
              <td style="font-size:11px;color:var(--text-mid);font-family:var(--font-mono);">${log.date}</td>
              <td style="font-weight:500;color:var(--text-hi);">${log.user}</td>
              <td style="color:var(--text-mid);">${log.action}</td>
              <td style="font-size:11px;color:var(--text-low);font-family:var(--font-mono);">${log.ip}</td>
              <td><span class="${log.result === 'Success' ? 'log-success' : 'log-failed'}">${log.result}</span></td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}

// ─── SETTINGS ───

function renderUmSettings(container) {
  const actions = document.getElementById('umActions');
  if (actions) {
    actions.innerHTML = `
      <button class="um-add-btn" onclick="saveUmSettings()" style="background:var(--cyan);color:#0a0d12;">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
          <polyline points="17 21 17 13 7 13 7 21"/>
          <polyline points="7 3 7 8 15 8"/>
        </svg>
        Save Settings
      </button>
    `;
  }

  container.innerHTML = `
    <div class="settings-section">
      <div class="settings-section-title">Security Policy</div>

      <div class="settings-field">
        <label class="settings-label">Minimum Password Length</label>
        <select class="settings-select">
          <option value="8">8 characters</option>
          <option value="10">10 characters</option>
          <option value="12" selected>12 characters</option>
          <option value="16">16 characters</option>
        </select>
      </div>

      <div class="settings-field">
        <label class="settings-label">Password Expiry</label>
        <select class="settings-select">
          <option value="30">30 days</option>
          <option value="60" selected>60 days</option>
          <option value="90">90 days</option>
          <option value="never">Never</option>
        </select>
      </div>

      <div class="settings-field">
        <label class="settings-label">Multi-Factor Authentication (MFA)</label>
        <div class="settings-toggle">
          <label class="toggle-track">
            <input type="checkbox" checked>
            <span class="toggle-slider"></span>
          </label>
          <span class="toggle-label">Require MFA for all users</span>
        </div>
      </div>

      <div class="settings-field">
        <label class="settings-label">Session Timeout</label>
        <select class="settings-select">
          <option value="15">15 minutes</option>
          <option value="30" selected>30 minutes</option>
          <option value="60">1 hour</option>
          <option value="120">2 hours</option>
        </select>
      </div>

      <div class="settings-field">
        <label class="settings-label">Maximum Login Attempts</label>
        <select class="settings-select">
          <option value="3">3 attempts</option>
          <option value="5" selected>5 attempts</option>
          <option value="10">10 attempts</option>
          <option value="unlimited">Unlimited</option>
        </select>
      </div>
    </div>

    <hr class="settings-divider">

    <div class="settings-section">
      <div class="settings-section-title">Notifications & Integration</div>

      <div class="settings-field">
        <label class="settings-label">Email Notifications</label>
        <div class="settings-toggle">
          <label class="toggle-track">
            <input type="checkbox" checked>
            <span class="toggle-slider"></span>
          </label>
          <span class="toggle-label">Enable email notifications</span>
        </div>
      </div>

      <div class="settings-field">
        <label class="settings-label">Invitation Expiry</label>
        <select class="settings-select">
          <option value="1">1 day</option>
          <option value="3" selected>3 days</option>
          <option value="7">7 days</option>
          <option value="14">14 days</option>
        </select>
      </div>

      <div class="settings-field">
        <label class="settings-label">Authentication Provider</label>
        <select class="settings-select">
          <option value="local">Local (Email + Password)</option>
          <option value="sso" selected>Single Sign-On (SSO)</option>
          <option value="azure">Azure AD</option>
          <option value="ldap">LDAP</option>
        </select>
      </div>
    </div>
  `;
}

// ─── USER FUNCTIONS ───
function filterUsers() {
  const search = document.getElementById('userSearch')?.value.toLowerCase() || '';
  const departmentFilter = document.getElementById('roleFilter')?.value || 'all';
  const statusFilter = document.getElementById('statusFilter')?.value || 'all';
  
  const rows = document.querySelectorAll('#userTableBody tr');
  rows.forEach(row => {
    const name = row.querySelector('.user-name')?.textContent.toLowerCase() || '';
    const email = row.querySelector('.user-email')?.textContent.toLowerCase() || '';
    const department = row.dataset.department || '';
    const status = row.dataset.status || '';
    
    const matchSearch = name.includes(search) || email.includes(search);
    const matchDepartment = departmentFilter === 'all' || department === departmentFilter;
    const matchStatus = statusFilter === 'all' || status === statusFilter;
    
    row.style.display = matchSearch && matchDepartment && matchStatus ? '' : 'none';
  });
}

function openAddUserModal() {
  editingUserId = null;
  document.getElementById('userModalTitle').textContent = 'Add User';
  document.getElementById('userModalSubtitle').textContent = 'Create a new platform user';
  document.getElementById('userName').value = '';
  document.getElementById('userEmail').value = '';
  document.getElementById('userEmployeeId').value = '';
  document.getElementById('userDepartment').value = 'Operations';
  document.getElementById('userRole').value = 'Station Operator';
  document.getElementById('userStation').value = 'Central Station';
  document.getElementById('userStatus').value = 'pending';
  document.getElementById('sendInvite').checked = true;
  document.getElementById('userModal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function editUser(id) {
  const user = usersData.find(u => u.id === id);
  if (!user) return;
  
  editingUserId = id;
  document.getElementById('userModalTitle').textContent = 'Edit User';
  document.getElementById('userModalSubtitle').textContent = 'Update user information';
  document.getElementById('userName').value = user.name;
  document.getElementById('userEmail').value = user.email;
  document.getElementById('userEmployeeId').value = user.employeeId || '';
  document.getElementById('userDepartment').value = user.department;
  document.getElementById('userRole').value = user.role;
  document.getElementById('userStation').value = user.station || 'Central Station';
  document.getElementById('userStatus').value = user.status;
  document.getElementById('sendInvite').checked = false;
  document.getElementById('userModal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeUserModal() {
  document.getElementById('userModal').classList.remove('active');
  document.body.style.overflow = '';
}

function saveUser() {
  const name = document.getElementById('userName').value.trim();
  const email = document.getElementById('userEmail').value.trim();
  const department = document.getElementById('userDepartment').value;
  const role = document.getElementById('userRole').value;
  const station = document.getElementById('userStation').value;
  const status = document.getElementById('userStatus').value;
  const employeeId = document.getElementById('userEmployeeId').value.trim();
  
  if (!name || !email) {
    showToast('Please fill in all required fields', 'error');
    return;
  }
  
  if (editingUserId) {
    const user = usersData.find(u => u.id === editingUserId);
    if (user) {
      user.name = name;
      user.email = email;
      user.department = department;
      user.role = role;
      user.station = station;
      user.status = status;
      if (employeeId) user.employeeId = employeeId;
      showToast('✓ User updated successfully', 'success');
    }
  } else {
    const newUser = {
      id: usersData.length + 1,
      name,
      email,
      department,
      role,
      station,
      status,
      lastLogin: 'Never',
      avatar: name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2),
      employeeId: employeeId || 'EMP-' + String(usersData.length + 1).padStart(3, '0'),
      phone: '',
      reportingManager: '',
      zone: station.includes('North') ? 'North Zone' : 
            station.includes('South') ? 'South Zone' :
            station.includes('East') ? 'East Zone' :
            station.includes('West') ? 'West Zone' : 'Central Zone'
    };
    usersData.push(newUser);
    showToast('✓ User added successfully', 'success');
  }
  
  closeUserModal();
  switchUmTab('users');
}

function toggleUserStatus(id) {
  const user = usersData.find(u => u.id === id);
  if (!user) return;
  
  user.status = user.status === 'active' ? 'inactive' : 'active';
  showToast(`✓ User ${user.status === 'active' ? 'enabled' : 'disabled'}`, 'success');
  switchUmTab('users');
}

function deleteUser(id) {
  if (!confirm('Are you sure you want to delete this user?')) return;
  
  const index = usersData.findIndex(u => u.id === id);
  if (index > -1) {
    usersData.splice(index, 1);
    showToast('✓ User deleted successfully', 'success');
    switchUmTab('users');
  }
}

// ─── USER DRAWER ───
function openUserDrawer(id) {
  const user = usersData.find(u => u.id === id);
  if (!user) return;
  selectedUser = user;

  document.getElementById('drawerTitle').textContent = user.name;
  document.getElementById('drawerSubtitle').textContent = user.department + ' • ' + user.role;

  document.getElementById('drawerBody').innerHTML = `
    <div style="text-align:center;margin-bottom:20px;">
      <div style="width:72px;height:72px;border-radius:50%;background:var(--cyan-dim);color:var(--cyan);display:flex;align-items:center;justify-content:center;font-size:28px;font-weight:700;margin:0 auto;">${user.avatar}</div>
      <div style="margin-top:8px;font-size:13px;font-weight:600;color:var(--text-hi);">${user.name}</div>
      <div style="font-size:11px;color:var(--text-mid);">${user.email}</div>
    </div>

    <hr class="drawer-divider">

    <div class="drawer-field">
      <label>Employee ID</label>
      <div class="drawer-value">${user.employeeId || '-'}</div>
    </div>

    <div class="drawer-field">
      <label>Department</label>
      <div class="drawer-value">${user.department}</div>
    </div>

    <div class="drawer-field">
      <label>Designation</label>
      <div class="drawer-value">${user.role}</div>
    </div>

    <div class="drawer-field">
      <label>Email</label>
      <div class="drawer-value">${user.email}</div>
    </div>

    <div class="drawer-field">
      <label>Phone</label>
      <div class="drawer-value">${user.phone || '-'}</div>
    </div>

    <div class="drawer-field">
      <label>Station / Zone</label>
      <div class="drawer-value">${user.station || '-'} • ${user.zone || '-'}</div>
    </div>

    <div class="drawer-field">
      <label>Reporting Manager</label>
      <div class="drawer-value">${user.reportingManager || '-'}</div>
    </div>

    <hr class="drawer-divider">

    <div class="drawer-field">
      <label>Assigned Group</label>
      <div class="drawer-value">${user.department}</div>
    </div>

    <div class="drawer-field">
      <label>Assigned Role</label>
      <div class="drawer-value">${user.role}</div>
    </div>

    <hr class="drawer-divider">

    <div class="drawer-field">
      <label>Access Scope</label>
      <div class="drawer-value" style="display:flex;gap:4px;flex-wrap:wrap;padding-top:4px;">
        <span style="font-size:10px;background:var(--cyan-dim);color:var(--cyan);padding:2px 10px;border-radius:999px;">${user.zone || 'South Zone'}</span>
        <span style="font-size:10px;background:var(--cyan-dim);color:var(--cyan);padding:2px 10px;border-radius:999px;">${user.station || 'Central Station'}</span>
        <span style="font-size:10px;background:var(--cyan-dim);color:var(--cyan);padding:2px 10px;border-radius:999px;">Tracks</span>
        <span style="font-size:10px;background:var(--cyan-dim);color:var(--cyan);padding:2px 10px;border-radius:999px;">Signals</span>
      </div>
    </div>

    <div class="drawer-field">
      <label>Last Login</label>
      <div class="drawer-value">${user.lastLogin}</div>
    </div>

    <hr class="drawer-divider">

    <div class="drawer-actions">
      <button class="btn-primary" onclick="closeDrawer();editUser(${user.id})">Edit User</button>
      <button class="btn-secondary" onclick="closeDrawer();toggleUserStatus(${user.id})">${user.status === 'active' ? 'Disable' : 'Enable'}</button>
      <button class="btn-danger" onclick="closeDrawer();deleteUser(${user.id})">Delete User</button>
    </div>
  `;

  document.getElementById('drawerOverlay').classList.add('active');
  document.getElementById('drawer').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeDrawer() {
  document.getElementById('drawerOverlay').classList.remove('active');
  document.getElementById('drawer').classList.remove('open');
  document.body.style.overflow = '';
}

// ─── GROUP FUNCTIONS ───
function addGroup() {
  const name = prompt('Enter group/department name:');
  if (name && name.trim()) {
    groupsData.push({ id: 'g' + Date.now(), name: name.trim(), members: 0, description: 'New department' });
    showToast('✓ Group created successfully', 'success');
    switchUmTab('groups');
  }
}

function editGroup(id) {
  const group = groupsData.find(g => g.id === id);
  if (!group) return;
  const name = prompt('Edit group name:', group.name);
  if (name && name.trim()) {
    group.name = name.trim();
    showToast('✓ Group updated successfully', 'success');
    switchUmTab('groups');
  }
}

function deleteGroup(id) {
  if (!confirm('Are you sure you want to delete this group?')) return;
  const index = groupsData.findIndex(g => g.id === id);
  if (index > -1) {
    groupsData.splice(index, 1);
    showToast('✓ Group deleted successfully', 'success');
    switchUmTab('groups');
  }
}

// ─── ROLE FUNCTIONS ───
function addRole() {
  const name = prompt('Enter role name:');
  if (name && name.trim()) {
    rolesData.push({ id: 'r' + Date.now(), name: name.trim(), users: 0, permissions: 0 });
    showToast('✓ Role created successfully', 'success');
    switchUmTab('roles');
  }
}

function editRole(id) {
  const role = rolesData.find(r => r.id === id);
  if (!role) return;
  const name = prompt('Edit role name:', role.name);
  if (name && name.trim()) {
    role.name = name.trim();
    showToast('✓ Role updated successfully', 'success');
    switchUmTab('roles');
  }
}

function deleteRole(id) {
  if (!confirm('Are you sure you want to delete this role?')) return;
  const index = rolesData.findIndex(r => r.id === id);
  if (index > -1) {
    rolesData.splice(index, 1);
    showToast('✓ Role deleted successfully', 'success');
    switchUmTab('roles');
  }
}

// ─── PERMISSION FUNCTIONS ───
function updatePermissionLevel(select) {
  // Store permission changes - would connect to backend
  console.log('Permission updated:', {
    module: select.dataset.module,
    permission: select.dataset.permission || 'module',
    role: select.dataset.role,
    level: select.value
  });
}

function savePermissions() {
  showToast('✓ Permissions saved successfully', 'success');
}

// ─── SCOPE FUNCTIONS ───
function saveScope() {
  showToast('✓ Access scope saved successfully', 'success');
}

// ─── LOG FUNCTIONS ───
function exportLogs() {
  showToast('✓ Logs exported successfully', 'success');
}

// ─── SETTINGS FUNCTIONS ───
function saveUmSettings() {
  showToast('✓ Settings saved successfully', 'success');
}

// ─── TOAST ───
function showToast(message, type) {
  const toast = document.getElementById('toast');
  const icon = document.getElementById('toastIcon');
  const msg = document.getElementById('toastMessage');

  if (!toast || !icon || !msg) return;

  msg.textContent = message;
  toast.className = 'toast ' + type;
  icon.textContent = type === 'success' ? '✓' : '✕';

  setTimeout(() => toast.classList.add('show'), 10);

  clearTimeout(toast._hideTimeout);
  toast._hideTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}

// ─── AUTO-INIT ───
document.addEventListener('DOMContentLoaded', function() {
  const nav = document.getElementById('umNav');
  if (nav) {
    nav.innerHTML = renderUmNav();
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }
  
  switchUmTab('dashboard');
});

// ─── MAKE FUNCTIONS GLOBALLY ACCESSIBLE ───
window.switchUmTab = switchUmTab;
window.filterUsers = filterUsers;
window.openAddUserModal = openAddUserModal;
window.editUser = editUser;
window.closeUserModal = closeUserModal;
window.saveUser = saveUser;
window.toggleUserStatus = toggleUserStatus;
window.deleteUser = deleteUser;
window.openUserDrawer = openUserDrawer;
window.closeDrawer = closeDrawer;
window.addGroup = addGroup;
window.editGroup = editGroup;
window.deleteGroup = deleteGroup;
window.addRole = addRole;
window.editRole = editRole;
window.deleteRole = deleteRole;
window.updatePermissionLevel = updatePermissionLevel;
window.savePermissions = savePermissions;
window.saveScope = saveScope;
window.exportLogs = exportLogs;
window.saveUmSettings = saveUmSettings;
window.showToast = showToast; 