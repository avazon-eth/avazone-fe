import logo from "@/assets/splash_3.mp4";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
const AvagenPage = () => {
  const [hasImage, setHasImage] = useState(false);
  const [curStep, setCurStep] = useState(1);
  useEffect(() => {
    if (curStep === 5) {
      // Add your logic here
      console.log("license modal is needed");
    }
  }, [curStep]);

  return (
    <div className="flex items-center justify-center h-screen pt-20 bg-black">
      <div className="flex flex-row text-white text-2xl w-full items-center justify-center h-full">
        <div className="text-center w-1/2 flex items-center justify-end h-full">
          {hasImage && (
            <video
              src={logo}
              alt="logo"
              autoPlay
              loop
              muted
              className="h-full object-cover"
            />
          )}
        </div>
        <div className="text-center w-1/2 flex items-start justify-center h-full flex-col">
          <Card className="w-4/5 h-5/6 rounded-3xl flex items-center justify-center bg-gradient-to-br from-[#6a6a6a] via-[#1b1b1bee] to-[#6a6a6a] p-0.2 border-0.5">
            <div className="w-full h-full rounded-3xl bg-[#1e1e1e]">
              <CardHeader>
                <CardTitle className="text-white flex flex-col">
                  <div className="flex items-start flex-col">
                    <div className="text-xs text-[#ffffff54]">
                      Your prograss
                    </div>
                    <div className="text-2xl">Step {curStep}</div>
                  </div>
                  <div className="menu"></div>
                </CardTitle>
              </CardHeader>
            </div>
          </Card>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default AvagenPage;
