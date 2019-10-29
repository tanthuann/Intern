import React, { Component } from "react";
import { connect } from "react-redux";

import { Modal, Button, Form, Input } from "antd";

import CONTANTS from "../contants/contants";

const { POST_COMMENT } = CONTANTS.ACTIONS;

class AddComment extends Component {
  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = e => {
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      console.log({ errors, values });
      if (!errors) {
        const hiddenModal = () => {
          this.setState({
            visible: false
          });
          this.props.form.resetFields();
        };
        this.props.postComment(values, hiddenModal);
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
        <Button type="primary" onClick={this.showModal}>
          Add Comment
        </Button>
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

AddComment = Form.create({})(AddComment);

const mapStateToProps = state => ({
  loadingButton: state.commentReducers.loadingButton
});

const mapDispatchToProps = dispatch => {
  return {
    postComment: (comment, hiddenModal) =>
      dispatch({ type: POST_COMMENT, payload: comment, callback: hiddenModal })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddComment);
