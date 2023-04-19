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

const initialState = {
  posts: [],
  isLoading: false,
  error: "",
  singlePostData: {},
  successMessage: "",
  singlePostComment: [],
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POSTS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case FETCH_POSTS_SUCCESS: {
      let { payload } = action;
      let newPosts = payload;
      return {
        ...state,
        posts: [...state.posts,...newPosts],
        isLoading: false,
        error: "",
      };
    }
    case FETCH_POSTS_ERROR: {
      let { payload } = action;
      return {
        ...state,
        isLoading: false,
        posts: [],
        error: payload,
      };
    }
    case FETCH_SINGLE_POST_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case FETCH_SINGLE_POST_SUCCESS: {
      let { payload } = action;
      let newSinglePostComment = payload.comments;

      return {
        ...state,
        singlePostData: payload,
        singlePostComment: newSinglePostComment,
        isLoading: false,
        error: "",
      };
    }
    case FETCH_SINGLE_POST_ERROR: {
      let { payload } = action;
      return {
        ...state,
        isLoading: false,
        singlePostData: {},
        error: payload,
      };
    }
    case CREATE_POST_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case CREATE_POST_SUCCESS: {
      let { payload } = action;
      return {
        ...state,
        isLoading: false,
        error: "",
        successMessage: payload,
      };
    }
    case CREATE_POST_ERROR: {
      let { payload } = action;
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    }
    case RESET_MESSAGE: {
      return {
        ...state,
        successMessage: "",
      };
    }
    case RESET_ERROR: {
      return {
        ...state,
        error: "",
      };
    }
    case UPDATE_POST_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case UPDATE_POST_SUCCESS: {
      let { payload } = action;
      return {
        ...state,
        isLoading: false,
        error: "",
        successMessage: payload,
      };
    }
    case UPDATE_POST_ERROR: {
      let { payload } = action;
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    }
    case DELETE_POST: {
      let { posts } = state;
      let postAvailable = posts.filter(
        (post) => post._id !== action.payload.postId
      );
      let { payload } = action;
      return {
        ...state,
        isLoading: false,
        posts: postAvailable,
        successMessage: payload.successMessage,
        error: "",
      };
    }
    case DELETE_POST_ERROR: {
      let { payload } = action;
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    }
    case DELETE_COMMENT: {
      let { singlePostComment } = state;
      let commentAvailable = singlePostComment.filter(
        (comment) => comment._id !== action.payload
      );
      let updatedComment = commentAvailable;
      let { payload } = action;
      return {
        ...state,
        isLoading: false,
        singlePostComment: updatedComment,
        successMessage: payload,
        error: "",
      };
    }
    case CREATE_COMMENT_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case CREATE_COMMENT_SUCCESS: {
      const { message, newComment } = action.payload;
      const { singlePostComment } = state;
      let newComments = [...singlePostComment, newComment];
      return {
        ...state,
        isLoading: false,
        singlePostComment: newComments,
        error: "",
        successMessage: message,
      };
    }
    case CREATE_COMMENT_ERROR: {
      let { payload } = action;
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    }

    default: {
      return state;
    }
  }
};
export default postReducer;
