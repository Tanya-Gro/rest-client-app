import { Body } from './Body';

export const Response = () => {
  return (
    <section className="flex flex-col gap-2">
      <h2 className="text-2xl font-semibold tracking-tight">Response</h2>
      <span className="text-lg font-semibold">200 OK</span>
      <Body isReadonly />
    </section>
  );
};
