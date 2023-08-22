import Loader from "./Loader";

const Message = () => {
  return (
    <>
      <div className="py-2 px-5 rounded-lg bg-black w-auto text-white my-3">
        Message
      </div>
      <div className="py-2 px-5 rounded-lg bg-black w-auto text-white my-3">
        Lorem ipsum dolor sit.
      </div>
      <div className="py-2 px-5 rounded-lg bg-black w-auto text-white my-3">
        Lorem ipsum dolor sit. ipsum dolor sit.
      </div>
      <div className="h-10 w-16 rounded-lg bg-black text-white my-3 flex items-center justify-center">
        <Loader variant="white" />
      </div>
    </>
  );
};

export default Message;
