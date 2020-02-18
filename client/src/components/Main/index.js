// componets show trang chủ

import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import * as actions from "../../actions";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentpage: 1,
      totalpage: 1
    };
  }

  componentDidMount() {
    // lấy toàn bộ data
    this.loadTotalPage();

    // thực hiện phân trang
    this.props.getPostFetch(this.state.currentpage);
  }

  // lấy tổng số trang
  loadTotalPage = () => {
    axios
      .get("http://localhost:3001/api/post/pages")
      .then(res => {
        console.log(res.data);
        this.setState({ totalpage: res.data });
      })
      .catch(err => console.log(err));
  };

  onChange = page => {
    this.setState({
      currentpage: page
    });
    this.props.getPostFetch(page);
  };

  render() {
    if (!this.props.posts) {
      return <div>No post!</div>;
    }

    return (
      <Container>
        <Row>
          <Col xs="12" style={{ textAlign: "center" }}>
            <h1>POST LIST</h1>
          </Col>
          <Col xs="12" style={{ marginBottom: 20 }}>
            {localStorage.getItem("jwtToken") ? (
              <Link to="/create">
                <Button color="primary">Create</Button>
              </Link>
            ) : (
              <Link to="/create">
                <Button color="primary" disabled>
                  Create
                </Button>
              </Link>
            )}
          </Col>
          <Col xs="6">
            {this.props.posts.map((post, index) => (
              <div key={index} style={{ border: "1px solid black" }}>
                <Link to={`/post/${post._id}`}>{post.title}</Link>
                <br />
                <span>Title: {post.writer}</span>
                <br />
                <span>Content: {post.write_date}</span>
              </div>
            ))}
          </Col>
          <Col xs="12" style={{ textAlign: "center" }}>
            <Pagination
              onChange={this.onChange}
              current={this.state.currentpage}
              total={this.state.totalpage}
              pageSize={5}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    posts: state.fetch.posts
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getPostFetch: current => {
      dispatch(actions.getPostFetch(current));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
