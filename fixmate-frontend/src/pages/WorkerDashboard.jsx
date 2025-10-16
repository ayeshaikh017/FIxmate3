import { useAuth } from '../context/AuthContext';

const WorkerDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="container-custom py-12">
      <h1 className="text-4xl font-display font-bold mb-8">
        Welcome, {user?.name}!
      </h1>

      <div className="grid md:grid-cols-4 gap-6">
        <div className="card">
          <h3 className="text-xl font-bold mb-2">Available Jobs</h3>
          <p className="text-3xl font-bold text-primary-600">0</p>
        </div>

        <div className="card">
          <h3 className="text-xl font-bold mb-2">In Progress</h3>
          <p className="text-3xl font-bold text-yellow-600">0</p>
        </div>

        <div className="card">
          <h3 className="text-xl font-bold mb-2">Completed</h3>
          <p className="text-3xl font-bold text-secondary-600">0</p>
        </div>

        <div className="card">
          <h3 className="text-xl font-bold mb-2">Total Earned</h3>
          <p className="text-3xl font-bold text-gray-600">₹0</p>
        </div>
      </div>

      <div className="mt-8 card">
        <h2 className="text-2xl font-bold mb-4">Available Jobs</h2>
        <p className="text-gray-600">No jobs available right now. Check back soon!</p>
      </div>
    </div>
  );
};

export default WorkerDashboard;
