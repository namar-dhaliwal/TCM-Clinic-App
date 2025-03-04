import React from "react";

const Contact = () => {
  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8">
      {/* Main content container */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left column: contact info */}
        <div className="flex flex-col space-y-6 w-full md:w-1/3">
          <button className="bg-gray-200 text-xl py-4 rounded-md shadow hover:bg-gray-300">
            andyinkiwi@gmail.com
          </button>
          <button className="bg-gray-200 text-xl py-4 rounded-md shadow hover:bg-gray-300">
            0220789514
          </button>
          <button className="bg-gray-200 text-xl py-4 rounded-md shadow hover:bg-gray-300">
            Hours <br/><br/>
            Monday to Saturday | 9 - 5:30pm <br/>
            Sunday | 8:15 - 1pm
          </button>
        </div>

        {/* Right column: maps embed */}
        <div className="w-full md:w-2/3 h-[650px]">
          <iframe
            title="Clinic Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d401.4344680398125!2d174.66362260197297!3d-36.39769625715703!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6d0cdc2409d4927d%3A0xa0d82e4e9caee1c1!2s64%20Queen%20Street%2C%20Warkworth%200910!5e0!3m2!1sen!2snz!4v1741050936149!5m2!1sen!2snz"
            className="w-full h-full border-0"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
