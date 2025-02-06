export const Circle = ({fill, height = 120, width = 120}: {fill: string, height?: number, width?: number}) => (
  <svg width={width.toString()} height={height.toString()} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="60" cy="60" r="60" className={fill}/>
  </svg>
)