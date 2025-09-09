import { SignInForm } from '@/components/auth/signInForm';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui';
import { useTranslations } from 'next-intl';

export default function SignIn() {
  const text = useTranslations();
  return (
    <Card>
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
