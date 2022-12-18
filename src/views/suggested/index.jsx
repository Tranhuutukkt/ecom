import { MessageDisplay } from '@/components/common';
import { ProductShowcaseGrid } from '@/components/product';
import { useDocumentTitle, useRecommendedProducts, useScrollTop } from '@/hooks';
import bannerImg from '@/images/banner-girl-1.png';
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSuggestedProduct } from '@/redux/actions/productActions';

const SuggestedProducts = () => {
  const dispatch = useDispatch();
  useDocumentTitle('Suggested Products | TeTouShopping');
  useScrollTop();

  const profile = useSelector((state) => state.profile);
  const suggestedProduct = useSelector((state) => state.products.suggestedProduct);

  useEffect(() => {
    dispatch(getSuggestedProduct({height: profile.height, waist: profile.waist, hip: profile.hip}), 6);
  }, []);

  return (
    <main className="content">
      <div className="featured">
        <div className="banner">
          <div className="banner-desc">
            <h1>おすすめ商品</h1>
          </div>
          <div className="banner-img">
            <img src={bannerImg} alt="" />
          </div>
        </div>
        <div className="display">
          <div className="product-display-grid">
            {
              suggestedProduct &&
              <ProductShowcaseGrid
                products={suggestedProduct}
                skeletonCount={6}
              />
            }
          </div>
        </div>
      </div>
    </main>
  );
};

export default SuggestedProducts;
