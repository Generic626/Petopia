const MainThemeContainer = (props) => {
  return (
    <div className={`w-screen h-screen bg-primary ${props.className}`}>
      {props.children}
    </div>
  );
};

export default MainThemeContainer;
