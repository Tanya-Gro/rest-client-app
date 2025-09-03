import { AuthForm, AuthPage } from '@/components/auth-form/AuthForm';

export default function SignUp() {
  return (
    <>
      <h1>Sign up</h1>
      <AuthForm page={AuthPage.Registration} />
    </>
  );
}
