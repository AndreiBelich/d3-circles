import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

const GridLine = ({
  type,
  scale,
  ticks,
  size,
  transform,
  disableAnimation,
  ...props
}) => {
  const ref = useRef(null);
  useEffect(() => {
    const axisGenerator = type === "vertical" ? d3.axisBottom : d3.axisLeft;
    console.log("Ticks: ", ticks);
    const axis = axisGenerator(scale).ticks(ticks).tickSize(-size);

    const gridGroup = d3.select(ref.current);
    if (disableAnimation) {
      gridGroup.call(axis);
    } else {
      gridGroup.transition().duration(750).ease(d3.easeLinear).call(axis);
    }
    gridGroup.select(".domain").remove();
    gridGroup.selectAll("text").remove();
    gridGroup.selectAll("line").attr("stroke", "rgba(255, 10, 10, 0.9)");
  }, [scale, ticks, size, disableAnimation]);

  return <g ref={ref} transform={transform} {...props} />;
};


export default GridLine;
