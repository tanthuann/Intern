import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Spin, Alert } from "antd";

import OneComment from "./Comment";
import AddComment from "./AddComment";

import CONTANTS from "../contants/contants";

const { API_LOAD_MORE, API_CALL_REQUEST } = CONTANTS.ACTIONS;

export class ListComments extends Component {
  componentDidMount() {
    this.props.fetchComments();
  }

  render() {
    let { comments, loading, loadingButton, error, amountComment } = this.props;
    const checkMore =
      parseInt(amountComment, 10) === comments.length ? true : false;
    return (
      <Spin
        tip="Loading..."
        size="large"
        spinning={loading}
        style={{ minHeight: "60vh" }}
      >
        {this.props.error && (
          <div>
            <Alert
              message="Error"
              description={this.props.error}
              type="error"
              showIcon
              style={{ marginBottom: "10px" }}
              //closable
              // onClose={() => console.log("oke")}
            />
          </div>
        )}
        <AddComment />
        {comments &&
          comments.map((comment, index) => {
            return (
              <OneComment key={index} comment={comment}>
                {comment.replies &&
                  comment.replies.map((reply, index) => (
                    <OneComment key={index} comment={reply} reply={true} />
                  ))}
              </OneComment>
            );
          })}
        {!comments && <h1>Nothing here</h1>}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px"
          }}
        >
          <Button
            loading={loadingButton}
            onClick={() => this.props.fetchMoreComments(this.props.pageMore)}
            style={{ display: loading || error || checkMore ? "none" : "" }}
            type="primary"
            ghost
          >
            More
          </Button>
        </div>
      </Spin>
    );
  }
}

const mapStateToProps = state => {
  const {
    loading,
    loadingButton,
    comments,
    error,
    amountComment,
    pageMore
  } = state.commentReducers;
  return {
    loading,
    loadingButton,
    comments,
    error,
    amountComment,
    pageMore
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchComments: () => dispatch({ type: API_CALL_REQUEST }),
    fetchMoreComments: page => dispatch({ type: API_LOAD_MORE, page: page })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListComments);
