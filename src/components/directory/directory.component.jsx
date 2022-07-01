import React from 'react'
import DirectoryItem from '../directory-item/directory-item.component'
import './directory.styles.scss'


const Directory = ({categories}) => {
  return (
    <div className='directory-container'>
      {categories.map((categrory) => (
        <DirectoryItem key={categrory.id} category={categrory} />
      ))}
    </div>
  )
}

export default Directory
