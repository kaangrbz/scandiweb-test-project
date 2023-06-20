import React from 'react'
import { Link } from 'react-router-dom'
import 'styles/404.sass'

type Props = {}

const NotFound: React.FC = (props: Props) => {
  return (
    <div className='container'>
        <span>The page that you are tried to go is not found or deleted.</span>
        <span>Do you want to&nbsp;<Link to='/' className='link'>go home?</Link></span>
    </div>
  )
}

export default NotFound