import {BaseButton, GoogleSignInButton, InvertButton } from './button.styles'

// default
// Inverted
// google sign in

export const BUTTON_TYPE_CLASSES= {
    base: 'base',
    google:'google-sign-in',
    inverted: 'inverted'
}

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) => ({
  [BUTTON_TYPE_CLASSES.base]: BaseButton,
  [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
  [BUTTON_TYPE_CLASSES.inverted]: InvertButton,
}[buttonType]);

const Button = ({ children, buttonType, ...otherProps }) => {
  const CustomButton = getButton(buttonType);
  return (
    <div>
      <CustomButton  {...otherProps}>
          {children }
      </CustomButton>
      {/* <button 
        className= {`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`}
        {...otherProps}
      >
          { children }
      </button> */}
    </div>
  )
}

export default Button
