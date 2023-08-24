import Image from "next/image";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/packages/ui";
import { features } from "@/lib/helpers";

const Features = () => {
  return (
    <>
      <Tabs
        defaultValue="text-chat"
        className="w-full md:w-[95%] mt-12 sm:mt-20 mb-20"
      >
        <TabsList className="w-[95%] xl:w-[800px] overflow-x-auto">
          {features.map((data) => (
            <TabsTrigger
              value={data.id}
              key={data.id}
              className="w-full capitalize font-semibold focus-visible:ring-0"
            >
              {data.title}
            </TabsTrigger>
          ))}
        </TabsList>
        {features.map((data) => (
          <TabsContent value={data.id} key={data.id}>
            <Card>
              <CardHeader>
                <CardTitle className=" capitalize text-2xl font-bold">
                  {data.title}
                </CardTitle>
                <CardDescription>{data.description}</CardDescription>
              </CardHeader>
              <CardContent className="w-full overflow-hidden">
                <Image
                  src={data?.image}
                  width={1300}
                  height={500}
                  alt="preview image"
                  className=" rounded-lg object-cover"
                />
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </>
  );
};

export default Features;
