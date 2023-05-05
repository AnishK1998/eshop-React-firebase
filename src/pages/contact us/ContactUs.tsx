import {useRef} from "react";
import { Button } from "@mui/material";
import emailjs from '@emailjs/browser';
import { toast } from "react-toastify";

const ContactUs = () => {
  const forms: any = useRef();

  const handleFormSubmission = (e: any) => {
    e.preventDefault();

    emailjs.sendForm('service_bh52hdm', 'template_3i4l62b', forms.current, '20xc09KY1tmdy6sL6')
      .then((result) => {
        toast.success("Message sent through mail")
      }, (error) => {
        toast.error(error.text)
      });
      e.target.reset();
  };

  return (
    <div className="w-3/4 mx-auto" style={{ minHeight: "35.8rem" }}>
      <div className="bg-slate-50">
        <p className="text-2xl font-bold px-3 pt-3 text-slate-700">
          Contact Us
        </p>
        <div className="md:flex py-4">
          <div className="md:w-1/2 w-full bg-white mx-3 px-3 py-4 drop-shadow-lg border-2 border-slate-300 rounded-md">
            <form ref={forms} onSubmit={handleFormSubmission}>
              <div className="mb-4">
                <label className="font-semibold text-slate-700">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="user_name"
                  required
                  placeholder="Full Name"
                  className="w-full border border-gray-400 py-1 px-3 rounded-md "
                />
              </div>

              <div className="mb-4">
                <label className="font-semibold text-slate-700">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="user_email"
                  required
                  placeholder="Your Active Email"
                  className="w-full border border-gray-400 py-1 px-3 rounded-md "
                />
              </div>

              <div className="mb-4">
                <label className="font-semibold text-slate-700">Subject:</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  placeholder="Subject"
                  className="w-full border border-gray-400 py-1 px-3 rounded-md "
                />
              </div>

              <div className="mb-2">
                <label className="font-semibold text-slate-700">
                  Your Message:
                </label>
                <textarea
                  rows={8}
                  cols={40}
                  required
                  placeholder="Write your message here"
                  name="message"
                  id="message"
                  className="w-full border border-gray-400 py-1 px-3 rounded-md"
                />
              </div>

              <Button variant="contained" color="primary" type="submit">
                Send Message
              </Button>
            </form>
          </div>
          <div className="md:w-1/2 w-full bg-blue-400 text-white px-4 py-3 mx-3 md:my-0 my-3">
            <p className="text-3xl my-2 ">Our Contact Information</p>
            <p className="text-lg">Fill the form or contact us via other channels listed below</p>
            <p className="text-lg mt-8"><i className="fa-solid fa-phone pr-3"></i>  +91 12345 12345</p>
            <p className="text-lg mt-2 "><i className="fa-solid fa-envelope pr-3"></i> supportEshop@anish.co.in</p>
            <p className="text-lg mt-2 "><i className="fa-solid fa-location-dot pr-3"></i> Anish Kumar, India</p>
            <p className="text-lg mt-2 "><i className="fa-brands fa-facebook pr-3"></i> @Anish!998</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
