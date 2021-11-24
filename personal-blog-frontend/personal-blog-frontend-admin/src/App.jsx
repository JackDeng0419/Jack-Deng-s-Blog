import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'antd/dist/antd.css';
import Login from './pages/Login';
import Admin from './pages/Admin';
import './App.scss';

function App() {
    return (
        <div className="App">
            <BrowserRouter basename="/admin">
                <Switch>
                    <Route path="/login" component={Login}></Route>
                    <Route path="/" component={Admin}></Route>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
