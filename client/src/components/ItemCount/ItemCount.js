import React from 'react';
import './ItemCount.css';

const ItemCount = ({items}) => {
  const count = {
    Sparkling: 0,
    Dusty: 0,
    Rancid: 0
  };
  
  items.forEach( item => {
    count[item.cleanliness]++;
  });

  return (
    <div className="ItemCount">
      <h6>Sparkling: </h6><h6>{count.Sparkling}</h6>
      <h6>Dusty: </h6><h6>{count.Dusty}</h6>
      <h6>Rancid: </h6><h6>{count.Rancid}</h6>
      <h5>Total: </h5><h5>{items.length}</h5>
    </div>
  )
}

export default ItemCount;