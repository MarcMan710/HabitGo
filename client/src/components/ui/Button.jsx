// components/ui/Button.jsx
const Button = ({ children, onClick, className = '', ...rest }) => (
  <button
    onClick={onClick}
    className={`bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md shadow ${className}`}
    {...rest}
  >
    {children}
  </button>
);

export default Button;
