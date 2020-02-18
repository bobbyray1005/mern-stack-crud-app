import axios from "axios";
import history from "../history";
import * as types from "../constants/ActionTypes";
// API Server Link
const API_URL = "http://localhost:3001/api";

export const preserveToken = token => {
  return {
    type: types.PRESERVE_TOKEN,
    token
  };
};

export const login = (username, password) => {
  return dispatch => {
    axios
      .post(`${API_URL}/auth/login`, { username, password })
      .then(res => {
        dispatch(loginSuccess(res.data, username));
        // const token = res.data.token;
        // //console.log(token);
        // axios.defaults.headers.common["Authorization"] = token;
        dispatch(preserveToken(res.data.token));
        history.push("/");
      })
      .catch(err => {
        if (err.response.status === 401) {
          dispatch(loginFailure(err));
        }
      });
  };
};

export const loginSuccess = (data, username) => {
  return {
    type: types.LOGIN_SUCCESS,
    data,
    username
  };
};

export const loginFailure = data => {
  return {
    type: types.LOGIN_FAILURE,
    data
  };
};
// get list post và page để phân trang

export const getPostFetch = current => {
  return dispatch => {
    axios
      .get(`${API_URL}/post/pages/` + current)
      .then(res => {
        // get data
        dispatch(getPostSuccess(res.data));
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const getPostSuccess = posts => {
  return {
    type: types.GET_POST_SUCCESS,
    posts
  };
};
// tạo mới bài viết
export const createPost = (title, writer, content) => {
  return dispatch => {
    axios
      .post(`${API_URL}/post`, { title, writer, content })
      .then(res => {
        dispatch(createPostSuccess(res.data));
        // khi tạo bài thành công sẽ chuyển về trang chủ
        history.push("/");
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const createPostSuccess = post => {
  return {
    type: types.CREATE_POST_SUCCESS,
    post
  };
};

// chỉnh sửa bài viết

export const editPost = (title, writer, content, postId) => {
  return dispatch => {
    axios
      .put(`${API_URL}/post/` + postId, { title, writer, content })
      .then(res => {
        dispatch(editPostSuccess(res.data));
        history.push("/post/" + postId);
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const editPostSuccess = post => {
  return {
    type: types.EDIT_POST_SUCCESS,
    post
  };
};
// xóa bài viết
export const deletePost = postId => {
  return dispatch => {
    axios
      .delete(`${API_URL}/post/` + postId)
      .then(res => {
        dispatch(deletePostSuccess(res.data));
        history.push("/");
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const deletePostSuccess = post => {
  return {
    type: types.DELETE_POST_SUCCESS,
    post
  };
};
// get bài viết theo id
export const getPostDetailFetch = postId => {
  return dispatch => {
    axios
      .get(`${API_URL}/post/` + postId)
      .then(res => {
        dispatch(getPostDetailSuccess(res.data));
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const getPostDetailSuccess = post => {
  return {
    type: types.GET_POST_DETAIL_SUCCESS,
    post
  };
};
