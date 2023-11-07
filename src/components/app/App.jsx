import {lazy} from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

import AppHeader from "../appHeader/AppHeader.jsx";

const Page404 = lazy(() => import('../pages/404'));
const MainPage = lazy(() => import('../pages/MainPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
const SingleComicPage = lazy(() => import('../pages/SingleComicPage'));

const App = () => {
  return (
    <Router>
      <div className="app">
        <AppHeader/>
        <main>
          <Routes>
            <Route path='/' element={<MainPage/>}/>
            <Route path='/comics' element={<ComicsPage/>}/>
            <Route path='/comics/:comicId' element={<SingleComicPage/>}/>
            <Route path="*" element={<Page404 />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App;