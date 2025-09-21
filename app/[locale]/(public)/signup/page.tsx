import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components';
import { SignUpForm } from '@auth';
import { getTranslations } from 'next-intl/server';

export default async function SignUp() {
  const text = await getTranslations();

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
