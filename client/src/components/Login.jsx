import React from 'react'
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const Login = () => {

  const {
    setShowLogin,
    axios,
    setToken,
    navigate
  } = useAppContext();

  const [state, setState] = React.useState("login");

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  // ================= SUBMIT =================
  const onSubmitHandler = async (event) => {

    event.preventDefault();

    try {

      let payload;

      // REGISTER
      if (state === "register") {

        payload = {
          name,
          email,
          password
        };

      } else {

        // LOGIN
        payload = {
          email,
          password
        };
      }

      const { data } = await axios.post(
        `/api/user/${state}`,
        payload
      );

      if (data.success) {

        // Save token
        localStorage.setItem("token", data.token);

        // Update context
        setToken(data.token);

        // Close popup
        setShowLogin(false);

        // Navigate
        navigate('/');

        toast.success(
          state === "login"
            ? "Login successful"
            : "Account created successfully"
        );

      } else {

        toast.error(data.message);
      }

    } catch (error) {

      console.log(error);

      toast.error(
        error.response?.data?.message || error.message
      );
    }
  };

  return (
    <div
      onClick={() => setShowLogin(false)}
      className='fixed inset-0 z-[99] flex items-center justify-center text-sm text-gray-600 bg-black/10 backdrop-blur-[2px]'
    >

      <form
        onSubmit={onSubmitHandler}
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col gap-4 w-80 sm:w-[352px] p-8 py-10 rounded-xl shadow-xl border border-gray-200 bg-white"
      >

        {/* Heading */}
        <p className="text-2xl font-semibold text-center">

          <span className="text-blue-600">
            User
          </span>{" "}

          <span className="text-black">
            {state === "login"
              ? "Login"
              : "Sign Up"}
          </span>

        </p>

        {/* Name */}
        {state === "register" && (

          <div className="w-full">

            <p>Name</p>

            <input
              type="text"
              required
              value={name}
              placeholder="type here"
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-200 rounded w-full p-2 mt-1 outline-none focus:ring-1 focus:ring-blue-500"
            />

          </div>
        )}

        {/* Email */}
        <div className="w-full">

          <p>Email</p>

          <input
            type="email"
            required
            value={email}
            placeholder="type here"
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-none focus:ring-1 focus:ring-blue-500"
          />

        </div>

        {/* Password */}
        <div className="w-full">

          <p>Password</p>

          <input
            type="password"
            required
            value={password}
            placeholder="type here"
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-none focus:ring-1 focus:ring-blue-500"
          />

        </div>

        {/* Toggle */}
        {state === "register" ? (

          <p className="text-sm">

            Already have account?{" "}

            <span
              onClick={() => setState("login")}
              className="text-blue-600 cursor-pointer"
            >
              click
            </span>

          </p>

        ) : (

          <p className="text-sm">

            Create an account?{" "}

            <span
              onClick={() => setState("register")}
              className="text-blue-600 cursor-pointer"
            >
              click
            </span>

          </p>
        )}

        {/* Button */}
        <button className="bg-blue-600 hover:bg-blue-700 transition-all text-white w-full py-2.5 rounded-md cursor-pointer font-medium">

          {state === "register"
            ? "Create Account"
            : "Login"}

        </button>

      </form>
    </div>
  )
}

export default Login