import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const SearchBox = ({ history, large }) =>
{
    const [keyword, setKeyword] = useState('')

    const submitHandler = (e) =>
    {
        e.preventDefault()
        if (keyword.trim()) {
            history.push(`/search/${keyword}`)
        } else {
            history.push('/')
        }
    }

    return (
        <Form style={{ width: large ? 800 : 200 }} onSubmit={submitHandler} inline>
            <Form.Control style={{ width: large ? 600 : 160 }} type='text' name='q' onChange={e => setKeyword(e.target.value)}
                placeholder='Search Products ....' className='mr-sm-2 ml-sm-5'></Form.Control>
            {large ? (
                <Button type='submit' style={{ background: '#ffffff', color: '#c60062', fontSize: 16 }} className='p-2'>
                    Search
                </Button>
            ) : (
                    <Button type='submit' style={{ background: 'red', paddingTop: 10, paddingBottom: 10, paddingLeft: 5, paddingRight: 5 }}>
                        <i className="fas fa-search" style={{ fontSize: 20, color: '#ffffff', }} />
                    </Button>
                )}

        </Form>
    )
}

export default SearchBox
