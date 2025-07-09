import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaInstagram, FaCommentAlt } from 'react-icons/fa';

export default function Contacts() {
  return (
    <section className="bg-amber-800 text-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Visit Us or Get in Touch</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-amber-100">Our Bakery</h3>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <FaMapMarkerAlt className="text-amber-300 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">Location</h4>
                  <p className="text-amber-100">123 Sweet Street<br />Bakery District, CA 90210</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <FaPhone className="text-amber-300" />
                <div>
                  <h4 className="font-medium">Phone</h4>
                  <a href="tel:+1234567890" className="text-amber-100 hover:text-white transition-colors">
                    (123) 456-7890
                  </a>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <FaEnvelope className="text-amber-300" />
                <div>
                  <h4 className="font-medium">Email</h4>
                  <a href="mailto:hello@cozycakey.com" className="text-amber-100 hover:text-white transition-colors">
                    hello@cozycakey.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <FaClock className="text-amber-300 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">Hours</h4>
                  <p className="text-amber-100">
                    Monday - Friday: 8:00 AM - 7:00 PM<br />
                    Saturday: 9:00 AM - 8:00 PM<br />
                    Sunday: 10:00 AM - 5:00 PM
                  </p>
                </div>
              </div>
            </div>
            
            <div className="pt-4">
              <h4 className="font-medium mb-2">Follow Us</h4>
              <div className="flex space-x-4">
                <a 
                  href="https://www.instagram.com/cozy_cakey?igsh=NWU3dDF1emkxOWJi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-amber-800 hover:bg-amber-700 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                  aria-label="Instagram"
                >
                  <FaInstagram className="text-lg" />
                </a>
                <a 
                  href="https://pf.kakao.com/_HxcxgVn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-amber-800 hover:bg-amber-700 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                  aria-label="KakaoTalk"
                >
                  <FaCommentAlt className="text-lg" />
                </a>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h3 className="text-2xl font-semibold text-amber-900 mb-6">Send us a Message</h3>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-amber-900 font-medium mb-1">Name</label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 border border-amber-200 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="Your name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-amber-900 font-medium mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border border-amber-200 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="your.email@example.com"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-amber-900 font-medium mb-1">Message</label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-2 border border-amber-200 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="How can we help you?"
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full bg-amber-600 text-white py-3 px-6 rounded-md hover:bg-amber-700 transition-colors font-medium"
                style={{ color: 'white' }}
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
