import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { getDiscountPrice, defaultCurrency } from "../../helpers/product";
import Rating from "./sub-components/ProductRating";
import ProductModal from "./ProductModal";
import { multilanguage } from "redux-multilanguage";
import { HeartOutlined, HeartFilled } from "@ant-design/icons"

const ProductGridSingle = ({
  product,
  currency,
  addToCart,
  addToWishlist,
  cartItem,
  wishlistItem,
  sliderClassName,
  spaceBottomClass,
  strings
}) => {
  const [modalShow, setModalShow] = useState(false);

  const discountedPrice = getDiscountPrice(product.price, product.discount);
  const finalProductPrice = +(product.price * currency.currencyRate);
  const finalDiscountedPrice = +(
    discountedPrice * currency.currencyRate
  );

  return (
    <Fragment>
      <div
        className={`col-xl-3 col-md-6 col-lg-4 col-sm-6 ${
          sliderClassName ? sliderClassName : ""
        }`}
      >
        <div
          className={`product-wrap ${spaceBottomClass ? spaceBottomClass : ""}`}
        >
          <div className="product-img">
            <Link to={process.env.PUBLIC_URL + "/product/" + product.id}>
              <img
                className="default-img"
                src={process.env.PUBLIC_URL + product.image[0]}
                alt=""
              />
              {product.image.length > 1 ? (
                <img
                  className="hover-img"
                  src={process.env.PUBLIC_URL + product.image[1]}
                  alt=""
                />
              ) : (
                ""
              )}
            </Link>
            {product.discount || product.new ? (
              <div className="product-img-badges">
                {product.discount ? (
                  <span className="pink">-{product.discount}%</span>
                ) : (
                  ""
                )}
                {product.new ? <span className="purple">New</span> : ""}
              </div>
            ) : (
              ""
            )}

            <div className="product-action">
              <div className="pro-same-action pro-wishlist">
                <button
                  disabled={wishlistItem !== undefined}
                  title={
                    wishlistItem !== undefined
                      ? "Added to wishlist"
                      : "Add to wishlist"
                  }
                  onClick={() => addToWishlist(product)}
                >
                  { wishlistItem ? <HeartFilled style={{color: '#DC143C'}} /> : <HeartOutlined /> }
                </button>
              </div>
              <div className="pro-same-action pro-cart">
                {product.stock && product.stock > 0 ? (
                  <button
                    onClick={() => addToCart(product)}
                    className={
                      cartItem !== undefined && cartItem.quantity > 0
                        ? "active"
                        : ""
                    }
                    disabled={cartItem !== undefined && cartItem.quantity > 0}
                    title={
                      cartItem !== undefined ? "Added to cart" : "Add to cart"
                    }
                  >
                    {" "}
                    <i className="pe-7s-cart"></i>{" "}
                    {cartItem !== undefined && cartItem.quantity > 0
                      ? strings['added_to_cart']
                      : strings['add_to_cart']}
                  </button>
                ) : (
                  <button disabled className="active">
                    {strings['out_of_stock']}
                  </button>
                )}
              </div>
              <div className="pro-same-action pro-quickview">
                <button onClick={() => setModalShow(true)} title="Quick View">
                  <i className="pe-7s-look" />
                </button>
              </div>
            </div>
          </div>
          <div className="product-content text-center">
            <h3>
              <Link to={process.env.PUBLIC_URL + "/product/" + product.id}>
                {product.name}
              </Link>
            </h3>
            {product.rating && product.rating > 0 ? (
              <div className="product-rating">
                <Rating ratingValue={product.rating} />
              </div>
            ) : (
              ""
            )}
            <div className="product-price">
              {discountedPrice !== null ? (
                <Fragment>
                  <span>{defaultCurrency(currency, finalDiscountedPrice)}</span>{" "}
                  <span className="old">
                    {defaultCurrency(currency, finalProductPrice)}
                  </span>
                </Fragment>
              ) : (
                <span>{defaultCurrency(currency, finalProductPrice)} </span>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* product modal */}
      <ProductModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        product={product}
        currency={currency}
        discountedprice={discountedPrice}
        finalproductprice={finalProductPrice}
        finaldiscountedprice={finalDiscountedPrice}
        cartitem={cartItem}
        wishlistitem={wishlistItem}
        addtocart={addToCart}
        addtowishlist={addToWishlist}
      />
    </Fragment>
  );
};

ProductGridSingle.propTypes = {
  addToCart: PropTypes.func,
  addToWishlist: PropTypes.func,
  cartItem: PropTypes.object,
  currency: PropTypes.object,
  product: PropTypes.object,
  sliderClassName: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  wishlistItem: PropTypes.object,
  strings: PropTypes.object
};

export default multilanguage(ProductGridSingle);
