import React from "react";
// import Lottie from "lottie-react";
// import animationData from "./responsive.json";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function ResponsiveDemo() {
  const url =
    "https://lottie.host/babc559a-d146-4009-ab29-adc8601fb5ff/7Q8p3hfakr.lottie";
  return <DotLottieReact src={url} loop autoplay />;
}
