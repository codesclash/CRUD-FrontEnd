import CommentCard from "./CommentCard";
import { mapStateToProps, mapDispatchToProps } from "./props";
import { connect } from "react-redux";
export default connect(mapStateToProps, mapDispatchToProps)(CommentCard);
