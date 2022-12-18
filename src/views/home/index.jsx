import { ArrowRightOutlined } from '@ant-design/icons';
import { MessageDisplay } from '@/components/common';
import { ProductShowcaseGrid } from '@/components/product';
import { FEATURED_PRODUCTS, RECOMMENDED_PRODUCTS, SHOP, SUGGESTED_PRODUCTS } from '@/constants/routes';
import {
  useDocumentTitle, useFeaturedProducts, useRecommendedProducts, useScrollTop, useProduct
} from '@/hooks';
import bannerImg from '@/images/fashionabler.png';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { getSuggestedProduct } from '@/redux/actions/productActions';


const Home = () => {
  const dispatch = useDispatch();
  useDocumentTitle('TetouShopping | Home');
  useScrollTop();
  const profile = useSelector((state) => state.profile);
  const suggestedProduct = useSelector((state) => state.products.suggestedProduct);

  const {
    featuredProducts,
    fetchFeaturedProducts,
    isLoading: isLoadingFeatured,
    error: errorFeatured
  } = useFeaturedProducts(6);
  const {
    recommendedProducts,
    fetchRecommendedProducts,
    isLoading: isLoadingRecommended,
    error: errorRecommended
  } = useRecommendedProducts(6);

  useEffect(() => {
    dispatch(getSuggestedProduct({height: profile.height, waist: profile.waist, hip: profile.hip}), 6);
  }, []);

  return (
    <main className="content">
      {
        <div className="home">
        <div className="banner">
          <div className="banner-desc">
            <h1 className="text-thin">
              <strong>Make</strong>
              &nbsp;you look&nbsp;
              <strong>better!</strong>
            </h1>
            <p>
              {/* Buying clothes should leave you happy and good-looking, with money in your pocket. */}
              服を買うことで、あなたは幸せで見栄えがよくなり、お金をポケットに入れることができます.
            </p>
            <br />
            <Link to={SHOP} className="button">
            買い物しましょう &nbsp;
              <ArrowRightOutlined />
            </Link>
          </div>
          <div className="banner-img"><img src={bannerImg} alt="" /></div>
        </div>
        {/*<div className="display">*/}
        {/*  <div className="display-header">*/}
        {/*    <h1>Featured Products</h1>*/}
        {/*    <Link to={FEATURED_PRODUCTS}>See All</Link>*/}
        {/*  </div>*/}
        {/*  {(errorFeatured && !isLoadingFeatured) ? (*/}
        {/*    <MessageDisplay*/}
        {/*      message={errorFeatured}*/}
        {/*      action={fetchFeaturedProducts}*/}
        {/*      buttonLabel="Try Again"*/}
        {/*    />*/}
        {/*  ) : (*/}
        {/*    <ProductShowcaseGrid*/}
        {/*      products={featuredProducts}*/}
        {/*      skeletonCount={6}*/}
        {/*    />*/}
        {/*  )}*/}
        {/*</div>*/}
        {
          suggestedProduct && suggestedProduct.length !== 0 &&
          <div className="display">
            <div className="display-header">
              <h1>あなたに似合う</h1>
              <Link to={SUGGESTED_PRODUCTS}>すべてを見る</Link>
            </div>
            <ProductShowcaseGrid
              products={suggestedProduct}
              skeletonCount={6}
            />
          </div>
        }
        <div className="display">
          <div className="display-header">
            <h1>商品</h1>
            <Link to={SHOP}>すべてを見る</Link>
          </div>
          {
         //   (errorRecommended && !isLoadingRecommended) ? (
          //   <MessageDisplay
          //     message={errorRecommended}
          //     action={fetchRecommendedProducts}
          //     buttonLabel="Try Again"
          //   />
          // ) : (
            <ProductShowcaseGrid
              products={recommendedProducts}
              skeletonCount={6}
            />
          // )
          }
        </div>
      </div>
      }
    </main>
  );
};

export default Home;
