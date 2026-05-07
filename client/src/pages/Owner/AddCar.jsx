import React, { useState } from 'react'
import Title from '../../components/Owner/Title'
import { assets } from '../../assets/assets'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const AddCar = () => {

  const { axios, currency } = useAppContext()

  const [image, setImage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const [cars, setCars] = useState({
    brand: '',
    model: '',
    year: '',
    category: '',
    SittingCapacity: '',
    fuel_type: '',
    transmission: '',
    pricePerDay: '',
    location: '',
    description: ''
  })

  const onSubmitHandler = async (e) => {

    e.preventDefault()

    try {

      setIsLoading(true)

      const formData = new FormData()

      formData.append("image", image)
      formData.append("carData", JSON.stringify(cars))

      const { data } = await axios.post(
        '/api/owner/add-car',
        formData
      )

      if (data.success) {

        toast.success(data.message)

        setCars({
          brand: '',
          model: '',
          year: '',
          category: '',
          SittingCapacity: '',
          fuel_type: '',
          transmission: '',
          pricePerDay: '',
          location: '',
          description: ''
        })

        setImage(null)

      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (

    <div className='px-4 py-10 md:px-10 flex-1'>

      <Title
        title="Add New Car"
        subTitle="Fill in details to list a new car for booking."
      />

      <form
        onSubmit={onSubmitHandler}
        className='flex flex-col gap-5 text-gray-500 text-sm mt-6 max-w-xl'
      >

        {/* Image Upload */}
        <div className="flex items-center gap-2 w-full">

          <label htmlFor="car-image">

            <img
              src={image ? URL.createObjectURL(image) : assets.upload_icon}
              alt=""
              className='h-14 rounded cursor-pointer'
            />

            <input
              type="file"
              id="car-image"
              hidden
              accept='image/*'
              onChange={(e) => setImage(e.target.files[0])}
            />

          </label>

          <p>Upload car image</p>

        </div>

        {/* Brand & Model */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>

          <div>
            <label>Brand</label>

            <input
              type="text"
              required
              value={cars.brand}
              onChange={(e) =>
                setCars({ ...cars, brand: e.target.value })
              }
              className='border px-3 py-2 rounded w-full'
            />
          </div>

          <div>
            <label>Model</label>

            <input
              type="text"
              required
              value={cars.model}
              onChange={(e) =>
                setCars({ ...cars, model: e.target.value })
              }
              className='border px-3 py-2 rounded w-full'
            />
          </div>

        </div>

        {/* Year Price Category */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>

          <div>
            <label>Year</label>

            <input
              type="number"
              required
              value={cars.year}
              onChange={(e) =>
                setCars({ ...cars, year: e.target.value })
              }
              className='border px-3 py-2 rounded w-full'
            />
          </div>

          <div>
            <label>Price ({currency})</label>

            <input
              type="number"
              required
              value={cars.pricePerDay}
              onChange={(e) =>
                setCars({ ...cars, pricePerDay: e.target.value })
              }
              className='border px-3 py-2 rounded w-full'
            />
          </div>

          <div>
            <label>Category</label>

            <select
              value={cars.category}
              onChange={(e) =>
                setCars({ ...cars, category: e.target.value })
              }
              className='border px-3 py-2 rounded w-full'
            >
              <option value="">Select</option>
              <option value="SUV">SUV</option>
              <option value="Sedan">Sedan</option>
              <option value="Van">Van</option>
            </select>
          </div>

        </div>

        {/* Transmission Fuel Seats */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>

          <div>
            <label>Transmission</label>

            <select
              value={cars.transmission}
              onChange={(e) =>
                setCars({ ...cars, transmission: e.target.value })
              }
              className='border px-3 py-2 rounded w-full'
            >
              <option value="">Select</option>
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
              <option value="Manual">Semi-Automatic</option>
            </select>
          </div>

          <div>
            <label>Fuel Type</label>

            <select
              value={cars.fuel_type}
              onChange={(e) =>
                setCars({ ...cars, fuel_type: e.target.value })
              }
              className='border px-3 py-2 rounded w-full'
            >
              <option value="">Select</option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Electric">Electric</option>
              <option value="Electric">Gas</option>
            </select>
          </div>

          <div>
            <label>Seats</label>

            <select
              value={cars.SittingCapacity}
              onChange={(e) =>
                setCars({ ...cars, SittingCapacity: e.target.value })
              }
              className='border px-3 py-2 rounded w-full'
            >
              <option value="">Select</option>
              <option value="2">2</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="7">7</option>
            </select>
          </div>

        </div>

        {/* Location */}
        <div>

          <label>Location</label>

          <input
            type="text"
            required
            value={cars.location}
            onChange={(e) =>
              setCars({ ...cars, location: e.target.value })
            }
            className='border px-3 py-2 rounded w-full'
          />

        </div>

        {/* Description */}
        <div>

          <label>Description</label>

          <textarea
            rows={5}
            required
            value={cars.description}
            onChange={(e) =>
              setCars({ ...cars, description: e.target.value })
            }
            className='border px-3 py-2 rounded w-full resize-none'
          />

        </div>

        <button
          type='submit'
          className='bg-black text-white px-5 py-2 rounded'
        >
          {isLoading ? "Listing..." : "List Your Car"}
        </button>

      </form>

    </div>
  )
}

export default AddCar