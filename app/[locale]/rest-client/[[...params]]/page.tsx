import { Request } from '@components';
import { Response } from '@components';

export default function RestClient() {
  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-1">
        <Request />
      </div>
      <div>
        <Response />
      </div>
    </div>
  );
}
