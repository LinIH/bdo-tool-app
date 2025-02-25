import './App.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Cal from './Cal';
import Product from './Product';
import ProductDetail from './ProductDetail';
import Login from './Login';
import Cart from './Cart';
import { useState } from 'react';

function App() {
  const [cart, setCart] = useState([]);

  function addToCart(product){
    console.log(product);
    setCart([...cart, product]);
  }

  function test(){
    console.log(cart);
  }

  return (
    <>
    <BrowserRouter>
      <div><Link to='/login'>登入</Link></div>
      <nav className='leftside-nav'>
        <Link to='/'>Home</Link>
        {/*<Link to='/cal'>計算機</Link>*/}
        <Link to='/product'>產品</Link>
        <Link to='/cart'>購物車</Link>
      </nav>
      <Routes>
        <Route path='/' element={<Home />} />
        {/*<Route path='/cal' element={<Cal />} />*/}
        <Route path='product' element={<Product />} />
        <Route path='product/:id' element={<ProductDetail addToCart={addToCart} />} />
        <Route path='login' element={<Login />} />
        <Route path='cart' element={<Cart cart={cart}/>}></Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
