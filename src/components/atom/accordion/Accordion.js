import React, { useRef, useState } from "react";
import { HiOutlineChevronRight } from "react-icons/hi";

const Accordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);
  const [contentHeight, setContentHeight] = useState(0);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
    setContentHeight(contentRef.current.scrollHeight);
  };
  return (
    <div className="bg-slate-50 shadow rounded">
      <button
        className="flex items-center justify-between w-full p-3 rounded-lg text-gray-900 focus:outline-none"
        onClick={toggleAccordion}
      >
        <h2 className="font-medium">{title}</h2>
        <HiOutlineChevronRight
          className={`h-5 w-5 transition-transform duration-300 transform ${
            isOpen ? "rotate-90" : "rotate-0"
          }`}
        />
      </button>
      <div
        className="px-4 leading-relaxed text-gray-700 overflow-hidden"
        style={{
          maxHeight: isOpen ? `${contentHeight}px` : "0",
          transition: "max-height 300ms",
        }}
        ref={contentRef}
      >
        {children}
      </div>
    </div>
  );
};

export default Accordion;
