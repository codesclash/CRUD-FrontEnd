import {fetchSinglePost,deleteComment} from '../../redux/actions/postActions'

const mapStateToProps = (state) => {
    return {
      isLoading : state.isLoading,
      error : state.error,
      singlepostdata: state.singlepostdata,
      singlePostComment: state.singlePostComment
    }
  }
  const mapDispatchToProps = (dispatch) => {
    return {
        fetchSinglePost : (id) => dispatch(fetchSinglePost(id)),
        deleteComment : (postId,commentId) => dispatch(deleteComment(postId,commentId))
    }
  }
  
export {mapStateToProps,mapDispatchToProps}