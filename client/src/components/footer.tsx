import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="text-xl">🐝</div>
              <span className="font-heading font-bold text-lg">WhatBeesDoAllDay</span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              WhatBeesDoAllDay is a personal project sharing hive life through livestreams, bee counting, and curiosity. It’s not commercial — just something worth watching.
            </p>
          </div>
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/">
                  <button className="hover:text-honey-400 transition-colors">Home</button>
                </Link>
              </li>
              <li>
                <Link href="/livestream">
                  <button className="hover:text-honey-400 transition-colors">Live Stream</button>
                </Link>
              </li>
              <li>
                <Link href="/bee-counter">
                  <button className="hover:text-honey-400 transition-colors">BeeBot</button>
                </Link>
              </li>
              <li>
                <Link href="/statistics">
                  <button className="hover:text-honey-400 transition-colors">Statistics</button>
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Shop</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/shop">
                  <button className="hover:text-honey-400 transition-colors">All Products</button>
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-honey-400 transition-colors">Honey</a>
              </li>
              <li>
                <a href="#" className="hover:text-honey-400 transition-colors">Seeds</a>
              </li>
              <li>
                <a href="#" className="hover:text-honey-400 transition-colors">Merch</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Contact</h3>
            <div className="space-y-2 text-gray-400">
              <p>Got questions or want to reach out?</p>
              <p>Best way is through YouTube or socials</p>
              <div className="flex space-x-4 mt-4">
                <a href="#" className="text-gray-400 hover:text-honey-400 transition-colors">
                  <span className="sr-only">Twitter</span>
                  🐦
                </a>
                <a href="#" className="text-gray-400 hover:text-honey-400 transition-colors">
                  <span className="sr-only">Instagram</span>
                  📷
                </a>
                <a href="#" className="text-gray-400 hover:text-honey-400 transition-colors">
                  <span className="sr-only">YouTube</span>
                  📺
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 WhatBeesDoAllDay. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
