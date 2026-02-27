import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import jobService from '../services/jobService';
import JobCard from '../components/job/JobCard';
import Loading from '../components/common/Loading';

const UserDashboard = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [stats, setStats] = useState({ active: 0, completed: 0, total: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      const { data } = await jobService.getJobs();
      setJobs(data.data || []);
      
      const active = data.data?.filter(j => ['pending', 'assigned', 'in_progress'].includes(j.status)).length || 0;
      const completed = data.data?.filter(j => j.status === 'completed').length || 0;
      
      setStats({ active, completed, total: data.data?.length || 0 });
    } catch (error) {
      console.error('Failed to load jobs', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="container-custom py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Welcome, {user?.name}!</h1>
        <Link to="/jobs/create" className="btn-primary">Create New Job</Link>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="card">
          <h3 className="text-xl font-bold mb-2">Active Jobs</h3>
          <p className="text-3xl font-bold text-primary-600">{stats.active}</p>
        </div>
        <div className="card">
          <h3 className="text-xl font-bold mb-2">Completed</h3>
          <p className="text-3xl font-bold text-secondary-600">{stats.completed}</p>
        </div>
        <div className="card">
          <h3 className="text-xl font-bold mb-2">Total Jobs</h3>
          <p className="text-3xl font-bold text-gray-600">{stats.total}</p>
        </div>
      </div>

      <div className="card">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Your Jobs</h2>
          <Link to="/workers" className="btn-outline">Find Workers</Link>
        </div>

        {jobs.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {jobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">No jobs yet</p>
            <Link to="/jobs/create" className="btn-primary">Create Your First Job</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
