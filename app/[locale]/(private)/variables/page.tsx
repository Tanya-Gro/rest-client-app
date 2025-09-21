import { getServerSession } from 'next-auth';
import { authOptions } from '../../../api/auth/[...nextauth]/route';
import { VariablesContent } from '@components';

export default async function Variables() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user.email) {
    return;
  }

  return <VariablesContent userEmail={session.user.email} />;
}
