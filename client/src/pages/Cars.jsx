import React, { useEffect, useState } from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import CarCard from '../components/CarCard'
import { useSearchParams } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import toast from "react-hot-toast";

const Cars = () => {

  const [searchParams] = useSearchParams()

  const pickupLocation = searchParams.get('pickupLocation')
  const pickupDate = searchParams.get('pickupDate')
  const returnDate = searchParams.get('returnDate')

  const { cars, axios } = useAppContext()

  const [input, setInput] = useState('')
  const [baseCars, setBaseCars] = useState([])
  const [filteredCars, setFilteredCars] = useState([])

  // ✅ DEBUG
  console.log("CONTEXT CARS:", cars);

  // ==============================
  // SEARCH API
  // ==============================
  const searchCarAvailibility = async () => {

    console.log("API FUNCTION CALLED");

    try {

      const { data } = await axios.post(
        '/api/bookings/check-availability',
        {
          location: pickupLocation,
          pickupDate,
          returnDate
        }
      );

      console.log("AVAILABLE CARS:", data);

      if (data.success) {

        setBaseCars(data.availableCars || []);
        setFilteredCars(data.availableCars || []);

        if (data.availableCars.length === 0) {
          toast("No Cars Available");
        }
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // ==============================
  // APPLY FILTER
  // ==============================
  const applyFilter = () => {

    if (input === '') {
      setFilteredCars(baseCars);
      return;
    }

    const filtered = baseCars.filter((car) =>
      car.brand.toLowerCase().includes(input.toLowerCase()) ||
      car.model.toLowerCase().includes(input.toLowerCase()) ||
      car.category.toLowerCase().includes(input.toLowerCase()) ||
      car.transmission.toLowerCase().includes(input.toLowerCase())||
      car.location.toLowerCase().includes(input.toLocaleLowerCase())
    );

    setFilteredCars(filtered);
  };

  // ==============================
  // LOAD DATA
  // ==============================
  useEffect(() => {

    console.log("PARAMS:",
      pickupLocation,
      pickupDate,
      returnDate
    );

    // ✅ If search params exist
    if (pickupLocation && pickupDate && returnDate) {

      searchCarAvailibility();

    } else {

      // ✅ Show all cars from context
      setBaseCars(cars || []);
      setFilteredCars(cars || []);
    }

  }, [cars, pickupLocation, pickupDate, returnDate]);

  // ==============================
  // FILTER ON INPUT
  // ==============================
  useEffect(() => {
    applyFilter();
  }, [input, baseCars]);

  return (
    <div className='w-full'>

      {/* HEADER */}
      <div className='flex flex-col items-center justify-center py-20 bg-gray-100 px-4 text-center'>

        <Title
          title='Available Cars'
          subTitle='Browse our selection of premium vehicles available for your next adventure'
        />

        {/* SEARCH BAR */}
        <div className='flex items-center bg-white px-4 mt-6 max-w-[560px] w-full h-12 rounded-full shadow'>

          <img
            src={assets.search_icon}
            alt="Search"
            className='w-4 h-4 mr-2'
          />

          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type='text'
            placeholder='Search by make, model or features'
            className='w-full h-full outline-none text-gray-500 bg-transparent'
          />

          <img
            src={assets.filter_icon}
            alt="Filter"
            className='w-4 h-4 ml-2'
          />
        </div>
      </div>

      {/* LIST */}
      <div className='px-6 md:px-16 lg:px-24 xl:px-32 py-12'>

        <p className="text-gray-500 xl:px-20 max-w-7xl mx-auto">
          Showing {filteredCars.length} Cars
        </p>

        {filteredCars.length === 0 && (
          <div className="text-center text-gray-500 mt-10">
            No cars found
          </div>
        )}

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 xl:px-20 max-w-7xl mx-auto'>

          {filteredCars.map((car, index) => (

            <div
              key={index}
              className='bg-white rounded-lg shadow-md overflow-hidden'
            >
              <CarCard car={car} />
            </div>

          ))}

        </div>
      </div>
    </div>
  )
}

export default Cars