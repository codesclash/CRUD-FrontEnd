import { deleteComment } from "../../redux/actions/postActions";

const mapStateToProps = (state) => {
  return {
    successMessage: state.successMessage,
    error: state.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteComment: (postId, commentId) =>
      dispatch(deleteComment(postId, commentId)),
  };
};

export { mapStateToProps, mapDispatchToProps };