import React, { useEffect, useState } from 'react'
import Title from '../../components/Owner/Title'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const ManageBookings = () => {
  const { currency, axios } = useAppContext()

  const [bookings, setBookings] = useState([])

  // ✅ Fetch Owner Bookings
  const fetchOwnerBookings = async () => {
    try {
      const token = localStorage.getItem("token")

      const { data } = await axios.get('/api/bookings/owner', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (data.success) {
        setBookings(data.bookings || [])
      } else {
        toast.error(data.message)
        setBookings([])
      }

    } catch (error) {
      toast.error(error.message)
      setBookings([])
    }
  }

  // ✅ Change Booking Status (FIXED ROUTE)
  const changeBookingStatus = async (bookingId, status) => {
    try {
      const token = localStorage.getItem("token")

      const { data } = await axios.post(
        '/api/bookings/status',   // ✅ FIXED
        { bookingId, status },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      if (data.success) {
        toast.success(data.message)
        fetchOwnerBookings()
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchOwnerBookings()
  }, [])

  return (
    <div className='px-4 pt-10 md:px-10 w-full'>

      <Title 
        title="Manage Bookings"
        subTitle="Track all customer bookings, approve or cancel requests, and manage booking statuses"
      />

      <div className='mt-6 w-full border border-gray-200 rounded-xl overflow-hidden bg-white'>
        
        <table className='w-full text-left text-sm text-gray-600'>
          
          {/* HEADER */}
          <thead className='bg-gray-50 text-gray-500'>
            <tr>
              <th className='p-4 font-medium'>Car</th>
              <th className='p-4 font-medium max-md:hidden'>Date Range</th>
              <th className='p-4 font-medium'>Total</th>
              <th className='p-4 font-medium'>Payment</th>
              <th className='p-4 font-medium'>Actions</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={index} className='border-t hover:bg-gray-50 transition'>

                {/* CAR */}
                <td className='p-4 flex items-center gap-3'>
                  <img
                    src={booking.car?.image}
                    alt=""
                    className='w-12 h-10 object-cover rounded-md'
                  />
                  <p className='font-medium'>
                    {booking.car?.brand} {booking.car?.model}
                  </p>
                </td>

                {/* DATE */}
                <td className='p-4 max-md:hidden'>
                  {booking.pickupDate?.split('T')[0]} to {booking.returnDate?.split('T')[0]}
                </td>

                {/* PRICE */}
                <td className='p-4'>
                  {currency} {booking.price}
                </td>

                {/* PAYMENT */}
                <td className='p-4'>
                  <span className='bg-gray-100 px-3 py-1 rounded-full text-xs text-gray-600'>
                    offline
                  </span>
                </td>

                {/* STATUS */}
                <td className='p-4'>
                  {booking.status?.toLowerCase() === 'pending' ? (
                    
                    <select
                      onChange={(e) => changeBookingStatus(booking._id, e.target.value)}
                      value={booking.status}
                      className='px-3 py-1.5 text-sm text-gray-600 border border-gray-300 rounded-md outline-none bg-white'
                    >
                      <option value="Pending">Pending</option>
                      <option value="Cancelled">Cancelled</option>
                      <option value="Confirmed">Confirmed</option>
                    </select>

                  ) : (

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        booking.status?.toLowerCase() === 'confirmed'
                          ? 'bg-green-100 text-green-600'
                          : booking.status?.toLowerCase() === 'completed'
                          ? 'bg-blue-100 text-blue-600'
                          : booking.status?.toLowerCase() === 'cancelled'
                          ? 'bg-red-100 text-red-600'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {booking.status}
                    </span>

                  )}
                </td>

              </tr>
            ))}
          </tbody>

        </table>

      </div>
    </div>
  )
}

export default ManageBookings