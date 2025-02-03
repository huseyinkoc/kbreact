import { Link, useNavigate } from 'react-router-dom'; // Next.js yerine React Router kullanımı
import { useEffect, useState } from 'react';
import { PiArrowRightBold } from 'react-icons/pi';
import { Checkbox, Password, Button, Input, Text } from 'rizzui';
import { Form } from '../../ui/form';
import { loginSchema, LoginSchema } from '../../validators/login.schema';
import { loginCheck } from '../../api/authService'; // Login API isteği için servis dosyası oluşturuldu
import { SubmitHandler } from 'react-hook-form';
import { AuthProvider, useAuth } from '../../context/AuthProvider';

const initialValues: LoginSchema = {
  email: 'admin@admin.com',
  password: 'admin',
  rememberMe: true,
};

export default function SignInForm() {
  const [reset, setReset] = useState({});
  const { user, login, isAuthenticated, logout } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // Sayfa yönlendirme için React Router kullanımı

  // Eğer kullanıcı zaten giriş yapmışsa otomatik olarak /dashboard'a yönlendir
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const onSubmit: SubmitHandler<LoginSchema> = async (data) => {
    try {
      console.log(data);
      const response = await loginCheck(data.email, data.password);
      // Kullanıcı bilgilerini sakla ve yönlendir
      if (!isAuthenticated) {
        navigate('/dashboard', { replace: true });
      }

      login(response.token, response.csrf_token, response.user);
      setReset({ email: "", password: "", isRememberMe: false });
    } catch (err: any) {
      setError(err.message);
    }
  };


  return (
    <>
      <Form<LoginSchema>
        validationSchema={loginSchema}
        resetValues={reset}
        onSubmit={onSubmit}
        useFormProps={{
          mode: 'onChange',
          defaultValues: initialValues,
        }}
      >
        {({ register, formState: { errors } }) => (
          <div className="space-y-5">
            <Input
              type="email"
              size="lg"
              label="Email"
              placeholder="Enter your email"
              className="[&>label>span]:font-medium"
              inputClassName="text-sm"
              {...register('email')}
              error={errors.email?.message}
            />
            <Password
              label="Password"
              placeholder="Enter your password"
              size="lg"
              className="[&>label>span]:font-medium"
              inputClassName="text-sm"
              {...register('password')}
              error={errors.password?.message}
            />
            <div className="flex items-center justify-between pb-2">
              <Checkbox
                {...register('rememberMe')}
                label="Remember Me"
                variant="flat"
                className="[&>label>span]:font-medium"
              />
              <Link
                to="/forgot-password"
                className="h-auto p-0 text-sm font-semibold text-blue underline transition-colors hover:text-gray-900 hover:no-underline"
              >
                Forget Password?
              </Link>
            </div>
            <Button className="w-full" type="submit" size="lg">
              <span>Sign in</span>{' '}
              <PiArrowRightBold className="ms-2 mt-0.5 h-6 w-6" />
            </Button>
            {/* 🚀 Hata mesajını burada gösteriyoruz */}
            {error && (
              <div className="mt-4 text-center text-sm font-medium text-red-500">
                {error}
              </div>
            )}
          </div>
        )}
      </Form>
      <Text className="mt-6 text-center leading-loose text-gray-500 lg:mt-8 lg:text-start">
        Bir hesabınız yok mu?{' '}
        <Link
          to="/signup"
          className="font-semibold text-gray-700 transition-colors hover:text-blue"
        >
          Kayıt Olun
        </Link>
      </Text>
    </>
  );
}
