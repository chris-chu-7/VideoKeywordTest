import React from 'react';

const Form: React.FC<JSX.IntrinsicElements['form']> = ({
  // eslint-disable-next-line react/prop-types
  children,
  // eslint-disable-next-line react/prop-types
  onSubmit,
  ...props
}) => (
  <form
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
    onSubmit={(event) => {
      event.preventDefault();
      if (onSubmit !== undefined) {
        onSubmit(event);
      }
    }}
  >
    {children}
  </form>
);

export default Form;
