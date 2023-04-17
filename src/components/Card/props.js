import { deletePost,resetError,resetMessage } from "../../redux/actions/postActions";


const mapStateToProps = (state) => {
    return {
      successMessage:state.successMessage,
      error: state.error,
    };
  };
  
  const mapDispatchToProps = (dispatch) =>
   { 
    return {
      deletePost: (id) => dispatch(deletePost(id)),
      resetError: () => dispatch(resetError()),
      resetMsg: () => dispatch(resetMessage()),
    };
  };
  
export {mapStateToProps,mapDispatchToProps}