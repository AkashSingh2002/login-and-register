import React from 'react';
import { Table, Container, Row, Col  } from 'react-bootstrap';

const ProtectedPage = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <Container>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <h1>Welcome, {user.name}!</h1>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Date of Birth</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{user.name}</td>
                <td>{user.dateOfBirth}</td>
                <td>{user.email}</td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default ProtectedPage;