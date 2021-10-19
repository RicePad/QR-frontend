import React, { useMemo } from 'react';
import { Card } from 'react-bootstrap';

import OperationButton from './OperationButton';
import PaymentForm from '../containers/PaymentForm';

interface ShoppingCartProps {
    items: any
    onAdd: any
    onRemove: any
    onPaymentDone: any
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({
  items, onAdd, onRemove, onPaymentDone,
}) => {
  const totalPrice = useMemo(
    () => items.map((i: any) => i.quantity * i.price).reduce((a: any, b: any) => a + b, 0),
    [items],
  );

  return (
    <>
      <h3 className="text-center mb-4">
        <b>Your Order</b>
      </h3>
      <Card>
        <Card.Body>
          {items.map((item: any) => (
            <div key={item.id} className="d-flex mb-4 align-items-center">
              <div className="flex-grow-1">
                <p className="mb-0">
                  <b>{item.name}</b>
                </p>
                <span>
                  $
                  {item.price}
                </span>
              </div>

              <div className="d-flex align-items-center">
                <OperationButton
                  variant="lightgray"
                  size="sm"
                  onClick={() => onRemove(item)}
                >
                  -
                </OperationButton>
                <span>{item.quantity}</span>
                <OperationButton
                  variant="lightgray"
                  size="sm"
                  onClick={() => onAdd(item)}
                >
                  +
                </OperationButton>
              </div>
            </div>
          ))}

          <hr />
          <div className="d-flex justify-content-between">
            <h5><b>Total</b></h5>
            <h5>
              <b>
                $
                {totalPrice}
              </b>
            </h5>
          </div>

          <hr className="mb-4" />
          <PaymentForm amount={totalPrice} items={items} onDone={onPaymentDone} />
        </Card.Body>
      </Card>
    </>
  );
};

export default ShoppingCart;
