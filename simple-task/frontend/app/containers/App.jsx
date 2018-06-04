import React, { Component } from 'react';

import {
    Link
} from 'react-router-dom';

import './style.less';

import { Row,Col,Divider,Icon} from 'antd';

class App extends Component {
    render() {
      return (
        <div>
          <div className="gutter-example">
            <Row gutter={16}>
              <Col className="gutter-row" span={6}>
                <div className="gutter-box"><Link to="/">Simple Task</Link></div>
              </Col>
            </Row>
          </div>
          <Divider orientation="left"><a href="https://github.com/LucienLau/eos-dapps"><Icon type="github"/>Star Github</a></Divider>
          {this.props.children}
        </div>
      );
    }
  }

export default App;