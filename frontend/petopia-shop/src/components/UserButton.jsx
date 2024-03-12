import { Menu, Transition } from "@headlessui/react";
import { getUser, signOutUser } from "../functions/user-management";
import { FaUserCircle } from "react-icons/fa";

import { NavLink } from "react-router-dom";

const UserButton = () => {
  const user = getUser();

  return (
    <div className="flex items-center justify-center text-white">
      <div className="relative inline-block text-left rounded-full">
        <Menu>
          {({ open }) => (
            <>
              <Menu.Button>
                <div className="flex items-center">
                  <FaUserCircle className="h-[30px] w-[30px] mr-2" />
                </div>
              </Menu.Button>

              <Transition
                show={open}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items
                  static
                  className="absolute right-0 w-56 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 shadow-lg outline-none rounded-md"
                >
                  <div className="px-4 py-3">
                    <p className="text-sm leading-5 text-black">Signed in as</p>
                    <p className="text-sm font-medium leading-5 text-gray-900 truncate">
                      test@gmail.com
                    </p>
                  </div>

                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="/"
                          className={`${
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700"
                          } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left`}
                        >
                          Your Profile
                        </a>
                      )}
                    </Menu.Item>
                  </div>

                  {user.role == "admin" && (
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <NavLink
                            to="/upload"
                            className={`${
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700"
                            } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left`}
                          >
                            Upload Product
                          </NavLink>
                        )}
                      </Menu.Item>
                    </div>
                  )}

                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#sign-out"
                          className={`${
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700"
                          } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left`}
                          onClick={() => {
                            signOutUser();
                          }}
                        >
                          Sign-out
                        </a>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </>
          )}
        </Menu>
      </div>
    </div>
  );
};

export default UserButton;
