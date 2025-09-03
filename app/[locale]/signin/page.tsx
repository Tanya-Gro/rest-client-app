import { AuthForm, AuthPage } from '@/components/auth-form/AuthForm';

export default function SignIn() {
  return (
    <>
      <h1>Sign in</h1>
      <AuthForm page={AuthPage.Login} />
    </>
  );
}
