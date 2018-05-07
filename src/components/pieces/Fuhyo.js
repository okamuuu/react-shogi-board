import React from "react";
import Icon from 'react-icon-base';

const SvgComponent = props => {

  return (
  <Icon viewBox="0 0 512 512" size={"80%"} {...props} style={{paddingTop: "10%"}}>
    <path
      d="M470.522 491.888l-40.189-367.361L256.009 0 81.667 124.526 39.282 512h433.436l-2.196-20.112zM79.737 475.725l36.221-331.114L256.009 44.582l140.033 100.029 36.222 331.114H79.737z"
    />
    <text x="50%" y="75%" text-anchor="middle" font-size="256">歩</text>
  </Icon>
  )
};

export default SvgComponent;
