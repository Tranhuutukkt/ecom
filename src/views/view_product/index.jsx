import { ArrowLeftOutlined, LoadingOutlined } from "@ant-design/icons";
import { ColorChooser, ImageLoader, MessageDisplay } from "@/components/common";
import { ProductShowcaseGrid } from "@/components/product";
import { RECOMMENDED_PRODUCTS, SHOP } from "@/constants/routes";
import { displayMoney } from "@/helpers/utils";
import {
  useBasket,
  useDocumentTitle,
  useProduct,
  useRecommendedProducts,
  useScrollTop,
} from "@/hooks";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Select from "react-select";
import { useModal } from "@/hooks";
import { Modal } from "@/components/common";
import ReviewForm from "@/components/product/review/ReviewForm";
import ReviewsContainer from "@/components/product/review/ReviewsContainer";

const ViewProduct = () => {
  const { id } = useParams();
  const { product, isLoading, error } = useProduct(id);
  const { addToBasket, isItemOnBasket } = useBasket(id);
  const { isOpenModal, onOpenModal, onCloseModal } = useModal();
  useScrollTop();
  useDocumentTitle(`View ${product?.name || "Item"}`);

  const [selectedImage, setSelectedImage] = useState(product?.image || "");
  const [selectedSize, setSelectedSize] = useState("");
  const [sizeInfo, setSizeInfo] = useState({});
  const [selectedColor, setSelectedColor] = useState("");

  const {
    recommendedProducts,
    fetchRecommendedProducts,
    isLoading: isLoadingFeatured,
    error: errorFeatured,
  } = useRecommendedProducts(6);
  const colorOverlay = useRef(null);

  useEffect(() => {
    setSelectedImage(product?.image);
  }, [product]);

  const onSelectedSizeChange = (newValue) => {
    setSelectedSize(newValue.value);
    const sizeInfo = product.sizes.find(s => s.type === newValue.value);
    setSizeInfo(sizeInfo);
  };

  const onSelectedColorChange = (color) => {
    setSelectedColor(color);
    if (colorOverlay.current) {
      colorOverlay.current.value = color;
    }
  };

  const handleAddToBasket = () => {
    addToBasket({
      ...product,
      selectedColor,
      selectedSize: selectedSize || product.sizes[0],
    });
  };

  return (
    <Fragment>
      <main className="content">
        {isLoading && (
          <div className="loader">
            <h4>Loading Product...</h4>
            <br />
            <LoadingOutlined style={{ fontSize: "3rem" }} />
          </div>
        )}
        {error && <MessageDisplay message={error} />}
        {product && !isLoading && (
          <Fragment>
            <div className="product-view">
              <Link to={SHOP}>
                <h3 className="button-link d-inline-flex">
                  <ArrowLeftOutlined />
                  &nbsp; Back to shop
                </h3>
              </Link>
              <div className="product-modal">
                {product.imageCollection.length !== 0 && (
                  <div className="product-modal-image-collection">
                    {product.imageCollection.map((image) => (
                      <div
                        className="product-modal-image-collection-wrapper"
                        key={image.id}
                        onClick={() => setSelectedImage(image.url)}
                        role="presentation"
                      >
                        <ImageLoader
                          className="product-modal-image-collection-img"
                          src={image.url}
                        />
                      </div>
                    ))}
                  </div>
                )}
                <div className="product-modal-image-wrapper">
                  {selectedColor && (
                    <input
                      type="color"
                      disabled
                      ref={colorOverlay}
                      id="color-overlay"
                    />
                  )}
                  <ImageLoader
                    alt={product.name}
                    className="product-modal-image"
                    src={selectedImage}
                  />
                </div>
                <div className="product-modal-details">
                  <br />
                  <span className="text-subtle">{product.brand}</span>
                  <h1 className="margin-top-0">{product.name}</h1>
                  <span>{product.description}</span>
                  <br />
                  <br />
                  <div className="divider" />
                  <br />
                  <div>
                    <span className="text-subtle">Size</span>
                    <br />
                    <br />
                    <Select
                      placeholder="--Select Size--"
                      onChange={onSelectedSizeChange}
                      options={product.sizes
                        .sort((a, b) => (a < b ? -1 : 1))
                        .map((size) => ({ label: `${size.type}`, value: size.type }))}
                      styles={{
                        menu: (provided) => ({ ...provided, zIndex: 10 }),
                      }}
                    />
                    <br/>
                    <div>
                      {sizeInfo && Object.keys(sizeInfo).map(s => {
                        if (s !== "type")
                          return (
                              <p key={s}>{s}: {sizeInfo[s]}cm</p>
                          )
                      })}
                    </div>

                  </div>
                  <br />
                  {product.availableColors.length >= 1 && (
                    <div>
                      <span className="text-subtle">Choose Color</span>
                      <br />
                      <br />
                      <ColorChooser
                        availableColors={product.availableColors}
                        onSelectedColorChange={onSelectedColorChange}
                      />
                    </div>
                  )}
                  <h1>{displayMoney(product.price)}</h1>
                  <div
                    className="product-modal-action"
                    style={{ width: "100%", display: "table" }}
                  >
                    <button
                      style={{ float: "left" }}
                      className={`button button-small ${
                        isItemOnBasket(product.id)
                          ? "button-border button-border-gray"
                          : ""
                      }`}
                      onClick={handleAddToBasket}
                      type="button"
                    >
                      {isItemOnBasket(product.id)
                        ? "Remove From Basket"
                        : "Add To Basket"}
                    </button>
                    <button
                      style={{ float: "right" }}
                      className={`button button-small button-border button-border-gray`}
                      type="button"
                      onClick={onOpenModal}
                    >
                      Write review
                    </button>
                  </div>
                </div>
              </div>
              <div style={{ marginTop: "10rem" }}>
                <div className="display-header">
                  <h1>Recommended</h1>
                  <Link to={RECOMMENDED_PRODUCTS}>See All</Link>
                </div>
                {errorFeatured && !isLoadingFeatured ? (
                  <MessageDisplay
                    message={error}
                    action={fetchRecommendedProducts}
                    buttonLabel="Try Again"
                  />
                ) : (
                  <ProductShowcaseGrid
                    products={recommendedProducts}
                    skeletonCount={3}
                  />
                )}
                </div>
              </div>
              <div
                  style={{
                    float: "right",
                    width: "50rem",
                    height: "540px",
                    marginTop: "90px",
                    overflow: "auto",
                    border: "1px solid #E1E1E1",
                    backgroundColor: "#FFF",
                  }}>
                <ReviewsContainer/>
              </div>
            </Fragment>
        )}
      </main>

      <Modal isOpen={isOpenModal} onRequestClose={onCloseModal}>
        <ReviewForm closeFunc={onCloseModal} />
      </Modal>
    </Fragment>
  );
};



export default ViewProduct;
