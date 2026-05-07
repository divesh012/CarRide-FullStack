import React, { useEffect, useState } from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

const MyBookings = () => {

  const [bookings, setBookings] = useState([])

  const { axios, user, currency } = useAppContext()

  const fetchMyBookings = async () => {

    try {

      const { data } = await axios.get('/api/bookings/user')

      if (data.success) {
        setBookings(data.bookings)
      } else {
        toast.error(data.message)
      }

    } catch (error) {

      toast.error(error.response?.data?.message || error.message)

    }
  }

  useEffect(() => {

    if (user) {
      fetchMyBookings()
    }

  }, [user])

  // Animation
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 25 },
    show: { opacity: 1, y: 0 }
  }

  return (

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className='px-6 md:px-16 lg:px-24 xl:px-32 2xl:px-48 mt-16 mb-16 text-sm max-w-7xl mx-auto'
    >

      {/* Title */}
      <div className='mb-8 flex flex-col items-start text-left ml-2 md:ml-4 lg:ml-6'>

        <Title
          title='My Bookings'
          subTitle='View and manage your all booked cars'
        />

      </div>

      {/* Bookings */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className='space-y-5'
      >

        {bookings.map((booking, index) => (

          <motion.div
            key={booking._id || index}
            variants={item}
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 120 }}
            className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 p-5 border border-gray-200 rounded-xl shadow-sm bg-white hover:shadow-md transition-all'
          >

            {/* Car Image */}
            <div className='lg:col-span-1'>

              <div className='rounded-lg overflow-hidden mb-3'>

                <motion.img
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  src={booking.car?.image || assets.car_image}
                  alt=""
                  className='w-full h-48 object-cover'
                />

              </div>

              <p className='text-lg font-semibold text-gray-800'>

                {
                  booking.car
                    ? `${booking.car.brand} ${booking.car.model}`
                    : "Car Deleted"
                }

              </p>

              <p className='text-gray-500 mt-1 text-sm leading-5'>

                {
                  booking.car
                    ? `${booking.car.year} · ${booking.car.category} · ${booking.car.location}`
                    : "No Car Information"
                }

              </p>

            </div>

            {/* Booking Details */}
            <div className='md:col-span-2 flex flex-col justify-start gap-3 pt-1'>

              <div className='flex items-center gap-2 flex-wrap'>

                <motion.p
                  whileHover={{ scale: 1.05 }}
                  className='px-3 py-1 bg-gray-100 rounded-md text-gray-700 font-medium text-xs'
                >
                  Booking #{index + 1}
                </motion.p>

                <motion.p
                  whileHover={{ scale: 1.05 }}
                  className={`px-3 py-1 rounded-md font-medium text-xs ${
                    booking.status?.toLowerCase() === 'confirmed'
                      ? 'bg-green-100 text-green-600'
                      : booking.status?.toLowerCase() === 'cancelled' ||
                        booking.status?.toLowerCase() === 'canceled'
                      ? 'bg-red-100 text-red-600'
                      : booking.status?.toLowerCase() === 'pending'
                      ? 'bg-yellow-100 text-yellow-600'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {booking.status}
                </motion.p>

              </div>

              {/* Rental Period */}
              <div className='flex items-center gap-2'>

                <img
                  src={assets.calendar_icon_colored}
                  alt=""
                  className='w-4 h-4'
                />

                <p className='text-gray-500 text-xs'>
                  Rental Period:
                </p>

                <p className='text-gray-700 text-xs'>
                  {booking.pickupDate?.split('T')[0]} To {booking.returnDate?.split('T')[0]}
                </p>

              </div>

              {/* Location */}
              <div className='flex items-center gap-2'>

                <img
                  src={assets.location_icon_colored}
                  alt=""
                  className='w-4 h-4'
                />

                <p className='text-gray-500 text-xs'>
                  Pick-Up Location:
                </p>

                <p className='text-gray-700 text-xs'>
                  {booking.car?.location || "Location unavailable"}
                </p>

              </div>

            </div>

            {/* Price */}
            <div className='lg:col-span-1 flex flex-col justify-start items-start lg:items-end gap-2 pt-1'>

              <p className='text-sm text-gray-500'>
                Total Price
              </p>

              <motion.h1
                whileHover={{ scale: 1.05 }}
                className='text-2xl font-semibold text-primary'
              >
                {currency} {booking.price}
              </motion.h1>

              <p className='text-xs text-gray-500'>
                Booked On: {booking.createdAt?.split('T')[0]}
              </p>

            </div>

          </motion.div>

        ))}

      </motion.div>

    </motion.div>
  )
}

export default MyBookings