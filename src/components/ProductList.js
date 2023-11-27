import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../actions/cartActions';
import Product from './Product';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles.css';

const ProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const item = useSelector((state) => state.products);
  const [products, setProducts] = useState([]);

  const [visibleProducts, setVisibleProducts] = useState(10);
  const [loading, setLoading] = useState(false);

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedProducts = products.slice(startIndex, endIndex);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  useEffect(() => {
    fetchProducts();
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://fakestoreapi.com/products?limit=100');
      setProducts(response.data);
      dispatch({ type: 'SET_PRODUCTS', payload: response.data });
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };
  const handleAddToCart = (product) => {
    dispatch(addToCart({ ...product, quantity: 1 }));
    alert("Product is added on cart");
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
};

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight &&
      !loading &&
      visibleProducts < 100
    ) {
      fetchProducts();
      setVisibleProducts((prevVisibleProducts) => prevVisibleProducts + 10);
    }
  };

  return (
    <div className='container'>
      <h2>EComm My Store</h2>
      <div className="float-end">
        <button onClick={() => navigate('/cart')} className="btn btn-warning">Cart</button>
      </div>
      <div className="product-list container">
        {displayedProducts?.map((product) => (
          <div key={product.id} className="product-item">
            <Product product={product} handleAddToCart={handleAddToCart} addToCart={() => { handleAddToCart(product); }} />
          </div>
        ))}
      </div>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
          <button key={page} onClick={() => handlePageChange(page)}>
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
