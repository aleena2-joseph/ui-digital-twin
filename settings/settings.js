// ============================================
// SETTINGS NAVIGATION - ENTERPRISE GRADE
// ============================================

// ─── INTEGRATION STATUS DATA ───
const integrationStatuses = [
  {
    id: 'iot',
    name: 'IoT Platform',
    status: 'connected',
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M2 12L6 8L9 11L13 7L16 10L19 7L22 10"/>
            <path d="M22 12L18 16L15 13L11 17L8 14L5 17L2 14"/>
          </svg>`,
    details: 'Primary source for live sensor data',
    lastSync: '2 minutes ago'
  },
  {
    id: 'bim',
    name: 'BIM Server',
    status: 'connected',
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="3" width="18" height="18" rx="2"/>
            <path d="M9 3v18"/><path d="M15 3v18"/>
            <path d="M3 9h18"/><path d="M3 15h18"/>
          </svg>`,
    details: 'Model Version: v2.4',
    lastSync: '1 hour ago'
  },
  {
    id: 'cmms',
    name: 'CMMS',
    status: 'warning',
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
            <polyline points="10 9 9 9 8 9"/>
          </svg>`,
    details: 'Authentication token expires in 3 days',
    lastSync: 'Failed'
  },
  {
    id: 'auth',
    name: 'Auth Provider',
    status: 'connected',
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            <circle cx="12" cy="17" r="1"/>
          </svg>`,
    details: 'Provider: Azure AD',
    lastSync: '30 minutes ago'
  },
  {
    id: 'erp',
    name: 'ERP System',
    status: 'error',
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="2" y="2" width="20" height="20" rx="2"/>
            <line x1="8" y1="2" x2="8" y2="22"/>
            <line x1="16" y1="2" x2="16" y2="22"/>
            <line x1="2" y1="8" x2="22" y2="8"/>
            <line x1="2" y1="16" x2="22" y2="16"/>
          </svg>`,
    details: 'SAP Integration',
    lastSync: 'Not Connected'
  }
];

// ─── INTEGRATION CONFIGURATIONS ───
const INTEGRATION_CONFIGS = {
  iot: {
    title: 'IoT Platform Configuration',
    subtitle: 'Configure connection settings for IoT Platform',
    fields: `
      <div class="modal-field">
        <label>Connection Name</label>
        <input type="text" value="Production IoT" placeholder="Enter connection name">
      </div>
      <div class="modal-field">
        <label>API URL</label>
        <input type="text" value="https://iot.company.com/api" placeholder="https://iot.company.com/api">
        <div class="field-description">The base API URL of your IoT platform</div>
      </div>
      <div class="modal-field">
        <label>Authentication Type</label>
        <div style="display:flex;gap:16px;margin-top:4px;">
          <label style="display:flex;align-items:center;gap:6px;font-size:12px;color:var(--text-mid);cursor:pointer;">
            <input type="radio" name="auth-type" value="api-key" checked style="accent-color:var(--cyan);"> API Key
          </label>
          <label style="display:flex;align-items:center;gap:6px;font-size:12px;color:var(--text-mid);cursor:pointer;">
            <input type="radio" name="auth-type" value="oauth" style="accent-color:var(--cyan);"> OAuth
          </label>
        </div>
      </div>
      <div class="modal-field">
        <label>API Key / Token</label>
        <input type="password" value="prod_iot_key_2024" placeholder="Enter API key">
        <div class="field-description">API key with read/write permissions</div>
      </div>
      <div class="modal-field">
        <label>Sync Interval</label>
        <select>
          <option value="10">10 Seconds</option>
          <option value="30" selected>30 Seconds</option>
          <option value="60">1 Minute</option>
          <option value="300">5 Minutes</option>
        </select>
      </div>
    `
  },
  bim: {
    title: 'BIM Server Configuration',
    subtitle: 'Configure connection settings for BIM Server',
    fields: `
      <div class="modal-field">
        <label>Connection Name</label>
        <input type="text" value="BIM Production" placeholder="Enter connection name">
      </div>
      <div class="modal-field">
        <label>API URL</label>
        <input type="text" value="https://bim.company.com/api" placeholder="https://bim.company.com/api">
      </div>
      <div class="modal-field">
        <label>Authentication Type</label>
        <div style="display:flex;gap:16px;margin-top:4px;">
          <label style="display:flex;align-items:center;gap:6px;font-size:12px;color:var(--text-mid);cursor:pointer;">
            <input type="radio" name="auth-type-bim" value="token" checked style="accent-color:var(--cyan);"> Token
          </label>
          <label style="display:flex;align-items:center;gap:6px;font-size:12px;color:var(--text-mid);cursor:pointer;">
            <input type="radio" name="auth-type-bim" value="oauth" style="accent-color:var(--cyan);"> OAuth
          </label>
        </div>
      </div>
      <div class="modal-field">
        <label>Authentication Token</label>
        <input type="password" value="bim_token_2024_secure" placeholder="Enter authentication token">
      </div>
      <div class="modal-field">
        <label>Project ID</label>
        <input type="text" value="PRJ-2024-001" placeholder="Enter project ID">
      </div>
      <div class="modal-field">
        <label>Model Version</label>
        <select>
          <option value="latest" selected>Latest</option>
          <option value="v2.4">v2.4</option>
          <option value="v2.3">v2.3</option>
          <option value="v2.2">v2.2</option>
        </select>
      </div>
    `
  },
  cmms: {
    title: 'CMMS Configuration',
    subtitle: 'Configure connection settings for CMMS',
    fields: `
      <div class="modal-field">
        <label>Connection Name</label>
        <input type="text" value="CMMS Production" placeholder="Enter connection name">
      </div>
      <div class="modal-field">
        <label>API URL</label>
        <input type="text" value="https://cmms.company.com/api" placeholder="https://cmms.company.com/api">
      </div>
      <div class="modal-field">
        <label>Authentication Type</label>
        <div style="display:flex;gap:16px;margin-top:4px;">
          <label style="display:flex;align-items:center;gap:6px;font-size:12px;color:var(--text-mid);cursor:pointer;">
            <input type="radio" name="auth-type-cmms" value="basic" checked style="accent-color:var(--cyan);"> Basic Auth
          </label>
          <label style="display:flex;align-items:center;gap:6px;font-size:12px;color:var(--text-mid);cursor:pointer;">
            <input type="radio" name="auth-type-cmms" value="oauth" style="accent-color:var(--cyan);"> OAuth
          </label>
        </div>
      </div>
      <div class="modal-field">
        <label>Username</label>
        <input type="text" value="admin" placeholder="Enter username">
      </div>
      <div class="modal-field">
        <label>Password</label>
        <input type="password" value="cmms_secure_2024" placeholder="Enter password">
      </div>
      <div class="modal-field">
        <div class="checkbox-group">
          <input type="checkbox" id="sync-workorders" checked>
          <label for="sync-workorders">Sync Work Orders</label>
        </div>
      </div>
      <div class="modal-field">
        <label>Sync Interval</label>
        <select>
          <option value="5" selected>Every 5 minutes</option>
          <option value="15">Every 15 minutes</option>
          <option value="30">Every 30 minutes</option>
          <option value="60">Every 1 hour</option>
        </select>
      </div>
    `
  },
  auth: {
    title: 'Authentication Provider Configuration',
    subtitle: 'Configure authentication provider settings',
    fields: `
      <div class="modal-field">
        <label>Connection Name</label>
        <input type="text" value="Azure AD" placeholder="Enter connection name">
      </div>
      <div class="modal-field">
        <label>Provider</label>
        <select>
          <option value="azure" selected>Azure Active Directory</option>
          <option value="aws">AWS Cognito</option>
          <option value="okta">Okta</option>
          <option value="google">Google Workspace</option>
        </select>
      </div>
      <div class="modal-field">
        <label>Tenant ID</label>
        <input type="text" value="azure-tenant-2024" placeholder="Enter tenant ID">
      </div>
      <div class="modal-field">
        <label>Client ID</label>
        <input type="text" value="azure-client-12345" placeholder="Enter client ID">
      </div>
      <div class="modal-field">
        <label>Client Secret</label>
        <input type="password" value="client_secret_secure_2024" placeholder="Enter client secret">
      </div>
      <div class="modal-field">
        <label>Redirect URL</label>
        <input type="text" value="https://digital-twin.com/auth/callback" placeholder="Enter redirect URL">
      </div>
    `
  },
  erp: {
    title: 'ERP System Configuration',
    subtitle: 'Configure connection settings for ERP System',
    fields: `
      <div class="modal-field">
        <label>Connection Name</label>
        <input type="text" value="SAP ERP" placeholder="Enter connection name">
      </div>
      <div class="modal-field">
        <label>API URL</label>
        <input type="text" value="https://sap.company.com/api" placeholder="https://sap.company.com/api">
      </div>
      <div class="modal-field">
        <label>Authentication Type</label>
        <div style="display:flex;gap:16px;margin-top:4px;">
          <label style="display:flex;align-items:center;gap:6px;font-size:12px;color:var(--text-mid);cursor:pointer;">
            <input type="radio" name="auth-type-erp" value="oauth" checked style="accent-color:var(--cyan);"> OAuth
          </label>
          <label style="display:flex;align-items:center;gap:6px;font-size:12px;color:var(--text-mid);cursor:pointer;">
            <input type="radio" name="auth-type-erp" value="api-key" style="accent-color:var(--cyan);"> API Key
          </label>
        </div>
      </div>
      <div class="modal-field">
        <label>Client ID</label>
        <input type="text" value="erp-client-123" placeholder="Enter client ID">
      </div>
      <div class="modal-field">
        <label>Client Secret</label>
        <input type="password" value="erp_secret_2024" placeholder="Enter client secret">
      </div>
      <div class="modal-field">
        <div class="checkbox-group">
          <input type="checkbox" id="sync-inventory" checked>
          <label for="sync-inventory">Sync Inventory Data</label>
        </div>
      </div>
      <div class="modal-field">
        <div class="checkbox-group">
          <input type="checkbox" id="sync-orders">
          <label for="sync-orders">Sync Purchase Orders</label>
        </div>
      </div>
    `
  }
};

// ─── SETTINGS CONFIG ───
const SETTINGS_CONFIG = [
  { 
    id: 'general', 
    label: 'General', 
    icon: 'settings',
    content: `
      <div class="settings-section">
        <div class="settings-section-title">Organization Information</div>

        <div class="settings-field">
          <label class="settings-label">Organization Name</label>
          <input class="settings-input" type="text" value="Digital Twin Platform" placeholder="Enter organization name">
        </div>

        <div class="settings-field">
          <label class="settings-label">Organization Logo</label>
          <label class="settings-upload">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <path d="M21 15l-5-5-5 5-4-4-3 3"/>
            </svg>
            Upload Logo
            <input type="file" accept="image/*">
          </label>
          <div class="settings-description">Recommended: PNG, SVG, or JPG (max 2MB)</div>
        </div>
      </div>

      <hr class="settings-divider">

      <div class="settings-section">
        <div class="settings-section-title">Appearance</div>

        <div class="settings-field">
          <label class="settings-label">Theme</label>
          <div class="settings-radio-group">
            <label class="settings-radio-label">
              <input type="radio" name="theme" value="dark" checked>
              <span class="radio-dot"></span>
              Dark
            </label>
            <label class="settings-radio-label">
              <input type="radio" name="theme" value="light">
              <span class="radio-dot"></span>
              Light
            </label>
          </div>
        </div>
      </div>

      <hr class="settings-divider">

      <div class="settings-section">
        <div class="settings-section-title">Localization</div>

        <div class="settings-field">
          <label class="settings-label">Time Zone</label>
          <select class="settings-select">
            <option value="UTC+00:00">UTC +00:00 (London)</option>
            <option value="UTC-05:00">UTC -05:00 (New York)</option>
            <option value="UTC+05:30" selected>UTC +05:30 (Asia/Kolkata)</option>
            <option value="UTC+08:00">UTC +08:00 (Singapore)</option>
            <option value="UTC+09:00">UTC +09:00 (Tokyo)</option>
          </select>
          <div class="settings-description">Used for timestamps, reports, alerts, and logs</div>
        </div>
      </div>

      <hr class="settings-divider">

      <div class="settings-section">
        <div class="settings-section-title">Measurement Units</div>

        <div class="settings-field">
          <label class="settings-label">Units</label>
          <div class="settings-radio-group">
            <label class="settings-radio-label">
              <input type="radio" name="units" value="metric" checked>
              <span class="radio-dot"></span>
              Metric (°C, km, kg, bar)
            </label>
            <label class="settings-radio-label">
              <input type="radio" name="units" value="imperial">
              <span class="radio-dot"></span>
              Imperial (°F, miles, psi)
            </label>
          </div>
          <div class="settings-description">Affects sensor readings, reports, and dashboard displays</div>
        </div>
      </div>

      <div class="settings-action-row">
        <button class="settings-btn settings-btn-secondary" onclick="cancelSettings()">Cancel</button>
        <button class="settings-btn settings-btn-primary" onclick="saveSettings()">Save Changes</button>
      </div>
    `
  },
  { 
    id: 'integrations', 
    label: 'Integrations', 
    icon: 'plug',
    content: `
      <div class="integrations-header">
        <div>
          <div class="integrations-title">External Systems</div>
          <div class="integrations-subtitle">Manage connections to external platforms and services</div>
        </div>
        <span class="integrations-count">● <span id="connectedCount">${integrationStatuses.filter(s => s.status === 'connected').length}</span> Connected</span>
      </div>

      <div class="table-container">
        <table class="integrations-table">
          <thead>
            <tr>
              <th>Integration</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            ${integrationStatuses.map((integration, index) => `
              <tr class="${integration.status === 'warning' ? 'warning-row' : ''} ${integration.status === 'error' ? 'error-row' : ''}">
                <td>
                  <div class="integration-cell">
                    <div class="integration-icon-small ${integration.status}">
                      ${integration.icon}
                    </div>
                    <div>
                      <div class="integration-name-cell">${integration.name}</div>
                      ${integration.details ? `<div class="integration-details-cell">${integration.details}</div>` : ''}
                    </div>
                  </div>
                </td>
                <td>
                  <span class="status-badge status-${integration.status}">
                    <span class="status-dot"></span>
                    ${integration.status === 'connected' ? 'Connected' : 
                      integration.status === 'warning' ? 'Warning' : 
                      integration.status === 'error' ? 'Not Connected' : 'Unknown'}
                  </span>
                  ${integration.lastSync ? `<div class="sync-info">${integration.lastSync}</div>` : ''}
                </td>
                <td>
                  <button class="action-btn ${integration.status === 'error' ? 'btn-add' : 'btn-edit'}" onclick="openIntegrationModal('${integration.id}')">
                    ${integration.status === 'error' ? 'Add' : 'Edit'}
                  </button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <div class="modal-overlay" id="integrationModal">
        <div class="modal-content">
          <div class="modal-header">
            <div>
              <h3 id="modalTitle">Configure Integration</h3>
              <p id="modalSubtitle">Configure connection settings for this integration</p>
            </div>
            <button class="modal-close" onclick="closeIntegrationModal()">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
          <div class="modal-body" id="modalBody"></div>
          <div class="modal-footer">
            <div class="modal-status" id="modalStatus">
              <span class="status-indicator" id="statusIndicator"></span>
              <span id="statusText">Ready</span>
            </div>
            <div class="modal-actions">
              <button class="modal-btn modal-btn-secondary" onclick="closeIntegrationModal()">Cancel</button>
              <button class="modal-btn modal-btn-test" onclick="testConnection()">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="23 4 23 10 17 10"/>
                  <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
                </svg>
                Test Connection
              </button>
              <button class="modal-btn modal-btn-primary" onclick="saveIntegration()">Save</button>
            </div>
          </div>
        </div>
      </div>

      <div class="toast" id="toast">
        <span id="toastIcon">✓</span>
        <span id="toastMessage">Saved successfully</span>
      </div>
    `
  },
  { 
    id: 'digital-twin', 
    label: 'Digital Twin Config', 
    icon: 'box',
    content: `
      <div class="settings-section">
        <div class="settings-section-title">Digital Twin Configuration</div>
        <div class="settings-description" style="margin-bottom:16px;">Configure how your Digital Twin operates and connects to assets</div>

        <div class="settings-field">
          <label class="settings-label">Sensor-to-Asset Mapping</label>
          <select class="settings-select">
            <option value="auto" selected>Automatic Mapping</option>
            <option value="manual">Manual Mapping</option>
            <option value="hybrid">Hybrid (Auto + Manual)</option>
          </select>
          <div class="settings-description">Define how sensors are mapped to digital twin assets</div>
        </div>

        <div class="settings-field">
          <label class="settings-label">Data Refresh Interval</label>
          <select class="settings-select">
            <option value="5">5 Seconds</option>
            <option value="10" selected>10 Seconds</option>
            <option value="30">30 Seconds</option>
            <option value="60">1 Minute</option>
            <option value="300">5 Minutes</option>
          </select>
          <div class="settings-description">How often the digital twin updates with real-time data</div>
        </div>

        <div class="settings-field">
          <label class="settings-label">Data Mapping Rules</label>
          <textarea class="settings-textarea" rows="3" placeholder="Define custom mapping rules...">sensor.temperature → asset.temp
sensor.pressure → asset.psi
sensor.vibration → asset.vib</textarea>
          <div class="settings-description">Custom rules for mapping sensor data to asset properties</div>
        </div>

        <div class="settings-field">
          <label class="settings-label">BIM Model Linking</label>
          <div style="display:flex;gap:8px;align-items:center;">
            <input class="settings-input" type="text" value="bim_model_2024_v2.rvt" placeholder="BIM model file" style="max-width:300px;">
            <label class="settings-upload" style="margin:0;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="17 8 12 3 7 8"/>
                <line x1="12" y1="3" x2="12" y2="15"/>
              </svg>
              Browse
              <input type="file" accept=".rvt,.ifc,.fbx">
            </label>
          </div>
          <div class="settings-description">Link BIM model to digital twin for 3D visualization</div>
        </div>
      </div>

      <div class="settings-action-row">
        <button class="settings-btn settings-btn-secondary" onclick="cancelSettings()">Cancel</button>
        <button class="settings-btn settings-btn-primary" onclick="saveSettings()">Save Configuration</button>
      </div>
    `
  },
  { 
    id: 'alerts', 
    label: 'Alerts & Notifications', 
    icon: 'bell',
    content: `
      <div class="settings-section">
        <div class="settings-section-title">Alert Thresholds</div>

        <div class="settings-field">
          <label class="settings-label">Temperature Threshold</label>
          <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;">
            <input class="settings-input" type="number" value="85" style="max-width:100px;" placeholder="Max">
            <span style="color:var(--text-mid);font-size:12px;">°C</span>
            <span style="color:var(--text-low);font-size:11px;">Trigger when temperature exceeds this value</span>
          </div>
        </div>

        <div class="settings-field">
          <label class="settings-label">Pressure Threshold</label>
          <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;">
            <input class="settings-input" type="number" value="120" style="max-width:100px;" placeholder="Max">
            <span style="color:var(--text-mid);font-size:12px;">PSI</span>
            <span style="color:var(--text-low);font-size:11px;">Trigger when pressure exceeds this value</span>
          </div>
        </div>

        <hr class="settings-divider">

        <div class="settings-section-title">Notification Channels</div>
        
        <div class="settings-field">
          <label class="settings-label">Email Notifications</label>
          <input class="settings-input" type="email" value="admin@digitaltwin.com" placeholder="Enter email address">
          <div class="settings-description">Receive alerts via email</div>
        </div>

        <div class="settings-field">
          <label class="settings-label">SMS Notifications</label>
          <input class="settings-input" type="tel" value="+1 234 567 8900" placeholder="Enter phone number">
          <div class="settings-description">Receive critical alerts via SMS</div>
        </div>

        <div class="settings-field">
          <label class="settings-label">Push Notifications</label>
          <div style="display:flex;align-items:center;gap:12px;padding-top:4px;">
            <label style="position:relative;display:inline-block;width:44px;height:24px;flex-shrink:0;">
              <input type="checkbox" checked style="opacity:0;width:0;height:0;">
              <span style="position:absolute;cursor:pointer;inset:0;background:var(--cyan);border-radius:12px;transition:all .3s ease;"></span>
              <span style="position:absolute;content:'';height:18px;width:18px;left:3px;bottom:3px;background:#fff;border-radius:50%;transition:all .3s ease;transform:translateX(20px);"></span>
            </label>
            <span style="font-size:12px;color:var(--text-mid);">Enable push notifications</span>
          </div>
          <div class="settings-description">Receive alerts via browser push notifications</div>
        </div>

        <hr class="settings-divider">

        <div class="settings-section-title">Escalation Rules</div>

        <div class="settings-field">
          <label class="settings-label">Escalation Level 1</label>
          <select class="settings-select">
            <option value="email" selected>Send Email</option>
            <option value="sms">Send SMS</option>
            <option value="both">Email + SMS</option>
          </select>
        </div>

        <div class="settings-field">
          <label class="settings-label">Escalation Level 2</label>
          <select class="settings-select">
            <option value="both" selected>Email + SMS</option>
            <option value="phone">Phone Call</option>
            <option value="all">All Channels</option>
          </select>
          <div class="settings-description">Escalate to all channels if not acknowledged within 5 minutes</div>
        </div>
      </div>

      <div class="settings-action-row">
        <button class="settings-btn settings-btn-secondary" onclick="cancelSettings()">Cancel</button>
        <button class="settings-btn settings-btn-primary" onclick="saveSettings()">Save Alert Settings</button>
      </div>
    `
  },
  { 
    id: 'system-behavior', 
    label: 'System Behavior', 
    icon: 'cpu',
    content: `
      <div class="settings-section">
        <div class="settings-section-title">System Behavior</div>

        <div class="settings-field">
          <label class="settings-label">Data Refresh Rate</label>
          <select class="settings-select">
            <option value="5">5 Seconds</option>
            <option value="10" selected>10 Seconds</option>
            <option value="30">30 Seconds</option>
            <option value="60">1 Minute</option>
            <option value="300">5 Minutes</option>
          </select>
          <div class="settings-description">How often the dashboard refreshes data</div>
        </div>

        <div class="settings-field">
          <label class="settings-label">Synchronization Frequency</label>
          <select class="settings-select">
            <option value="15">15 Seconds</option>
            <option value="30">30 Seconds</option>
            <option value="60" selected>1 Minute</option>
            <option value="300">5 Minutes</option>
          </select>
          <div class="settings-description">How often to sync with external systems</div>
        </div>

        <div class="settings-field">
          <label class="settings-label">Cache Settings</label>
          <select class="settings-select">
            <option value="60">1 Minute</option>
            <option value="300" selected>5 Minutes</option>
            <option value="600">10 Minutes</option>
            <option value="1800">30 Minutes</option>
          </select>
          <div class="settings-description">How long to cache data before invalidating</div>
        </div>

        <div class="settings-field">
          <label class="settings-label">Performance Mode</label>
          <div class="settings-radio-group">
            <label class="settings-radio-label">
              <input type="radio" name="perf-mode" value="balanced" checked>
              <span class="radio-dot"></span>
              Balanced
            </label>
            <label class="settings-radio-label">
              <input type="radio" name="perf-mode" value="performance">
              <span class="radio-dot"></span>
              Performance (faster)
            </label>
            <label class="settings-radio-label">
              <input type="radio" name="perf-mode" value="accuracy">
              <span class="radio-dot"></span>
              Accuracy (more data)
            </label>
          </div>
          <div class="settings-description">Balance between performance and data accuracy</div>
        </div>
      </div>

      <div class="settings-action-row">
        <button class="settings-btn settings-btn-secondary" onclick="cancelSettings()">Cancel</button>
        <button class="settings-btn settings-btn-primary" onclick="saveSettings()">Save Settings</button>
      </div>
    `
  },
  { 
    id: 'security', 
    label: 'Security', 
    icon: 'shield',
    content: `
      <div class="settings-section">
        <div class="settings-section-title">Security Settings</div>

        <div class="settings-field">
          <label class="settings-label">Login Method</label>
          <select class="settings-select">
            <option value="standard" selected>Standard (Email + Password)</option>
            <option value="sso">Single Sign-On (SSO)</option>
            <option value="mfa">Multi-Factor Authentication</option>
          </select>
        </div>

        <div class="settings-field">
          <label class="settings-label">Password Policy</label>
          <select class="settings-select">
            <option value="standard" selected>Standard (8+ chars, letters & numbers)</option>
            <option value="strong">Strong (12+ chars, mixed case, numbers, symbols)</option>
            <option value="very-strong">Very Strong (16+ chars, mixed case, numbers, symbols)</option>
          </select>
          <div class="settings-description">Define password complexity requirements</div>
        </div>

        <div class="settings-field">
          <label class="settings-label">Session Timeout</label>
          <select class="settings-select">
            <option value="15">15 minutes</option>
            <option value="30" selected>30 minutes</option>
            <option value="60">1 hour</option>
            <option value="120">2 hours</option>
            <option value="never">Never</option>
          </select>
          <div class="settings-description">Automatically log out after inactivity</div>
        </div>

        <hr class="settings-divider">

        <div class="settings-section-title">Multi-Factor Authentication</div>

        <div style="display:flex;align-items:center;justify-content:space-between;padding:12px 16px;background:rgba(255,255,255,0.03);border-radius:8px;border:1px solid var(--panel-border);margin-bottom:8px;">
          <div>
            <div style="font-size:13px;font-weight:600;color:var(--text-hi);">Authenticator App</div>
            <div style="font-size:11px;color:var(--text-mid);">Google Authenticator, Microsoft Authenticator, etc.</div>
          </div>
          <label style="position:relative;display:inline-block;width:44px;height:24px;flex-shrink:0;">
            <input type="checkbox" checked style="opacity:0;width:0;height:0;">
            <span style="position:absolute;cursor:pointer;inset:0;background:var(--cyan);border-radius:12px;transition:all .3s ease;"></span>
            <span style="position:absolute;content:'';height:18px;width:18px;left:3px;bottom:3px;background:#fff;border-radius:50%;transition:all .3s ease;transform:translateX(20px);"></span>
          </label>
        </div>

        <div style="display:flex;align-items:center;justify-content:space-between;padding:12px 16px;background:rgba(255,255,255,0.03);border-radius:8px;border:1px solid var(--panel-border);">
          <div>
            <div style="font-size:13px;font-weight:600;color:var(--text-hi);">SMS Verification</div>
            <div style="font-size:11px;color:var(--text-mid);">Send verification code via SMS</div>
          </div>
          <label style="position:relative;display:inline-block;width:44px;height:24px;flex-shrink:0;">
            <input type="checkbox" style="opacity:0;width:0;height:0;">
            <span style="position:absolute;cursor:pointer;inset:0;background:var(--text-low);border-radius:12px;transition:all .3s ease;"></span>
            <span style="position:absolute;content:'';height:18px;width:18px;left:3px;bottom:3px;background:#fff;border-radius:50%;transition:all .3s ease;"></span>
          </label>
        </div>
      </div>

      <div class="settings-action-row">
        <button class="settings-btn settings-btn-secondary" onclick="cancelSettings()">Cancel</button>
        <button class="settings-btn settings-btn-primary" onclick="saveSettings()">Update Security</button>
      </div>
    `
  },
  { 
    id: 'api-developer', 
    label: 'API & Developer', 
    icon: 'code',
    content: `
      <div class="settings-section">
        <div class="settings-section-title">API Management</div>

        <div class="settings-field">
          <label class="settings-label">API Keys</label>
          <div style="background:rgba(255,255,255,0.03);border:1px solid var(--panel-border);border-radius:8px;padding:12px;margin-bottom:8px;">
            <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
              <div>
                <div style="font-size:12px;font-weight:600;color:var(--text-hi);">Production Key</div>
                <div style="font-size:11px;color:var(--text-mid);font-family:var(--font-mono);">pk_live_••••••••••••</div>
                <div style="font-size:10px;color:var(--text-low);">Created: Jan 15, 2026</div>
              </div>
              <div style="display:flex;gap:6px;">
                <button class="settings-btn settings-btn-small settings-btn-secondary" onclick="alert('Regenerating API key...')">Regenerate</button>
                <button class="settings-btn settings-btn-small settings-btn-danger" onclick="alert('Revoking API key...')">Revoke</button>
              </div>
            </div>
          </div>
          <div style="background:rgba(255,255,255,0.03);border:1px solid var(--panel-border);border-radius:8px;padding:12px;">
            <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
              <div>
                <div style="font-size:12px;font-weight:600;color:var(--text-hi);">Development Key</div>
                <div style="font-size:11px;color:var(--text-mid);font-family:var(--font-mono);">pk_dev_••••••••••••</div>
                <div style="font-size:10px;color:var(--text-low);">Created: Jan 20, 2026</div>
              </div>
              <div style="display:flex;gap:6px;">
                <button class="settings-btn settings-btn-small settings-btn-secondary" onclick="alert('Regenerating API key...')">Regenerate</button>
                <button class="settings-btn settings-btn-small settings-btn-danger" onclick="alert('Revoking API key...')">Revoke</button>
              </div>
            </div>
          </div>
          <button class="settings-btn settings-btn-primary" style="margin-top:12px;" onclick="alert('Generating new API key...')">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 5v14"/>
              <path d="M5 12h14"/>
            </svg>
            Generate API Key
          </button>
        </div>

        <hr class="settings-divider">

        <div class="settings-field">
          <label class="settings-label">Webhooks</label>
          <div style="display:flex;gap:8px;flex-wrap:wrap;">
            <input class="settings-input" type="url" value="https://api.digitaltwin.com/webhook" placeholder="https://api.digitaltwin.com/webhook" style="max-width:350px;">
            <button class="settings-btn settings-btn-secondary" onclick="alert('Webhook configured!')">Add Webhook</button>
          </div>
          <div class="settings-description">Configure webhook endpoints for real-time notifications</div>
        </div>

        <div class="settings-field">
          <label class="settings-label">Rate Limits</label>
          <div style="display:flex;gap:12px;flex-wrap:wrap;">
            <div>
              <label style="font-size:10px;color:var(--text-low);">Requests per minute</label>
              <input class="settings-input" type="number" value="1000" style="max-width:120px;">
            </div>
            <div>
              <label style="font-size:10px;color:var(--text-low);">Burst limit</label>
              <input class="settings-input" type="number" value="200" style="max-width:120px;">
            </div>
          </div>
          <div class="settings-description">API rate limiting to prevent abuse</div>
        </div>

        <div class="settings-field">
          <label class="settings-label">API Documentation</label>
          <div style="display:flex;gap:8px;flex-wrap:wrap;">
            <a href="#" style="color:var(--cyan);text-decoration:none;font-size:12px;display:inline-flex;align-items:center;gap:6px;">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
              View API Documentation
            </a>
            <a href="#" style="color:var(--text-mid);text-decoration:none;font-size:12px;display:inline-flex;align-items:center;gap:6px;">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M4 4h16v16H4z"/>
                <polyline points="9 9 15 15"/>
                <polyline points="15 9 9 15"/>
              </svg>
              Postman Collection
            </a>
          </div>
        </div>
      </div>

      <div class="settings-action-row">
        <button class="settings-btn settings-btn-secondary" onclick="cancelSettings()">Cancel</button>
        <button class="settings-btn settings-btn-primary" onclick="saveSettings()">Save Changes</button>
      </div>
    `
  },
  { 
    id: 'system-health', 
    label: 'System Health', 
    icon: 'activity',
    content: `
      <div class="settings-section">
        <div class="settings-section-title">System Health Monitor</div>
        <div class="settings-description" style="margin-bottom:16px;">Monitor the health and performance of your Digital Twin platform</div>

        <div class="health-grid">
          <div class="health-card">
            <div class="health-card-label">API Status</div>
            <div class="health-card-value healthy">Healthy</div>
            <div class="health-card-meta">All systems operational</div>
          </div>
          <div class="health-card">
            <div class="health-card-label">Average Latency</div>
            <div class="health-card-value">145 <span style="font-size:12px;color:var(--text-low);">ms</span></div>
            <div class="health-card-meta">Normal range: 100-200ms</div>
          </div>
          <div class="health-card">
            <div class="health-card-label">Integration Status</div>
            <div class="health-card-value">${integrationStatuses.filter(s => s.status === 'connected').length} / ${integrationStatuses.length} <span style="font-size:12px;color:var(--text-low);">Connected</span></div>
            <div class="health-card-meta">${integrationStatuses.filter(s => s.status === 'error').length} system(s) offline</div>
          </div>
          <div class="health-card">
            <div class="health-card-label">Sync Failures</div>
            <div class="health-card-value warning">1 <span style="font-size:12px;color:var(--text-low);">Today</span></div>
            <div class="health-card-meta">Last failure: 1 hour ago</div>
          </div>
          <div class="health-card">
            <div class="health-card-label">Last Health Check</div>
            <div class="health-card-value">2 <span style="font-size:12px;color:var(--text-low);">mins ago</span></div>
            <div class="health-card-meta">All checks passed</div>
          </div>
          <div class="health-card">
            <div class="health-card-label">Uptime</div>
            <div class="health-card-value healthy">99.97%</div>
            <div class="health-card-meta">Last 30 days</div>
          </div>
        </div>

        <div style="display:flex;gap:12px;margin-top:16px;flex-wrap:wrap;">
          <button class="settings-btn settings-btn-primary" onclick="runHealthCheck()">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="23 4 23 10 17 10"/>
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
            </svg>
            Run Health Check
          </button>
          <button class="settings-btn settings-btn-secondary" onclick="alert('Exporting health report...')">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Export Report
          </button>
        </div>
      </div>
    `
  }
];

// ─── HELPERS ───
let currentTab = 'general';
let currentIntegrationId = null;

function switchTab(tabId) {
  currentTab = tabId;
  
  document.querySelectorAll('.settings-nav-item').forEach(item => {
    item.classList.remove('active');
    if (item.dataset.tab === tabId) {
      item.classList.add('active');
    }
  });

  const tab = SETTINGS_CONFIG.find(t => t.id === tabId);
  if (!tab) return;

  const titles = {
    general: 'General',
    integrations: 'Integrations',
    'digital-twin': 'Digital Twin Config',
    alerts: 'Alerts & Notifications',
    'system-behavior': 'System Behavior',
    security: 'Security',
    'api-developer': 'API & Developer',
    'system-health': 'System Health'
  };
  
  const descriptions = {
    general: 'Configure your Digital Twin platform',
    integrations: 'Manage connections to external platforms and services',
    'digital-twin': 'Configure how your Digital Twin operates',
    alerts: 'Configure alert thresholds and notification channels',
    'system-behavior': 'System performance, caching, and synchronization',
    security: 'Manage security policies and access control',
    'api-developer': 'API keys, webhooks, and developer settings',
    'system-health': 'Monitor system health and performance'
  };

  document.getElementById('settingsTitle').textContent = titles[tabId] || 'General';
  document.getElementById('settingsDescription').textContent = descriptions[tabId] || '';

  const body = document.getElementById('settingsBody');
  if (body) {
    body.innerHTML = tab.content;
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }
}

// ─── RENDER SETTINGS NAV ───
function renderSettingsNav() {
  return `
    <div class="settings-nav-header">Settings</div>
    ${SETTINGS_CONFIG.map(item => `
      <div class="settings-nav-item ${item.id === 'general' ? 'active' : ''}" data-tab="${item.id}" onclick="switchTab('${item.id}')">
        <i data-lucide="${item.icon}" class="nav-icon"></i>
        <span>${item.label}</span>
      </div>
    `).join('')}
  `;
}

// ─── SAVE SETTINGS ───
function saveSettings() {
  const btn = document.querySelector('.settings-btn-primary:not(.settings-btn-small)');
  if (btn) {
    const originalText = btn.innerHTML;
    btn.innerHTML = '✓ Saved!';
    btn.style.background = '#16a34a';
    setTimeout(function() {
      btn.innerHTML = originalText;
      btn.style.background = '';
    }, 2000);
  }
  showToast('✓ Settings Saved Successfully', 'success');
}

function cancelSettings() {
  if (confirm('Are you sure you want to discard changes?')) {
    showToast('Changes discarded', 'info');
  }
}

function runHealthCheck() {
  const btn = document.querySelector('.settings-btn-primary:not(.settings-btn-small)');
  if (btn) {
    btn.innerHTML = '⏳ Running...';
    btn.disabled = true;
    setTimeout(() => {
      btn.innerHTML = '✓ Health Check Complete';
      btn.style.background = '#16a34a';
      showToast('✓ Health check completed successfully', 'success');
      setTimeout(() => {
        btn.innerHTML = `
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="23 4 23 10 17 10"/>
            <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
          </svg>
          Run Health Check
        `;
        btn.style.background = '';
        btn.disabled = false;
      }, 2000);
    }, 2000);
  }
}

// ─── INTEGRATION FUNCTIONS ───
function openIntegrationModal(type) {
  currentIntegrationId = type;
  const config = INTEGRATION_CONFIGS[type];
  if (!config) return;

  const titleEl = document.getElementById('modalTitle');
  const subtitleEl = document.getElementById('modalSubtitle');
  const bodyEl = document.getElementById('modalBody');
  const modal = document.getElementById('integrationModal');

  if (titleEl) titleEl.textContent = config.title;
  if (subtitleEl) subtitleEl.textContent = config.subtitle;
  if (bodyEl) bodyEl.innerHTML = config.fields;

  // Reset status
  const statusIndicator = document.getElementById('statusIndicator');
  const statusText = document.getElementById('statusText');
  if (statusIndicator) statusIndicator.className = 'status-indicator';
  if (statusText) statusText.textContent = 'Ready';

  const testBtn = document.querySelector('.modal-btn-test');
  if (testBtn) {
    testBtn.innerHTML = `
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="23 4 23 10 17 10"/>
        <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
      </svg>
      Test Connection
    `;
    testBtn.className = 'modal-btn modal-btn-test';
  }

  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeIntegrationModal() {
  const modal = document.getElementById('integrationModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function testConnection() {
  const btn = document.querySelector('.modal-btn-test');
  const statusIndicator = document.getElementById('statusIndicator');
  const statusText = document.getElementById('statusText');
  if (!btn) return;

  btn.innerHTML = `
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spin">
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
    </svg>
    Testing...
  `;
  btn.className = 'modal-btn modal-btn-test testing';
  btn.disabled = true;

  if (statusIndicator) statusIndicator.className = 'status-indicator testing';
  if (statusText) statusText.textContent = 'Testing connection...';

  setTimeout(() => {
    const success = Math.random() > 0.2;
    
    if (success) {
      btn.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M20 6L9 17l-5-5"/>
        </svg>
        Connected
      `;
      btn.className = 'modal-btn modal-btn-test success';
      if (statusIndicator) statusIndicator.className = 'status-indicator connected';
      if (statusText) statusText.textContent = 'Connected successfully';
      showToast('✓ Connection successful!', 'success');
    } else {
      btn.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"/>
          <line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
        Failed
      `;
      btn.className = 'modal-btn modal-btn-test error';
      if (statusIndicator) statusIndicator.className = 'status-indicator error';
      if (statusText) statusText.textContent = 'Connection failed - Authentication error';
      showToast('✕ Connection failed. Please check credentials.', 'error');
    }

    btn.disabled = false;

    setTimeout(() => {
      if (btn.textContent.includes('Connected') || btn.textContent.includes('Failed')) {
        btn.innerHTML = `
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="23 4 23 10 17 10"/>
            <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
          </svg>
          Test Connection
        `;
        btn.className = 'modal-btn modal-btn-test';
        if (statusIndicator) statusIndicator.className = 'status-indicator';
        if (statusText) statusText.textContent = 'Ready';
      }
    }, 3000);
  }, 2000);
}

function saveIntegration() {
  const inputs = document.querySelectorAll('#modalBody input, #modalBody select');
  const data = {};
  inputs.forEach(input => {
    const label = input.closest('.modal-field')?.querySelector('label')?.textContent || 'field';
    data[label] = input.value;
  });

  showToast('✓ Configuration saved successfully', 'success');

  setTimeout(() => {
    closeIntegrationModal();
  }, 1200);

  console.log('Integration configuration saved:', data);
  console.log('Integration ID:', currentIntegrationId);
}

function showToast(message, type) {
  const toast = document.getElementById('toast');
  const icon = document.getElementById('toastIcon');
  const msg = document.getElementById('toastMessage');

  if (!toast || !icon || !msg) return;

  msg.textContent = message;
  toast.className = 'toast ' + type;
  icon.textContent = type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ';

  setTimeout(() => toast.classList.add('show'), 10);

  clearTimeout(toast._hideTimeout);
  toast._hideTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}

// ─── MAKE FUNCTIONS GLOBALLY ACCESSIBLE ───
window.switchTab = switchTab;
window.saveSettings = saveSettings;
window.cancelSettings = cancelSettings;
window.runHealthCheck = runHealthCheck;
window.openIntegrationModal = openIntegrationModal;
window.closeIntegrationModal = closeIntegrationModal;
window.testConnection = testConnection;
window.saveIntegration = saveIntegration;
window.showToast = showToast;

// ─── AUTO-INIT ───
document.addEventListener('DOMContentLoaded', function() {
  const nav = document.querySelector('.settings-nav');
  if (nav) {
    nav.innerHTML = renderSettingsNav();
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }
  
  switchTab('integrations');
});