import { useEffect, useState } from "react";
import "./Category.css";
import { Link, useParams } from "react-router-dom";
import { useGetElementProductsQuery } from "../../api/product";
import { ProductCard } from "../../components/Card";
import Loader from "../../components/loader/Loader";
import { Breadcrumbs, Typography } from "@material-tailwind/react";

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
const Catalog = () => {
  const { id } = useParams();
  const { data = [], isLoading } = useGetElementProductsQuery(id);
  const arr: number[] = [];
  data.products?.forEach((element: TProduct) => {
    arr.push(
      element.price -
        Math.ceil((element.price * element.discountPercentage) / 100)
    );
  });
  const min = data.products?.length
    ? arr?.reduce((a, b: number) => Math.min(a, b))
    : 0;
  const max = data.products?.length
    ? arr?.reduce((a, b: number) => Math.max(a, b))
    : 0;

  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(0);
  const [filterByBrand, setFilterByBrand] = useState<string[]>([]);
  const brands: string[] = [];
  data?.products?.forEach((e: TProduct) => {
    if (!brands.includes(e.brand)) brands.push(e.brand);
  });
  useEffect(() => {
    setMinPrice(min);
    setMaxPrice(max);
  }, [max, min]);

  return (
    <>
      <div className="py-5 px-5">
        <Breadcrumbs>
          <Link to={"/"} className="opacity-60">
            Каталог товаров
          </Link>
          <h1 className="opacity-60">
            {`${id?.charAt(0).toUpperCase()}${id?.substring(1)}`}
          </h1>
        </Breadcrumbs>
      </div>
      <div className="py-5 flex px-5">
        <div className="w-[300px] hidden lg:block">
          <div>
            <Typography
              variant="h6"
              className="py-2 text-[#455A64] text-[14px]"
            >
              Цена
            </Typography>
            <div className="flex gap-x-5">
              <input
                type="number"
                placeholder={`от ${min}`}
                onChange={(e) =>
                  setMinPrice(e.target.value.length ? +e.target.value : min)
                }
                className="border placeholder:text-[14px] transition-all outline-none px-2 py-1 rounded-[5px] !border-gray-300 text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
              />
              <input
                type="number"
                placeholder={`до ${max}`}
                onChange={(e) =>
                  setMaxPrice(e.target.value.length ? +e.target.value : max)
                }
                className="border placeholder:text-[14px] transition-all outline-none px-2 py-1 rounded-[5px] !border-gray-300 text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
              />
            </div>
          </div>
          <div>
            <div className="flex gap-x-2 py-2">
              <ul>
                <Typography
                  variant="h6"
                  className="py-2 text-[#455A64] text-[14px]"
                >
                  Бренд
                </Typography>
                {brands.map((item: string, index) => {
                  return (
                    <li key={index} className="flex items-center">
                      <input
                        id={item}
                        type="checkbox"
                        checked={filterByBrand.includes(item)}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setFilterByBrand(
                            e.target.checked
                              ? [...filterByBrand, item]
                              : filterByBrand.filter(
                                  (brand: string) => brand !== item
                                )
                          )
                        }
                        className="text-[10px]"
                      />
                      <label
                        htmlFor={item}
                        className="text-[14px] cursor-pointer"
                      >
                        {item}
                      </label>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
        <div className="w-full grid px-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-4">
          {isLoading ? (
            <Loader />
          ) : (
            data?.products
              ?.filter(
                (e: TProduct) =>
                  e.price - Math.ceil((e.price * e.discountPercentage) / 100) >=
                    minPrice &&
                  e.price - Math.ceil((e.price * e.discountPercentage) / 100) <=
                    maxPrice
              )
              .filter((el: TProduct) =>
                filterByBrand.length > 0
                  ? filterByBrand.find((e: string) => e == el.brand)
                  : data?.products
              )
              ?.map((item: TProduct) => {
                return (
                  <>
                    <ProductCard
                      keyy={item.id}
                      img={item.thumbnail}
                      title={item.title}
                      price={item.price}
                      description={item.description}
                      discountPercentage={item.discountPercentage}
                      element={item}
                    />
                  </>
                );
              })
          )}
        </div>
      </div>
    </>
  );
};

export default Catalog;
