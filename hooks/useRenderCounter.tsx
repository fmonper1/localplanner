import * as React from "react";

export function useRenderCounter() {
  const ref = React.useRef();
  React.useEffect(() => {
    if (ref.current)
      // @ts-ignore
      ref.current.textContent = Number(ref.current.textContent || "0") + 1;
  });
  return (
    <span
      style={{
        backgroundColor: "#ccc",
        borderRadius: 4,
        padding: "2px 4px",
        fontSize: "0.8rem",
        margin: "0 6px",
        display: "inline-block",
      }}
      // @ts-ignore
      ref={ref}
    />
  );
}
