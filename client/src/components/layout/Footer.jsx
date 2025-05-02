import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-4 mt-8">
      <div className="container mx-auto text-center">
        <p className="text-gray-500">
          &copy; {new Date().getFullYear()} HabitGo. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
