import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../context/AuthContext';

const RegisterWorker = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const categories = [
    'Plumbing', 'Electrical', 'Carpentry', 'Painting',
    'Cleaning', 'AC Repair', 'Appliance Repair', 'Pest Control'
  ];

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      categories: [],
      bio: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email').required('Required'),
      phone: Yup.string().matches(/^[0-9]{10}$/, 'Must be 10 digits').required('Required'),
      password: Yup.string().min(6, 'Must be at least 6 characters').required('Required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Required'),
      categories: Yup.array().min(1, 'Select at least one category').required('Required'),
    }),
    onSubmit: async (values) => {
      try {
        const { confirmPassword, ...workerData } = values;
        const result = await register(workerData, 'worker');
        if (result.success) {
          navigate('/worker/dashboard');
        }
      } catch (error) {
        // Error already handled in context
      }
    },
  });

  const handleCategoryToggle = (category) => {
    const current = formik.values.categories;
    if (current.includes(category)) {
      formik.setFieldValue('categories', current.filter((c) => c !== category));
    } else {
      formik.setFieldValue('categories', [...current, category]);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
      <div className="max-w-2xl w-full">
        <div className="card">
          <h2 className="text-3xl font-display font-bold text-center mb-6">
            Register as Worker
          </h2>

          <form onSubmit={formik.handleSubmit}>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="label">Full Name</label>
                <input
                  type="text"
                  {...formik.getFieldProps('name')}
                  className={`input-field ${
                    formik.touched.name && formik.errors.name ? 'input-error' : ''
                  }`}
                />
                {formik.touched.name && formik.errors.name && (
                  <p className="error-text">{formik.errors.name}</p>
                )}
              </div>

              <div>
                <label className="label">Phone</label>
                <input
                  type="tel"
                  {...formik.getFieldProps('phone')}
                  className={`input-field ${
                    formik.touched.phone && formik.errors.phone ? 'input-error' : ''
                  }`}
                />
                {formik.touched.phone && formik.errors.phone && (
                  <p className="error-text">{formik.errors.phone}</p>
                )}
              </div>
            </div>

            <div className="mb-4">
              <label className="label">Email</label>
              <input
                type="email"
                {...formik.getFieldProps('email')}
                className={`input-field ${
                  formik.touched.email && formik.errors.email ? 'input-error' : ''
                }`}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="error-text">{formik.errors.email}</p>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="label">Password</label>
                <input
                  type="password"
                  {...formik.getFieldProps('password')}
                  className={`input-field ${
                    formik.touched.password && formik.errors.password ? 'input-error' : ''
                  }`}
                />
                {formik.touched.password && formik.errors.password && (
                  <p className="error-text">{formik.errors.password}</p>
                )}
              </div>

              <div>
                <label className="label">Confirm Password</label>
                <input
                  type="password"
                  {...formik.getFieldProps('confirmPassword')}
                  className={`input-field ${
                    formik.touched.confirmPassword && formik.errors.confirmPassword
                      ? 'input-error'
                      : ''
                  }`}
                />
                {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                  <p className="error-text">{formik.errors.confirmPassword}</p>
                )}
              </div>
            </div>

            <div className="mb-4">
              <label className="label">Categories (Select at least one)</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => handleCategoryToggle(category)}
                    className={`py-2 px-4 rounded-lg font-semibold transition-all ${
                      formik.values.categories.includes(category)
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
              {formik.touched.categories && formik.errors.categories && (
                <p className="error-text">{formik.errors.categories}</p>
              )}
            </div>

            <div className="mb-6">
              <label className="label">Bio (Optional)</label>
              <textarea
                {...formik.getFieldProps('bio')}
                rows="3"
                className="input-field"
                placeholder="Tell us about your experience..."
              />
            </div>

            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="btn-primary w-full"
            >
              {formik.isSubmitting ? 'Registering...' : 'Register as Worker'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-primary-600 font-semibold hover:underline">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterWorker;
