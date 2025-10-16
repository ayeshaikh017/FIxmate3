import { Link } from 'react-router-dom';
import { FaWrench, FaUserShield, FaClock, FaStar } from 'react-icons/fa';

const Home = () => {
  const features = [
    {
      icon: <FaWrench className="text-4xl text-primary-600" />,
      title: 'Skilled Workers',
      description: 'Find verified professionals for all your needs'
    },
    {
      icon: <FaUserShield className="text-4xl text-primary-600" />,
      title: 'Verified Profiles',
      description: 'All workers are background checked and verified'
    },
    {
      icon: <FaClock className="text-4xl text-primary-600" />,
      title: 'Quick Response',
      description: 'Get workers at your doorstep within hours'
    },
    {
      icon: <FaStar className="text-4xl text-primary-600" />,
      title: 'Rated Service',
      description: 'Choose based on ratings and reviews'
    }
  ];

  const categories = [
    'Plumbing', 'Electrical', 'Carpentry', 'Painting',
    'Cleaning', 'AC Repair', 'Appliance Repair', 'Pest Control'
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
              Find Skilled Workers Instantly
            </h1>
            <p className="text-xl mb-8 text-primary-100">
              Connect with verified professionals for all your home service needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register/user" className="btn bg-white text-primary-700 hover:bg-gray-100 px-8 py-4 text-lg">
                Find Workers
              </Link>
              <Link to="/register/worker" className="btn border-2 border-white text-white hover:bg-white hover:text-primary-700 px-8 py-4 text-lg">
                Become a Worker
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container-custom">
          <h2 className="text-4xl font-display font-bold text-center mb-12">
            Why Choose FixMate?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card text-center hover:scale-105 transition-transform">
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-gray-100">
        <div className="container-custom">
          <h2 className="text-4xl font-display font-bold text-center mb-12">
            Popular Categories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category, index) => (
              <div key={index} className="card text-center hover:bg-primary-50 cursor-pointer">
                <p className="font-semibold">{category}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary-600 text-white">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-display font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8">
            Join thousands of satisfied customers and workers
          </p>
          <Link to="/register/user" className="btn bg-white text-primary-700 hover:bg-gray-100 px-8 py-4 text-lg">
            Get Started Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
