import AdminOverview from '../components/dashboard/AdminOverview.jsx';
import PaymentHealth from '../components/dashboard/PaymentHealth.jsx';
import CohortInsights from '../components/dashboard/CohortInsights.jsx';
import IncidentHeatmap from '../components/dashboard/IncidentHeatmap.jsx';
import BlueprintIntelligence from '../components/dashboard/BlueprintIntelligence.jsx';
import SecurityConsole from '../components/dashboard/SecurityConsole.jsx';

const AdminDashboardPage = () => (
  <div className="space-y-10">
    <AdminOverview />
    <div className="grid gap-6 lg:grid-cols-[1.6fr,1fr]">
      <div className="space-y-6">
        <CohortInsights />
        <BlueprintIntelligence />
      </div>
      <div className="space-y-6">
        <SecurityConsole />
        <PaymentHealth />
        <IncidentHeatmap />
      </div>
    </div>
  </div>
);

export default AdminDashboardPage;
