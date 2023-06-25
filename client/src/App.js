import { Route, Routes } from "react-router-dom";
import Home from "./components/home";
import Signup from "./components/signup";
import Login from "./components/login";
import EmailVerify from "components/EmailVerification";
import Main from "components/Main";
import ForgotPassword from "components/ForgetPassword";
import PasswordReset from "components/password-reset";
import Educationdetails from "components/edudetails";
import Inscribe from "components/inscribe";
import Profile from "components/profile";
import UpdateProfile from "components/update_profile";
import Feeds from "components/feeds";
function App() {
	const user = localStorage.getItem("token");
	return (
		<Routes>
			{user && <Route path="/" exact element={<Main />} />}
			{<Route path="/signup/educationdetails" exact element={<Educationdetails />} />}
			<Route path="/" exact element={<Home/>} />
			<Route path="/signup" exact element={<Signup />} />
			{< Route path="/login" exact element={<Login />} />}
			<Route path="/forgot-password" element={<ForgotPassword />} />
			<Route path="/users/:id/verify/:token" element={< EmailVerify/>} />
			<Route path="/password-reset/:id/:token" element={<PasswordReset />} />
			{user && <Route path="/inscribe" exact element={<Inscribe />} />}
			<Route path="/inscribe" exact element={<Signup />} />
			{user && <Route path="/profile/:userId" element={<Profile />} />}
			{user && <Route path="/updateProfile/:userId" element={<UpdateProfile />} />}
			<Route path="/profile/:userId" exact element={<Signup />} />
			<Route path="/feeds" element={<Feeds />} />
			<Route path="/feeds" exact element={<Signup />} />


		</Routes>
	);
}

export default App;
