import React from 'react';
import Heading from '../heading/heading';
import BlockChain from '../blockChain/blockChain';
import {VerticalScrollable} from '../scroll/scroll';
import './homepage.css';



class Homepage extends React.Component {
    render() {
        return (
            <div id = "HomePage-div">
                <header id = "main-header">
                    <Heading/>
                </header>
                <div id = "BlockChain-div">
                    <VerticalScrollable>
                        <div className = "block-chain-vertical-scroll">
                            <BlockChain />
                        </div>  
                    </VerticalScrollable>
                </div>
                <footer>
                    Developed by: Muhammad Abdullah
                </footer>
            </div>
        );
    }

}

export default Homepage;