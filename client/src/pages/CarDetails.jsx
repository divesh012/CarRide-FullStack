import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import Loader from '../components/Loader'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'

const CarDetails = () => {
  const { id } = useParams()

const {
  cars,
  axios,
  pickupDate,
  setPickupDate,
  returnDate,
  setReturnDate,
  user,
  setShowLogin
} = useAppContext()

  const navigate = useNavigate()
  const [car, setCar] = useState(null)
  const currency = import.meta.env.VITE_CURRENCY

  const handleSubmit = async (e) => {

  e.preventDefault()

  // USER NOT LOGGED IN
  if (!user) {

    toast.error("Please login first")

    setShowLogin(true)

    return
  }

  // DATE CHECK
  if (!pickupDate || !returnDate) {

    return toast.error("Please select dates")
  }

  try {

    const { data } = await axios.post(
      '/api/bookings/create',
      {
        carId: id,
        pickupDate,
        returnDate
      }
    )

    if (data.success) {

      toast.success(data.message)

      navigate('/my-bookings')

    } else {

      toast.error(data.message)
    }

  } catch (error) {

    toast.error(
      error.response?.data?.message || error.message
    )
  }
}

  useEffect(() => {
    setCar(cars.find((c) => c._id === id))
  }, [cars, id])

  // 🔥 ANIMATION VARIANTS
  const container = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.1, duration: 0.6 }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  return car ? (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className='px-6 md:px-16 lg:px-24 xl:px-32 mt-16'
    >

      {/* BACK BUTTON */}
      <motion.button
        whileHover={{ x: -5 }}
        onClick={() => navigate(-1)}
        className='flex items-center gap-2 mb-6 text-gray-500 hover:text-black transition-all cursor-pointer'
      >
        <img src={assets.arrow_icon} className='w-4 rotate-180 opacity-65' />
        Back to all Cars
      </motion.button>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12'>

        {/* LEFT SIDE */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className='lg:col-span-2'
        >

          {/* IMAGE */}
          <motion.img
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            src={car.image}
            className='w-full h-auto md:max-h-[500px] object-cover rounded-xl mb-6 shadow-md'
          />

          {/* TITLE */}
          <motion.div variants={item}>
            <h1 className='text-3xl font-bold text-gray-800'>
              {car.brand} {car.model}
            </h1>
            <p className='text-gray-500 text-lg'>
              {car.category} · {car.year}
            </p>
          </motion.div>

          <hr className='border-gray-300 my-6' />

          {/* FEATURES */}
          <motion.div
            variants={container}
            className='grid grid-cols-2 sm:grid-cols-4 gap-4'
          >
            {[
              { icon: assets.users_icon, text: `${car.seating_capacity} Seats` },
              { icon: assets.fuel_icon, text: car.fuel_type },
              { icon: assets.car_icon, text: car.transmission },
              { icon: assets.location_icon, text: car.location }
            ].map(({ icon, text }, index) => (
              <motion.div
                key={index}
                variants={item}
                whileHover={{ scale: 1.05 }}
                className='flex flex-col items-center justify-center bg-gray-100 p-4 rounded-lg text-sm text-gray-600 shadow-sm'
              >
                <img src={icon} className='h-5 mb-2' />
                <span>{text}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* DESCRIPTION */}
          <motion.div variants={item} className='mt-6'>
            <h1 className='text-xl font-medium mb-3 text-gray-800'>
              Description
            </h1>
            <p className='text-gray-500 leading-7'>
              {car.description}
            </p>
          </motion.div>

          {/* FEATURES LIST */}
          <motion.div variants={item} className='mt-6'>
            <h1 className='text-xl font-medium mb-3 text-gray-800'>
              Features
            </h1>

            <ul className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
              {["360 Camera", "Bluetooth", "GPS", "Heated Seats", "Rear View Mirror"].map((item, i) => (
                <li key={i} className='flex items-center text-gray-500'>
                  <img src={assets.check_icon} className='h-4 mr-2' />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

        </motion.div>

        {/* RIGHT FORM */}
        <motion.form
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          onSubmit={handleSubmit}
          className='bg-white shadow-lg rounded-2xl p-6 h-fit border border-gray-200'
        >

          <div className='flex justify-between items-center mb-2'>
            <span className='text-gray-500'>Per Day</span>
            <span className='text-2xl font-semibold text-gray-800'>
              {currency}{car.pricePerDay}
            </span>
          </div>

          <hr className='my-4 border-gray-200' />

          <div className='space-y-4'>

            <div>
              <label className='text-sm text-gray-600'>Pickup Date</label>
              <input
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                type='date'
                className='w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-400'
              />
            </div>

            <div>
              <label className='text-sm text-gray-600'>Return Date</label>
              <input
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                type='date'
                className='w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-400'
              />
            </div>

            <div className='flex justify-between'>
              <span className='text-gray-500'>Availability</span>
              <span className='text-green-500 font-medium'>
                {car.isAvailable ? "Available" : "Not Available"}
              </span>
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type='submit'
              className='w-full bg-blue-500 text-white py-3 rounded-xl hover:bg-blue-600 transition'
            >
              Book Now
            </motion.button>

            <p className='text-center text-gray-500 text-sm'>
              No credit card required
            </p>

          </div>
        </motion.form>

      </div>
    </motion.div>
  ) : (
    <Loader />
  )
}

export default CarDetails