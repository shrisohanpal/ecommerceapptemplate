import React, { useEffect } from 'react'
import { Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import SearchBox from '../SearchBox'
import { Container, Navbar, Nav, NavDropdown, Dropdown, DropdownButton } from 'react-bootstrap';
import { logout } from '../../actions/userActions'
import { listCategorys } from '../../actions/categoryActions'
import './DesktopHeader.css'

const DesktopHeader = () =>
{
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const categoryList = useSelector((state) => state.categoryList)
    const { loading, error, categorys } = categoryList
    const cart = useSelector((state) => state.cart)
    const { cartItems } = cart

    const logoutHandler = () =>
    {
        dispatch(logout())
    }

    useEffect(() =>
    {
        dispatch(listCategorys())
    }, [dispatch])
    //  <img alt="IshMishDreams" style={{ width: 100 }} src={window.location.origin + "/logo.png"} />

    return (
        <div className="desktop-header fixed-top" style={{ background: '#c60062', display: 'flex', flexDirection: 'row' }}>
            <div className="desktop-header" style={{ padding: 0 }}>
                <img alt="IshMishDreams" style={{ width: 125 }} src={window.location.origin + "/logo.png"} />
            </div>
            <div>
                <Navbar style={{ padding: 1 }} variant="dark" expand="lg" collapseOnSelect>
                    <Container>
                        <Route render={({ history }) => <SearchBox history={history} large={true} />} />
                        <NavDropdown title={<div style={{ color: 'white' }}><i className='fas fa-user-plus'></i> User Options</div>}>
                            {userInfo ? (
                                <NavDropdown.Item onClick={logoutHandler}><i className='fas fa-user'></i> Logout</NavDropdown.Item>
                            ) : (
                                <NavDropdown.Item href="/login"><i className='fas fa-user'></i> Login</NavDropdown.Item>
                            )
                            }
                            {userInfo ? (
                                <NavDropdown.Item href="/profile"><i className='fas fa-user'></i> Profile</NavDropdown.Item>
                            ) : (
                                <NavDropdown.Item href="/register"><i className='fas fa-user'></i> Register</NavDropdown.Item>
                            )
                            }
                        </NavDropdown>
                        <Nav.Link style={{ color: 'white', fontSize: 18 }} href="/cart"> {cartItems.length} <i className='fas fa-shopping-cart'></i></Nav.Link>
                    </Container>
                </Navbar>
                <Navbar className="desktop-header" style={{ padding: 1 }} variant="dark" expand="lg" collapseOnSelect>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                        <Dropdown>
                            <Dropdown.Toggle style={{ background: 'white', color: '#c60062', fontSize: 16 }} id="dropdown-basic" title="Products Category ">
                                Products Category
                    </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {!loading && !error && (
                                    categorys.map((category) => (
                                        <DropdownButton
                                            key={category._id}
                                            drop={'right'}
                                            title={category.name}
                                            variant='#ffffff'
                                            style={{ width: '100%', background: '#ffffff', margin: 0, padding: 0 }}>
                                            {category.subCategorys.map((sub) => (
                                                <Dropdown.Item key={sub} href={`/search/${sub.trim()}`}>{sub}</Dropdown.Item>
                                            ))}
                                        </DropdownButton>
                                    ))
                                )}
                                {/*!loading && !error && (
                                    categorys.map((category) => (
                                        <Dropdown.Item key={category._id} href={`/search/${category.name}`}>{category.name}</Dropdown.Item>
                                    ))
                                    )*/}
                            </Dropdown.Menu>
                        </Dropdown>
                        <Nav.Link style={{ color: 'white' }} href="/"><i className='fas fa-home'></i> Home</Nav.Link>
                        <Nav.Link style={{ color: 'white' }} href="/allproducts"><i className='fas fa-box-open'></i> All Products</Nav.Link>
                        {userInfo && userInfo.isAdmin && (
                            <>
                                <Nav.Link style={{ color: 'white' }} href="/admin/userlist"><i className='fas fa-users'></i> Users</Nav.Link>
                                <Nav.Link style={{ color: 'white' }} href="/admin/categorylist"><i className='fas fa-crop'></i> Categories</Nav.Link>
                                <Nav.Link style={{ color: 'white' }} href="/admin/productlist"><i className='fas fa-boxes'></i> Products</Nav.Link>
                                <Nav.Link style={{ color: 'white' }} href="/admin/orderlist"><i className='fas fa-coins'></i> Orders</Nav.Link>
                            </>
                        )}
                        <Nav.Link style={{ color: 'white' }} href="/contact"><i className='fas fa-address-book'></i> Contact</Nav.Link>
                    </div>
                </Navbar>
            </div>
        </div >
    )
}

export default DesktopHeader
