import './App.css';

const App = ({children}) => {
  return (
    <div className="content">
      <h1>Rsbuild with React</h1>
      <p>Start building amazing things with Rsbuild.</p>
      {children}
    </div>
  );
};

export default App;
