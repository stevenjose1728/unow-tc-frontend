import React from 'react';
import { useAuth } from '../hooks/useAuth';

export const Login: React.FC = () => {
  const { form, loading, error, handleLogin } = useAuth();
  const { register, handleSubmit, formState: { errors } } = form;

  return (
    <div className="login">
      <div className="login__container min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-blue-50 px-4">
        <div className="login__card w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-6">
          <div className="login__header text-center">
            <h1 className="login__title text-3xl font-bold text-gray-900 mb-2">
              Bienvenido
            </h1>
            <p className="login__subtitle text-gray-600">
              Ingresa tus credenciales para continuar
            </p>
          </div>

          {error && (
            <div className="login__error rounded-md bg-red-50 border border-red-200 p-4">
              <p className="login__error-text text-sm text-red-600">
                {error}
              </p>
            </div>
          )}

          <form className="login__form space-y-6" onSubmit={handleSubmit(handleLogin)}>
            <div className="login__form-group">
              <label 
                htmlFor="email" 
                className="login__label block text-sm font-medium text-gray-700 mb-1"
              >
                Correo electrónico
              </label>
              <input
                {...register('email')}
                type="email"
                id="email"
                className="login__input w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="ejemplo@correo.com"
              />
              {errors.email && (
                <p className="login__input-error mt-1 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="login__form-group">
              <label 
                htmlFor="password" 
                className="login__label block text-sm font-medium text-gray-700 mb-1"
              >
                Contraseña
              </label>
              <input
                {...register('password')}
                type="password"
                id="password"
                className="login__input w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="login__input-error mt-1 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`login__submit-button w-full py-3 px-4 rounded-lg text-white font-medium transition-colors
                ${loading 
                  ? 'bg-blue-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                }`}
            >
              {loading ? (
                <div className="login__loading-state flex items-center justify-center">
                  <svg 
                    className="login__spinner animate-spin h-5 w-5 mr-3" 
                    viewBox="0 0 24 24"
                  >
                    <circle 
                      className="opacity-25" 
                      cx="12" 
                      cy="12" 
                      r="10" 
                      stroke="currentColor" 
                      strokeWidth="4"
                    />
                    <path 
                      className="opacity-75" 
                      fill="currentColor" 
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Iniciando sesión...
                </div>
              ) : (
                'Iniciar sesión'
              )}
            </button>
          </form>

          <div className="login__footer text-center text-sm text-gray-600">
            <p>Sistema de gestión de empleados</p>
          </div>
        </div>
      </div>
    </div>
  );
};