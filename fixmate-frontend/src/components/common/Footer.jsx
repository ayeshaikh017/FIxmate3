const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container-custom">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-display font-bold mb-4">FixMate</h3>
            <p className="text-gray-400">
              Find skilled workers instantly for all your home service needs.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/" className="hover:text-white">Home</a></li>
              <li><a href="/login" className="hover:text-white">Login</a></li>
              <li><a href="/register/user" className="hover:text-white">Register</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Email: support@fixmate.com</li>
              <li>Phone: +91 1234567890</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} FixMate. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
