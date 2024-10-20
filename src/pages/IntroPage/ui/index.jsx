import { DynamicConnectButton } from "@dynamic-labs/sdk-react-core";
import logo from "@/assets/splash_3.mp4";

const IntroPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-black text-white">
      <div className="flex items-center h-full">
        <div className="mr-12 h-full flex items-center">
          {/* Replace with your logo component or video */}
          <video
            src={logo}
            alt="logo"
            autoPlay
            loop
            muted
            className="h-full object-cover"
          />
        </div>
        <div className="text-center h-full flex flex-col justify-center">
          <h1 className="text-4xl font-bold">Create your own Avatar</h1>
          <p className="text-lg mb-6">Create your own OOO</p>
          <DynamicConnectButton>
            <div className="bg-gradient-to-r from-[#4620DD] to-[#801AE5] hover:from-[#3D1CC5] hover:to-[#7017CC] text-white py-2 px-6 rounded-full text-lg">
              <div data-testid="exampleChild">Enter</div>
            </div>
          </DynamicConnectButton>
        </div>
      </div>
    </div>
  );
};

export default IntroPage;
