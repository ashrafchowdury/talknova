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
} from "@/components/ui";

const Features = () => {
  const query = [
    {
      id: "text-chat",
      title: "text chat",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque recusandae atque nulla fugit quas est quaerat culpa eum tempore eius.",
      image: "/preview_one.png",
    },
    {
      id: "voice-chat",
      title: "voice chat",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque recusandae atque nulla fugit quas est quaerat culpa eum tempore eius.",
      image: "/preview_two.png",
    },
    {
      id: "customization",
      title: "Theme Customization",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque recusandae atque nulla fugit quas est quaerat culpa eum tempore eius.",
      image: "/preview_three.png",
    },
    {
      id: "emcryption",
      title: "E-2-E Emcryption",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque recusandae atque nulla fugit quas est quaerat culpa eum tempore eius.",
      image: "",
    },
    {
      id: "invitation",
      title: "User Invitation",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque recusandae atque nulla fugit quas est quaerat culpa eum tempore eius.",
      image: "",
    },
  ];
  return (
    <>
      <Tabs defaultValue="text-chat" className="w-[95%] mt-20 mb-20">
        <TabsList className="w-[800px]">
          {query.map((data) => (
            <TabsTrigger
              value={data.id}
              key={data.id}
              className="w-full capitalize font-semibold focus-visible:ring-0"
            >
              {data.title}
            </TabsTrigger>
          ))}
        </TabsList>
        {query.map((data) => (
          <TabsContent value={data.id} key={data.id}>
            <Card>
              <CardHeader>
                <CardTitle className=" capitalize text-2xl font-bold">
                  {data.title}
                </CardTitle>
                <CardDescription>{data.description}</CardDescription>
              </CardHeader>
              <CardContent>
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
