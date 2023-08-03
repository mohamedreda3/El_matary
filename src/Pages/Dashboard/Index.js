import React from "react";

import { Container, Row, Col } from "reactstrap";

import Breadcrumbs from "../../components/Common/Breadcrumb";

import SalesStatistics from "./salesStatistics";
import SalesByCategory from "./salesByCategory";
import ManageOrder from "./manageOrder";
import TopCountries from "./topCountries";
import TopUser from "./topUsers";
import OrderActivity from "./orderActivity";
import BestProduct from "./bestProduct";
import WelcomeBoard from "./welcomeBoard";
import LineCharts from "./lineCharts";
import EarningByItem from "./earningByItem";

const Dashboard = () => {
  document.title = "Dashboard | Matary - React Admin & Dashboard Template";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Matary" breadcrumbItem="Welcome !" />
          <Row>
            {/* WelCome Board */}
            <WelcomeBoard />

            {/* Line Charts */}
            <LineCharts />
          </Row>

          <Row>
            {/* Sales Statistics */}
            <SalesStatistics />

            {/* Sales By Category */}
            <SalesByCategory />
          </Row>

          <Row>
            <Col xl={8}>
              <Row>
                {/* Order Activity */}
                <OrderActivity />

                {/* Top User */}
                <TopUser />
              </Row>
            </Col>

            <Col xl={4}>
              {/* Top Countries */}
              <TopCountries />

              {/* Best Product */}
              <BestProduct />
            </Col>
          </Row>

          <Row>
            {/* Earning By Item */}
            <EarningByItem />

            {/* Manage Order */}
            <ManageOrder />
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
