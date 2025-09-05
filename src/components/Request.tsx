import {
  Button,
  Input,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui';
import { Headers } from './Headers';
import { Body } from './Body';
import { GeneratedCode } from './GeneratedCode';

const methods = ['get', 'post', 'put', 'patch', 'delete', 'head', 'options'];

export const Request = () => {
  return (
    <div className="flex flex-col gap-2 justify-between">
      <section className="flex justify-between gap-3">
        <Select defaultValue="get">
          <SelectTrigger className="w-[130px]">
            <SelectValue placeholder="Method" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {methods.map((method) => (
                <SelectItem key={method} value={method}>
                  {method.toUpperCase()}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Input placeholder="Enter URL" />
        <Button type="submit">Send</Button>
      </section>

      <section className="flex flex-col max-h-[50vh] overflow-auto">
        <Tabs className="flex flex-col h-full">
          <TabsList>
            <TabsTrigger value="header">Headers</TabsTrigger>
            <TabsTrigger value="body">Body</TabsTrigger>
            <TabsTrigger value="generated-code">Generated Code</TabsTrigger>
          </TabsList>
          <TabsContent
            value="header"
            forceMount
            className=" overflow-auto data-[state=inactive]:hidden"
          >
            <Headers />
          </TabsContent>
          <TabsContent
            value="body"
            forceMount
            className="overflow-auto data-[state=inactive]:hidden"
          >
            <Body />
          </TabsContent>
          <TabsContent
            value="generated-code"
            forceMount
            className="flex-1 overflow-auto data-[state=inactive]:hidden"
          >
            <GeneratedCode />
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
};
