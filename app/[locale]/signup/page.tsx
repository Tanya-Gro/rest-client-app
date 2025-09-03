import { AuthForm } from '@/components/auth-form/AuthForm';
import { AUTH_PAGE } from '@/constant/enumAuthPage';

export default function SignUp() {
  return (
    <>
      <h1>Sign up</h1>
      <AuthForm page={AUTH_PAGE.REGISTARTION} />
    </>
  );
}
