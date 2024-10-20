import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import licenses from "../static/terms.json";

const LicensePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const creationId = queryParams.get("creation_id");

  const [selectedLicense, setSelectedLicense] = useState(null);
  const [hoveredLicense, setHoveredLicense] = useState(null);
  const [creatorRoyalty, setCreatorRoyalty] = useState(false);
  const [mintingFee, setMintingFee] = useState(false);
  const [creatorRoyaltyValue, setCreatorRoyaltyValue] = useState("");
  const [mintingFeeValue, setMintingFeeValue] = useState("");

  const handleLicenseSelect = (license) => {
    console.log(license);
    if (license === "non-commercial") {
      setCreatorRoyalty(false);
      setMintingFee(false);
    } else if (license === "commercial") {
      setCreatorRoyalty(false);
      setMintingFee(true);
    } else {
      setCreatorRoyalty(true);
      setMintingFee(true);
    }

    setSelectedLicense(license);
  };

  const handleMouseEnter = (license) => {
    setHoveredLicense(license);
  };

  const handleMouseLeave = () => {
    setHoveredLicense(null);
  };

  const handleCancel = () => {
    if (window.confirm("Are you sure you want to cancel?")) {
      navigate("/home");
    }
  };

  const handlePublishOrNext = () => {
    if (!selectedLicense) {
      alert("Please select a license type.");
      return;
    }

    if (creatorRoyalty && !creatorRoyaltyValue.trim()) {
      alert("Please enter a Creator Royalty value.");
      return;
    }

    if (mintingFee && !mintingFeeValue.trim()) {
      alert("Please enter a Minting Fee value.");
      return;
    }

    const action = selectedLicense ? "publish" : "proceed to the next step";
    if (window.confirm(`Are you sure you want to ${action}?`)) {
      // Implement publish or next step logic here
      console.log(selectedLicense ? "Publishing..." : "Moving to next step...");
      console.log("Creator Royalty:", creatorRoyaltyValue);
      console.log("Minting Fee:", mintingFeeValue);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen p-6 pt-24">
      <Card className="bg-[#1b1b1b] text-white p-6 rounded-lg shadow-lg w-full max-w-6xl h-[calc(100%-4rem)] overflow-hidden">
        <h2 className="text-xl mb-4">Select License Type</h2>

        <div className="flex gap-6 h-[calc(100%-3rem)] overflow-hidden">
          <div className="flex-1 overflow-y-auto pr-2 text-white">
            {licenses.map((license) => (
              <Card
                key={license.type}
                className={`p-4 mb-2 cursor-pointer border border-shiny-outstroke bg-darkgrey-2 rounded-custom text-white ${
                  selectedLicense === license.type
                    ? "bg-[#595959]"
                    : hoveredLicense === license.type
                    ? "bg-[#2A2A2A]"
                    : "bg-[#2A2A2A]"
                }`}
                onClick={() => handleLicenseSelect(license.type)}
                onMouseEnter={() => handleMouseEnter(license.type)}
                onMouseLeave={handleMouseLeave}
              >
                <div className="font-bold">{license.title}</div>
                <div>{license.description}</div>
                {(selectedLicense === license.type ||
                  hoveredLicense === license.type) && (
                  <div>
                    <div>
                      <strong>Others Can:</strong>
                    </div>
                    <ul>
                      {license.details.can.map((item, index) => (
                        <li key={index}>✅ {item}</li>
                      ))}
                    </ul>
                    {license.details.cannot && (
                      <>
                        <div>
                          <strong>Others Cannot:</strong>
                        </div>
                        <ul>
                          {license.details.cannot.map((item, index) => (
                            <li key={index}>❌ {item}</li>
                          ))}
                        </ul>
                      </>
                    )}
                    <div>
                      <strong>Additional Notes:</strong>
                    </div>
                    <ul>
                      {license.details.notes.map((item, index) => (
                        <li key={index}>ℹ️ {item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </Card>
            ))}
          </div>

          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="overflow-y-auto flex-grow pr-2">
              <div className="mb-4">
                <div className="font-bold mb-2">Payout & Royalties</div>
                <div className="space-y-2">
                  <div className={`${!creatorRoyalty ? "opacity-50" : ""}`}>
                    <label className="block">
                      <h2 className="text-white">Creator Royalty</h2>
                      <div className="text-gray-300">
                        The percentage you get for every remix of the Avatar
                      </div>
                    </label>
                    <Input
                      type="text"
                      className={`bg-[rgba(55,55,55,0.55)] p-2 rounded-[100px] w-full ${
                        !creatorRoyalty ? "text-gray-400" : "text-white"
                      }`}
                      placeholder="%"
                      disabled={!creatorRoyalty}
                      value={creatorRoyaltyValue}
                      onChange={(e) => setCreatorRoyaltyValue(e.target.value)}
                    />
                  </div>
                  <div className={`${!mintingFee ? "opacity-50" : ""}`}>
                    <label className="block">
                      <h2 className="text-white">Minting Fee</h2>
                      <div className="text-gray-300">
                        The cost a user must pay to mint a license for this IP
                      </div>
                    </label>
                    <Input
                      type="text"
                      className={`bg-[rgba(55,55,55,0.55)] p-2 rounded-[100px] w-full ${
                        !mintingFee ? "text-gray-400" : "text-white"
                      }`}
                      placeholder="$IP"
                      disabled={!mintingFee}
                      value={mintingFeeValue}
                      onChange={(e) => setMintingFeeValue(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <Button
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button
                className={`px-4 py-2 rounded ${
                  selectedLicense ? "bg-blue-500" : "bg-gray-500"
                }`}
                onClick={handlePublishOrNext}
              >
                {selectedLicense ? "Publish" : "Next"}
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default LicensePage;
