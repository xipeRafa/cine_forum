
import './App.css';

import {ButtonComponent, TestComponent} from 'a-react-ui'

function App() {
  return (
    <div>
      <h2>Hello we are components exported from NPM</h2>
      <h2>imported in a project with C-R-A</h2>
      <TestComponent theme="secondary" />
     <TestComponent />
     <br/>
     <h2>MATERIAL UI BUTTONS</h2>
    <ButtonComponent label='button' primary={true}/>
    <ButtonComponent label='secondary' />
    <ButtonComponent label='large' size='large'/>
    <ButtonComponent label='small' size='small'/>

    </div>
  );
}

export default App;
