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
import { Headers } from '../Headers';

const methods = ['get', 'post', 'put', 'patch', 'delete', 'head', 'options'];

export const Request = () => {
  return (
    <div className="flex flex-col justify-between">
      <div className="flex justify-between gap-3">
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
      </div>

      <Tabs>
        <TabsList>
          <TabsTrigger value="header">Headers</TabsTrigger>
        </TabsList>
        <TabsContent value="header">
          <Headers />
        </TabsContent>
      </Tabs>
    </div>
  );
};
