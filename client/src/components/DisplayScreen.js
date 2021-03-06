import React from "react";
import { Col, Container, Row, Table } from "react-bootstrap";

class DiaplayList extends React.Component {
  componentDidMount() {
    this.props.servedTicketLists();
  }

  render() {
    return (
      <Container>
        <Row>
          <Col md={2}></Col>
          <Col md={8}>
            <Table
              striped
              bordered
              size="sm"
              className="text-center display  mt-5"
            >
              <thead>
                <tr>
                  <th colSpan="3" className="center">
                    In Service
                  </th>
                </tr>
                <tr>
                  <th>Ticket No.</th>
                  <th>Counter No.</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{this.props.ticketList.ticketId}</td>
                  <td>{this.props.ticketList.counterId}</td>
                </tr>
              </tbody>
            </Table>

            {/* <Table striped bordered   className="text-center display  mt-3">
                      <thead>
                        <tr>
                          <th>Queue Length</th>
                          <th>Ticket Type</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.props.displayList?.map((display, index) => (
                          <tr key={index}>
                            <td>{display.queueLength}</td>
                            <td>{display.ticketType}</td>
                            
                          </tr>
                        ))}
                      </tbody>
                    </Table> */}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default DiaplayList;
