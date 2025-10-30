import DashboardHero from '../components/dashboard/DashboardHero.jsx';
import FocusRadar from '../components/dashboard/FocusRadar.jsx';
import WeakTopicGuesser from '../components/dashboard/WeakTopicGuesser.jsx';
import CustomMixBuilder from '../components/dashboard/CustomMixBuilder.jsx';
import PyqSprint from '../components/dashboard/PyqSprint.jsx';
import RecentActivity from '../components/dashboard/RecentActivity.jsx';
import { useAppContext } from '../context/AppContext.jsx';

const UserDashboardPage = () => {
  const { session, learners } = useAppContext();
  const learner = learners.find((item) => item.id === session?.user?.id) || learners[0];

  return (
    <div className="space-y-10">
      <DashboardHero learner={learner} />
      <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
        <div className="space-y-6">
          <FocusRadar learner={learner} />
          <WeakTopicGuesser />
          <CustomMixBuilder />
        </div>
        <div className="space-y-6">
          <PyqSprint />
          <RecentActivity />
        </div>
      </div>
    </div>
  );
};

export default UserDashboardPage;
