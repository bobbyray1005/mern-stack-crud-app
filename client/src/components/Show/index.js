// componets show bài viết get theo id khi click để xem chi tiết bài viết đó
import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../actions";

class Show extends Component {
  componentDidMount() {
    this.props.getPostDetailFetch(this.props.match.params.id);
  }

  handleDelete = () => {
    this.props.deletePost(this.props.match.params.id);
  };

  render() {
    if (!this.props.post) {
      return <div>No post!</div>;
    }

    return (
      <Container>
        <Row>
          <Col xs={12} style={{ textAlign: "center" }}>
            <h1>POST DETAIL</h1>
          </Col>
          <Col xs="12">
            <h1>{this.props.post.title}</h1>
          </Col>
          <Col xs="12">
            <h5>Title: {this.props.post.writer}</h5>
          </Col>
          <Col xs="12">
            <h5>Content: {this.props.post.write_date}</h5>
          </Col>
          <Col xs="12">
            <p dangerouslySetInnerHTML={{ __html: this.props.post.content }} />
          </Col>
          <Link to={`/edit/${this.props.match.params.id}`}>
            <Button color="primary">EDIT</Button>
          </Link>
          <Button
            color="danger"
            onClick={this.handleDelete}
            style={{ marginLeft: 20 }}
          >
            DELETE
          </Button>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    post: state.fetch.post
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getPostDetailFetch: postId => {
      dispatch(actions.getPostDetailFetch(postId));
    },
    deletePost: postId => {
      dispatch(actions.deletePost(postId));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Show);
