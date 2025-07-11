import { FaMapMarkerAlt, FaEnvelope, FaClock, FaInstagram, FaCommentAlt } from 'react-icons/fa';
import { BUSINESS_CONFIG } from '@/config/business';

export default function Contacts() {
  return (
    <section className="bg-tertiary text-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Visit {BUSINESS_CONFIG.name} or Get in Touch</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-primary">Our Bakery</h3>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <FaMapMarkerAlt className="text-primary mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">Location</h4>
                  <p className="text-primary">{BUSINESS_CONFIG.contact.address.city}, {BUSINESS_CONFIG.contact.address.state}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <FaEnvelope className="text-primary" />
                <div>
                  <h4 className="font-medium">Email</h4>
                  <a href={`mailto:${BUSINESS_CONFIG.contact.email}`} className="text-primary hover:text-white transition-colors">
                    {BUSINESS_CONFIG.contact.email}
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <FaClock className="text-primary mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">Hours</h4>
                  <p className="text-primary">
                    Tuesday - Saturday: 10am - 8pm<br /><br />
                    Closed Sundays & Mondays
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
                  className="bg-primary hover:bg-secondary w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                  aria-label="Instagram"
                >
                  <FaInstagram className="text-lg" />
                </a>
                <a 
                  href="https://pf.kakao.com/_HxcxgVn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary hover:bg-secondary w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                  aria-label="KakaoTalk"
                >
                  <FaCommentAlt className="text-lg" />
                </a>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h3 className="text-2xl font-semibold text-tertiary mb-6">Send us a Message</h3>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-tertiary font-medium mb-1">Name</label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 border border-primary rounded-md focus:ring-2 focus:ring-secondary focus:border-transparent"
                  placeholder="Your name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-tertiary font-medium mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border border-primary rounded-md focus:ring-2 focus:ring-secondary focus:border-transparent"
                  placeholder="your.email@example.com"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-tertiary font-medium mb-1">Message</label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-2 border border-primary rounded-md focus:ring-2 focus:ring-secondary focus:border-transparent"
                  placeholder="How can we help you?"
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full bg-secondary text-white py-3 px-6 rounded-md hover:bg-tertiary transition-colors font-medium"
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
