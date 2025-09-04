import React, { useEffect } from "react";
import { User, Leaf, BarChart2, Users } from "lucide-react";
import farmHero from "../assets/shamba.jpg";
import { Link } from "react-router-dom";
import crop1 from "../assets/banana.jpg";
import crop2 from "../assets/maize.jpg";
import crop3 from "../assets/seed.jpg";
import crop4 from "../assets/onions.jpg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import AOS from "aos";
import "aos/dist/aos.css";

const images = [crop1, crop2, crop3, crop4];

const LandingPage = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true }); // animations initialize
  }, []);

  return (
    <div className="min-h-screen bg-yellow-50 flex flex-col font-sans scroll-smooth">
      {/* Hero Section */}
      <header className="relative text-white">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${farmHero})` }}
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div
          className="relative z-10 container mx-auto px-6 py-32 md:py-48 flex flex-col md:flex-row items-center justify-between"
          data-aos="fade-up"
        >
          <div className="md:w-1/2">
            <h1 className="text-4xl font-Heading md:text-5xl font-bold mb-4 leading-snug" data-aos="fade-right">
              Grow Better. Manage Smarter.
            </h1>
            <p className="text-lg font-body md:text-xl mb-6" data-aos="fade-right" data-aos-delay="200">
              Keep track of your crops, see how your farm is doing, and plan your harvest. 
              Our app helps farmers like you stay organized and make better decisions.
            </p>
            <div className="flex space-x-4" data-aos="fade-right" data-aos-delay="400">
              <Link
                to="/login"
                className="bg-white font-body text-green-700 px-6 py-3 rounded-md font-semibold shadow hover:bg-green-700 hover:text-yellow-400 transition"
              >
                Login
              </Link>
              <a
                href="#features"
                className="border font-body font-bold border-white px-6 py-3 text-yellow-200 rounded-md hover:bg-white hover:text-green-700 transition"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="py-16 container mx-auto px-6 text-center">
        <h2 className="text-3xl font-Heading font-bold mb-6 text-green-800" data-aos="fade-up">
          Why This App is for You
        </h2>
        <p className="text-lg font-body max-w-3xl mx-auto text-gray-800 mb-8" data-aos="fade-up" data-aos-delay="200">
          Farming is hard work. You remember what you planted last season, but it’s easy to forget details like how much you planted, when you need to harvest, or which crops are growing well. This app helps you:
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition" data-aos="fade-up">
            <Leaf className="text-green-600 mx-auto mb-4" size={48} />
            <h3 className="font-semibold font-Heading text-gray-600 text-xl mb-2">Track Your Crops</h3>
            <p className="font-body py-2">See all your crops in one place. Know what’s growing, what’s ready to harvest, and plan better next season.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition" data-aos="fade-up" data-aos-delay="200">
            <Users className="text-green-600 mx-auto mb-4" size={48} />
            <h3 className="font-semibold font-Heading text-gray-600 text-xl mb-2">Manage Your Farm Easily</h3>
            <p className="font-body py-2">Keep your profile and farm info updated. Add new crops, edit quantities, and stay organized without paper records.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition" data-aos="fade-up" data-aos-delay="400">
            <BarChart2 className="text-green-600 mx-auto mb-4" size={48} />
            <h3 className="font-semibold font-Heading text-gray-600 text-xl mb-2">See Your Progress</h3>
            <p className="font-body py-2">Get simple charts showing your crops by type. Learn what’s growing well and make better decisions for your farm.</p>
          </div>
        </div>
      </section>

      {/* How it works Section */}
      <section className="bg-green-700 text-white py-16">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
          <div className="text-center md:text-left md:w-1/2" data-aos="fade-right">
            <h2 className="font-Heading text-3xl md:text-4xl font-bold mb-6">What You Get With Your Account</h2>
            <p className="font-body mb-6 text-lg max-w-2xl">
              When you create your account, you can log in anytime to:
            </p>
            <ul className="font-body list-inside text-lg max-w-2xl space-y-2">
              <li>Add new crops and keep track of them.</li>
              <li>Update your profile and contact information.</li>
              <li>See charts of your farm progress.</li>
              <li>Keep everything organized without writing on paper.</li>
            </ul>
            <Link
              to="/login"
              className="mt-8 font-body inline-block bg-white text-green-700 px-8 py-4 rounded-md font-semibold shadow hover:bg-gray-100 transition"
            >
              Get Started
            </Link>
          </div>

          <div className="w-full md:w-1/2 mt-8 md:mt-0 flex justify-center" data-aos="fade-left">
            <div className="w-full max-w-lg">
              <Slider
                dots={true}
                infinite={true}
                speed={500}
                slidesToShow={1}
                slidesToScroll={1}
                arrows={true}
                autoplay={true}
                autoplaySpeed={3000}
                adaptiveHeight={true}
              >
                {images.map((img, index) => (
                  <div key={index} className="p-2">
                    <div className="rounded-lg shadow-lg overflow-hidden w-full h-64 sm:h-80 md:h-96 lg:h-[28rem]">
                      <img
                        src={img}
                        alt={`Crop ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-6 text-center">
        &copy; {new Date().getFullYear()} Cooperative Management App. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
