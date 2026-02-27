import { useState, useEffect } from 'react';
import workerService from '../services/workerService';
import Loading from '../components/common/Loading';

const WorkerSearch = () => {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    loadWorkers();
  }, []);

  const loadWorkers = async () => {
    try {
      const { data } = await workerService.getWorkers();
      setWorkers(data.data || []);
    } catch (error) {
      console.error('Failed to load workers', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredWorkers = filter
    ? workers.filter((w) => w.categories?.includes(filter))
    : workers;

  if (loading) return <Loading />;

  return (
    <div className="container-custom py-12">
      <h1 className="text-4xl font-bold mb-8">Find Workers</h1>

      <div className="mb-8">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="input-field max-w-md"
        >
          <option value="">All Categories</option>
          {['Plumbing', 'Electrical', 'Carpentry', 'Painting', 'Cleaning', 'AC Repair', 'Appliance Repair', 'Pest Control'].map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {filteredWorkers.length > 0 ? (
        <div className="grid md:grid-cols-3 gap-6">
          {filteredWorkers.map((worker) => (
            <div key={worker._id} className="card hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold mb-2">{worker.name}</h3>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-yellow-500">★</span>
                <span className="font-semibold">{worker.rating?.average || 0}</span>
                <span className="text-gray-500">({worker.rating?.count || 0} reviews)</span>
              </div>
              {worker.bio && <p className="text-gray-700 mb-4">{worker.bio}</p>}
              <div className="flex flex-wrap gap-2 mb-4">
                {worker.categories?.map((cat) => (
                  <span key={cat} className="badge-info">{cat}</span>
                ))}
              </div>
              {worker.pricing?.baseRate && (
                <p className="text-primary-600 font-bold">₹{worker.pricing.baseRate}/hour</p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600">No workers found</p>
        </div>
      )}
    </div>
  );
};

export default WorkerSearch;
