export const Rectangle = ({fill, height = 110, width = 110}: {fill: string; height: number; width: number}) => (
  <svg width={width} height={height} viewBox="0 0 110 110" fill="none">
    <rect width="110" height="110" rx="6" className={fill}/>
  </svg>
)