'use client'

import { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="absolute inset-x-0 top-0 z-50 bg-gray-900 bg-opacity-80 shadow-lg backdrop-blur-md">
        <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
          <div className="flex lg:flex-1">
            <a href="#" className="text-2xl font-bold text-green-400 transition hover:text-green-300">
              VimMaster
            </a>
          </div>

          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="rounded-md p-2.5 text-gray-300 hover:bg-gray-800"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="size-6" />
            </button>
          </div>

          <div className="hidden lg:flex lg:gap-x-6">
            <a href="/games" className="text-sm font-semibold text-gray-300 hover:text-green-400 transition">Games</a>
            <a href="#" className="text-sm font-semibold text-gray-300 hover:text-green-400 transition">Leaderboard</a>
            <a href="#" className="text-sm font-semibold text-gray-300 hover:text-green-400 transition">Docs</a>
          </div>

          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <a href="#" className="text-sm font-semibold text-green-400 hover:text-green-300 transition">
              Log in →
            </a>
          </div>
        </nav>
      </header>


      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-50 bg-gray-900 bg-opacity-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full bg-white px-6 py-6 sm:max-w-sm">
          <div className="flex items-center justify-between">
            <a href="#" className="text-xl font-bold text-indigo-600">VimMaster</a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-md p-2.5 text-gray-700 hover:bg-gray-200"
            >
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6">
            <a href="#" className="block py-2 text-lg font-semibold text-gray-900 hover:bg-gray-100 rounded-lg px-3">Log in</a>
          </div>
        </DialogPanel>
      </Dialog>

      <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black min-h-screen flex flex-col items-center justify-center text-white">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/3 w-[300px] h-[300px] bg-green-400 opacity-20 blur-3xl rounded-full"></div>
          <div className="absolute bottom-1/4 right-1/3 w-[300px] h-[300px] bg-indigo-400 opacity-20 blur-3xl rounded-full"></div>
        </div>

        <h1 className="text-5xl font-bold text-green-400 z-10">Master Vim with Games</h1>
        <p className="mt-4 text-lg text-gray-300 z-10">Play interactive games and improve your Vim skills effortlessly.</p>
        <a href="#" className="mt-6 px-6 py-3 bg-green-600 text-white rounded-md shadow-lg z-10 hover:bg-green-500">Get Started</a>
      </div>

    </div>
  )
}
