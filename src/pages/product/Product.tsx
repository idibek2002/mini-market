import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../../api/product";
import { Breadcrumbs, Button, IconButton } from "@material-tailwind/react";
import { Carousel } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../reducers/basket";
const Product = () => {
  const { id } = useParams();
  const { data = [] } = useGetProductsQuery(`/${id}`);
  const basket = useSelector(({ basket }) => basket.products);
  const dispatch = useDispatch();
  return (
    <>
      <div className="py-5 px-5">
        <Breadcrumbs>
          <Link to={"/"} className="opacity-60 text-[10px] md:text-[14px]">
            Каталог товаров
          </Link>
          <Link
            to={`/category/${data.category}`}
            className="opacity-60 text-[10px] md:text-[14px]"
          >
            {`${data.category
              ?.charAt(0)
              .toUpperCase()}${data.category?.substring(1)}`}
          </Link>
          <h1 className="opacity-60 text-[10px] md:text-[14px]">
            {data.title}
          </h1>
        </Breadcrumbs>
      </div>
      <div className="py-5 flex flex-col gap-y-4 px-5 w-full lg:flex-row justify-between">
        <div className="w-[90%] mx-auto lg:w-[45%] py-5 lg:h-[60vh] h-screen">
          <Carousel
            className="rounded-xl w-full "
            prevArrow={({ handlePrev }) => (
              <IconButton
                variant="text"
                color="gray"
                size="lg"
                onClick={handlePrev}
                className="!absolute top-2/4 left-4 -translate-y-2/4"
              >
                <i className="fa-solid fa-chevron-up fa-rotate-270 text-blue-500 text-[30px]"></i>
              </IconButton>
            )}
            nextArrow={({ handleNext }) => (
              <IconButton
                variant="text"
                color="white"
                size="lg"
                onClick={handleNext}
                className="!absolute top-2/4 !right-4 -translate-y-2/4"
              >
                <i className="fa-solid fa-chevron-up fa-rotate-90 text-blue-500 text-[30px]"></i>
              </IconButton>
            )}
            navigation={({ setActiveIndex, activeIndex, length }) => (
              <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
                {new Array(length).fill("").map((_, i) => (
                  <span
                    key={i}
                    className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                      activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                    }`}
                    onClick={() => setActiveIndex(i)}
                  />
                ))}
              </div>
            )}
          >
            {data?.images?.map((image: string) => {
              return (
                <img
                  src={image}
                  alt="image 1"
                  className="h-full w-full object-cover"
                />
              );
            })}
          </Carousel>
        </div>
        <div className="w-full md:w-[45%]">
          <h1 className="text-[25px]">{data.title}</h1>
          <div className="flex gap-x-2">
            <h1 className="text-[25px]">
              {(
                data.price -
                (data.price * data.discountPercentage) / 100
              ).toFixed(2)}
              $
            </h1>
            <s className="text-[21px] text-gray-700">{data.price}.00 $</s>
          </div>
          <h1 className="text-[16px]">{data.description}</h1>
          <div className="py-4">
            {basket?.find(
              (element: { id: number; quantity: number }) =>
                element.id === data.id
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
                onClick={() => dispatch(addProduct({ ...data, quantity: 1 }))}
                ripple={false}
                fullWidth={true}
                className="bg-[#ffda46] text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
              >
                Add to Cart
              </Button>
            )}
          </div>
          <div className="py-2 text-[20px] w-full border-b">Характеристики</div>
          <div className="w-[50%] flex items-center justify-between py-4">
            <div>Бренд:</div>
            <div>{data.brand}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
