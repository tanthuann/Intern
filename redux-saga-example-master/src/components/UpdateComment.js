import React, { Component } from "react";
import { connect } from "react-redux";

import { Modal, Button, Form, Input } from "antd";

import CONTANTS from "../contants/contants";

const { UPDATE_COMMENT } = CONTANTS.ACTIONS;

class UpdateComment extends Component {
  state = { visible: false };

  static getDerivedStateFromProps(props, state) {
    const id = props.id;
    const [comment] = props.comments.filter(comment => comment.id === id);
    return comment;
  }

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
        const hidenModal = () => {
          this.setState({
            visible: false
          });
          this.props.form.resetFields();
        };
        this.props.updateComment(
          this.props.id,
          values.name,
          values.body,
          hidenModal
        );
      }
      return 0;
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
        <Button
          style={{
            backgroundColor: "#52c41a",
            border: "none",
            marginLeft: "5px"
          }}
          onClick={this.showModal}
        >
          Edit
        </Button>
        <Modal
          title="Update Comment"
          visible={this.state.visible}
          onOk={e => this.handleOk(e)}
          okText={"Update"}
          okType={"danger"}
          onCancel={this.handleCancel}
          okButtonProps={{ loading: this.props.loading }}
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
                    message: ". Please input your Name and don't accept spaces"
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
                    whitespace: true,
                    required: true,
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

UpdateComment = Form.create({})(UpdateComment);

const mapStateToProps = state => {
  const { comments, loadingButton} = state.commentReducers
  return {
    comments: comments,
    loading: loadingButton
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateComment: (id, name, body, hidenModal) =>
      dispatch({
        type: UPDATE_COMMENT,
        payload: { id, name, body },
        callback: hidenModal
      })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateComment);
