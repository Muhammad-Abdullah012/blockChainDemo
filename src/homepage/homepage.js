import React from "react";
import Heading from "../heading/heading";
import BlockChain from "../blockChain/blockChain";
import { Card } from "antd";
import "./homepage.css";
import Meta from "antd/lib/card/Meta";

class Homepage extends React.Component {
  render() {
    return (
      <div id="HomePage-div">
        <Card
          title={<Heading />}
          bordered={false}
          headStyle={{
            textAlign: "center",
          }}
        >
          <BlockChain />
          <Meta title="Developed by: Muhammad Abdullah"></Meta>
        </Card>
      </div>
    );
  }
}

export default Homepage;
