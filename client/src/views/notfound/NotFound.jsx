import React from 'react';

export default function NotFound() {
  return (
    <div className='d-flex justify-content-center' >
      <img src="https://cdn.wallpapersafari.com/19/69/iX4nU7.jpg" alt="Not Found" style={{width: "100%", height: "100vh", objectFit: "cover" }} />
      <div 
      className='text-center text-danger f-silkscreen'
      style={{
        position: 'absolute',
        top: '75%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100%',
        fontSize: '60pt',
      }}>404 - PAGE NOT FOUND</div>
    </div>
  )
}
