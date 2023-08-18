import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addProduct } from "../reducers/basket";
type TProduct = {
  brand: string;
  category: string;
  description: string;
  discountPercentage: number;
  id: number;
  images: [];
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
  title: string;
};
type TCard = {
  img: string;
  title: string;
  price: number;
  description: string;
  keyy: number;
  discountPercentage:number;
  element:TProduct
};
export function ProductCard({
  img,
  title,
  price,
  description,
  keyy,
  discountPercentage,
  element
}: TCard) {
  const dispatch = useDispatch();
  const data = useSelector(({ basket }) => basket.products);

  return (
    <Card key={keyy} className="w-50 flex justify-between">
      <Link to={`/product/${keyy}`}>
        <CardHeader
          shadow={false}
          floated={false}
          className="min-h-56 sm:h-56 flex items-center justify-center"
        >
          <img
            src={img}
            alt="card-image"
            className="w-full h-full object-cover"
          />
        </CardHeader>
        <CardBody>
          <div className="mb-2 flex items-center justify-between">
            <Typography color="blue-gray" className="font-medium">
              {title}
            </Typography>
            <Typography color="blue-gray" className="font-medium">
              <div className="flex gap-x-2">
                <h1 className="text-[15px]">
                  {(price - (price * discountPercentage) / 100).toFixed(2)}$
                </h1>
                <s className="text-[12px] text-gray-700">${price}.00</s>
              </div>
            </Typography>
          </div>
          <Typography
            variant="small"
            color="gray"
            className="font-normal opacity-75"
          >
            {description}
          </Typography>
        </CardBody>
      </Link>
      <CardFooter className="pt-0">
        {data?.find(
          (el: { id: number; quantity: number }) => el.id === keyy
        ) ? (
          <Link to={'/cart'}>
          <Button
            ripple={false}
            fullWidth={true}
            className="bg-[#ffda46] text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
          >
            Go to Cart
          </Button>
          </Link>
          
        ) : (
          <Button
            onClick={() => dispatch(addProduct({...element, quantity: 1 }))}
            ripple={false}
            fullWidth={true}
            className="bg-[#ffda46] text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
          >
            Add to Cart
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
