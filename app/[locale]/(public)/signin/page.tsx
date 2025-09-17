import { SignInForm } from '@auth';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui';
import { getTranslations } from 'next-intl/server';

export default async function SignIn() {
  const text = await getTranslations();

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
