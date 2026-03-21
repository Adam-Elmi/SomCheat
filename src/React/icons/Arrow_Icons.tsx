/* 
  ------------------
  Default values
  ------------------
*/
const defaultProps = {
    dimension: 24,
    color: "currentColor",
};

/*
------------------
Right Arrow Icon Component
------------------
*/
export function RightArrow({
  dimension = defaultProps.dimension,
  color = defaultProps.color,
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={dimension}
      height={dimension}
      viewBox="0 0 24 24"
    >
      <path
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m10 17l5-5l-5-5"
        strokeWidth={1}
      ></path>
    </svg>
  );
}

export function DownArrow({
  dimension = defaultProps.dimension,
  color = defaultProps.color,
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={dimension}
      height={dimension}
      viewBox="0 0 24 24"
    >
      <path
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m7 10l5 5l5-5"
        strokeWidth={1}
      ></path>
    </svg>
  );
}


export function ArrowRightLongIcon({
    dimension = defaultProps.dimension,
    color = defaultProps.color,
  }) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={dimension}
        height={dimension}
        viewBox="0 0 24 24"
      >
        <path
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="m18 9l3 3l-3 3M3 12h18"
        ></path>
      </svg>
    );
  }