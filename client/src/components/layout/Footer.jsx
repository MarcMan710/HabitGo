import React from "react";

const Footer = () => {
  return (
    <footer className="bg-background text-secondary border-t border-border py-6 mt-12">
      <div className="container mx-auto text-center px-4">
        <p>
          &copy; {new Date().getFullYear()} HabitGo. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
