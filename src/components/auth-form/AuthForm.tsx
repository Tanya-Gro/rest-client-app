import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ComponentProps } from 'react';
import { useTranslations } from 'next-intl';

export function AuthForm({ className, page, ...props }: AuthFormProps) {
  const text = useTranslations();
  console.log(text(`${page}.header`));
  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>{text(`${page}.header`)}</CardTitle>
          <CardDescription>
            {text(`${page}.header-description`)}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">{text(`${page}.password`)}</Label>
                </div>
                <Input id="password" type="password" required />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  {text(`${page}.button`)}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

interface AuthFormProps extends ComponentProps<'div'> {
  page: 'login' | 'registration';
}

export enum AuthPage {
  Login = 'login',
  Registration = 'registration',
}
