import React, { Component } from "react";
import { Col, Card } from "antd";

const { Meta } = Card;

export default class CardPhoto extends Component {
  render() {
    const { photo } = this.props;
    return (
      <Col xl={8} md={12} sm={24}>
        <Card
          style={{ margin: "10px 0" }}
          cover={<img alt="example" src={photo.url} />}
        >
          <p>Album Id: {photo.albumId}</p>
          <p>Id: {photo.id}</p>
          <Meta title={photo.title} description="This is the description" />
        </Card>
      </Col>
    );
  }
}
