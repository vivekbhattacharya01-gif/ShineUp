const fs = require('fs');
const path = require('path');
const pages = {
  'landing-page.jsx': 'LandingPage',
  'marketplace.jsx': 'Marketplace',
  'provider-profile.jsx': 'ProviderProfile',
  'user-dashboard.jsx': 'UserDashboard',
  'my-garage.jsx': 'MyGarage',
  'vehicle-history.jsx': 'VehicleHistory',
  'maintenance-reminders.jsx': 'MaintenanceReminders',
  'booking-flow.jsx': 'BookingFlow',
  'community.jsx': 'Community',
  'partner-dashboard.jsx': 'PartnerDashboard'
};
const dir = path.join(process.cwd(), 'src', 'app', 'pages');
for (const [filename, component] of Object.entries(pages)) {
  const filePath = path.join(dir, filename);
  if (!fs.existsSync(filePath)) {
    const content = `export function ${component}() {
  return (
    <div className="min-h-screen flex items-center justify-center text-center text-2xl font-medium">
      ${component} page placeholder
    </div>
  );
}
`;
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Created', filePath);
  } else {
    console.log('Exists', filePath);
  }
}
