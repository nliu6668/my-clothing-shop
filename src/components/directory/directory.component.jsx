import React from 'react'
import CategroryItem from '../category-item/categrory-item.component'
import './directory.styles.scss'


const Directory = ({categories}) => {
  return (
    <div className='directory-container'>
      {categories.map((categrory) => (
        <CategroryItem key={categrory.id} category={categrory} />
      ))}
    </div>
  )
}

export default Directory
