import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [userType, setUserType] = useState('user');
  const { login } = useAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email').required('Required'),
      password: Yup.string().required('Required'),
    }),
    onSubmit: async (values) => {
      try {
        const result = await login(values, userType);
        if (result.success) {
          if (userType === 'user') {
            navigate('/user/dashboard');
          } else {
            navigate('/worker/dashboard');
          }
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
            Welcome Back
          </h2>

          {/* User Type Toggle */}
          <div className="flex gap-2 mb-6">
            <button
              type="button"
              onClick={() => setUserType('user')}
              className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
                userType === 'user'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              User
            </button>
            <button
              type="button"
              onClick={() => setUserType('worker')}
              className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
                userType === 'worker'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Worker
            </button>
          </div>

          <form onSubmit={formik.handleSubmit}>
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

            <div className="mb-6">
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

            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="btn-primary w-full"
            >
              {formik.isSubmitting ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link
                to={`/register/${userType}`}
                className="text-primary-600 font-semibold hover:underline"
              >
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
