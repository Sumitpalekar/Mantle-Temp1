import { FiTwitter, FiGithub, FiMail, FiGlobe } from 'react-icons/fi'

export default function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-mantle-dark">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-primary-600">
                <FiGlobe className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-bold text-white">GreenXchange</span>
            </div>
            <p className="mt-4 text-sm text-gray-400">
              Decentralized exchange for environmental credits on Mantle L2.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">Product</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#features" className="text-sm text-gray-400 hover:text-white">Features</a></li>
              <li><a href="#how-it-works" className="text-sm text-gray-400 hover:text-white">How It Works</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-white">Documentation</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">Resources</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-sm text-gray-400 hover:text-white">Whitepaper</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-white">Blog</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-white">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">Connect</h3>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <FiTwitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FiGithub className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FiMail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-800 pt-8 text-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} GreenXchange. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}