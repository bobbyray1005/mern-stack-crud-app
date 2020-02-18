import {
  CREATE_POST_SUCCESS,
  EDIT_POST_SUCCESS,
  DELETE_POST_SUCCESS,
  GET_POST_SUCCESS,
  GET_POST_DETAIL_SUCCESS
} from "../constants/ActionTypes";

// old state
const initialState = { posts: [], post: [] };

export default function fetch(state = initialState, action) {
  switch (action.type) {
    // get data
    case GET_POST_SUCCESS:
      return { posts: action.posts };
    // create new post
    case CREATE_POST_SUCCESS:
      return {
        ...state,
        ...action.post
      };
    // edit post
    case EDIT_POST_SUCCESS:
      return {
        ...state,
        ...action.post
      };
    // delete post
    case DELETE_POST_SUCCESS:
      return state;
    // get post by id on click
    case GET_POST_DETAIL_SUCCESS:
      return { post: action.post };
    default:
      return state;
  }
}
