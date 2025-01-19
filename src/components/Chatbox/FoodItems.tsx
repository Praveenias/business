import { useEffect, useState } from "react";

interface MenuItem {
  name: string;
}

interface Category {
  id: string;
  title: string;
  items: MenuItem[];
}
interface FoodItemsProps {
  onComplete: () => void;
}

function FoodItems({ onComplete }: FoodItemsProps) {
  const [hasCompleted, setHasCompleted] = useState(false);
  const categories: Category[] = [
    {
      id: '01',
      title: 'Category - 01',
      items: [
        { name: 'Masala Dosa with Ghee' },
        { name: 'Onion Rava with Ghee' },
        { name: 'Paneer Dosa with Ghee' },
        { name: 'Mushroom Dosa with Ghee' },
        { name: 'Normal Dosa with Ghee' },
        { name: 'Podi Dosa with Ghee' },
        { name: 'Onion Podi Dosa with Ghee' },
        { name: 'Masala Dosa with Ghee' },
      ],
    },
    {
      id: '02',
      title: 'Category - 02',
      items: [
        { name: 'Masala Dosa with Ghee' },
        { name: 'Onion Rava with Ghee' },
        { name: 'Paneer Dosa with Ghee' },
        { name: 'Mushroom Dosa with Ghee' },
        { name: 'Normal Dosa with Ghee' },
        { name: 'Podi Dosa with Ghee' },
        { name: 'Onion Podi Dosa with Ghee' },
        { name: 'Masala Dosa with Ghee' },
      ],
    },
    {
      id: '03',
      title: 'Category - 03',
      items: [
        { name: 'Masala Dosa with Ghee' },
        { name: 'Onion Rava with Ghee' },
        { name: 'Paneer Dosa with Ghee' },
        { name: 'Mushroom Dosa with Ghee' },
        { name: 'Normal Dosa with Ghee' },
        { name: 'Podi Dosa with Ghee' },
        { name: 'Onion Podi Dosa with Ghee' },
        { name: 'Masala Dosa with Ghee' },
      ],
    },
    {
      id: '04',
      title: 'Category - 04',
      items: [
        { name: 'Masala Dosa with Ghee' },
        { name: 'Onion Rava with Ghee' },
        { name: 'Paneer Dosa with Ghee' },
        { name: 'Mushroom Dosa with Ghee' },
        { name: 'Normal Dosa with Ghee' },
        { name: 'Podi Dosa with Ghee' },
        { name: 'Onion Podi Dosa with Ghee' },
        { name: 'Masala Dosa with Ghee' },
      ],
    },
  ];
  useEffect(() => {
    if (!hasCompleted) {
      const timer = setTimeout(() => {
        onComplete();
        setHasCompleted(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [hasCompleted, onComplete]);
  
  

  return (
    <div className="p-6 md:p-2">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-xl text-gray-600 mb-6">
            Now select and proceed with any one of the Category
          </h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-[#F6F6F6] rounded-[10px] overflow-hidden"
            >
              <div className="p-5">
                <h2 className="text-gray-900 font-medium text-sm pb-2 mb-3 border-b-2 border-orange-300 text-center">
                  {category.title}
                </h2>
                <ul className="space-y-2">
                  {category.items.map((item, index) => (
                    <li
                      key={index}
                      className="bg-white rounded-lg cursor-pointer group"
                    >
                      <div className="flex items-center gap-3 px-3 py-2">
                        <div className="w-[20%] grid justify-center content-center">
                        <div className="flex gap-[2px] mt-[2px]">
                          <div className="w-1 h-1 rounded-full bg-gray-300"></div>
                          <div className="w-1 h-1 rounded-full bg-gray-300"></div>
                        </div>
                        <div className="flex gap-[2px] mt-[2px]">
                          <div className="w-1 h-1 rounded-full bg-gray-300"></div>
                          <div className="w-1 h-1 rounded-full bg-gray-300"></div>
                        </div>
                        <div className="flex gap-[2px] mt-[2px]">
                          <div className="w-1 h-1 rounded-full bg-gray-300"></div>
                          <div className="w-1 h-1 rounded-full bg-gray-300"></div>
                        </div>
                        </div>
                        <div className="flex items-center w-[80%]">
                        <span className="text-gray-600 text-center text-[13px] group-hover:text-gray-900 transition-colors">
                          {item.name}
                        </span>
                        </div>
                        
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FoodItems;