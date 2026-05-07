import React from 'react'
import Title from './Title'
import { assets } from '../assets/assets'
import{motion} from 'motion/react'

const Testimonial = () => {

  const testimonials = [
    {
      name: "John Rodriguez",
      location: "Barcelona, Spain",
      image: assets.testimonial_image_1,
      testimonial: "I have rented cars from various companies, but the experience with carRental was exceptional."
    },
    {
      name: "Janhaviii",
      location: "Barcelona, Spain",
      image: assets.testimonial_image_2,
      testimonial: "Car rental made my trip so much easier. The car was delivered right to my door, and the customer service was fantastic!"
    },
    {
      name: "Divesh Kuthe",
      location: "Barcelona, Spain",
      image: assets.testimonial_image_2,
      testimonial: "I highly recommend carRental for anyone looking for a hassle-free car rental experience. The convenience of having the car delivered to my location was a game-changer, and the quality of the vehicle exceeded my expectations."
    }
  ]

  return (
    <div className="py-28 px-6 md:px-16 lg:px-24 xl:px-44">

      <Title
        title="What Our Customers Say"
        subTitle="Discover why discerning travelers choose StayVenture for their luxury accommodation around the world."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-18">
        {testimonials.map((testimonial, index) => (
          <motion.div
            initial= {{opacity:0,y:40}}
            whileInView = {{opacity:1,y:0}}
            transition={{duration:0.6,delay:index*0.2,ease:'easeOut'}}
            viewport={{once:true,amount:0.3}}

            key={index}
            className="bg-white p-6 rounded-xl shadow-lg hover:-translate-y-1 transition-all duration-500"
          >
            <div className="flex items-center gap-3">
              <img
                className="w-12 h-12 rounded-full object-cover"
                src={testimonial.image}
                alt={testimonial.name}
              />

              <div>
                <p className="text-xl font-semibold text-gray-800">
                  {testimonial.name}
                </p>
                <p className="text-gray-500 text-sm">
                  {testimonial.location}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 mt-4">
              {Array(5).fill(0).map((_, index) => (
                <img
                  key={index}
                  src={assets.star_icon}
                  alt="star-icon"
                  className="w-4 h-4"
                />
              ))}
            </div>

            <p className="text-gray-500 mt-4 font-light leading-7">
              "{testimonial.testimonial}"
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default Testimonial