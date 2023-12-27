import {
  AdjustmentsVerticalIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import VerifyEmail from "../Components/VefityEmail";
import CompleteKYC from "../Components/CompleteKYC";
import Transact from "../Components/Transact";

const Dashboard = () => {
  const [showBalance, setShowBalance] = useState(false);
  return (
    <main className="relative pt-7 space-y-4 h-svh h-screen">
      <div className="flex justify-between">
        <div className="flex space-x-2">
          <img
            src="https://images.pexels.com/photos/19414563/pexels-photo-19414563/free-photo-of-a-woman-in-a-leather-jacket-sitting-on-the-ground.jpeg"
            alt="user image"
            srcset=""
            className="rounded-full h-9 w-9 my-auto"
          />
          <div className="">
            <p className="text-sm text-[#55BB6C]">Welcome</p>
            <p className="text-xs text-[#D4B998]">Victoria Menace</p>
          </div>
        </div>
        <div className="w-auto">
          <AdjustmentsVerticalIcon className="h-7 w-auto text-[#D4B998]" />
        </div>
      </div>

      <section className="flex justify-center">
        <img
          src="/images/stacked-cards.png"
          className="absolute"
          alt=""
          srcset=""
        />
        <div className="z-10 text-white flex flex-col place-items-center space-y-2 pt-4 mb-3">
          <div className="inline-flex mx-auto space-x-2 align-middle">
            <p className="text-sm my-auto font-light">
              Available Asset Balance
            </p>
            {!showBalance ? (
              <button
                className="bg-transparent w-auto h-auto p-0 border-0"
                onClick={() => {
                  setShowBalance(true);
                }}
              >
                <EyeIcon className="h-4 w-auto" />
              </button>
            ) : (
              <button
                className="bg-transparent w-auto h-auto p-0 hover:blur-none"
                onClick={() => {
                  setShowBalance(false);
                }}
              >
                <EyeSlashIcon className="h-4 w-auto" />
              </button>
            )}
          </div>

          <div className="inline-flex space-x-2 align-text-bottom text-white">
            <p className="text-4xl font-semibold">
              {showBalance ? "144" : "****"}
            </p>{" "}
            <span className="mt-auto">USD</span>
          </div>
          <div className="inline-flex space-x-2">
            <span className="mt-auto">₺</span>
            <p className="text-md font-thin">41562.15</p>{" "}
          </div>
          <br />
        </div>
      </section>

      <section>
        <VerifyEmail />
      </section>

      <section>
        <Transact />
      </section>

      <div className=" z-30 absolute inset-x-0 bottom-0 grid grid-cols-2 bg-sky-300 place-items-center text-[#55BB6C]">
        <div className="">Fund Wallet</div>
        <div className="">Send USD</div>
      </div>
    </main>
  );
};

export default Dashboard;
