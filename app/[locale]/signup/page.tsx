import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { SignUpForm } from '@/components/auth/signUpForm';
import { useTranslations } from 'next-intl';

export default function SignUp() {
  const text = useTranslations();
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
