import { AuthForm } from '@/components/auth-form/AuthForm';
import { AUTH_PAGE } from '@/constant/enumAuthPage';

export default function SignIn() {
  return (
    <>
      <h1>Sign in</h1>
      <AuthForm page={AUTH_PAGE.LOGIN} />
    </>
  );
}
