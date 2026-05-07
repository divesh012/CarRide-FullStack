import React from 'react'
import { assets } from "../assets/assets"
import { useAppContext } from '../context/AppContext'
import { motion } from 'framer-motion'

const Hero = () => {

  const {
    pickupLocation,
    setPickupLocation,
    pickupDate,
    setPickupDate,
    returnDate,
    setReturnDate,
    navigate
  } = useAppContext()

  const handleSearch = (e) => {

    e.preventDefault()

    navigate(
      `/cars?pickupLocation=${pickupLocation}&pickupDate=${pickupDate}&returnDate=${returnDate}`
    )
  }

  return (

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className='h-screen flex flex-col items-center justify-center gap-10 px-6 bg-light text-center'
    >

      {/* Heading */}
      <motion.h1
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className='text-4xl md:text-6xl font-bold leading-tight text-gray-800'
      >
        Luxury Cars on Rent
      </motion.h1>

      {/* Search Form */}
      <motion.form
        initial={{ scale: 0.95, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        onSubmit={handleSearch}
        className='flex flex-col md:flex-row items-start md:items-center justify-between p-5 md:p-3 rounded-xl md:rounded-full w-full max-w-sm md:max-w-3xl bg-white shadow-lg gap-4'
      >

        <div className='flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10 md:ml-8 w-full'>

          {/* Pickup Location */}
          <div className='flex flex-col items-start gap-2 w-full md:w-auto'>

            <input
              type="text"
              required
              placeholder="Enter Pickup Location"
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
              className='w-full md:w-52 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition'
            />

            <p className='px-1 text-sm text-gray-500'>
              {
                pickupLocation
                  ? pickupLocation
                  : "Type any city name"
              }
            </p>

          </div>

          {/* Pickup Date */}
          <div className='flex flex-col items-start gap-2'>

            <label htmlFor='pickup-date'>
              Pickup Date
            </label>

            <input
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              type='date'
              id='pickup-date'
              min={new Date().toISOString().split("T")[0]}
              className='text-sm text-gray-500'
              required
            />

          </div>

          {/* Return Date */}
          <div className='flex flex-col items-start gap-2'>

            <label htmlFor='return-date'>
              Return Date
            </label>

            <input
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              type='date'
              id='return-date'
              min={pickupDate || new Date().toISOString().split("T")[0]}
              className='text-sm text-gray-500'
              required
            />

          </div>

        </div>

        {/* Search Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className='flex items-center justify-center gap-2 px-6 py-3 mt-3 md:mt-0 bg-blue-500 hover:bg-blue-600 text-white rounded-full cursor-pointer transition-all'
        >

          <motion.img
            src={assets.search_icon}
            alt="Search"
            className='w-5 h-5 object-contain filter brightness-0 invert'
          />

          Search

        </motion.button>

      </motion.form>

      {/* Car Image */}
      <motion.img
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        src={assets.main_car}
        alt="Car"
        className='w-full max-w-2xl h-auto object-contain drop-shadow-xl'
      />

    </motion.div>
  )
}

export default Hero