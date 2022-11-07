import React from "react";
import Heading from "../heading/heading";
import BlockChain from "../blockChain/blockChain";
import { Card, Row, Col } from "antd";
import "./homepage.css";
import Meta from "antd/lib/card/Meta";

class Homepage extends React.Component {
  render() {
    return (
      <Col>
        <Card
          title={<Heading />}
          bordered={false}
          headStyle={{
            textAlign: "center",
          }}
          style={{
            margin: "0 auto",
            minWidth: "fit-content",
          }}
        >
          <BlockChain />
          <Meta title="Developed by: Muhammad Abdullah"></Meta>
        </Card>
      </Col>
    );
  }
}

export default Homepage;
