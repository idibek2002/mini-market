import { useDispatch, useSelector } from "react-redux";
import { Button } from "@material-tailwind/react";
import { decrement, delProductInCard, increment } from "../../reducers/basket.js";
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
  quantity: number;
};
const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector(({ basket }) => basket.products);

  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    total +=
      (cart[i].price - (cart[i].price * cart[i].discountPercentage) / 100) *
      cart[i].quantity;
  }
  return (
    <>
      <div className="p-5">
        <h1 className="text-[25px] font-[500]">Корзина</h1>
      </div>
      <div className="min-h-[50vh] flex flex-col items-start justify-between px-5 h-full gap-y-5 lg:flex-row">
        {cart.length > 0 ? (
          <>
            <div className="w-full">
              <table className="w-full border">
                <thead className="border">
                  <tr>
                    <th className="text-center w-[30%]">Товар</th>
                    <th className="text-center w-[10%]">Цена</th>
                    <th className="text-center w-[10%] px-5">Количество</th>
                    <th className="text-center w-[10%]">Итого</th>
                    <th className="text-center w-[10%]"></th>
                  </tr>
                </thead>
                <tbody>
                  {cart?.map((el: TProduct) => {
                    return (
                      <tr key={el.id} className="lg:min-h-[50px]">
                        <td className="flex items-center gap-x-5 min-h-[50px]">
                          <picture className="hidden sm:block">
                            <img
                              src={el.thumbnail}
                              alt=""
                              className="w-[120px] h-[80px] object-contain"
                            />
                          </picture>
                          {el.title}
                        </td>
                        <td className="text-center">
                          {(
                            el.price -
                            (el.price * el.discountPercentage) / 100
                          ).toFixed(2)}{" "}
                          $
                        </td>
                        <td>
                          <div className="flex w-[70%] mx-auto items-center justify-center bg-blue-500 rounded-xl">
                            <Button
                              onClick={() => dispatch(decrement(el.id))}
                              color="blue"
                              disabled={el.quantity == 1}
                              className="w-10 h-10 flex items-center justify-center text-[18px]"
                            >
                              -
                            </Button>
                            <h1 className="text-white">{el.quantity}</h1>
                            <Button
                              onClick={() => dispatch(increment(el.id))}
                              color="blue"
                              disabled={el.quantity == el.stock}
                              className="w-10 h-10 flex items-center justify-center text-[18px]"
                            >
                              +
                            </Button>
                          </div>
                        </td>
                        <td className="text-center">
                          {(
                            (el.price -
                              (el.price * el.discountPercentage) / 100) *
                            el.quantity
                          ).toFixed(2)}{" "}
                          $
                        </td>
                        <td>
                          <Button
                            onClick={() => dispatch(delProductInCard(el.id))}
                            className="w-[10px] px-5 bg-white shadow-none flex items-center justify-center"
                          >
                            <i className="fa-solid fa-trash text-red-500 text-[15px]"></i>
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="w-full lg:w-[400px] p-5 bg-gray-200 rounded-lg">
              <h1 className="text-gray-500">
                Количество товаров:{" "}
                {cart.reduce((a: number, b: TProduct) => a + b.quantity, 0)}
              </h1>
              <h1 className="text-[16px]">
                Предварительная сумма : {total.toFixed(2)} $
              </h1>
              <h1 className="text-[18px] font-[700]">
                Итого : {total.toFixed(2)} $
              </h1>
              <div className="pt-5">
                <Button
                  ripple={false}
                  fullWidth={true}
                  className="bg-[#ffda46] text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                >
                  Продолжить оформления
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center w-full">
            <div className="flex flex-col items-center">
              <i className="fa-solid fa-cart-shopping text-[100px] sm:text-[150px] text-gray-400"></i>
              <h1 className="text-center text-[23px] sm:text-[30px] py-5">
                Внутри пока нет товаров
              </h1>
              <Link to={"/"}>
                <Button
                  ripple={false}
                  fullWidth={true}
                  className="bg-[#ffda46] text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                >
                  Перейти в магазин
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
