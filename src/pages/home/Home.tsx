import { Carousel } from "@material-tailwind/react";
import {
  useGetCategoryProductsQuery,
  useGetProductsQuery,
} from "../../api/product";
import { ProductCard } from "../../components/Card";
import Loader from "../../components/loader/Loader";
import { Link } from "react-router-dom";
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
const Home = () => {
  const { data, isLoading } = useGetProductsQuery("");
  const { data: category = [] } = useGetCategoryProductsQuery("");
  return (
    <>
      <div className="pt-5">
        <Carousel
          className="rounded-xl z-0 w-full"
          autoplay
          loop
          autoplayDelay={3000}
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
          <img
            src="https://s3.eu-central-1.amazonaws.com/alifcore.storage/media/images/settings/41/banner-1687169590303.jpg"
            alt="image 1"
            className="w-full"
          />
          <img
            src="https://s3.eu-central-1.amazonaws.com/alifcore.storage/media/images/settings/41/banner-1691732503687.jpg"
            alt="image 2"
            className="w-full"
          />
          <img
            src="https://s3.eu-central-1.amazonaws.com/alifcore.storage/media/images/settings/41/banner-1692187511406.jpg"
            alt="image 3"
            className="w-full"
          />
        </Carousel>
      </div>
      <div>
        <div className="p-5">
          <h1 className="text-[25px]">Категории</h1>
          <div className="py-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
            {category.map((el: string) => {
              return (
                <Link to={`/category/${el}`} className="px-4 py-2 bg-gray-200 rounded text-gray-800">
                  {el}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      <div className="py-5">
        <div className="w-full grid px-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {isLoading ? (
            <Loader />
          ) : (
            data?.products?.map((item: TProduct) => {
              return (
                <ProductCard
                  keyy={item.id}
                  img={item.thumbnail}
                  title={item.title}
                  price={item.price}
                  description={item.description}
                  discountPercentage={item.discountPercentage}
                  element={item}
                />
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
