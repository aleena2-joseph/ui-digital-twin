// ============================================
// SIDEBAR NAVIGATION - SINGLE SOURCE OF TRUTH
// ============================================

const SIDEBAR_CONFIG = {
  assetManagement: [
    { id: 'asset-explorer', label: 'Asset Explorer', icon: 'layers', path: 'asset_explorer.html' },
    { id: 'asset-details', label: 'Asset Details', icon: 'package', path: 'asset_details.html' },
    { id: 'metadata', label: 'Metadata', icon: 'file-text', path: 'metadata.html' },
  ],
  monitoring: [
    { id: 'telemetry-center', label: 'Telemetry Center', icon: 'activity', path: 'telemetry_center.html' },
    { id: 'gis-monitoring', label: 'GIS Monitoring', icon: 'map', path: 'gis_monitoring.html' },
    { id: 'google-earth', label: 'Google Earth View', icon: 'globe', path: 'googleEarthView.html' },
    { id: 'digital-twin', label: 'Digital Twin Viewer', icon: 'box', path: '3d_twin.html' },
    { id: 'route-visualization', label: 'Route Visualization', icon: 'route', path: 'route_visualization.html' },
    
  ],
  operations: [
    { id: 'alerts', label: 'Alerts', icon: 'bell', path: 'alerts.html', badge: '8' },
  ],
  administration: [
    { 
      id: 'user-management', 
      label: 'User Management', 
      icon: 'users', 
      path: 'user-management/user-management.html' 
    },
    { 
      id: 'settings', 
      label: 'Settings', 
      icon: 'settings', 
      path: 'settings/settings.html' 
    },
  ]
};

// ─── HELPERS ───

function getCurrentPath() {
  const path = window.location.pathname;
  const cleanPath = path.startsWith('/') ? path.substring(1) : path;
  return cleanPath;
}

function isActive(itemPath) {
  const current = getCurrentPath();
  return current === itemPath;
}

function navigateTo(path) {
  const currentPath = getCurrentPath();
  if (currentPath.includes('/')) {
    const depth = currentPath.split('/').length - 1;
    const prefix = '../'.repeat(depth);
    if (path.includes('/')) {
      window.location.href = prefix + path;
    } else {
      window.location.href = prefix + path;
    }
  } else {
    window.location.href = path;
  }
}

function doLogout() {
  if (confirm('Are you sure you want to logout?')) {
    window.location.href = 'Login.html';
  }
}

// ─── RENDER SIDEBAR ───

function renderSidebar() {
  return `
    <!-- Logo -->
    <div class="sb-logo">
      <div class="sb-logo-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="2" y="7" width="20" height="13" rx="2"/>
          <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
          <circle cx="7.5" cy="18.5" r=".5" fill="currentColor"/>
          <circle cx="16.5" cy="18.5" r=".5" fill="currentColor"/>
          <line x1="8" y1="7" x2="8" y2="14"/><line x1="16" y1="7" x2="16" y2="14"/>
          <line x1="8" y1="14" x2="16" y2="14"/>
        </svg>
      </div>
      <div class="sb-brand">
        <div class="b1"><span>Digital</span> Twin</div>
        <div class="b3">Monitoring Platform</div>
      </div>
    </div>

    <!-- Dashboard -->
    <div class="sb-overview">
      <button class="sb-overview-btn ${isActive('index.html') ? 'active' : ''}" onclick="navigateTo('index.html')">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="3" width="7" height="7"/>
          <rect x="14" y="3" width="7" height="7"/>
          <rect x="3" y="14" width="7" height="7"/>
          <rect x="14" y="14" width="7" height="7"/>
        </svg>
        <span>Dashboard</span>
      </button>
    </div>

    <div class="sb-nav">
      <!-- ASSET MANAGEMENT -->
      <div class="sb-sec">Asset Management</div>
      ${SIDEBAR_CONFIG.assetManagement.map(item => `
        <div class="sb-item ${isActive(item.path) ? 'active' : ''}" onclick="navigateTo('${item.path}')">
          <i data-lucide="${item.icon}"></i>
          <span>${item.label}</span>
          <i data-lucide="chevron-right" class="sb-chevron"></i>
        </div>
      `).join('')}

      <!-- MONITORING -->
      <div class="sb-sec">Monitoring</div>
      ${SIDEBAR_CONFIG.monitoring.map(item => `
        <div class="sb-item ${isActive(item.path) ? 'active' : ''}" onclick="navigateTo('${item.path}')">
          <i data-lucide="${item.icon}"></i>
          <span>${item.label}</span>
          <i data-lucide="chevron-right" class="sb-chevron"></i>
        </div>
      `).join('')}

      <!-- OPERATIONS -->
      <div class="sb-sec">Operations</div>
      ${SIDEBAR_CONFIG.operations.map(item => `
        <div class="sb-item ${isActive(item.path) ? 'active' : ''}" onclick="navigateTo('${item.path}')">
          <i data-lucide="${item.icon}"></i>
          <span>${item.label}</span>
          ${item.badge ? `<span class="sb-badge">${item.badge}</span>` : ''}
          ${!item.badge ? `<i data-lucide="chevron-right" class="sb-chevron"></i>` : ''}
        </div>
      `).join('')}

      <!-- ADMINISTRATION -->
      <div class="sb-sec">Administration</div>
      ${SIDEBAR_CONFIG.administration.map(item => `
        <div class="sb-item ${isActive(item.path) ? 'active' : ''}" onclick="navigateTo('${item.path}')">
          <i data-lucide="${item.icon}"></i>
          <span>${item.label}</span>
          <i data-lucide="chevron-right" class="sb-chevron"></i>
        </div>
      `).join('')}
    </div>

    <!-- Logout -->
    <div style="padding:0 12px 4px">
      <button class="sb-logout" onclick="doLogout()">
        <i data-lucide="log-out"></i>
        <span>Logout</span>
      </button>
    </div>

    <div class="sb-footer">© 2026 Digital Twin Platform</div>
  `;
}

// ─── AUTO-INIT ───

document.addEventListener('DOMContentLoaded', function() {
  const sidebar = document.querySelector('.sidebar');
  if (sidebar) {
    sidebar.innerHTML = renderSidebar();
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }
});

window.navigateTo = navigateTo;
window.doLogout = doLogout;