import React, { Component } from "react";
import { connect } from "react-redux";
import { Comment, Icon, Tooltip, Avatar, Button, Popconfirm, message  } from "antd";
import moment from "moment";

import CONTANTS from "../contants/contants";

import UpdateComment from "./UpdateComment";

const { DELETE_COMMENT } = CONTANTS.ACTIONS;

class OneComment extends Component {
  state = {
    likes: 0,
    dislikes: 0,
    action: null
  };

  onConfirm = (id) => {
    const trigger = () => {
      message.success('Deleted !!!');
    }
    this.props.deleteComment(id, trigger);
  }

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
      <span key="comment-basic-reply-to">Reply to</span>
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
          />
          <div style={{ display: "flex", marginLeft: "auto" }}>
            <Popconfirm
              title="Are you sure？"
              icon={<Icon type="question-circle-o" style={{ color: "red" }} />}
              onConfirm={() => this.onConfirm(comment.id)}
            >
              <Button
              // onClick={() => this.props.deleteComment(comment.id)}
              style={{ backgroundColor: "#ff7875", border: "none" }}
            >
              Delete
            </Button>
            </Popconfirm>
            <UpdateComment id={comment.id} />
          </div>
        </div>
        <hr style={{ border: "0.5px solid #ddd" }} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => {
  return {
    deleteComment: (id, trigger) => dispatch({ type: DELETE_COMMENT, payload: id, callback: trigger })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OneComment);
