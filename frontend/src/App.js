import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import AllProductsScreen from './screens/AllProductsScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import ProductListScreen from './screens/ProductListScreen'
import CategoryListScreen from './screens/CategoryListScreen'
import CategoryEditScreen from './screens/CategoryEditScreen'
import ProductEditScreen from './screens/ProductEditScreen'
import OrderListScreen from './screens/OrderListScreen'
import PrivacyPolicyScreen from './screens/PrivacyPolicyScreen'
import ReturnPolicyScreen from './screens/ReturnPolicyScreen'
import TermsandConditionsScreen from './screens/TermsandConditionsScreen'
import ContactScreen from './screens/ContactScreen'

const App = () =>
{
  return (
    <Router>
      <Header />
      <main className='py-3' style={{ marginTop: window.innerWidth < 780 ? 108 : 120 }}>
        <Container className='px-1 mx-1'>
          <Route path='/order/:id' component={OrderScreen} />
          <Route path='/shipping' component={ShippingScreen} />
          <Route path='/payment' component={PaymentScreen} />
          <Route path='/placeorder' component={PlaceOrderScreen} />
          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/product/:id' component={ProductScreen} />
          <Route path='/cart/:id?' component={CartScreen} />
          <Route path='/admin/userlist' component={UserListScreen} />
          <Route path='/admin/user/:id/edit' component={UserEditScreen} />
          <Route
            path='/admin/categorylist'
            component={CategoryListScreen}
            exact
          />
          <Route path='/admin/category/:id/edit' component={CategoryEditScreen} />
          <Route
            path='/admin/productlist'
            component={ProductListScreen}
            exact
          />
          <Route
            path='/admin/productlist/:pageNumber'
            component={ProductListScreen}
            exact
          />
          <Route path='/admin/product/:id/edit' component={ProductEditScreen} />
          <Route path='/admin/orderlist' component={OrderListScreen} />
          <Route path='/search/:keyword' component={AllProductsScreen} exact />
          <Route path='/page/:pageNumber' component={HomeScreen} exact />
          <Route
            path='/search/:keyword/page/:pageNumber'
            component={HomeScreen}
            exact
          />
        </Container>
        <Route path='/' component={HomeScreen} exact />
        <Route path='/allproducts' component={AllProductsScreen} exact />
        <Route path='/privacypolicy' component={PrivacyPolicyScreen} exact />
        <Route path='/returnpolicy' component={ReturnPolicyScreen} exact />
        <Route path='/termsandconditions' component={TermsandConditionsScreen} exact />
        <Route path='/contact' component={ContactScreen} />
      </main>
      <Footer />
    </Router>
  )
}

export default App