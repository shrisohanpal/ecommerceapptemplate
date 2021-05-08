import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, Form, Carousel } from 'react-bootstrap'
import Rating from '../components/Rating'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Meta from '../components/Meta'
import
{
    listProductDetails,
    createProductReview,
} from '../actions/productActions'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'

const ProductScreen = ({ history, match }) =>
{
    const [currentImage, setCurrentImage] = useState('')
    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')
    const [pincode, setPincode] = useState('201017')

    const dispatch = useDispatch()

    const productDetails = useSelector((state) => state.productDetails)
    const { loading, error, product } = productDetails

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const productReviewCreate = useSelector((state) => state.productReviewCreate)
    const {
        success: successProductReview,
        loading: loadingProductReview,
        error: errorProductReview,
    } = productReviewCreate

    useEffect(() =>
    {
        if (successProductReview) {
            setRating(0)
            setComment('')
        }
        if (!product._id || product._id !== match.params.id) {
            dispatch(listProductDetails(match.params.id))
            dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
        } else {
            setCurrentImage(product.image[0])
        }
    }, [dispatch, match, successProductReview, product._id])

    const addToCartHandler = () =>
    {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }

    const submitHandler = (e) =>
    {
        e.preventDefault()
        dispatch(
            createProductReview(match.params.id, {
                rating,
                comment,
            })
        )
    }

    return (
        <>
            <Button style={{ background: '#ffffff', color: '#000000' }} className='my-3' onClick={() => history.goBack()}>Go Back</Button>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <>
                    <Meta title={product.name} />
                    <Row>
                        <Col md={6}>
                            {/* <Carousel pause='hover' className='bg-light' style={{ paddingTop: '0%' }} >
                                {product.image &&
                                    product.image.map((x, k) => (
                                        <Carousel.Item key={k}>
                                            <div style={{ height: 400 }}>
                                                <Image style={{ display: 'block', width: '100%', height: '100%', borderRadius: '10%', margin: '0%' }} src={x} alt={product.name} fluid />
                                            </div>
                                        </Carousel.Item>
                                    ))
                                }
                            </Carousel> */}
                            <Row>
                                <Col xs={2}>
                                    {product.image &&
                                        product.image.map((x, k) => (
                                            <Row key={k}>
                                                <button onClick={() => setCurrentImage(x)} style={{ height: 80, width: 80 }}>
                                                    <Image style={{ display: 'block', width: '100%', height: '100%', borderRadius: '10%', margin: '0%' }} src={x} alt={product.name} fluid />
                                                </button>
                                            </Row>
                                        ))
                                    }
                                </Col>
                                <Col>
                                    <div style={{ height: 400 }}>
                                        <Image style={{ display: 'block', width: '100%', height: '100%', borderRadius: '1%', margin: '0%' }} src={currentImage} alt={product.name} fluid />
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        <Col md={3}>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h3>{product.name}</h3>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Rating
                                        value={product.rating}
                                        text={`${product.numReviews} reviews`}
                                    />
                                </ListGroup.Item>
                                <ListGroup.Item style={{ color: 'red' }}>MRP: ₹ <strike>{product.mrp}</strike></ListGroup.Item>
                                <ListGroup.Item>Our Price: ₹{product.price} {(((product.mrp - product.price) * 100) / product.mrp).toFixed(2)}%OFF</ListGroup.Item>
                                <ListGroup.Item>
                                    Description: {product.description}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col md={3}>
                            <Card>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Price:</Col>
                                            <Col>
                                                <strong>₹{product.price}</strong>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Status:</Col>
                                            <Col>
                                                {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>

                                    {product.countInStock > 0 && (
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Qty</Col>
                                                <Col>
                                                    <Form.Control
                                                        as='select'
                                                        value={qty}
                                                        onChange={(e) => setQty(e.target.value)}
                                                    >
                                                        {[...Array(product.countInStock).keys()].map(
                                                            (x) => (
                                                                <option key={x + 1} value={x + 1}>
                                                                    {x + 1}
                                                                </option>
                                                            )
                                                        )}
                                                    </Form.Control>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    )}

                                    <ListGroup.Item>
                                        <Button
                                            onClick={addToCartHandler}
                                            className='btn-block'
                                            type='button'
                                            disabled={product.countInStock === 0}
                                        >
                                            Add To Cart
                                                </Button>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                            <Card className='my-3'>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        Check PIN Code for Delivery
                                        <Form.Group controlId='pincode'>
                                            <Form.Control
                                                type='number'
                                                placeholder='Enter PIN Code'
                                                value={pincode}
                                                onChange={(e) => setPincode(e.target.value)}
                                            ></Form.Control>
                                        </Form.Group>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        {
                                            pincode === '201017' ?
                                                <Message>Yes Available</Message>
                                                : <Message variant='danger'>Not Available</Message>
                                        }
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <h2>Reviews</h2>
                            {product.reviews.length === 0 && <Message>No Reviews</Message>}
                            <ListGroup variant='flush'>
                                {product.reviews.map((review) => (
                                    <ListGroup.Item key={review._id}>
                                        <strong>{review.name}</strong>
                                        <Rating value={review.rating} />
                                        <p>{review.createdAt.substring(0, 10)}</p>
                                        <p>{review.comment}</p>
                                    </ListGroup.Item>
                                ))}
                                <ListGroup.Item>
                                    <h2>Write a Customer Review</h2>
                                    {successProductReview && (
                                        <Message variant='success'>
                                            Review submitted successfully
                                        </Message>
                                    )}
                                    {loadingProductReview && <Loader />}
                                    {errorProductReview && (
                                        <Message variant='danger'>{errorProductReview}</Message>
                                    )}
                                    {userInfo ? (
                                        <Form onSubmit={submitHandler}>
                                            <Form.Group controlId='rating'>
                                                <Form.Label>Rating</Form.Label>
                                                <Form.Control
                                                    as='select'
                                                    value={rating}
                                                    onChange={(e) => setRating(e.target.value)}
                                                >
                                                    <option value=''>Select...</option>
                                                    <option value='1'>1 - Poor</option>
                                                    <option value='2'>2 - Fair</option>
                                                    <option value='3'>3 - Good</option>
                                                    <option value='4'>4 - Very Good</option>
                                                    <option value='5'>5 - Excellent</option>
                                                </Form.Control>
                                            </Form.Group>
                                            <Form.Group controlId='comment'>
                                                <Form.Label>Comment</Form.Label>
                                                <Form.Control
                                                    as='textarea'
                                                    row='3'
                                                    value={comment}
                                                    onChange={(e) => setComment(e.target.value)}
                                                ></Form.Control>
                                            </Form.Group>
                                            <Button
                                                disabled={loadingProductReview}
                                                type='submit'
                                                variant='primary'
                                            >
                                                Submit
                                            </Button>
                                        </Form>
                                    ) : (
                                        <Message>
                                            Please <Link to='/login'>sign in</Link> to write a review{' '}
                                        </Message>
                                    )}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                    </Row>
                </>
            )}
        </>
    )
}

export default ProductScreen