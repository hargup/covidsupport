import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/auth";

export default function Navbar() {
  // const [isSignedIn, setIsSignedIn] = useState(false);
  // // // Listen to the Firebase Auth state and set the local state.
  // useEffect(() => {
  //   const unregisterAuthObserver = firebase
  //     .auth()
  //     .onAuthStateChanged((user) => {
  //       setIsSignedIn(!!user);
  //     });
  //   return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  // }, []);

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-100 my-first-step hidden lg:block">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* <!-- Mobile menu button--> */}
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-900 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={() => {
                setMenuOpen(!menuOpen);
              }}
            >
              <span className="sr-only">Open main menu</span>
              {/* <!-- Icon when menu is closed. -->
          <!--
            Heroicon name: outline/menu

            Menu open: "hidden", Menu closed: "block"
          --> */}
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/* <!-- Icon when menu is open. -->
          <!--
            Heroicon name: outline/x

            Menu open: "block", Menu closed: "hidden"
          --> */}
              <svg
                className="hidden h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="hidden flex-1 sm:flex items-center justify-center sm:items-stretch sm:justify-center">
            <div className="flex-shrink-0 flex items-center">
              <a
                href="https://covidsupport.neera.ai/"
                className="text-gray-600 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-lg font-medium"
              >
                Neera
              </a>
            </div>
            <div>
              <div className="flex-shrink-0 flex text-gray-600 items-center px-3 py-2 rounded-md text-lg font-medium">
                Live Covid19 Resources
              </div>
            </div>

            {/* <div className="flex-shrink-0 flex items-center">
              <a
                href="/about"
                className="text-gray-600 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-lg font-medium"
              >
                About
              </a>
            </div> */}

            <div className="hidden flex-grow sm:block sm:ml-6">
              <div className="flex space-x-4 justify-start h-full">
                {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-600 hover:bg-gray-700 hover:text-white" --> */}
              </div>
            </div>
            {/* <div className="flex-shrink-0 flex items-center">
              <a
                href="/profiles"
                className=" manage-profiles text-gray-600 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-lg font-medium"
              >
                Manage Search Profiles
              </a>
            </div> */}
            {/* <div class="absolute inset-y-0 right-0 flex items-center">
              <img
                class="rounded-full block py-3 px-3"
                width="90"
                height="90"
                src="https://upload.wikimedia.org/wikipedia/en/5/5f/Original_Doge_meme.jpg"
              />
            </div> */}
            {/* <a
                class="block p-3 hidden md:block"
                href="https://forms.gle/f98ChAABpukZQ1fi9"
              >
                Suggest Sources
              </a> */}
            {/* {isSignedIn && (
                <a
                  href="#"
                  onClick={() => firebase.auth().signOut()}
                  className="text-gray-600 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Sign out
                </a>
              )}
              {!isSignedIn && (
                <a
                  href="/signin"
                  className="text-gray-600 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Sign In
                </a>
              )} */}
          </div>
        </div>
      </div>

      {/* <!-- Mobile menu, show/hide based on menu state. --> */}
      <div className="sm:hidden" id="mobile-menu">
        {menuOpen && (
          <div className="px-2 pt-2 pb-3 space-y-1">
            {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-600 hover:bg-gray-700 hover:text-white" --> */}
            <a
              href="/"
              className="text-gray-600 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Home
            </a>
            {/* <a
              href="/about"
              className="text-gray-600 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              About
            </a>
            <a
              href="/profiles"
              className="manage-profiles text-gray-600 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Manage Profiles
            </a> */}
          </div>
        )}
      </div>
    </nav>
  );
}
