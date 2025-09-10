import { SignInForm } from '@/components/auth/signInForm';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui';
import { redirect } from '@i18n';
import { getServerSession } from 'next-auth';
import { getLocale, getTranslations } from 'next-intl/server';
import { authOptions } from '../../api/auth/[...nextauth]/route';

export default async function SignIn() {
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
        <CardTitle>{text(`login.header`)}</CardTitle>
        <CardDescription>{text(`login.header-description`)}</CardDescription>
      </CardHeader>
      <CardContent>
        <SignInForm />
      </CardContent>
    </Card>
  );
}
