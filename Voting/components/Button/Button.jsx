import Style from './Button.module.css'

const Button = ({btnName, handleClick, classStyle}) => (
  <button className={Style.button} type={Button} onClick={handleClick}>
    {btnName}
  </button>
)
export default Button;
