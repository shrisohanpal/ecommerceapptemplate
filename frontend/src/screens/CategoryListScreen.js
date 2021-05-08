import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Container, Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import
{
    listCategorys,
    deleteCategory,
    createCategory,
} from '../actions/categoryActions'
import { CATEGORY_CREATE_RESET } from '../constants/categoryConstants'

const CategoryListScreen = ({ history, match }) =>
{
    const dispatch = useDispatch()

    const categoryList = useSelector((state) => state.categoryList)
    const { loading, error, categorys } = categoryList

    const categoryDelete = useSelector((state) => state.categoryDelete)
    const {
        loading: loadingDelete,
        error: errorDelete,
        success: successDelete,
    } = categoryDelete

    const categoryCreate = useSelector((state) => state.categoryCreate)
    const {
        loading: loadingCreate,
        error: errorCreate,
        success: successCreate,
        category: createdCategory,
    } = categoryCreate

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() =>
    {
        dispatch({ type: CATEGORY_CREATE_RESET })

        if (!userInfo || !userInfo.isAdmin) {
            history.push('/login')
        }

        if (successCreate) {
            history.push(`/admin/category/${createdCategory._id}/edit`)
        } else {
            dispatch(listCategorys())
        }
    }, [
        dispatch,
        history,
        userInfo,
        successDelete,
        successCreate,
        createdCategory,
    ])

    const deleteHandler = (id) =>
    {
        if (window.confirm('Are you sure')) {
            dispatch(deleteCategory(id))
        }
    }

    const createCategoryHandler = () =>
    {
        dispatch(createCategory())
    }

    return (
        <Container>
            <Row className='align-items-center'>
                <Col>
                    <h1>Categories</h1>
                </Col>
                <Col className='text-right'>
                    <Button className='my-3' onClick={createCategoryHandler}>
                        <i className='fas fa-plus'></i> Create Category
          </Button>
                </Col>
            </Row>
            {loadingDelete && <Loader />}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
            {loadingCreate && <Loader />}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <>
                    <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {categorys.map((category) => (
                                <tr key={category._id}>
                                    <td>{category._id}</td>
                                    <td>{category.name}</td>
                                    <td>
                                        <LinkContainer to={`/admin/category/${category._id}/edit`}>
                                            <Button variant='light' className='btn-sm'>
                                                <i className='fas fa-edit'></i>
                                            </Button>
                                        </LinkContainer>
                                        <Button
                                            variant='danger'
                                            className='btn-sm'
                                            onClick={() => deleteHandler(category._id)}
                                        >
                                            <i className='fas fa-trash'></i>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </>
            )}
        </Container>
    )
}

export default CategoryListScreen