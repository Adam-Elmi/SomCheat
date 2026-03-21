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
Home Icon
------------------
*/
export function HomeIcon({
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
        fill={color}
        d="M17 16h-2v6h-3v-5H8v5H5v-6H3l7-6zM6 2l4 4H9v3H7V6H5v3H3V6H2zm12 1l5 5h-1v4h-3V9h-2v3h-1.66L14 10.87V8h-1z"
      ></path>
    </svg>
  );
}

/* 
------------------
Home Icon
------------------
*/
export function HomeIcon2({
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
        fill={color}
        d="m16 8.41l-4.5-4.5L4.41 11H6v8h3v-6h5v6h3v-8h1.59L17 9.41V6h-1zM2 12l9.5-9.5L15 6V5h3v4l3 3h-3v8h-5v-6h-3v6H5v-8z"
      ></path>
    </svg>
  );
}

/* 
------------------
Update Icon
------------------
*/
export function UpdateIcon({
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
        fill={color}
        d="M4.503 9.071L3.65 7.594a.75.75 0 0 0-1.3.75l1.75 3.03a.75.75 0 0 0 1.025.275L8.156 9.9a.75.75 0 1 0-.75-1.299l-1.438.83a7.25 7.25 0 1 1 1.517 7.554a.75.75 0 1 0-1.089 1.032A8.75 8.75 0 1 0 4.502 9.07"
      ></path>
      <path
        fill={color}
        d="M12.75 7.25a.75.75 0 0 1 .75.75v3.69l1.78 1.78a.75.75 0 1 1-1.06 1.06l-2-2A.75.75 0 0 1 12 12V8a.75.75 0 0 1 .75-.75"
      ></path>
    </svg>
  );
}

/* 
------------------
Dictionary Icon
------------------
*/
export function DictionaryIcon({
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
        fill={color}
        d="m6.006 11.823l1.123-3.06h.05l1.123 3.06zm6.494 5.496q1.216-.678 2.453-.98t2.547-.3q.9 0 1.618.111t1.267.296q.23.096.423-.029t.192-.394V7.008q0-.173-.096-.308q-.096-.134-.327-.23q-.825-.293-1.501-.4T17.5 5.961q-1.31 0-2.613.386q-1.304.387-2.387 1.16zm-6.78-4.763h2.869l.474 1.306q.05.111.137.17t.204.059q.198 0 .303-.158t.043-.35L7.739 8.24q-.05-.131-.169-.212t-.255-.081h-.323q-.136 0-.254.08t-.169.213l-2.011 5.361q-.062.173.043.33t.303.159q.117 0 .206-.06q.09-.058.14-.175zm6.28 5.9q-.235 0-.432-.059t-.376-.15q-1.09-.595-2.27-.902T6.5 17.04q-.78 0-1.534.13q-.753.131-1.466.42q-.544.217-1.022-.131T2 16.496V6.831q0-.371.195-.689t.547-.442q.887-.383 1.836-.56T6.5 4.962q1.47 0 2.866.423q1.398.423 2.634 1.23q1.237-.807 2.634-1.23t2.866-.423q.973 0 1.922.178q.95.177 1.836.56q.352.125.547.442t.195.689v9.665q0 .614-.516.943q-.517.328-1.1.111q-.693-.27-1.418-.39q-.724-.121-1.466-.121q-1.24 0-2.421.306t-2.271.901q-.18.093-.376.151q-.197.059-.432.059m1.885-9.508q0-.11.076-.222t.18-.168q.763-.346 1.613-.53q.85-.182 1.746-.182q.48 0 .91.053t.886.153q.129.03.224.135q.096.104.096.257q0 .252-.15.366t-.402.052q-.37-.075-.757-.103q-.388-.028-.807-.028q-.804 0-1.573.154q-.77.154-1.46.43q-.257.099-.42-.005t-.162-.362m0 5.423q0-.11.076-.231q.076-.123.18-.178q.725-.346 1.613-.52q.888-.173 1.746-.173q.48 0 .91.053t.886.153q.129.03.224.135q.096.104.096.257q0 .252-.15.366t-.402.052q-.37-.075-.757-.103q-.388-.028-.807-.028q-.784 0-1.544.16q-.76.161-1.45.457q-.258.118-.44-.003t-.181-.397m0-2.692q0-.11.076-.222t.18-.168q.763-.347 1.613-.53q.85-.182 1.746-.182q.48 0 .91.053t.886.153q.129.03.224.134q.096.104.096.258q0 .252-.15.366t-.402.051q-.37-.075-.757-.102q-.388-.028-.807-.028q-.804 0-1.573.154q-.77.153-1.46.43q-.257.098-.42-.005q-.162-.105-.162-.362"
      ></path>
    </svg>
  );
}

/* 
------------------
About Icon
------------------
*/
export function AboutIcon({
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
        fill={color}
        d="M13 9h-2V7h2m0 10h-2v-6h2m-1-9A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2"
      ></path>
    </svg>
  );
}
/*
  ------------------
  CLI Icon Component
  ------------------
*/
export function CliIcon({
  dimension = defaultProps.dimension,
  color = defaultProps.color,
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={dimension}
      height={dimension}
      viewBox="0 0 12 12"
    >
      <path
        fill={color}
        d="M11 1H1c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1h10c.55 0 1-.45 1-1V2c0-.55-.45-1-1-1M9.5 9h-4c-.28 0-.5-.22-.5-.5s.22-.5.5-.5h4c.28 0 .5.22.5.5s-.22.5-.5.5m-7 .12a.62.62 0 0 1-.44-.18a.63.63 0 0 1 0-.88L4.12 6L2.06 3.94a.63.63 0 0 1 0-.88c.24-.24.64-.24.88 0L5.09 5.2c.44.44.44 1.15 0 1.59L2.94 8.94a.62.62 0 0 1-.44.18"
      ></path>
    </svg>
  );
}