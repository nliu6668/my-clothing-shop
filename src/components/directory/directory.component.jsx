import React from 'react'
import CategroryItem from '../category-item/categrory-item.component'
import './directory.styles.scss'


const Directory = ({categories}) => {
  return (
    <div className='categories-container'>
      {categories.map((categrory) => (
        <CategroryItem key={categrory.id} category={categrory} />
      ))}
    </div>
  )
}

export default Directory
