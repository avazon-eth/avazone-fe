import { useState } from "react";
import { Button } from "@/components/ui/button";
import { getIPAs } from "@/utils/getIPAs";
import { useEffect } from "react";

const ITEMS_PER_PAGE = 10;

const HomePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const ipas = await getIPAs(currentPage, ITEMS_PER_PAGE); // Pass pagination parameters
      setData(ipas.items);
    };

    fetchData();
  }, [currentPage]); // Add currentPage as a dependency

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const paginatedData = data; // Use the data fetched from the server

  return (
    <div className="min-h-screen pt-24 p-8">
      <div className="flex justify-between flex-row items-start gap-4 mb-4">
        <div className="flex space-x-4">
          <Button className="bg-gradient-to-r from-[#4620DD] to-[#801AE5] hover:from-[#3D1CC5] hover:to-[#7017CC]">
            All
          </Button>
          <Button>Trending</Button>
          <Button>New</Button>
        </div>
        <div className="flex flex-row gap-4 items-center">
          <div className="text-white">sort by</div>
          <select className="bg-gray-800 text-white px-4 py-2 rounded">
            <option>Last Uploaded</option>
            <option>Most Popular</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {paginatedData.map((item, index) => (
          <div
            key={index}
            className="relative rounded-lg overflow-hidden shadow-lg"
          >
            <img
              src={item.profile_image_url}
              alt={item.title}
              className="w-full h-96 object-cover" // Adjusted height for 2:3 aspect ratio ss
            />
            <div className="absolute top-0 left-0 p-2 bg-black bg-opacity-50 rounded-br-lg">
              <span className="text-white flex items-center">{item.title}</span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-50 flex justify-between items-center">
              <span className="text-white">{item.name}</span>
              <Button className="text-white px-4 py-2 rounded-full bg-gradient-to-r from-[#4620DD] to-[#801AE5] hover:from-[#3D1CC5] hover:to-[#7017CC]">
                Use
              </Button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage * ITEMS_PER_PAGE >= data.length}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
