import { useState, useRef,createRef } from "react";
import { createPopper } from "@popperjs/core";
import { useDispatch } from "react-redux";

import { logout } from "../../store/actions/auth";

export const Dropdown = ({ color }) => {
    // dropdown props
    const [dropdownPopoverShow, setDropdownPopoverShow] = useState(false);
    const btnDropdownRef = createRef();
    const popoverDropdownRef = createRef();
    const openDropdownPopover = () => {
      createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
        placement: "bottom-start"
      });
      setDropdownPopoverShow(true);
    };
    const closeDropdownPopover = () => {
      setDropdownPopoverShow(false);
    };
    // bg colors
    let bgColor;
    const dispatch = useDispatch()
    const logoutUser = (e) => {
        e.preventDefault()
        dispatch(logout())
    }

    return (
      <>
        <div className="flex flex-wrap">
          <div className="w-full sm:w-6/12 md:w-4/12 px-4">
            <div className="relative inline-flex align-middle w-full">
              <button
                className={
                  "text-white font-bold px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 bg-black "
                }
                type="button"
                ref={btnDropdownRef}
                onClick={() => {
                  dropdownPopoverShow
                    ? closeDropdownPopover()
                    : openDropdownPopover()
                }}
              >
                {color === "white" ? "Options" : color + " Dropdown"}
              </button>
              <div
                ref={popoverDropdownRef}
                className={
                  (dropdownPopoverShow ? "block " : "hidden ") +
                  (color === "white" ? "bg-white " : bgColor + " ") +
                  "text-base z-50 float-left py-2 list-none text-left rounded shadow-lg mt-1"
                }
                style={{ minWidth: "12rem" }}
              >
                <a
                  href="#pablo"
                  className={
                    "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent " +
                    (color === "white" ? " text-slate-700" : "text-white")
                  }
                  onClick={() => logoutUser()}
                >
                  Se deconnecter
                </a>
                {/* <a
                  href="#pablo"
                  className={
                    "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent " +
                    (color === "white" ? " text-slate-700" : "text-white")
                  }
                  onClick={e => e.preventDefault()}
                >
                  Another action
                </a> */}
                {/* <a
                  href="#pablo"
                  className={
                    "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent " +
                    (color === "white" ? " text-slate-700" : "text-white")
                  }
                  onClick={e => e.preventDefault()}
                >
                  Something else here
                </a> */}
                <div className="h-0 my-2 border border-solid border-t-0 border-slate-800 opacity-25" />
                <a
                  href="#pablo"
                  className={
                    "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent " +
                    (color === "white" ? " text-slate-700" : "text-white")
                  }
                  onClick={e => e.preventDefault()}
                >
                  Seprated link
                </a>
              </div>
            </div>
          </div>
        </div>
      </>
    );
};
