import { connect } from "react-redux";
import ViewPost from "./ViewPost";
import { mapStateToProps,mapDispatchToProps } from "./props";

export default connect(mapStateToProps,mapDispatchToProps)(ViewPost);