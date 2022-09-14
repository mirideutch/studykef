import React from 'react';

function Example() {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          Launch static backdrop modal
        </Button>
  
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>כניסה</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            הכנס שם וסיסמא
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              אישור
            </Button>
            <Button variant="primary">אפס</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  
  render(<Example />);