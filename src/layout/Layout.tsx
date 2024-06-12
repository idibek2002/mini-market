import { Footer } from "../components/Footer";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Navbar,
  Typography,
  IconButton,
  ListItem,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Badge,
  Button,
} from "@material-tailwind/react";
import {
  ChevronDownIcon,
  Square3Stack3DIcon,
} from "@heroicons/react/24/outline";
import {
  useGetCategoryProductsQuery,
  useSearchProductQuery,
} from "../api/product";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
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

const Layout = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [search, setSearch] = useState<string>("");
  const { data = [] } = useGetCategoryProductsQuery("");
  const { data: searchData = [] } = useSearchProductQuery(search);
  const card = useSelector(({ basket }) => basket?.products);
  

  return (
    <>
      <div>
        <div className="w-full border-b border-gray-250 mx-auto flex items-center justify-center z-50 fixed">
          <Navbar className="px-4 py-2 max-w-[1200px] shadow-none rounded-none">
            <div className="w-full flex items-center h-14 justify-between text-blue-gray-900">
              <Link to={"/"}>
                <h1
                  className="mr-4 cursor-pointer py-1.5 lg:ml-2 text-[20px] font-[700] sm:text-[25px]"
                >
                  Market
                </h1>
              </Link>
              <div className="hidden lg:block">
                <Menu
                  open={isMenuOpen}
                  handler={setIsMenuOpen}
                  offset={{ mainAxis: 20 }}
                  placement="bottom"
                  allowHover={true}
                >
                  <MenuHandler>
                    <Typography
                      as="div"
                      variant="small"
                      className="font-normal"
                    >
                      <ListItem
                        className="flex items-center gap-2 py-2 pr-4"
                        selected={isMenuOpen || isMobileMenuOpen}
                        onClick={() => setIsMobileMenuOpen((cur) => !cur)}
                      >
                        <Square3Stack3DIcon className="h-[18px] w-[18px]" />
                        Каталог
                        <ChevronDownIcon
                          strokeWidth={2.5}
                          className={`hidden h-3 w-3 transition-transform lg:block ${
                            isMenuOpen ? "rotate-180" : ""
                          }`}
                        />
                        <ChevronDownIcon
                          strokeWidth={2.5}
                          className={`block h-3 w-3 transition-transform lg:hidden ${
                            isMobileMenuOpen ? "rotate-180" : ""
                          }`}
                        />
                      </ListItem>
                    </Typography>
                  </MenuHandler>
                  <MenuList className="hidden max-w-screen-xl rounded-xl lg:block">
                    <ul className="grid grid-cols-4 gap-y-2">
                      {data?.map((item: {name: string}) => (
                        <Link
                          to={`/category/${item?.name}`}
                          key={item.name}
                          style={
                            location.pathname.split("/")[2] === item?.name
                              ? { backgroundColor: "#ECEFF180" }
                              : { backgroundColor: "#fff" }
                          }
                          className="rounded-xl "
                        >
                          <MenuItem className="flex items-center gap-3 rounded-lg">
                            <Typography
                              variant="h6"
                              color="blue-gray"
                              className="flex items-center text-[14px] font-[500]"
                            >
                              {`${item?.name}`}
                            </Typography>
                          </MenuItem>
                        </Link>
                      ))}
                    </ul>
                  </MenuList>
                </Menu>
              </div>
              <div className="relative flex w-full max-w-[24rem]">
                <div className="relative flex items-stretch w-full border placeholder:text-[14px] transition-all outline-none rounded-[5px] !border-gray-300 text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10">
                  <input
                    type="search"
                    value={search}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setSearch(e.target.value.trim().toLowerCase())
                    }
                    placeholder="Название товара"
                    className="w-full border placeholder:text-[14px] transition-all outline-none px-2 rounded-[5px] !border-gray-300 text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                  />
                  <Button className="rounded flex items-center justify-center">
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </Button>
                  {search.length > 0 &&
                  searchData?.products?.length !== 30 &&
                  searchData?.products?.length !== 0 ? (
                    <div className="w-full absolute top-12 bg-white border">
                      <ul className="flex flex-col px-4 py-2 gap-y-2">
                        {searchData?.products?.map((elem: TProduct) => {
                          return (
                            <Link
                              key={elem.id}
                              to={`/product/${elem.id}`}
                              onClick={() => setSearch("")}
                              className="cursor-pointer text-[15px]"
                            >
                              {elem.title}
                            </Link>
                          );
                        })}
                      </ul>
                    </div>
                  ) : searchData.products?.length === 0 ? (
                    <div className="w-full absolute top-12 bg-white border">
                      <ul className="flex flex-col px-4 py-2">
                        <h1 className="text-[14px]">Нет рузультатов</h1>
                      </ul>
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="gap-5 flex fixed bottom-[-80vh] right-5 sm:relative sm:right-0 sm:top-0">
                <Link to={"/cart"}>
                  <Badge content={card.length ? card.length : 0}>
                    <IconButton>
                      <svg
                        height="20"
                        width="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.50033 19.6667C8.96056 19.6667 9.33366 19.2936 9.33366 18.8333C9.33366 18.3731 8.96056 18 8.50033 18C8.04009 18 7.66699 18.3731 7.66699 18.8333C7.66699 19.2936 8.04009 19.6667 8.50033 19.6667Z"
                          stroke="#fff"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                        <path
                          d="M18.4993 19.6667C18.9596 19.6667 19.3327 19.2936 19.3327 18.8333C19.3327 18.3731 18.9596 18 18.4993 18C18.0391 18 17.666 18.3731 17.666 18.8333C17.666 19.2936 18.0391 19.6667 18.4993 19.6667Z"
                          stroke="#fff"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                        <path
                          d="M1 1H4.63636L7.07273 12.9019C7.15586 13.3112 7.38355 13.6788 7.71595 13.9404C8.04835 14.202 8.46427 14.341 8.89091 14.333H17.7273C18.1539 14.341 18.5698 14.202 18.9022 13.9404C19.2346 13.6788 19.4623 13.3112 19.5455 12.9019L21 5.44434H5.54545"
                          stroke="#fff"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                      </svg>
                    </IconButton>
                  </Badge>
                </Link>
              </div>
            </div>
          </Navbar>
        </div>
        <div className="max-w-[1200px] mx-auto">
          <div className="pt-20">
            <Outlet />
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};
export default Layout;
