import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { SignUpForm } from '@/components/auth/signUpForm';
import { getLocale, getTranslations } from 'next-intl/server';
import { redirect } from '@i18n';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../api/auth/[...nextauth]/route';

export default async function SignUp() {
  const text = await getTranslations();
  const session = await getServerSession(authOptions);
  const locale = await getLocale();

  if (session) {
    redirect({
      href: '/',
      locale,
    });
  }

  return (
    <Card className="w-2xl">
      <CardHeader>
        <CardTitle>{text(`registration.header`)}</CardTitle>
        <CardDescription>
          {text(`registration.header-description`)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SignUpForm />
      </CardContent>
    </Card>
  );
}
