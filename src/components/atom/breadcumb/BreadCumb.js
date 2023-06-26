import React from "react";
import { HiOutlineChevronRight } from "react-icons/hi";
import { Link } from "react-router-dom";

const BreadCumb = ({ links }) => {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center gap-1 text-sm text-gray-600">
        {links.map((link, index) => (
          <div key={index} className="flex items-center gap-1">
            {index !== 0 && (
              <li className="rtl:rotate-180">
                <HiOutlineChevronRight className="h-4 w-4" />
              </li>
            )}
            <li>
              {link.to ? (
                <Link
                  to={link.to}
                  className="block transition hover:text-gray-700"
                >
                  {link.bold ? (
                    <strong className="font-bold">{link.label}</strong>
                  ) : (
                    <span>{link.label}</span>
                  )}
                </Link>
              ) : (
                <span className="block">{link.label}</span>
              )}
            </li>
          </div>
        ))}
      </ol>
    </nav>
  );
};

export default BreadCumb;
