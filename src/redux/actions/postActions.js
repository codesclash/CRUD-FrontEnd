import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_ERROR,
  FETCH_SINGLE_POST_REQUEST,
  FETCH_SINGLE_POST_SUCCESS,
  FETCH_SINGLE_POST_ERROR,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  CREATE_POST_ERROR,
  RESET_MESSAGE,
  RESET_ERROR,
  UPDATE_POST_REQUEST,
  UPDATE_POST_SUCCESS,
  UPDATE_POST_ERROR,
  DELETE_POST,
  DELETE_POST_ERROR,
  DELETE_COMMENT,
  CREATE_COMMENT_REQUEST,
  CREATE_COMMENT_SUCCESS,
  CREATE_COMMENT_ERROR,
} from "../action_type/actionTypes";

import axios from "axios";

//FOR HOME PAGE
export const fetchPostRequest = () => {
  return {
    type: FETCH_POSTS_REQUEST,
  };
};
export const fetchPostSuccess = (posts) => {
  return {
    type: FETCH_POSTS_SUCCESS,
    payload: posts,
  };
};
export const fetchPostFailure = (error) => {
  return {
    type: FETCH_POSTS_ERROR,
    payload: error,
  };
};

export const fetchPosts = (page) => {
  return (dispatch) => {
    dispatch(fetchPostRequest());
    axios
      .get(`http://localhost:4000/posts/home/${page}`)
      .then((response) => {
        console.log(response.data)
        const posts = response.data;
        dispatch(fetchPostSuccess(posts));
      })
      .catch((error) => {
        const errorMsg = error.error;
        dispatch(fetchPostFailure(errorMsg));
        toast.error(errorMsg, {
          position: toast.POSITION.BOTTOM_RIGHT,
          theme: "dark",
        });
      });
  };
};

//FOR SINGLE POST WITH COMMENTS
export const fetchSinglePostRequest = () => {
  return {
    type: FETCH_SINGLE_POST_REQUEST,
  };
};
export const fetchSinglePostSuccess = (post) => {
  return {
    type: FETCH_SINGLE_POST_SUCCESS,
    payload: post,
  };
};
export const fetchSinglePostError = (error) => {
  return {
    type: FETCH_SINGLE_POST_ERROR,
    payload: error,
  };
};

export const fetchSinglePost = (id) => {
  return (dispatch) => {
    dispatch(fetchSinglePostRequest());
    axios
      .get(`http://localhost:4000/posts/${id}`)
      .then(async (response) => {
        const post = await response.data;
        console.log(post)
        await dispatch(fetchSinglePostSuccess(post));
      })
      .catch((error) => {
        const errorMsg = error.error;
        dispatch(fetchSinglePostError(errorMsg));
        toast.error(errorMsg, {
          position: toast.POSITION.BOTTOM_RIGHT,
          theme: "dark",
        });
      });
  };
};

//FOR CREATING POST
export const createPostRequest = () => {
  return {
    type: CREATE_POST_REQUEST,
  };
};
export const createPostSuccess = (successMessage) => {
  return {
    type: CREATE_POST_SUCCESS,
    payload: successMessage,
  };
};
export const createPostError = (error) => {
  return {
    type: CREATE_POST_ERROR,
    payload: error,
  };
};

export const createPost = (post) => {
  return (dispatch) => {
    dispatch(createPostRequest());
    axios
      .post("http://localhost:4000/posts/add", post)
      .then((response) => {
        const successMessage = response.data;
        dispatch(createPostSuccess(successMessage));
      })
      .catch((error) => {
        const errorMsg = error.error;
        dispatch(createPostError(errorMsg));
      });
  };
};

//RESET MESSAGE AND ERROR
export const resetMessage = () => {
  return {
    type: RESET_MESSAGE,
  };
};
export const resetError = () => {
  return {
    type: RESET_ERROR,
  };
};

//UPDATE POST
export const updatePostRequest = () => {
  return {
    type: UPDATE_POST_REQUEST,
  };
};
export const updatePostSuccess = (successMessage) => {
  return {
    type: UPDATE_POST_SUCCESS,
    payload: successMessage,
  };
};
export const updatePostError = (error) => {
  return {
    type: UPDATE_POST_ERROR,
    payload: error,
  };
};

export const updatePost = (id, post) => {
  return (dispatch) => {
    dispatch(updatePostRequest());
    axios
      .post(`http://localhost:4000/posts/update/${id}`, post)
      .then((response) => {
        const successMessage = response.data;
        dispatch(updatePostSuccess(successMessage));
      })
      .then(() => dispatch(fetchSinglePost(id)))
      .catch((error) => {
        const errorMsg = error.error;
        dispatch(updatePostError(errorMsg));
      });
  };
};

//DELETE POST
export const deletePost = (id) => {
  return (dispatch) => {
    axios
      .delete(`http://localhost:4000/posts/delete/${id}`)
      .then((response) => {
        const { postId, message } = response.data;
        dispatch({
          type: DELETE_POST,
          payload: { postId, message },
        });
        toast.success(message, {
          position: toast.POSITION.BOTTOM_RIGHT,
          theme: "dark",
        });
      })
      .catch((error) => {
        const errorMsg = error.error;
        dispatch({
          type: DELETE_POST_ERROR,
          payload: errorMsg,
        });
        toast.error(errorMsg, {
          position: toast.POSITION.BOTTOM_RIGHT,
          theme: "dark",
        });
      });
  };
};

//COMMENTS
export const deleteComment = (postId, commentId) => {
  return (dispatch) => {
    axios
      .delete(
        `http://localhost:4000/posts/${postId}/deletecomment/${commentId}`
      )
      .then((response) => {
        dispatch({
          type: DELETE_COMMENT,
          payload: response.data.commentId,
        });
        const successMessage = response.data.message;
        toast.success(successMessage, {
          position: toast.POSITION.BOTTOM_RIGHT,
          theme: "dark",
        });
      })
      .catch((error) => {
        const errorMsg = error.error;
        dispatch({
          type: DELETE_POST_ERROR,
          payload: errorMsg,
        });
        toast.error(errorMsg, {
          position: toast.POSITION.BOTTOM_RIGHT,
          theme: "dark",
        });
      });
  };
};

export const createCommentRequest = () => {
  return {
    type: CREATE_COMMENT_REQUEST,
  };
};
export const createCommentSuccess = (response) => {
  return {
    type: CREATE_COMMENT_SUCCESS,
    payload: response,
  };
};
export const createCommentError = (error) => {
  return {
    type: CREATE_COMMENT_ERROR,
    payload: error,
  };
};

export const createComment = (postId, comment) => {
  return (dispatch) => {
    dispatch(createCommentRequest());
    axios
      .post(`http://localhost:4000/posts/${postId}/addcomment`, comment)
      .then((response) => {
        dispatch(createCommentSuccess(response.data));
        setTimeout(() => {
          toast.success(response.data.message, {
            position: toast.POSITION.BOTTOM_RIGHT,
            theme: "dark",
          });
        }, 700);
      })
      .catch((error) => {
        const errorMsg = error.error;
        toast.error(`${errorMsg}`, {
          position: toast.POSITION.BOTTOM_RIGHT,
          theme: "dark",
        });
        dispatch(createCommentError(errorMsg));
      });
  };
};
