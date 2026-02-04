import {omit} from 'lodash';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string | void;
}

// todo: icons? idk
// im getting ready for future styling
export default function Button(props: ButtonProps) {
  // adding 'gbtn' to whatever was already in className, 
  // assuming there was something there
  let className = 'gbtn' + (props.className? (' ' + props.className) : ''); 
  // remove 'text' prop and add updated className
  let newProps = {...omit(props, 'text'), className };
  if (!newProps.type) newProps.type = 'button';
  return (
    <button {...newProps}>
      {props.children || props.text || ''}
    </button>
  );
}