import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MainWebsite from './pages/Main-website';

function App() {
    return (
        <div className="App">
            <BrowserRouter basename="/jackDengBlog">
                <Switch>
                    <Route path="/" component={MainWebsite}></Route>
                </Switch>
                {/* <MainWebsite></MainWebsite> */}
            </BrowserRouter>
        </div>
    );
}

export default App;
