import React, { Component } from "react";
import API from "./api/API";
import "./App.css";
import { Switch, Redirect, Route, withRouter } from "react-router-dom";
import Nav from "./components/nav";
import Body from "./components/body";
import DisplayScreen from "./components/DisplayScreen";
import OfficerScreen from "./components/OfficerScreen";
import ManagerScreen from "./components/ManagerScreen";
import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.light.css";
import { Col, Row } from "react-bootstrap";
import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.light.css";
import { DATA } from "./shared/data";
import moment from "moment";

import Scheduler from "devextreme-react/scheduler";

// const data = [
//   {
//     text: "Website Re-Design Plan",
//     startDate: new Date(2016, 4, 25, 9, 30),
//     endDate: new Date(2016, 4, 25, 11, 30),
//   },
//   {
//     text: "Book Flights to San Fran for Sales Trip",
//     startDate: new Date(2020, 10, 10, 12, 0),
//     endDate: new Date(2020, 10, 10, 13, 0),
//   },
// ];

const views = ["day", "week", "workWeek", "month"];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inProgress: 0,
      gotTicket: 0,
      ticket: {},
      ticketList: [],
      services: [],
      ticketToCall: 0,
      // change the Fields' name in db into proper name for this Library
      date: DATA.map((e) => ({
        text: e.courseName,
        startDate: e.startTS,
        endDate: e.endTS,
      })),
    };
  }

  componentDidMount() {
    //Returns list of services , save them on the state and pass them to the components through props
    API.getServices()
      .then((services) => {
        this.setState({ services: services });
      })
      .catch((err) => console.log(err));

    //Get list of tickets served (as public screen), store in the state

    //
    // console.log(moment(1605088221 * 1000).format("DD-MM-YYYY h:mm"));
    // let d = new Date(1605088221 * 1000);
    // alert(d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear());
  }

  //Request new tocket to service (as customer)
  getTicket = (serviceId) => {
    //console.log("The request : " + serviceId + ", has been selected");
    this.setState({ inProgress: 1 });
    API.getTicket(serviceId)
      .then((ticket) => {
        this.setState({ ticket: ticket });
        this.setState({ inProgress: 0, gotTicket: 1 });
      })

      .catch((errorObj) => {
        this.handleErrors(errorObj);
      });
  };

  //return to choosing a new ticket
  handleReturn = () => {
    this.setState({ inProgress: 0, gotTicket: 0 });
  };

  callTicketAsOfficer = (counterId) => {
    API.getTicketToServe(counterId)
      .then((ticket) => {
        this.setState({ ticketToCall: ticket.ticketId });
      })
      .catch((errorObj) => {
        console.log(errorObj);
        //this.handleErrors(errorObj);
      });
  };

  servedTicketLists = () => {
    API.getListOfServedTickets()
      .then((ticketLists) => {
        this.setState({
          ticketList: ticketLists || [],
        });
      })
      .catch((errorObj) => {
        console.log(errorObj);
      });
  };

  render() {
    return (
      <>
        <Nav />
        <Row>
          <Col xs={1} md={2}></Col>
          <Col xs={4} md={8}>
            <Scheduler
              dataSource={this.state.date}
              defaultCurrentDate={new Date()}
              startDayHour={8.5}
              height={900}
              views={views}
              editing={false}
              endDayHour={19.5}
            />
          </Col>
          <Col xs={1} md={2}></Col>
        </Row>

        {/* <Scheduler
          dataSource={data}
          views={views}
          defaultCurrentView="day"
          defaultCurrentDate={new Date()}
          height={600}
          startDayHour={9}
        /> */}

        <Switch>
          <Route exact path="/home">
            <DisplayScreen
              ticketList={this.state.ticketList}
              servedTicketLists={this.servedTicketLists}
            />
            <Body
              gotTicket={this.state.gotTicket}
              ticket={this.state.ticket}
              handleReturn={this.handleReturn}
              inProgress={this.state.inProgress}
              services={this.state.services}
              onClick={this.getTicket}
            />
          </Route>
          <Route path="/officer">
            <OfficerScreen
              ticketToCall={this.state.ticketToCall}
              callTicket={this.callTicketAsOfficer}
            />
          </Route>
          <Route path="/manager">
            <ManagerScreen />
          </Route>
          <Redirect from="/" exact to="/home" />
        </Switch>
      </>
    );
  }
}

export default withRouter(App);
