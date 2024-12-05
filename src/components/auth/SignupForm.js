import React, { useState } from 'react';
import { Eye, EyeOff, UserRound, Mail, Lock, ArrowRight } from 'lucide-react';
import InputField from './InputField';
import { validateForm } from '../../utils/validation';

const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fname: '',
    email: '',
    password: '',
    cpassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fname, email, password, cpassword } = formData;

    const validationError = validateForm(formData);
    if (validationError) {
      alert(validationError);
      return;
    }

    try {
      const response = await fetch('/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fname,
          email,
          password,
          cpassword
        })
      });

      const data = await response.json();
      
      if (response.ok) {
        alert('User Successfully registered');
        setFormData({
          fname: '',
          email: '',
          password: '',
          cpassword: ''
        });
      } else {
        alert(data.message || 'Registration failed');
      }
    } catch (error) {
      alert('An error occurred during registration');
      console.error('Registration error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="relative bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-10 sm:px-12">
            <div className="relative z-10">
              <div className="flex items-center justify-center space-x-2">
                <h2 className="text-3xl font-extrabold text-white">
                  Create Account
                </h2>
              </div>
              <p className="mt-2 text-center text-indigo-100">
                Join us to start tracking your expenses
              </p>
            </div>
            <div className="absolute inset-0 bg-black opacity-10"></div>
          </div>

          <div className="px-8 py-8 sm:px-12">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-5">
                <InputField
                  icon={<UserRound className="h-5 w-5 text-indigo-400" />}
                  type="text"
                  name="fname"
                  placeholder="Enter your fullname"
                  value={formData.fname}
                  onChange={handleChange}
                />

                <InputField
                  icon={<Mail className="h-5 w-5 text-indigo-400" />}
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                />

                <InputField
                  icon={<Lock className="h-5 w-5 text-indigo-400" />}
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  endIcon={
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-gray-400 hover:text-indigo-600 focus:outline-none transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  }
                />

                <InputField
                  icon={<Lock className="h-5 w-5 text-indigo-400" />}
                  type={showConfirmPassword ? "text" : "password"}
                  name="cpassword"
                  placeholder="Confirm your password"
                  value={formData.cpassword}
                  onChange={handleChange}
                  endIcon={
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="text-gray-400 hover:text-indigo-600 focus:outline-none transition-colors"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  }
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex items-center justify-center px-4 py-3 text-sm font-medium rounded-xl text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  Sign Up
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or</span>
                </div>
              </div>

              <p className="text-center text-sm text-gray-600">
                Already have an account?{' '}
                <a 
                  href="/" 
                  className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
                >
                  Login
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
