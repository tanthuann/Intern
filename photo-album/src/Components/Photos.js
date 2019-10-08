import React, { Component } from "react";
import axios from 'axios';
import { Row, Pagination } from "antd";

//Components
import CardPhoto from "./CardPhoto.js";

import { LIMIT_PHOTOS } from '../constants/constants';

export default class Photos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(pageNumber) {
    //Cut data : 9 photo
    let endPhoto = pageNumber * 9 || 9;
    let startPhoto = pageNumber * 9 - 9 || 0;
    console.log(startPhoto, endPhoto);
    this.callAPI(startPhoto);
    // this.setState({
    //   // TODO:  1. Phan trang theo server
    //   // TODO: 2.
    //   data: this.props.data.slice(startPhoto, endPhoto)
    // });
  }

  callAPI(startPhoto = 0) {
    axios
      .get(
        `https://jsonplaceholder.typicode.com/photos?_start=${startPhoto}&_limit=${LIMIT_PHOTOS}`
      )
      .then(res => {
        this.setState({
          data: res.data
        });
      });
  }

  componentDidMount() {
    this.callAPI();
  }


  render() {
    let { data } = this.state;
    return (
      <>
        <Row
          style={{ margin: "10% 15%" }}
          gutter={12}
          type="flex"
          justify="space-around"
        >
          {data.map((photo, index) => (
            <CardPhoto photo={photo} key={index} />
          ))}
          <Pagination
            style={{ margin: "20px 0" }}
            showQuickJumper
            defaultCurrent={1}
            total={500}
            onChange={this.onChange}
          />
        </Row>
      </>
    );
  }
}
