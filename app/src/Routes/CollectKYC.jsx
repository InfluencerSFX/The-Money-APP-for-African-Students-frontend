import React, { useEffect, useState } from "react";
import "@smile_identity/smart-camera-web";
import { AxiosType, postMethod } from "../api/axios";
import { useNavigate } from "react-router-dom";

function CollectKYC() {
  const countries = [
    { value: "NG", label: "Nigeria" },
    { value: "TZ", label: "Tanzania" },
    { value: "GH", label: "Ghana" },
    { value: "KE", label: "Kenya" },
    { value: "RW", label: "Rwanda" },
    { value: "ZA", label: "South Africa" },
    { value: "UG", label: "Uganda" },
  ];
  const [selected, setSelected] = useState(false);
  const ids = [{ value: "PASSPORT", label: "Passport" }];
  const [countrySelected, setCountrySelected] = useState(countries[0].value);
  const [idSelected, setIdSelected] = useState(ids[0].value);

  const searchParams = new URLSearchParams(document.location.search);
  const tier = searchParams.get("tier");

  const token = localStorage.getItem("token");
  const refreshToken = localStorage.getItem("refreshToken");
  const navigate = useNavigate();

  const handleImagesComputed = async (e) => {
    const result = await postMethod(
      "/kyc/verify-docs",
      {
        detail: e.detail,
        id_info: {
          country: countrySelected,
          id_type: idSelected,
        },
        tier: Number(tier),
      },
      AxiosType.Main,
      token,
      refreshToken
    );
    navigate("/account");
  };

  useEffect(() => {
    if (selected) {
      const app = document.querySelector("smart-camera-web");
      app.addEventListener("imagesComputed", handleImagesComputed);

      return () => {
        app.removeEventListener("imagesComputed", handleImagesComputed);
      };
    }
  }, [selected]);

  return selected ? (
    <main className="pt-4 h-full space-y-8 flex flex-col justify-center">
      <smart-camera-web capture-id></smart-camera-web>
    </main>
  ) : (
    <main className="pt-4 h-full space-y-8 flex flex-col justify-center">
      <h3 className="font-bold">Select your country and ID type</h3>
      <div className="flex space-x-2">
        <select
          className="bg-black flex-1"
          onChange={(e) => setCountrySelected(e.target.value)}
        >
          {countries.map((country) => (
            <option key={country.label} value={country.value}>
              {country.label}
            </option>
          ))}
        </select>
        <select
          className="bg-black flex-1"
          onChange={(e) => setIdSelected(e.target.value)}
        >
          {ids.map((id) => (
            <option key={id.label} value={id.value}>
              {id.label}
            </option>
          ))}
        </select>
      </div>
      <button onClick={() => setSelected(true)}>Continue</button>
    </main>
  );
}

export default CollectKYC;
