import React from 'react';
import './ItemCount.css';

const ItemCount = ({items}) => {
  const count = items.reduce( (totals, item) => {
    if (!totals[item.cleanliness]) {
      totals[item.cleanliness] = 0;
    }
    totals[item.cleanliness]++;
    return totals;
  }, {});

  console.log(count);



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