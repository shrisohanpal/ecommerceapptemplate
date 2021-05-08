import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Carousel, Col, Row } from 'react-bootstrap'
import { listProducts } from '../actions/productActions'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'

const HomeScreen = () =>
{
    const dispatch = useDispatch()
    const productList = useSelector((state) => state.productList)
    const { loading, error, products } = productList

    useEffect(() =>
    {
        dispatch(listProducts(''))
    }, [dispatch])
    return (
        <div style={{ width: '100%', padding: 0, height: 'auto', margin: 0, marginBottom: 0 }}>
            <Carousel style={{ margin: 0, display: 'flex', justifyContent: 'center', width: '100%', alignItems: 'center', marginBottom: '10px', marginBottom: 0 }}>
                <Carousel.Item>
                    <div style={{ display: 'flex', justifyContent: 'center', width: '100%', height: window.innerWidth < 780 ? 150 : 300 }} >
                        <img
                            style={{ margin: 0, padding: 0, height: '100%', width: '100%', borderRadius: 0 }}
                            src="/images/banners/banner1.jpg"
                            alt="First slide"
                        />
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div style={{ display: 'flex', justifyContent: 'center', width: '100%', height: window.innerWidth < 780 ? 150 : 300 }} >
                        <img
                            style={{ margin: 0, padding: 0, height: '100%', width: '100%', borderRadius: 0 }}
                            src="/images/banners/banner2.jpg"
                            alt="First slide"
                        />
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div style={{ display: 'flex', justifyContent: 'center', width: '100%', height: window.innerWidth < 780 ? 150 : 300 }} >
                        <img
                            style={{ margin: 0, padding: 0, height: '100%', width: '100%', borderRadius: 0 }}
                            src="/images/banners/banner3.jpg"
                            alt="First slide"
                        />
                    </div>
                </Carousel.Item>
            </Carousel>

            <Row style={{ margin: 0, padding: 0, backgroundColor: '#e6ffe6' }}>
                <Col sm={12} lg={4}>
                    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ flex: 0.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <a href="/search/flower">
                                <img alt="go" style={{ maxHeight: 300, maxWidth: 300, margin: '5%', width: '90%' }} src="/images/chits/chit1.jpg" />
                            </a>
                            <a href="/search/god">
                                <img alt="go" style={{ maxHeight: 300, maxWidth: 300, margin: '5%', width: '90%' }} src="/images/chits/chit2.jpg" />
                            </a>
                        </div>
                        <div style={{ flex: 0.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <a href="/search/wood">
                                <img alt="go" style={{ maxHeight: 300, maxWidth: 300, margin: '5%', width: '90%' }} src="/images/chits/chit3.jpg" />
                            </a>
                            <a href="/search/brass">
                                <img alt="go" style={{ maxHeight: 300, maxWidth: 300, margin: '5%', width: '90%' }} src="/images/chits/chit4.jpg" />
                            </a>
                        </div>
                    </div>
                </Col>

                <Col sm={12} lg={4}>
                    <a href="/search/deco">
                        <img alt="go"
                            style={{ maxHeight: '100%', maxWidth: '100%', paddingTop: '20px', paddingBottom: '20px' }}
                            src="/images/banners/banner4.jpg"
                        />
                    </a>
                </Col>
                <Col sm={12} lg={4}>
                    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ flex: 0.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <a href="/search/cloc">
                                <img alt="go" style={{ maxHeight: 300, maxWidth: 300, margin: '5%', width: '90%' }} src="/images/chits/chit5.jpg" />
                            </a>
                            <a href="/search/phot">
                                <img alt="go" style={{ maxHeight: 300, maxWidth: 300, margin: '5%', width: '90%' }} src="/images/chits/chit6.jpg" />
                            </a>
                        </div>
                        <div style={{ flex: 0.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <a href="/search/ount">
                                <img alt="go" style={{ maxHeight: 300, maxWidth: 300, margin: '5%', width: '90%' }} src="/images/chits/chit7.jpg" />
                            </a>
                            <a href="/search/go">
                                <img alt="go" style={{ maxHeight: 300, maxWidth: 300, margin: '5%', width: '90%' }} src="/images/chits/chit8.jpg" />
                            </a>
                        </div>
                    </div>
                </Col>
            </Row>


            <h2 className='text-center'>Featured Products</h2>

            {loading ? (<Loader />) : error ? (<Message variant='danger'>{error}</Message>) : (<OwlCarousel items={window.innerWidth > 780 ? 4 : 2}
                className="owl-theme"
                loop
                nav
                margin={8} autoplay={true} autoplayTimeout={2000}>
                {products.map((product) => (
                    <div key={product._id}>
                        <Product product={product} />
                    </div>

                ))}
            </OwlCarousel>
            )
            }


            <Row style={{ margin: 0, padding: 0, backgroundColor: '#e6ffe6' }}>
                <Col sm={12} lg={4}>
                    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ flex: 0.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <a href="/search/car">
                                <img alt="go" style={{ maxHeight: 300, maxWidth: 300, margin: '5%', width: '90%' }} src="/images/chits/chit9.jpg" />
                            </a>
                            <a href="/search/set">
                                <img alt="go" style={{ maxHeight: 300, maxWidth: 300, margin: '5%', width: '90%' }} src="/images/chits/chit10.jpg" />
                            </a>
                        </div>
                        <div style={{ flex: 0.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <a href="/search/ol">
                                <img alt="go" style={{ maxHeight: 300, maxWidth: 300, margin: '5%', width: '90%' }} src="/images/chits/chit11.jpg" />
                            </a>
                            <a href="/search/eng">
                                <img alt="go" style={{ maxHeight: 300, maxWidth: 300, margin: '5%', width: '90%' }} src="/images/chits/chit12.jpg" />
                            </a>
                        </div>
                    </div>
                </Col>

                <Col sm={12} lg={4}>
                    <a href="/search/toy">
                        <img alt="go"
                            style={{ maxHeight: '100%', maxWidth: '100%', paddingTop: '20px', paddingBottom: '20px' }}
                            src="/images/banners/banner5.jpg"
                        />
                    </a>
                </Col>
                <Col sm={12} lg={4}>
                    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ flex: 0.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <a href="/search/bab">
                                <img alt="go" style={{ maxHeight: 300, maxWidth: 300, margin: '5%', width: '90%' }} src="/images/chits/chit13.jpg" />
                            </a>
                            <a href="/search/mo">
                                <img alt="go" style={{ maxHeight: 300, maxWidth: 300, margin: '5%', width: '90%' }} src="/images/chits/chit14.jpg" />
                            </a>
                        </div>
                        <div style={{ flex: 0.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <a href="/search/do">
                                <img alt="go" style={{ maxHeight: 300, maxWidth: 300, margin: '5%', width: '90%' }} src="/images/chits/chit15.jpg" />
                            </a>
                            <a href="/search/un">
                                <img alt="go" style={{ maxHeight: 300, maxWidth: 300, margin: '5%', width: '90%' }} src="/images/chits/chit16.jpg" />
                            </a>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default HomeScreen