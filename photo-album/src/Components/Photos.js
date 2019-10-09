import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { getPhotoAlbum } from "../actions/getActions";

import { Row, Pagination, Spin } from "antd";

//Components
import CardPhoto from "./CardPhoto.js";

class Photos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(pageNumber) {
    //Cut data : 9 photo
    let endPhoto = pageNumber * 9 || 9;
    let startPhoto = pageNumber * 9 - 9 || 0;
    console.log(startPhoto, endPhoto);
    this.props.getPhotoAlbum(startPhoto);
  }

  componentDidMount() {
    this.props.getPhotoAlbum();
    setInterval( () => {
      this.setState({
        loading: false
      })
    }, 500)
  }

  render() {
    let { data } = this.props;
    const { loading } = this.state;
    return (
      <Spin tip="Loading..." spinning={loading} size="large">
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
      </Spin>
    );
  }
}

const mapStateToProps = state => ({
  data: state.datas.album
});

export default connect(
  mapStateToProps,
  { getPhotoAlbum }
)(Photos);
