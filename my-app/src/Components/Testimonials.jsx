import React from "react";
import emillyImg from "../assets/testimonals/emilly.jpg";
import carlosImg from "../assets/testimonals/carlos.jpg";
import aishaImg from "../assets/testimonals/aisha.jpg";
import liamImg from "../assets/testimonals/liam.jpg";


const testimonials = [
  {
    name: "Emily R.",
    role: "Fashion Enthusiast",
    text: "Fantastic selection and fast delivery. I found exactly what I wanted and the checkout was smooth. Highly recommend!",
    image: emillyImg,
  },
  {
    name: "Carlos M.",
    role: "Home Decor Lover",
    text: "Great quality and the product matched the photos perfectly. Customer support helped me pick the right size.",
    image: carlosImg,
  },
  {
    name: "Aisha K.",
    role: "Athlete",
    text: "My order arrived earlier than expected and the sports gear is top-notch. I'll be shopping here again.",
    image: aishaImg,
  },
  {
    name: "Liam T.",
    role: "Gadget Fan",
    text: "Excellent prices and secure payments. The electronics arrived well-packaged and work great.",
    image: liamImg,
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-var[--background-color] mt-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold">What Our Customers Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mt-2">
            Real feedback from customers who shopped with us.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="border rounded-lg p-5 shadow-sm bg-gray-300 flex flex-col"
            >
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover border border-gray-200"
                />
                <div>
                  <p className="font-semibold">{t.name}</p>
                  <p className="text-sm text-gray-500">{t.role}</p>
                </div>
              </div>

              <p className="text-sm text-gray-700 mt-2 flex-1">“{t.text}”</p>

              <div className="mt-4 text-yellow-500">★★★★★</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
