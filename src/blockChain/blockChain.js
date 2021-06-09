import React from 'react';
import './blockChain.css';
import sha256 from 'crypto-js/sha256';
import {HorizontalScrollable} from '../scroll/scroll'

//Finally Working!

const uniqid = require('uniqid');

class BlockChain extends React.Component {
    constructor() {
        super();
        this.state = {
            blocks :[
                {
                    blockNo: 0,
                    nounce: 100,
                    timeStamp: new Date(),
                },
                {
                    blockNo: 1,
                    nounce: 200,
                    timeStamp: new Date(),
                },
                {
                    blockNo: 2,
                    nounce: 1000,
                    timeStamp: new Date(),
                },
                {
                    blockNo: 3,
                    nounce: 10203,
                    timeStamp: new Date(),
                }
            ],
            hashes: ["0000000000000"],
            difficulty: 3,
            isMining: false,
        }
    }

    getHash = (obj) => {
        let h = obj.blockNo.toString() + obj.timeStamp.toString() + obj.nounce.toString() + obj.prevHash;
        return sha256(JSON.stringify(h)).toString();
    }
    
    calculateHash = (index) => {
        let block = this.state.blocks;
        let newHashes = this.state.hashes;
        let b = {
            blockNo: block[index].blockNo,
            timeStamp: block[index].timeStamp,
            nounce: block[index].nounce,
            prevHash: newHashes[index]
        }
        newHashes[index + 1] = this.getHash(b);
        this.setState({hashes: newHashes});
        if(index < this.state.blocks.length - 1) {
            this.calculateHash(index + 1);
        }
    }

    isValidHash = (hash) => {
        for(let i = 0; i < this.state.difficulty; i++) {
            if(hash[i] !== "0") {
                return false;
            }
        }
        return true;
    }

    mineHash = (index) => {
    this.setState({isMining: true},() => {
        for(let i = this.state.blocks[index].nounce; ; i++) {
            let block = this.state.blocks;
            let b = {
                blockNo: block[index].blockNo,
                timeStamp: block[index].timeStamp,
                nounce: i,
                prevHash: this.state.hashes[index]
            }
            let h = this.getHash(b);
            if(this.isValidHash(h)) {
                let hash = this.state.hashes;
                let b = this.state.blocks;
                hash[index + 1] = h;
                b[index].nounce = i;
                this.setState({blocks: b});
                this.setState({hashes: hash});
                this.setState({isMining: false});
                if(index < this.state.blocks.length - 1 )
                    this.calculateHash(index + 1);
                break;
            }
        }
    });
    }

    changeBlockNo = (v,index) => {
        let a = this.state.blocks;
        a[index].blockNo = v;
        this.setState({blocks: a},() => {
            this.calculateHash(index);    
        });
    }
    changeNounce = (v,index) => {
        let a = this.state.blocks;
        a[index].nounce = v;
        this.setState({blocks: a},() => {
            this.calculateHash(index);
        });
    }
    
    renderCards = () => {
        //mine button style must be changed , when it's mining!!!
        const Blocks = this.state.blocks.map((b,i) => {
            let hashClass;
            if(this.state.hashes.length > 1 && this.isValidHash(this.state.hashes[i + 1])) {
                hashClass = "validHashes";
            }
            else {
                hashClass = "inValidHashes";
            }
            //<input type = "text" defaultValue = {this.state.hashes[i]} onChange = {(e) => {this.changePrev(e.target.value,i);}}  />
            return (
                <div key = {uniqid()} className = "BlockCard-div" >
                    <table className = "table">
                        <tbody className = "table-body">
                            <tr className = "table-row">
                                <td className = "table-text">Block No:</td>
                                <td className = "table-input">
                                    <input type = "number" className = "BlockNo" defaultValue = {b.blockNo} onChange = {(e) => { this.changeBlockNo(e.target.value,i);} } />
                                </td>
                            </tr>
                            <tr className = "table-row">
                                <td>Nounce:</td>
                                <td><input type = "number" className = "Nounce" defaultValue = {b.nounce} onChange = {(e) => {this.changeNounce(e.target.value,i);}} /></td>
                            </tr>
                            <tr className = "table-row">
                                <td>Prev:</td>
                                <td>
                                    <div className = "prev-hash">
                                        <HorizontalScrollable>
                                            {this.state.hashes[i]}
                                        </HorizontalScrollable>
                                    </div>
                                </td>
                            </tr>
                            <tr className = "table-row">
                                <td>Hash:</td>
                                <td>
                                    <div className = {hashClass} >
                                        <HorizontalScrollable>
                                            {this.state.hashes[i + 1]}
                                        </HorizontalScrollable>
                                    </div>
                                </td>
                            </tr>
                            <tr className = "table-row">
                                <td className = "button-row">
                                    <button className = "mine-button" onClick = {() => {this.mineHash(i);}}>
                                        {"Mine"}
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    
                </div>
            );    
        })
        return Blocks;
    }

    showBackward = (arr) => {
        //reverse arr, 
        for(let i = 0,j = arr.length - 1; i < arr.length/2 && j !== i; i++, j--) {
            let b = arr[i];
            arr[i] = arr[j];
            arr[j] = b;
        }
        return arr;
    }

    makeNewBlock = () => {
        let obj = {
            blockNo: this.state.blocks[this.state.blocks.length - 1].blockNo + 1,
            nounce: 0,
            timeStamp: new Date()
        }
        let obj2 = {
            ...obj,
            prevHash: this.state.hashes[this.state.hashes.length - 1]
        }
        this.setState({blocks: this.state.blocks.concat(obj), hashes: this.state.hashes.concat(this.getHash(obj2))});
    }

    componentDidMount = () => {
        for(let i = 0; i< this.state.blocks.length; i++) {
            this.mineHash(i);
        }
    }
    render() {
        return (
            <div>
                <button id = "new-block-button" onClick = {() => {this.makeNewBlock()}}>New</button>
                {this.showBackward(this.renderCards())}
            </div>    
        );
    }
}
export default BlockChain;