import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Container } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Meta from '../components/Meta'
import { listProducts } from '../actions/productActions'

const AllProducts = ({ match }) =>
{
    const keyword = match.params.keyword
    const dispatch = useDispatch()

    const productList = useSelector((state) => state.productList)
    const { loading, error, products } = productList

    useEffect(() =>
    {
        dispatch(listProducts(keyword))
    }, [dispatch, keyword])

    return (
        <Container>
            <Meta />
            <Link to='/' className='btn btn-light'>
                Go Back
            </Link>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                        <>
                            <Row>
                                {products.map((product) => (
                                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                        <Product product={product} />
                                    </Col>
                                ))}
                            </Row>
                        </>
                    )}
        </Container>
    )
}

export default AllProducts
