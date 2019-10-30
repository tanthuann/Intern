import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Comment,
  Icon,
  Tooltip,
  Avatar,
  Button,
  Dropdown,
  Menu,
  Modal,
  notification
} from "antd";
import moment from "moment";

import CONTANTS from "../contants/contants";

import UpdateComment from "./UpdateComment";
import AddReply from "./AddReply";

const { DELETE_COMMENT } = CONTANTS.ACTIONS;

class OneComment extends Component {
  state = {
    likes: 0,
    dislikes: 0,
    action: null
  };

  showDeleteConfirm = id => {
    const { deleteComment } = this.props;
    Modal.confirm({
      centered: true,
      title: "Are you sure delete this comment?",
      content: "",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        const triggerNotify = () => {
          notification["warning"]({
            message: `You deleted comment have id: ${id}`,
            description: "",
            //Set time (number)
            duration: 3
          });
        };
        deleteComment(id, triggerNotify);
      },
      onCancel() {
        console.log("Cancel");
      }
    });
  };

  like = () => {
    this.setState({
      likes: 1,
      dislikes: 0,
      action: "liked"
    });
  };

  dislike = () => {
    this.setState({
      likes: 0,
      dislikes: 1,
      action: "disliked"
    });
  };

  render() {
    const { comment } = this.props;
    const { likes, dislikes, action } = this.state;
    const menu = (
      <Menu>
        <Menu.Item key="1">
          <Button
            onClick={() => this.showDeleteConfirm(comment.id)}
            type="danger"
          >
            Delete
          </Button>
        </Menu.Item>
        <Menu.Item key="2">
          <UpdateComment id={comment.id} />
        </Menu.Item>
      </Menu>
    );
    const actions = [
      <span key="comment-basic-like">
        <Tooltip title="Like">
          <Icon
            type="like"
            theme={action === "liked" ? "filled" : "outlined"}
            onClick={this.like}
          />
        </Tooltip>
        <span style={{ paddingLeft: 8, cursor: "auto" }}>{likes}</span>
      </span>,
      <span key=' key="comment-basic-dislike"'>
        <Tooltip title="Dislike">
          <Icon
            type="dislike"
            theme={action === "disliked" ? "filled" : "outlined"}
            onClick={this.dislike}
          />
        </Tooltip>
        <span style={{ paddingLeft: 8, cursor: "auto" }}>{dislikes}</span>
      </span>,
      //<span style={{display: this.props.reply ? "none": ""}} key="comment-basic-reply-to"><AddReply/></span>
      !this.props.reply && <AddReply comment={comment} />
    ];
    return (
      <div>
        <div style={{ display: "flex" }}>
          <Comment
            actions={actions}
            author={
              <a>
                {comment.id} . {comment.name}
              </a>
            }
            avatar={
              <Avatar
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                alt="User"
              />
            }
            content={<p>{comment.body}</p>}
            datetime={
              <Tooltip title={moment().format("YYYY-MM-DD HH:mm:ss")}>
                <span>{moment().fromNow()}</span>
              </Tooltip>
            }
          >
            {this.props.children}
          </Comment>
          <div
            style={{
              display: this.props.reply ? "none" : "flex",
              marginLeft: "auto"
            }}
          >
            {!this.props.reply && (
              <Dropdown overlay={menu}>
                <a className="ant-dropdown-link" style={{ height: "20px" }}>
                  <Icon style={{ fontSize: "20px" }} type="more" />
                </a>
              </Dropdown>
            )}
          </div>
        </div>

        {!this.props.reply && (
          <hr
            style={{
              display: this.props.reply ? "none" : "",
              border: "0.5px solid #ddd"
            }}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => {
  return {
    deleteComment: (id, triggerNotify) =>
      dispatch({ type: DELETE_COMMENT, payload: id, callback: triggerNotify })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OneComment);
