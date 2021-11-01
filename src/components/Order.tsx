import React from 'react';
import { Card, Button } from 'react-bootstrap';

interface OrderProps {
    order: any
    onComplete: any
}

const Order: React.FC<OrderProps> = ({ order, onComplete }) => (
  <Card className="mb-3">
    <Card.Header className="d-flex justify-content-between">
      <span>{`Order #${order.id} - Table #${order.table}`}</span>
      <span>
        <b>
          $
          {order.amount}
        </b>
      </span>
    </Card.Header>
    <Card.Body className="d-flex justify-content-between">
      <div>
        {JSON.parse(order.detail).map((item: any) => (
          <div className="mb-2">
            <span>
              x
              {item.quantity}
            </span>
            <img
              src={item.image}
              width={30}
              height={30}
              style={{ borderRadius: 3, margin: '0 10px' }}
              alt="preview order"
            />
            <span>{item.name}</span>
          </div>
        ))}
      </div>

      <div>
        { onComplete ? (
          <Button variant="standard" size="lg" onClick={onComplete}>
            Done
          </Button>
        ) : null }
      </div>
    </Card.Body>
  </Card>
);

export default Order;
