import React from 'react';
import '../../../asset/sass/etc/selection/fishListItem.scss';
import PropTypes from 'prop-types';

interface FishItemProps {
  children: React.ReactNode;
  price: string;
  payEvent: () => void;
}

export default function FishListItem({
  children,
  price,
  payEvent,
}: FishItemProps) {
  return (
    <div className="fish-item-container">
      <div className="fish-count-wrapper">
        <span className="fish-bread-cnt">{children}</span>
      </div>
      <div onClick={payEvent} className="fish-price-border">
        <span className="fish-bread-cnt-orange">{price}</span>
      </div>
    </div>
  );
}

FishListItem.propTypes = {
  price: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  payEvent: PropTypes.func,
};
