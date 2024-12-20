'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';

const ListingGallery = ({ images = [] }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  // Default images if none provided
  const galleryImages = images.length > 0 ? images : [
    '/images/scraper1.png',
    '/images/scraper2.png',
    '/images/scraper3.png',
    '/images/scraper4.png'
  ];

  const openModal = (image) => {
    setSelectedImage(image);
    setShowModal(true);
  };

  const closeModal = (e) => {
    e.stopPropagation(); // Prevent event from bubbling up
    setShowModal(false);
    setSelectedImage(null);
  };

  // Mobile Gallery View
  const MobileGallery = () => (
    <div className="w-full overflow-x-auto whitespace-nowrap hide-scrollbar">
      <div className="inline-flex gap-2">
        {galleryImages.map((image, index) => (
          <div
            key={index}
            className="relative w-[85vw] h-[400px] inline-block first:ml-4 last:mr-4"
            onClick={() => openModal(image)}
          >
            <Image
              src={image}
              alt={`Property view ${index + 1}`}
              fill
              className="object-cover rounded-lg"
            />
            {index === 0 && (
              <>
                <div className="absolute bottom-4 left-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                  22 photos
                </div>
                <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                  Map
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  // Desktop Gallery View
  const DesktopGallery = () => (
    <div className="flex gap-4 mb-8">
      {/* Large Main Image - Left Side */}
      <div className="w-1/2 relative">
        <div className="relative w-full h-[600px]" onClick={() => openModal(galleryImages[0])}>
          <Image
            src={galleryImages[0]}
            alt="Elegant bedroom in a modern three-bedroom apartment in Cocody, Abidjan, featuring a king-sized bed, large windows, and a sophisticated interior design."
            fill
            className="object-cover rounded-lg"
          />
          <div className="absolute bottom-4 left-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
            22 photos
          </div>
          <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
            Map
          </div>
        </div>
      </div>

      {/* Right Side Images */}
      <div className="w-1/2 flex flex-col gap-4">
        {/* Top Large Image */}
        <div className="relative h-[296px]" onClick={() => openModal(galleryImages[1])}>
          <Image
            src={galleryImages[1]}
            alt="Spacious living room in a modern three-bedroom apartment in Cocody, Abidjan, featuring contemporary furniture, a neutral color palette, and floor-to-ceiling windows."
            fill
            className="object-cover rounded-lg"
          />
        </div>
        {/* Bottom Two Images in Row */}
        <div className="flex gap-4">
          <div className="relative w-1/2 h-[296px]" onClick={() => openModal(galleryImages[2])}>
            <Image
              src={galleryImages[2]}
              alt="Modern kitchen in a two-bedroom apartment in Cocody, Abidjan, equipped with sleek cabinetry, stainless steel appliances, and a spacious countertop."
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <div className="relative w-1/2 h-[296px]" onClick={() => openModal(galleryImages[3])}>
            <Image
              src={galleryImages[3]}
              alt="Cozy bedroom in a modern two-bedroom apartment in Cocody, Abidjan, featuring a queen-sized bed, soft lighting, and a minimalist design."
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile View */}
      <div className="md:hidden">
        <MobileGallery />
      </div>

      {/* Desktop View */}
      <div className="hidden md:block">
        <DesktopGallery />
      </div>

      {/* Full Screen Modal */}
      {showModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
          onClick={closeModal} // Added click handler to background
        >
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-50"
          >
            <X size={32} />
          </button>
          <div 
            className="w-full h-full p-4 flex items-center justify-center"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image
          >
            <div className="relative w-full h-full">
              <Image
                src={selectedImage}
                alt="Modern two-bedroom apartment for sale in Cocody, Abidjan, featuring a spacious living area, contemporary kitchen, and balcony with city views."
                fill
                className="object-contain"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ListingGallery;