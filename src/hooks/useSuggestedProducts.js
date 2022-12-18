import { useDidMount } from '@/hooks';
import { useEffect, useState } from 'react';
import firebase from '@/services/firebase';

const useSuggestedProducts = (itemsCount, bodyMeasure) => {
  const [suggestedProducts, setSuggestedProducts] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const didMount = useDidMount(true);

  const fetchSuggestedProducts = async () => {
    try {
      setLoading(true);
      setError('');

      const docs = await firebase.getRecommendedProductsByProfile(bodyMeasure, itemsCount);

      if (docs.empty) {
        if (didMount) {
          setError('No recommended products found.');
          setLoading(false);
        }
      } else {
        const items = [];

        docs.forEach((snap) => {
          const data = snap.data();
          items.push({ id: snap.ref.id, ...data });
        });

        if (didMount) {
          setSuggestedProducts(items);
          setLoading(false);
        }
      }
    } catch (e) {
      if (didMount) {
        setError('Failed to fetch recommended products');
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (suggestedProducts.length === 0 && didMount) {
      fetchSuggestedProducts();
    }
  }, []);


  return {
    suggestedProducts, fetchSuggestedProducts, isLoading, error
  };
};

export default useSuggestedProducts;
