import React from "react";
import "./blockChain.css";
import sha256 from "crypto-js/sha256";
import { Button, Card, Input, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";

//Finally Working!
const { Text } = Typography;
const uniqid = require("uniqid");

class BlockChain extends React.Component {
  constructor() {
    super();
    this.state = {
      blocks: [
        {
          blockNo: 0,
          nounce: 100,
          timeStamp: new Date(),
          data: "Block No. 0",
        },
        {
          blockNo: 1,
          nounce: 200,
          timeStamp: new Date(),
          data: "Block No. 1",
        },
        {
          blockNo: 2,
          nounce: 1000,
          timeStamp: new Date(),
          data: "Block No. 2",
        },
        {
          blockNo: 3,
          nounce: 10203,
          timeStamp: new Date(),
          data: "Block No. 3",
        },
      ],
      hashes: ["000000000000000"],
      difficulty: 3,
      isMining: false,
    };
  }

  getHash = (obj) => {
    let h =
      obj.blockNo.toString() +
      obj.timeStamp.toString() +
      obj.nounce.toString() +
      obj.data.toString() +
      obj.prevHash;
    return sha256(JSON.stringify(h)).toString();
  };

  calculateHash = (index) => {
    let block = this.state.blocks;
    let newHashes = this.state.hashes;
    let b = {
      blockNo: block[index].blockNo,
      timeStamp: block[index].timeStamp,
      nounce: block[index].nounce,
      data: block[index].data,
      prevHash: newHashes[index],
    };
    newHashes[index + 1] = this.getHash(b);
    this.setState({ hashes: newHashes });
    if (index < this.state.blocks.length - 1) {
      this.calculateHash(index + 1);
    }
  };

  isValidHash = (hash) => {
    for (let i = 0; i < this.state.difficulty; i++) {
      if (hash[i] !== "0") {
        return false;
      }
    }
    return true;
  };

  mineHash = (index) => {
    this.setState({ isMining: true }, () => {
      for (let i = this.state.blocks[index].nounce; ; i++) {
        let block = this.state.blocks;
        let b = {
          blockNo: block[index].blockNo,
          timeStamp: block[index].timeStamp,
          nounce: i,
          data: block[index].data,
          prevHash: this.state.hashes[index],
        };
        let h = this.getHash(b);
        if (this.isValidHash(h)) {
          let hash = this.state.hashes;
          let b = this.state.blocks;
          hash[index + 1] = h;
          b[index].nounce = i;
          this.setState({ blocks: b });
          this.setState({ hashes: hash });
          this.setState({ isMining: false });
          if (index < this.state.blocks.length - 1)
            this.calculateHash(index + 1);
          break;
        }
      }
    });
  };
  changeData = (v, index) => {
    let a = this.state.blocks;
    a[index].data = v;
    let hashes = [...this.state.hashes];
    hashes[hashes.length - 1] = this.getHash(a[index]);
    this.setState({ hashes }, () => {
      this.calculateHash(index);
    });
  };
  //   changeBlockNo = (v, index) => {
  //     let a = this.state.blocks;
  //     a[index].blockNo = v;
  //     this.setState({ blocks: a }, () => {
  //       this.calculateHash(index);
  //     });
  //   };
  //   changeNounce = (v, index) => {
  //     let a = this.state.blocks;
  //     a[index].nounce = v;
  //     this.setState({ blocks: a }, () => {
  //       this.calculateHash(index);
  //     });
  //   };

  renderCards = () => {
    //mine button style must be changed , when it's mining!!!
    const Blocks = this.state.blocks.map((b, i) => {
      const bgColor =
        this.state.hashes.length > 1 &&
        this.isValidHash(this.state.hashes[i + 1])
          ? "#BCE29E"
          : "red";
      const defaultValue = this.state.blocks[i].data;
      return (
        <Card
          key={uniqid()}
          className="BlockCard-div"
          style={{
            width: "fit-content",
          }}
        >
          <table className="table">
            <tbody className="table-body">
              <tr className="table-row">
                <td className="table-text">Block No:</td>
                <td className="table-input">
                  <Text>{b.blockNo}</Text>
                </td>
              </tr>
              <tr className="table-row">
                <td>Nounce:</td>
                <td>
                  <Text>{b.nounce}</Text>
                </td>
              </tr>
              <tr className="table-row">
                <td>Data</td>
                <td>
                  <Input
                    defaultValue={defaultValue}
                    onPressEnter={(e) => this.changeData(e.target.value, i)}
                  />
                </td>
              </tr>
              <tr className="table-row">
                <td>Prev:</td>
                <td>
                  <Text>{this.state.hashes[i]}</Text>
                </td>
              </tr>
              <tr className="table-row">
                <td>Hash:</td>
                <td>
                  <Text
                    style={{
                      backgroundColor: bgColor,
                    }}
                  >
                    {this.state.hashes[i + 1]}
                  </Text>
                </td>
              </tr>
              <tr className="table-row">
                <td className="button-row">
                  <Button
                    type="primary"
                    shape="round"
                    style={{ backgroundColor: "#54B435", border: "#54B435" }}
                    onClick={() => {
                      this.mineHash(i);
                    }}
                  >
                    Mine
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </Card>
      );
    });
    return Blocks;
  };

  makeNewBlock = () => {
    let obj = {
      blockNo: this.state.blocks[this.state.blocks.length - 1].blockNo + 1,
      nounce: 0,
      timeStamp: new Date(),
      data: "",
    };
    let obj2 = {
      ...obj,
      prevHash: this.state.hashes[this.state.hashes.length - 1],
    };
    this.setState({
      blocks: this.state.blocks.concat(obj),
      hashes: this.state.hashes.concat(this.getHash(obj2)),
    });
  };

  componentDidMount = () => {
    for (let i = 0; i < this.state.blocks.length; i++) {
      this.mineHash(i);
    }
  };
  render() {
    return (
      <>
        <Button
          type="primary"
          shape="round"
          icon={<PlusOutlined />}
          onClick={() => {
            this.makeNewBlock();
          }}
        >
          New
        </Button>
        {this.renderCards().reverse()}
      </>
    );
  }
}
export default BlockChain;
