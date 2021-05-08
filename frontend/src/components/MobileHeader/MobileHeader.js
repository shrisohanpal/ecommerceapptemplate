import React, { useState, useEffect } from 'react'
import { Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import SearchBox from '../SearchBox'
import { logout } from '../../actions/userActions'
import { listCategorys } from '../../actions/categoryActions'

import './MobileHeader.css'

import { Navbar, Nav, Dropdown, DropdownButton } from 'react-bootstrap'

const MobileHeader = () =>
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

    const [sideDrawerOpen, setSideDrawerOpen] = useState(false)
    const drawerToggleClickHandler = () =>
    {
        setSideDrawerOpen(!sideDrawerOpen)
    }


    let drawerClasses = 'side-drawer-mobile';
    if (sideDrawerOpen) {
        drawerClasses = 'side-drawer-mobile open'
    }

    let backdrop;
    if (sideDrawerOpen) {
        backdrop = <div style={{ position: 'fixed', width: '100%', height: '100%', top: 0, left: 0, background: 'rgba(0, 0, 0, 0.7)', zIndex: 100 }} onClick={() => setSideDrawerOpen(false)} />;
    }

    return (
        <div className="mobile-header fixed-top" style={{ background: '#c60062', margin: 0 }}>
            <Navbar style={{ padding: 5 }} variant="dark" expand="lg" collapseOnSelect>
                <a href="/"><img alt="IshMishDreams" src='/logo.png' style={{ width: '50px' }} /></a>
                <i className="fas fa-bars" style={{ color: '#ffffff', fontSize: 30, marginRight: 10 }} onClick={drawerToggleClickHandler} />
            </Navbar>
            <Navbar style={{ padding: 0 }} variant="dark" expand="lg" collapseOnSelect>
                <Dropdown style={{ padding: 0, marginLeft: 5, marginRight: 10 }}>
                    <Dropdown.Toggle style={{ background: 'red' }}></Dropdown.Toggle>
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
                                </DropdownButton>))
                        )}
                    </Dropdown.Menu>
                </Dropdown>
                <Route render={({ history }) => <SearchBox history={history} />} />

                <Nav className="ml-auto" style={{ display: 'flex', flexDirection: 'row' }}>
                    {userInfo ? (
                        <Nav.Link onClick={logoutHandler} style={{ color: '#ffffff', fontSize: 18, marginRight: 20 }} href="/"><i className='fas fa-user' /></Nav.Link>
                    ) : (
                        <Nav.Link style={{ color: '#ffffff', fontSize: 18, marginRight: 20 }} href="/login"><i className='fas fa-user' /></Nav.Link>
                    )
                    }
                    <Nav.Link style={{ color: '#ffffff', fontSize: 18, marginRight: 10 }} href="/cart"> {cartItems.length} <i className='fas fa-shopping-cart' /></Nav.Link>
                </Nav>
            </Navbar>
            <div className={drawerClasses}>
                <Navbar style={{ padding: 0 }}>
                    <Nav className="ml-auto">
                        <Nav.Link ><i className='fas fa-times' style={{ color: '#000000', fontSize: 25 }} onClick={() => setSideDrawerOpen(false)} /></Nav.Link>
                    </Nav>
                </Navbar>
                <Navbar bg="light" expand="lg">
                    <Nav className="mr-auto">
                        <Nav.Link style={{ color: '#000000', fontSize: 18 }} href="/"><i className='fas fa-home'></i> Home</Nav.Link>
                        <Nav.Link style={{ color: '#000000', fontSize: 18 }} href="/allproducts"><i className='fas fa-box-open'></i> All Products</Nav.Link>
                        {userInfo && userInfo.isAdmin && (
                            <>
                                <Nav.Link style={{ color: '#000000', fontSize: 18 }} href="/admin/userlist"><i className='fas fa-users'></i> Users</Nav.Link>
                                <Nav.Link style={{ color: '#000000', fontSize: 18 }} href="/admin/categorylist"><i className='fas fa-crop'></i> Categories</Nav.Link>
                                <Nav.Link style={{ color: '#000000', fontSize: 18 }} href="/admin/productlist"><i className='fas fa-boxes'></i> Products</Nav.Link>
                                <Nav.Link style={{ color: '#000000', fontSize: 18 }} href="/admin/orderlist"><i className='fas fa-coins'></i> Orders</Nav.Link>
                            </>
                        )}
                        <Nav.Link style={{ color: '#000000', fontSize: 18 }} href="/contact"><i className='fas fa-address-book'></i> Contact</Nav.Link>
                    </Nav>
                </Navbar>
            </div>
            {backdrop}
        </div>
    )
}

export default MobileHeader