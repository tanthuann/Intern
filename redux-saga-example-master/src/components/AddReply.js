import React, { Component } from "react";
import { connect } from "react-redux";

import { Modal, Form, Input } from "antd";

import CONTANTS from "../contants/contants";

const { REPLY_COMMENT } = CONTANTS.ACTIONS;

class AddReplyComment extends Component {
  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = e => {
    e.preventDefault();
    const { comment } = this.props;

    this.props.form.validateFields((errors, values) => {
      if (!errors) {
        const hiddenModal = () => {
          this.setState({
            visible: false
          });
          this.props.form.resetFields();
        };
        const reply = {
          id: !comment.replies
            ? comment.id + 0.1
            : (comment.replies[0].id + 0.1).toFixed(1),
          name: values.name,
          body: values.body
        };
        let replies = [];
        if (comment.replies) replies = [reply, ...comment.replies];
        else replies = [reply];
        this.props.replyComment(comment.id, replies, hiddenModal);
      }
    });
  };

  handleCancel = e => {
    this.setState({
      visible: false
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <a style={{ color: "rgba(0, 0, 0, 0.45)" }} onClick={this.showModal}>
          Reply to
        </a>
        <Modal
          title="Add Comment"
          visible={this.state.visible}
          onOk={e => this.handleOk(e)}
          onCancel={this.handleCancel}
          okButtonProps={{ loading: this.props.loadingButton }}
        >
          <Form>
            <Form.Item label="Name">
              {getFieldDecorator("name", {
                initialValue: this.state.name,
                rules: [
                  {
                    whitespace: true,
                    min: 8,
                    message: "Name must 8 character"
                  },
                  {
                    max: 30,
                    message: "Name too long"
                  },
                  {
                    required: true,
                    message: "Please input your Name and don't accept spaces"
                  }
                ]
              })(
                <Input
                  type="text"
                  id="name"
                  name="name"
                  //onChange={this.handleInputChange}
                  allowClear
                  onPressEnter={e => this.handleOk(e)}
                  placeholder={"Your name"}
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("body", {
                initialValue: this.state.body,
                rules: [
                  {
                    required: true,
                    whitespace: true,
                    message: "Please input your comment and don't accept spaces"
                  }
                ]
              })(
                <Input.TextArea
                  type="text"
                  id="body"
                  name="body"
                  onPressEnter={e => this.handleOk(e)}
                  placeholder={"Your comment"}
                />
              )}
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

AddReplyComment = Form.create({})(AddReplyComment);

const mapStateToProps = state => ({
  loadingButton: state.commentReducers.loadingButton
});

const mapDispatchToProps = dispatch => {
  return {
    replyComment: (id, replies, hidenModal) =>
      dispatch({
        type: REPLY_COMMENT,
        payload: { id, replies },
        callback: hidenModal
      })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddReplyComment);
