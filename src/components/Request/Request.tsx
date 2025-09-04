import {
  Button,
  Input,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui';

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
              <SelectItem value="get">GET</SelectItem>
              <SelectItem value="post">POST</SelectItem>
              <SelectItem value="put">PUT</SelectItem>
              <SelectItem value="patch">PATCH</SelectItem>
              <SelectItem value="delete">DELETE</SelectItem>
              <SelectItem value="head">HEAD</SelectItem>
              <SelectItem value="options">OPTIONS</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Input placeholder="Enter URL" />
        <Button type="submit">Send</Button>
      </div>
    </div>
  );
};
