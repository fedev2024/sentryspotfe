// "use client";
// import { Link, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import LoginWithSocial from "./LoginWithSocial";
// import ReCAPTCHA from "react-google-recaptcha";
// import { userLogin } from "../../../../store/slices/auth/actions.js";
// import { useDispatch, useSelector } from "react-redux";
// import toast from "react-hot-toast";
// import ActionLoader from "@/components/loader/ActionLoader";
// import { FcGoogle } from "react-icons/fc";
// import logo from '../../../../../public/company_logo.png'


// const FormContent = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { loading, userInfo, userToken, error, success, message } = useSelector(
//     (state) => state.auth
//   );

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   // modal-backdrop.show
//   const submitHandler = async (e) => {
//     if (email) {
//       e.preventDefault();
//       document.body.classList.remove('modal-open');
//       const backdrop = document.querySelector('.modal-backdrop');
//       if (backdrop) {
//         backdrop.remove();
//       }
//       navigate(`/login-code`)
//     }
//   };
//   // const submitHandler = async (e) => {
//   //   if (email && password) {
//   //     e.preventDefault();
//   //     dispatch(userLogin({ email: email, password: password }));
//   //   }
//   // };

//   function onChange(value) {
//     console.log("Captcha value:", value);
//   }

  
//   return (
//     <div className="form-inner">
//        <div className="flex justify-center mb-6">
//             <img src={logo} className="w-40 h-10" alt="Logo" />
//           </div>
//       <h3>Login to Sentry Spot</h3>


//       {/* <!--Login Form--> */}
//       <button
//             // onClick={handleGoogleSignin}
//             type="button"
//             className="w-full flex items-center justify-center bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md mt-4 shadow-sm hover:bg-gray-100 focus:outline-none"
//           >
//             <FcGoogle className="h-6 w-6 mr-2" />
//             Continue with Google
//           </button>

//           <div className="p-4 flex justify-center items-center">
//             <p> OR</p>
//           </div> 
//       <form onSubmit={submitHandler}>
//         <div className="form-group">
//           <label>Email</label>
//           <input
//             type="email"
//             name="Email"
//             placeholder="Enter your email ID"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <div className="mb-4 flex items-center space-x-2">
//               <input
//                 type="checkbox"
//                 id="terms"
//                 name="terms"
//                 // checked={isChecked}
//                 // onChange={(e) => setIsChecked(e.target.checked)}
//                 className="w-4 h-4 text-yellow-500 border-gray-300 rounded focus:ring-yellow-500"
//               />
//               <label htmlFor="terms" className="text-gray-700 text-sm">
//                 I agree to the{" "}
//                 <Link href="/TermsandConditions" className="text-blue-900 underline">
//                   Terms & Conditions
//                 </Link>
//               </label>
//             </div>
//         {/* name */}
//         {/* <div className="form-group">
//           <label>Password</label>
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div> */}
//         {/* password */}
//         {/* <div className="form-group">
//           <div className="field-outer">
//             <div className="input-group checkboxes square">
//               <input type="checkbox" name="remember-me" id="remember" />
//               <label htmlFor="remember" className="remember">
//                 <span className="custom-checkbox"></span> Remember me
//               </label>
//             </div>
//             <a href="#" className="pwd">
//               Forgot password?
//             </a>
//           </div>
//         </div> */}
        
//         {/* <div className="form-group">
//           <div className="field-outer">
//             <div className="input-group checkboxes square">
//               <input type="checkbox" name="service-me" id="service" required />
//               <label htmlFor="service" className="service">
//                 <span className="custom-checkbox">
//                   By using our Services, you agree to our terms of use
//                 </span>
//               </label>
//             </div>
//           </div>
//         </div>
//         <ReCAPTCHA
//         className="w-full flex justify-center"
//           sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
//           onChange={onChange}
//         /> */}

//         <div className="form-group mt-2">
//           <button
//             type="submit"
//             name="log-in"
//             className="theme-btn btn-style-one bg-blue-900"
//             onClick={submitHandler}
//             disabled={loading}
//           >
//             {loading ? <ActionLoader /> : "Send OTP"}
//           </button>
//         </div>
//         {/* login */}
//       </form>
//       {/* End form */}

//       {/* <div className="bottom-box">
//         <div className="text">
//           Don&apos;t have an account?{" "}
//           <Link
//             to="#"
//             className="call-modal signup"
//             data-bs-toggle="modal"
//             data-bs-target="#registerModal"
//           >
//             Signup
//           </Link>
//         </div>

//         <div className="divider">
//           <span>or</span>
//         </div>
//   <LoginWithSocial />
     
//       </div> */}
     
//     </div>
//   );
// };

// export default FormContent;
"use client";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import LoginWithSocial from "./LoginWithSocial";
import ReCAPTCHA from "react-google-recaptcha";
import { userLogin } from "../../../../store/slices/auth/actions.js";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import ActionLoader from "@/components/loader/ActionLoader";

const FormContent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, userInfo, userToken, error, success, message } = useSelector(
    (state) => state.auth
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    if (email && password) {
      e.preventDefault();
      dispatch(userLogin({ email: email, password: password }));
    }
  };

  function onChange(value) {
    console.log("Captcha value:", value);
  }

  
  return (
    <div className="form-inner">
      <h3>Login to Sentry Spot</h3>

      {/* <!--Login Form--> */}
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="Email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        {/* name */}
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {/* password */}
        <div className="form-group">
          <div className="field-outer">
            <div className="input-group checkboxes square">
              <input type="checkbox" name="remember-me" id="remember" />
              <label htmlFor="remember" className="remember">
                <span className="custom-checkbox"></span> Remember me
              </label>
            </div>
            <a href="#" className="pwd">
              Forgot password?
            </a>
          </div>
        </div>
        
        {/* <div className="form-group">
          <div className="field-outer">
            <div className="input-group checkboxes square">
              <input type="checkbox" name="service-me" id="service" required />
              <label htmlFor="service" className="service">
                <span className="custom-checkbox">
                  By using our Services, you agree to our terms of use
                </span>
              </label>
            </div>
          </div>
        </div>
        <ReCAPTCHA
        className="w-full flex justify-center"
          sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
          onChange={onChange}
        /> */}

        <div className="form-group mt-2">
          <button
            type="submit"
            name="log-in"
            className="theme-btn btn-style-one bg-blue-900"
            onClick={submitHandler}
            disabled={loading}
          >
            {loading ? <ActionLoader /> : "Log In"}
          </button>
        </div>
        {/* login */}
      </form>
      {/* End form */}

      <div className="bottom-box">
        <div className="text">
          Don&apos;t have an account?{" "}
          <Link
            to="#"
            className="call-modal signup"
            data-bs-toggle="modal"
            data-bs-target="#registerModal"
          >
            Signup
          </Link>
        </div>

        {/* <div className="divider">
          <span>or</span>
        </div>
  //  <LoginWithSocial /> */}
     
      </div>
     
    </div>
  );
};

export default FormContent;