import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Home';
import Navbar from "./Navbar";
import Signup from "./Signup";
import EmailSignup from "./Email_signup";
function App() {
    return (
        <Router>
            <div ClassName="App">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/email-signup" element={<EmailSignup />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Signup from './Signup';
// import EmailSignup from './Email_signup';
//
// const App = () => {
//     return (
//         <Router>
//             <Routes>
//                 <Route path="/" element={<Signup />} />
//                 <Route path="/email-signup" element={<EmailSignup />} />
//             </Routes>
//         </Router>
//     );
// };
//
// export default App;
