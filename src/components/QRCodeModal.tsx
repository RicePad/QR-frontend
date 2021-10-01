import React from 'react';
import {
  Modal, Container, Row, Col,
} from 'react-bootstrap';
import QRCode from './QRCode';
import OperationButton from './OperationButton';

interface QRCodeModalProps {
    place: any
    show: any
    hide: any
    onUpdatePlace: any
}

const QRCodeModal: React.FC<QRCodeModalProps> = ({
  place, show, hide, onUpdatePlace,
}) => (
  <Modal show={show} hide={hide} size="lg" centered>
    <Modal.Body>
      <Container>
        <h3>Tables QR Code</h3>
        <div className="d-flex align-items-center mt-4 mb-4">
          <h5 className="mb-0 mr-2">
            Total tables:
            {' '}
            <b>{place.number_of_tables}</b>
          </h5>

          <OperationButton
            variant="lightgray"
            size="sm"
            onClick={() => onUpdatePlace(place.number_of_tables - 1)}
          >
            -
          </OperationButton>
          <OperationButton
            variant="lightgray"
            size="sm"
            onClick={() => onUpdatePlace(place.number_of_tables + 1)}
          >
            +
          </OperationButton>
        </div>

        <Row>
          {Array.from({ length: place.number_of_tables }, (_, i) => i + 1).map((table) => (
            <Col key={table} lg={4} md={6} className="mb-4">
              <QRCode
                table={table}
                placeId={place.id}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </Modal.Body>
  </Modal>
);

export default QRCodeModal;
