import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import {
  getDiscountPrice,
  defaultCurrency,
} from "../../../../common/helpers/product";
import MainLayoutShop from "../../../../common/HOCS/MainLayoutShop";
import Breadcrumb from "../../../../wrappers/Breadcrumb";
import { Col, Row } from "antd";

const Cart = ({
  location,
  cartItems,
  currency,
  decreaseQuantity,
  addToCart,
  cartItemStock,
  deleteFromCart,
  deleteAllFromCart,
  strings,
}) => {
  const [quantityCount] = useState(1);
  const { pathname } = location;
  let cartTotalPrice = 0;

  return (
    <Fragment>
      <MetaTags>
        <title>Banana Boys | {strings["cart"]}</title>
      </MetaTags>

      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>
        {strings["home"]}
      </BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        {strings["cart"]}
      </BreadcrumbsItem>
      <MainLayoutShop headerTop="visible">
        <Breadcrumb />
        <div className="cart-main-area pt-90 pb-100">
          <div className="container">
            {cartItems && cartItems.length >= 1 ? (
              <Fragment>
                <h3 className="cart-page-title">Your cart items</h3>
                <div className="row">
                  <div className="col-12">
                    <div className="table-content table-responsive cart-table-content">
                      <table>
                        <thead>
                          <tr>
                            <th>{strings["image"]}</th>
                            <th>{strings["product_name"]}</th>
                            <th>{strings["unit_price"]}</th>
                            <th>{strings["qty"]}</th>
                            <th>{strings["subtotal"]}</th>
                            <th>{strings["action"]}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {cartItems.map((cartItem, key) => {
                            const discountedPrice = getDiscountPrice(
                              cartItem.price,
                              cartItem.discount
                            );
                            const finalProductPrice =
                              cartItem.price * currency.currencyRate;
                            const finalDiscountedPrice =
                              discountedPrice * currency.currencyRate;

                            discountedPrice != null
                              ? (cartTotalPrice +=
                                  finalDiscountedPrice * cartItem.quantity)
                              : (cartTotalPrice +=
                                  finalProductPrice * cartItem.quantity);
                            return (
                              <tr key={key}>
                                <td className="product-thumbnail">
                                  <Link
                                    to={
                                      process.env.PUBLIC_URL +
                                      "/product/" +
                                      cartItem.id
                                    }
                                  >
                                    <img
                                      className="img-fluid"
                                      src={
                                        process.env.PUBLIC_URL +
                                        cartItem.image[0]
                                      }
                                      alt=""
                                    />
                                  </Link>
                                </td>

                                <td className="product-name">
                                  <Link
                                    to={
                                      process.env.PUBLIC_URL +
                                      "/product/" +
                                      cartItem.id
                                    }
                                  >
                                    {cartItem.name}
                                  </Link>
                                </td>

                                <td className="product-price-cart">
                                  {discountedPrice !== null ? (
                                    <Fragment>
                                      <span className="amount old">
                                        {defaultCurrency(
                                          currency,
                                          finalProductPrice
                                        )}
                                      </span>
                                      <span className="amount">
                                        {defaultCurrency(
                                          currency,
                                          finalDiscountedPrice
                                        )}
                                      </span>
                                    </Fragment>
                                  ) : (
                                    <span className="amount">
                                      {defaultCurrency(
                                        currency,
                                        finalProductPrice
                                      )}
                                    </span>
                                  )}
                                </td>

                                <td className="product-quantity">
                                  <div className="cart-plus-minus">
                                    <button
                                      className="dec qtybutton"
                                      onClick={() => decreaseQuantity(cartItem)}
                                    >
                                      -
                                    </button>
                                    <input
                                      className="cart-plus-minus-box"
                                      type="text"
                                      value={cartItem.quantity}
                                      readOnly
                                    />
                                    <button
                                      className="inc qtybutton"
                                      onClick={() =>
                                        addToCart(cartItem, quantityCount)
                                      }
                                      disabled={
                                        cartItem !== undefined &&
                                        cartItem.quantity &&
                                        cartItem.quantity >=
                                          cartItemStock(cartItem)
                                      }
                                    >
                                      +
                                    </button>
                                  </div>
                                </td>
                                <td className="product-subtotal">
                                  {discountedPrice !== null
                                    ? defaultCurrency(
                                        currency,
                                        finalDiscountedPrice * cartItem.quantity
                                      )
                                    : defaultCurrency(
                                        currency,
                                        finalProductPrice * cartItem.quantity
                                      )}
                                </td>

                                <td className="product-remove">
                                  <button
                                    onClick={() => deleteFromCart(cartItem)}
                                  >
                                    <i className="fa fa-times"></i>
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="cart-shiping-update-wrapper">
                      <div className="cart-shiping-update">
                        <Link to={process.env.PUBLIC_URL + "/shop"}>
                          {strings["continue_shopping"]}
                        </Link>
                      </div>
                      <div className="cart-clear">
                        <button onClick={() => deleteAllFromCart()}>
                          {strings["clear_shopping_cart"]}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="grand-totall">
                    <Row gutter={50}>
                      <Col span={12}>
                        <div className="title-wrap">
                          <h4 className="cart-bottom-title section-bg-gary-cart">
                            Coupon
                          </h4>
                        </div>
                        <h5>
                          Total products{" "}
                          <span>
                            {defaultCurrency(currency, cartTotalPrice)}
                          </span>
                        </h5>

                        <h4 className="grand-totall-title">
                          Grand Total{" "}
                          <span>
                            {defaultCurrency(currency, cartTotalPrice)}
                          </span>
                        </h4>
                      </Col>
                      <Col span={12}>
                        <div className="title-wrap">
                          <h4 className="cart-bottom-title section-bg-gary-cart">
                            Cart Total
                          </h4>
                        </div>
                        <h5>
                          Total products{" "}
                          <span>
                            {defaultCurrency(currency, cartTotalPrice)}
                          </span>
                        </h5>

                        <h4 className="grand-totall-title">
                          Grand Total{" "}
                          <span>
                            {defaultCurrency(currency, cartTotalPrice)}
                          </span>
                        </h4>
                      </Col>
                    </Row>
                    <Link to={process.env.PUBLIC_URL + "/checkout"}>
                      Proceed to Checkout
                    </Link>
                  </div>
                </div>
              </Fragment>
            ) : (
              <div className="row">
                <div className="col-lg-12">
                  <div className="item-empty-area text-center">
                    <div className="item-empty-area__icon mb-30">
                      <i className="pe-7s-cart"></i>
                    </div>
                    <div className="item-empty-area__text">
                      No items found in cart <br />{" "}
                      <Link to={process.env.PUBLIC_URL + "/shop"}>
                        Shop Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </MainLayoutShop>
    </Fragment>
  );
};

Cart.propTypes = {
  addToCart: PropTypes.func,
  cartItems: PropTypes.array,
  currency: PropTypes.object,
  decreaseQuantity: PropTypes.func,
  location: PropTypes.object,
  deleteAllFromCart: PropTypes.func,
  deleteFromCart: PropTypes.func,
};

export default Cart;
