import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Container, Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listCategoryDetails, updateCategory } from '../actions/categoryActions'
import { CATEGORY_UPDATE_RESET } from '../constants/categoryConstants'

const CategoryEditScreen = ({ match, history }) =>
{
    const categoryId = match.params.id
    const [name, setName] = useState('')
    const [subCategorys, setSubCategorys] = useState('')

    const dispatch = useDispatch()

    const categoryDetails = useSelector((state) => state.categoryDetails)
    const { loading, error, category } = categoryDetails

    const categoryUpdate = useSelector((state) => state.categoryUpdate)
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = categoryUpdate

    useEffect(() =>
    {
        if (successUpdate) {
            dispatch({ type: CATEGORY_UPDATE_RESET })
            history.push('/admin/categorylist')
        } else {
            if (!category || !category._id || category._id !== categoryId) {
                dispatch(listCategoryDetails(categoryId))
            } else {
                setName(category.name)
                setSubCategorys(category.subCategorys)
            }
        }
    }, [dispatch, history, categoryId, category, successUpdate])

    const submitHandler = (e) =>
    {
        e.preventDefault()
        dispatch(
            updateCategory({
                _id: categoryId,
                name,
                subCategorys: String(subCategorys).split(',')
            })
        )
    }

    return (
        <Container>
            <Link to='/admin/categorylist' className='btn btn-light my-3'>
                Go Back
      </Link>
            <FormContainer>
                <h1>{category && category.name ? 'Edit' : 'Create'} Category</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                {loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant='danger'>{error}</Message>
                ) : (
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='name'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type='name'
                                placeholder='Enter name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='subCategorys'>
                            <Form.Label>Sub Categories</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter Subcategories seprated by commas'
                                value={subCategorys}
                                onChange={(e) => setSubCategorys(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Button type='submit' variant='primary'>
                            {category && category.name ? 'Update' : 'Create'}
                        </Button>
                    </Form>
                )}
            </FormContainer>
        </Container>
    )
}

export default CategoryEditScreen