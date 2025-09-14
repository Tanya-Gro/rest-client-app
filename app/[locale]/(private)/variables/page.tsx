import { VariablesContent } from '@components';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../api/auth/[...nextauth]/route';

export default async function Variables() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user.email) {
    return;
  }

  return <VariablesContent userEmail={session.user.email} />;
}
