import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [showMissionModal, setShowMissionModal] = useState(false);
  return (
    <footer className="bg-eco-dark text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <div className="bg-white rounded-full p-2 mr-2">
                <div className="text-eco text-xl font-bold">🍃</div>
              </div>
              <h3 className="text-xl font-bold">Eco Meter</h3>
            </div>
            <p className="text-gray-300 mb-4">
              Track your green impact, one step at a time. Join us in creating a more sustainable future.
            </p>
            <div className="flex space-x-4">
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=srivastavaharsh0806@gmail.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors" title="Gmail">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 2v.01L12 13 4 6.01V6h16zM4 20v-9.99l7.99 7.99c.39.39 1.02.39 1.41 0L20 10.01V20H4z" />
                </svg>
              </a>
              <a href="https://x.com/harsh_7243" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors" title="X">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.53 2.47a.75.75 0 0 1 1.06 1.06L13.06 9l5.53 5.47a.75.75 0 1 1-1.06 1.06L12 10.06l-5.53 5.47a.75.75 0 1 1-1.06-1.06L10.94 9 5.41 3.53a.75.75 0 1 1 1.06-1.06L12 7.94l5.53-5.47z" />
                </svg>
              </a>
              <a href="https://www.instagram.com/harsh_7243/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors" title="Instagram">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm4.25 3.25a5.25 5.25 0 1 1 0 10.5 5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5zm5.25.75a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Features</h3>
            <ul className="space-y-2">
              <li><Link to="/calculator" className="text-gray-300 hover:text-white transition-colors">Carbon Calculator</Link></li>
              <li><Link to="/quick-actions" className="text-gray-300 hover:text-white transition-colors">Quick Actions</Link></li>
              <li><Link to="/eco-tips" className="text-gray-300 hover:text-white transition-colors">Eco Tips</Link></li>
              <li><Link to="/leaderboard" className="text-gray-300 hover:text-white transition-colors">Leaderboard</Link></li>
              <li><Link to="/rewards" className="text-gray-300 hover:text-white transition-colors">Rewards</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">About</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setShowMissionModal(true)}
                  className="text-gray-300 hover:text-white transition-colors underline focus:outline-none"
                  type="button"
                >
                  Our Mission
                </button>
              </li>
              <li><Link to="/#team-section" className="text-gray-300 hover:text-white transition-colors">Team</Link></li>
              <li><Link to="/partners" className="text-gray-300 hover:text-white transition-colors">Partners</Link></li>
              <li><Link to="/blog" className="text-gray-300 hover:text-white transition-colors">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="mr-2">📧</span>
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=srivastavaharsh0806@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white underline transition-colors"
                >
                  srivastavaharsh0806@gmail.com
                </a>
              </li>
              <li className="flex items-start">
                <span className="mr-2">🏢</span>
                <span className="text-gray-300">PES College of Engineering, Mandya, Karnataka</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">👤</span>
                <span className="text-gray-300">Harsh Kumar</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Eco Meter. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="/privacy" className="text-gray-400 text-sm hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-gray-400 text-sm hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/cookies" className="text-gray-400 text-sm hover:text-white transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
      {/* Mission Modal */}
      {showMissionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-white rounded-lg shadow-lg p-4 max-w-lg w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-eco-dark text-2xl font-bold focus:outline-none"
              onClick={() => setShowMissionModal(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <img
              src="/images/Our_mission.jpg"
              alt="Our Mission"
              className="w-full h-auto rounded-lg object-cover mb-2"
              style={{ maxHeight: '60vh' }}
            />
            <div className="text-center text-eco-dark font-semibold text-lg mt-2">Our Mission</div>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
