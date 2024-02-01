import { useEffect, useState } from "react";
import { Codes, delay } from "../utils/utilityFunctions";
import Spinner from "../Components/Spinner";
import { AxiosType, getMethod } from "../api/axios";
import { useNavigate } from "react-router-dom";

const KYC = () => {
  const token = localStorage.getItem("token");
  const refreshToken = localStorage.getItem("refreshToken");

  const [loading, setLoading] = useState(false);
  const [kYCProcessing, setKYCProcessing] = useState(false);
  const [kYCComplete, setKYCComplete] = useState(false);

  const [T2loading, setT2Loading] = useState(false);
  const [T2kYCProcessing, setT2KYCProcessing] = useState(false);
  const [T2kYCComplete, setT2KYCComplete] = useState(false);

  const navigate = useNavigate();
  const [userDetails, setUser] = useState(null);
  useEffect(() => {
    (async () => {
      const user = await getMethod(
        "/auth/me",
        AxiosType.Main,
        token,
        refreshToken
      );
      console.log(user?.tier?.level > 0);
      setUser(user);
    })();
  }, []);

  const handleKYC = async () => {
    setLoading(true);
    navigate("/collect-kyc?tier=1");
    setKYCProcessing(true);
    setLoading(false);
  };

  const handleT2KYC = async () => {
    setT2Loading(true);
    navigate("/collect-kyc?tier=2");
    setT2KYCProcessing(true);
    setT2Loading(false);
  };

  return (
    <main className="px-0 mobile-screen space-y-8 flex flex-col justify-center">
      <div className="p-4 rounded-xl bg-[#045725] w-full space-y-2">
        <p className="text-sm">Complete your Tier 1 KYC to start transacting</p>
        <div className="text-sm">
          <p className="font-medium">Required:</p>
          <ul className="list-disc list-inside">
            <li>Government issued ID</li>
            <li>Facial recognition</li>
          </ul>
        </div>

        {kYCComplete ? (
          <button className="min-w-full bg-[#250335] mx-auto" disabled={true}>
            KYC Complete
          </button>
        ) : !kYCProcessing ? (
          loading ? (
            <button className="min-w-full bg-[#250335] mx-auto">
              <Spinner as="div" />
            </button>
          ) : (
            <button
              className="min-w-full bg-[#250335] mx-auto disabled:bg-gray-400"
              onClick={handleKYC}
              disabled={
                userDetails?.tier?.level > 0 ||
                userDetails?.tier?.code === Codes.Processing
              }
            >
              {userDetails ? (
                userDetails?.tier?.level > 0 ? (
                  "Verified"
                ) : userDetails?.tier?.code === Codes.Processing ? (
                  "Processing..."
                ) : (
                  "Verify"
                )
              ) : (
                <Spinner />
              )}
            </button>
          )
        ) : (
          <button className="min-w-full bg-[#250335] mx-auto" disabled={true}>
            KYC Processing
          </button>
        )}
      </div>

      <div className="p-4 rounded-xl bg-[#250335] w-full space-y-2">
        <p className="text-sm">
          Upgrade to Tier 2 to enable Turkish Lira withdrawals
        </p>
        <div className="text-sm">
          <p className="font-medium">Required:</p>
          <ul className="list-disc list-inside">
            <li>Mucharet</li>
            <li>Turkish Government issued ID</li>
          </ul>
        </div>
        {T2kYCComplete ? (
          <button className="min-w-full bg-[#045725] mx-auto" disabled={true}>
            Tier 2 Complete
          </button>
        ) : !T2kYCProcessing ? (
          T2loading ? (
            <button className="min-w-full bg-[#045725] mx-auto">
              <Spinner as="div" />
            </button>
          ) : (
            <button
              className={`min-w-full bg-[#045725] mx-auto disabled:bg-gray-400`}
              onClick={handleT2KYC}
              disabled={
                !userDetails?.tier?.level || userDetails?.tier?.level < 1
              }
            >
              {userDetails ? (
                userDetails?.tier?.level === 2 ? (
                  "Upgraded"
                ) : userDetails?.tier?.level < 1 ? (
                  "Verify first"
                ) : (
                  "Upgrade"
                )
              ) : (
                <Spinner />
              )}
            </button>
          )
        ) : (
          <button className="min-w-full bg-[#045725] mx-auto" disabled={true}>
            Tier 2 KYC Processing
          </button>
        )}
      </div>
    </main>
  );
};

export default KYC;
