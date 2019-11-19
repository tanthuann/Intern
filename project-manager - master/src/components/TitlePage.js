import React from "react";
// import { withRouter } from "react-router-dom";
// import { connect } from "react-redux";

import Title from "antd/lib/typography/Title";

const style = { textAlign: "center", marginTop: "20px" };

export default  (props) => {
  
    // if(props && props.name)
    // console.log(props.name[parseInt(props.match.params.projectId) - 1].name);
  return (
    <Title style={style}>
      {props.children}
      {/* {props.name ? props.name[parseInt(props.match.params.projectId) - 1] : null} */}
    </Title>
  );
};

// const mapStateToProps = (state, props) => {
//     let name;
//     if(state.projectReducers.data){
//         name = state.projectReducers.data[0].name
//     }else name = null;
//   const name = state.projectReducers.data;
//   console.log(name)
//   return {
//     name
//   };
// };

// export default connect(
//   mapStateToProps,
//   {}
// )(withRouter(TitlePage));
