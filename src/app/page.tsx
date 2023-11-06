'use client'

import React, { useEffect, useState } from 'react'
import { Toaster, toast } from 'sonner'

const Home = () => {
   const [image, setImage] = useState('')
   const [search, setSearch] = useState('')
   const [loader, setLoader] = useState(false)
   const [mode, setMode] = useState('light')

   useEffect(() => {
      toast.success('Welcome to Dall-E 3 Image Generator... 🥳')
   }, [])

   const handleSearch = async () => {
      try {
         setLoader(true)
         const response = await fetch(`/api/generate`, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               prompt: `${search}`,
            }),
         })

         const data = await response.json()

         if (data.code === 200) {
            toast.success(`${data.msg}`)
            setImage(data.url)
            setSearch('')
         } else {
            toast.error(`${data.msg}`)
         }

         setLoader(false)
      } catch (e) {
         console.error(e)

         toast.error('Server Error x_x. Try again later. 🙃')
      }
   }

   const changeTheme = () => {
      if (mode === 'light') {
         setMode('dark')
         document.documentElement.classList.add('dark')
      } else {
         setMode('light')
         document.documentElement.classList.remove('dark')
      }
   }

   return (
      <>
         <Toaster position="top-right" expand={true} richColors />

         <div className="flex min-h-screen flex-col items-center justify-center bg-slate-300 dark:bg-neutral-900">
            <button
               className="fixed bottom-4 right-4 rounded-full bg-slate-900 p-3 text-white shadow-lg transition duration-300 ease-in-out hover:bg-slate-600 dark:bg-slate-50 dark:text-black dark:hover:bg-slate-300"
               onClick={changeTheme}
            >
               {mode === 'light' ? (
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     fill="none"
                     viewBox="0 0 24 24"
                     strokeWidth="1.5"
                     stroke="currentColor"
                     className="h-6 w-6"
                  >
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                     />
                  </svg>
               ) : (
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     fill="none"
                     viewBox="0 0 24 24"
                     strokeWidth="1.5"
                     stroke="currentColor"
                     className="h-6 w-6"
                  >
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                     />
                  </svg>
               )}
            </button>

            <div className="mx-2 my-2 rounded-lg bg-white px-6 py-8 shadow-xl ring-1 ring-slate-900/5 dark:bg-slate-800 md:w-5/12">
               <div className="flex justify-between">
                  <h1 className="inline-flex items-center text-center text-xl font-black uppercase dark:text-white sm:text-2xl md:text-3xl">
                     GENERATE IMAGE
                  </h1>

                  <div
                     className="cursor-pointer rounded-lg border-slate-900 bg-zinc-700 px-2 py-2 text-slate-50 hover:bg-zinc-600 dark:bg-slate-900 dark:text-slate-50 dark:hover:bg-slate-700"
                     onClick={() => setImage('')}
                  >
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-6 w-6"
                     >
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                        />
                     </svg>
                  </div>
               </div>

               <div className=" mt-3 inline-grid w-full items-center justify-center gap-2 sm:inline-flex">
                  <label className="relative">
                     <span className="sr-only">Search</span>
                     <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                        <svg
                           className="h-5 w-5 fill-slate-300"
                           viewBox="0 0 20 20"
                        >
                           {/* SVG de icon de lupa */}
                           <path
                              fillRule="evenodd"
                              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                              clipRule="evenodd"
                           ></path>
                        </svg>
                     </span>
                     <input
                        className="block w-full rounded-md border border-slate-300 bg-white py-2 pl-9 pr-3 text-sm shadow-sm placeholder:italic placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                        placeholder="Search for anything..."
                        type="text"
                        name="search"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                     />
                  </label>

                  <button
                     className={`inline-flex items-center justify-center rounded-xl bg-rose-600 px-5 py-2 text-center text-xs font-semibold uppercase leading-6 text-white hover:bg-rose-500`}
                     onClick={handleSearch}
                     disabled={loader}
                  >
                     {loader ? (
                        <>
                           <svg
                              className="-ml-1 mr-3 h-5 w-5 animate-spin text-white motion-reduce:hidden"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                           >
                              <circle
                                 className="opacity-25"
                                 cx="12"
                                 cy="12"
                                 r="10"
                                 stroke="currentColor"
                                 strokeWidth="4"
                              ></circle>
                              <path
                                 className="opacity-75"
                                 fill="currentColor"
                                 d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                           </svg>
                           Processing...
                        </>
                     ) : (
                        <>Generate 🤖</>
                     )}
                  </button>
               </div>

               {image && (
                  <div className="mt-5 w-full rounded-xl border-red-300 text-center shadow-sm shadow-rose-950 dark:shadow-slate-400">
                     <img
                        className="h-96 w-full rounded-xl object-cover"
                        src={image}
                        alt="img"
                     />
                  </div>
               )}
            </div>
         </div>
      </>
   )
}

export default Home
