import "./Loader.css";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
const Loader = () => {
  return (
    <>
      <Card className=" flex justify-between">
        <div className="image h-56 sm:h-56"></div>
        <CardBody>
          <div className="mb-2 flex items-center justify-between">
            <Typography color="blue-gray" className="font-medium">
              <div className="title"></div>
            </Typography>
            <Typography color="blue-gray" className="font-medium">
              <div className="title"></div>
            </Typography>
          </div>
          <Typography
            variant="small"
            color="gray"
            className="font-normal opacity-75"
          >
            <div className="title"></div>
          </Typography>
        </CardBody>
        <CardFooter className="pt-0">
          <button className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none py-5 hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"></button>
        </CardFooter>
      </Card>
    </>
  );
};

export default Loader;
