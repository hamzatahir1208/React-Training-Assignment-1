const Loading = ({ 
  isLoading = true, 
  type = 'border', 
  variant = 'primary', 
  size = '', 
  className = '', 
  text = 'Loading...',
  fullScreen = false
}) => {
  if (!isLoading) return null;

  const sizeClass = size ? `spinner-${type}-${size}` : '';
  const spinnerClass = `spinner-${type} text-${variant} ${sizeClass} ${className}`;

  const spinnerContent = (
    <div className="d-flex flex-column justify-content-center align-items-center p-3">
      <div className={spinnerClass} role="status">
        <span className="visually-hidden">{text}</span>
      </div>
      {text && <div className={`mt-2 small text-${variant}`}>{text}</div>}
    </div>
  );

  if (fullScreen) {
    return (
      <div 
        className="d-flex justify-content-center align-items-center position-fixed top-0 start-0 w-100 h-100 bg-white bg-opacity-75" 
        style={{ zIndex: 1050 }}
      >
        {spinnerContent}
      </div>
    );
  }

  return spinnerContent;
};

export default Loading;

