import React from 'react';

const PriceSlider = ({ priceRange, setPriceRange }) => {
    const handleChange = (e) => {
        const value = Number(e.target.value);
        setPriceRange([0, value]);
    };

    return (
        <div>
            <input
                type="range"
                min="0"
                max="2000"
                value={priceRange[1]}
                onChange={handleChange}
                className="w-full"
            />
            <div className="flex justify-between mt-2 text-sm">
                <span>{priceRange[0]} сом</span>
                <span>{priceRange[1]} сом</span>
            </div>
          
        </div>
    );
};

export default PriceSlider;
