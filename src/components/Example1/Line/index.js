import React, { useRef, useCallback, useEffect } from "react";
import * as d3 from "d3";

const Line = ({
  xScale,
  yScale,
  color,
  data,
  isSmooth,
  animation,
  ...props
}) => {
  const ref = useRef(null);
  // Define different types of animation that we can use
  const animateLeft = useCallback(() => {
    const totalLength = ref.current.getTotalLength();
    d3.select(ref.current)
      .attr("opacity", 1)
      .attr("stroke-dasharray", `${totalLength},${totalLength}`)
      .attr("stroke-dashoffset", totalLength)
      .transition()
      .duration(750)
      .ease(d3.easeLinear)
      .attr("stroke-dashoffset", 0);
  }, []);
  const animateFadeIn = useCallback(() => {
    d3.select(ref.current)
      .transition()
      .duration(750)
      .ease(d3.easeLinear)
      .attr("opacity", 1);
  }, []);
  const noneAnimation = useCallback(() => {
    d3.select(ref.current).attr("opacity", 1);
  }, []);

  useEffect(() => {
    switch (animation) {
      case "left":
        animateLeft();
        break;
      case "fadeIn":
        animateFadeIn();
        break;
      case "none":
      default:
        noneAnimation();
        break;
    }
  }, [animateLeft, animateFadeIn, noneAnimation, animation]);

  // Recalculate line length if scale has changed
  useEffect(() => {
    if (animation === "left") {
      const totalLength = ref.current.getTotalLength();
      d3.select(ref.current).attr(
        "stroke-dasharray",
        `${totalLength},${totalLength}`
      );
    }
  }, [xScale, yScale, animation]);

  const line = d3
    .line()
    .x((d) => xScale(d.date))
    .y((d) => yScale(d.value));

  const d = line(data);

  return (
    <path
      ref={ref}
      d={d?.match(/NaN|undefined/) ? "" : d}
      stroke={color}
      strokeWidth={3}
      fill="none"
      opacity={0}
      {...props}
    />
  );
};


export default Line;
