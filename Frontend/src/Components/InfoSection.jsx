import { HiOutlineRefresh } from "react-icons/hi";
import { FaTruckDroplet } from "react-icons/fa6";
import { IoShieldCheckmark } from "react-icons/io5";
import { FaHeadphones } from "react-icons/fa";

const HomeInfoSection = () => {
  const highlights = [
    {
      icon: <FaTruckDroplet />,
      title: "Quick Delivery",
      description:
        "We process and ship orders fast so you receive your products without long waiting times.",
    },
    {
      icon: <IoShieldCheckmark />,
      title: "Protected Payments",
      description:
        "All transactions are secured with industry-level encryption for complete peace of mind.",
    },
    {
      icon: <HiOutlineRefresh />,
      title: "Simple Returns",
      description:
        "Changed your mind? Our return process is smooth and customer-friendly.",
    },
    {
      icon: <FaHeadphones />,
      title: "Customer Assistance",
      description:
        "Our support team is available to help you with any questions or concerns.",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Explore",
      description:
        "Browse through categories and discover products that match your needs.",
    },
    {
      number: "02",
      title: "Add to Cart",
      description:
        "Select your desired items and review them before proceeding to checkout.",
    },
    {
      number: "03",
      title: "Checkout",
      description:
        "Complete your purchase using a secure and seamless payment process.",
    },
    {
      number: "04",
      title: "Receive Order",
      description:
        "Relax while we pack and deliver your order straight to your doorstep.",
    },
  ];

  return (
    <section className="bg-[#a4c6d4] text-var[--text-color] py-20 mt-20 rounded-2xl">
      <div className="max-w-6xl mx-auto px-6">
        {/* Why Shop With Us */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Why Shop With Us</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We focus on providing a smooth shopping experience from start to
            finish.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 text-center mb-24">
          {highlights.map((item, index) => (
            <div key={index} className="space-y-4">
              <div className="flex justify-center text-green-500">
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>

        {/* How It Works */}
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-gray-600">
            Shopping made simple in four easy steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {steps.map((step, index) => (
            <div key={index} className="space-y-3">
              <p className="text-2xl font-bold text-gray-600">{step.number}</p>
              <h4 className="text-lg font-semibold">{step.title}</h4>
              <p className="text-sm text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeInfoSection;
