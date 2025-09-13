import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { SignUpForm } from '@/components/auth/signUpForm';
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
