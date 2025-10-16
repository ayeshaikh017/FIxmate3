import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../context/AuthContext';

const RegisterUser = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email').required('Required'),
      phone: Yup.string().matches(/^[0-9]{10}$/, 'Must be 10 digits').required('Required'),
      password: Yup.string().min(6, 'Must be at least 6 characters').required('Required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Required'),
    }),
    onSubmit: async (values) => {
      try {
        const { confirmPassword, ...userData } = values;
        const result = await register(userData, 'user');
        if (result.success) {
          navigate('/user/dashboard');
        }
      } catch (error) {
        // Error already handled in context
      }
    },
  });

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="card">
          <h2 className="text-3xl font-display font-bold text-center mb-6">
            Register as User
          </h2>

          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
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

            <div className="mb-4">
              <label className="label">Phone (10 digits)</label>
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

            <div className="mb-4">
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

            <div className="mb-6">
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

            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="btn-primary w-full"
            >
              {formik.isSubmitting ? 'Registering...' : 'Register'}
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

export default RegisterUser;
