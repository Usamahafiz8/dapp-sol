// src/ui/CalculateProfit.js
import React, { forwardRef ,useEffect} from "react";
import { useConnection, useWallet } from '@solana/wallet-adapter-react';

const CalculateProfit = forwardRef<HTMLDivElement>((props, ref) => {
const { connection } = useConnection();
const {wallet}=useWallet();
useEffect(() => {
console.log("connections is...",connection);
console.log("wallet is..",wallet);


}, [])

  return (
    <section ref={ref}  className="bg-transparent flex flex-grow py-16">
      <div className="container mx-auto grid grid-cols-1 gap-8 ">
        {/* First div */}
        <div className="flex flex-col justify-center items-center">
          <h2 className="text-white text-3xl font-bold mb-4">
            Calculate Your Profit
          </h2>
          <p className="text-black text-lg">
            Enter your investment amount below to calculate your potential
            profit.
          </p>
        </div>

        {/* Second div */}
        <div className="bg-white gap-10 flex flex-col justify-between rounded-3xl shadow-2xl">
          {/* Sub div 1 */}
          <div className="w-full h-52 flex justify-between items-center">
            <div className="w-3/4 bg-transparent h-full flex flex-col justify-center px-4 py-2 flex">
              <p className="text-black font-bold mb-10 ">Deposit Period:</p>
              <div className="flex items-center space-x-2">
                <span className="text-black">7 Days</span>
                <input
                  id="js-slider"
                  className="container-slider-range flex-grow ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all w-full h-3 bg-transparent appearance-none cursor-pointer range-lg"
                  type="range"
                  min="7"
                  max="21"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, #FFA500, #800080)",
                  }}
                />
                <span className="text-black">21 Days</span>
              </div>
            </div>

            <div className="w-1/4 h-full flex flex-col justify-center ">
              <p className="text-black font-bold mb-10 ">Deposit Amount:</p>

              <div className="flex items-center px-3 py-2">
                <input
                  type="number"
                  id="number-input"
                  aria-describedby="helper-text-explanation"
                  className="bg-gray-50 border border-orange-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-purple-500 block w-full p-2.5 dark:bg-purple-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="0.0"
                  required
                />
                <button className="text-black font-bold  px-4 py-2 rounded-full ml-2 hover:bg-purple-600 hover:text-black">
                  Max
                </button>
              </div>
            </div>
          </div>

          {/* Sub div 2 */}
          <div className="bg-gradient-to-r from-purple-500 to-orange-500 h-1 rounded-full mx-6"></div>

          {/* Sub div 3 */}
          <div className="w-full  flex flex-col justify-between p-4">
            <div className="flex flex-col justify-center align-center ">
              <div className="flex justify-center align-center p-4 gap-40">
                <div className="flex justify-between px-4 py-2 gap-2">
                  <span className="text-black ">Daily ROI:</span>
                  <span className="text-black font-bold">0 %</span>
                </div>
                <div className="flex justify-between px-4 py-2 gap-2">
                  <span className="text-black">Total Profit:</span>
                  <span className="text-black font-bold">0.00 %</span>
                </div>
                <div className="flex justify-between px-4 py-2 gap-2">
                  <span className="text-black">In 7 days you will have:</span>
                  <span className="text-black font-bold">0.00 SOL</span>
                </div>
              </div>
              <div className="flex justify-center align-center p-4">
                <button className="bg-gradient-to-r from-purple-500 to-orange-500 text-white text-xl font-bold  px-4 py-2 rounded-full px-4 py-3  hover:bg-blue-600 p-4 w-64 shadow-lg">
                  Invest
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Third div */}

        <div className="flex gap-10 justify-center items-center">
          <button className=" flex justify-center items-center w-20 h-20 bg-orange-500 to-purple-500 text-white px-4 py-3 rounded-xl mt-8 hover:bg-purple-600 hover:text-white mb-4">
            <img src="/info.svg" alt="Icon 1" className="h-6 w-6" />
          </button>
          <button className="flex justify-center items-center w-20 h-20 bg-orange-500 text-white px-4 py-3 rounded-xl mt-8 hover:bg-purple-600 hover:text-white mb-4">
            <img src="/contract.svg" alt="Icon 2" className="h-6 w-6" />
          </button>
          <button className="flex justify-center items-center w-20 h-20 bg-orange-500 text-white px-4 py-3 rounded-xl mt-8 hover:bg-purple-600 hover:text-white mb-4">
            <img src="/telegram.svg" alt="Icon 3" className="h-6 w-6" />
          </button>
        </div>
      </div>
    </section>
  );
});
CalculateProfit.displayName = "CalculateProfit";
export default CalculateProfit;
