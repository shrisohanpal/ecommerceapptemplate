import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Button, Image } from 'react-bootstrap'

import Rating from './Rating'

const Product = ({ product }) => 
{
    return (
        <Card className='my-3 py-3 px-1 rounded' style={{ overflow: 'hidden' }}>
            <Link to={`/product/${product._id}`}>
                <Image style={{ display: 'block', width: '100%', height: 150 }} src={product.image[0]} variant='top' fluid />
                <Card.Body>
                    <Card.Title as='div'>
                        <strong style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{product.name}</strong>
                    </Card.Title>
                    <Card.Text as='div'>
                        <Rating
                            value={product.rating}
                            text={`${product.numReviews} reviews`} />
                    </Card.Text>
                    <div className='py-1' style={{ /*display: 'flex', flexDirection: 'row', alignContent: 'space-between' */ }}>
                        <Card.Text as='h5' style={{ color: 'red' }}>MRP: <strike>₹{product.mrp}/-</strike> </Card.Text>
                        <Card.Text as='h5'> ₹{product.price}</Card.Text>
                    </div>
                    <Button style={{ background: '#c60062' }} className="w-100">View</Button>
                </Card.Body>
            </Link>
        </Card>
    )
}

export default Product
