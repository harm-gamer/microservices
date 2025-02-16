import { useState ,useEffect} from "react";
const images = [
    "https://images.unsplash.com/photo-1739382122846-74e722a6eea4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8",
    "https://images.unsplash.com/photo-1739382122846-74e722a6eea4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8",
    "https://images.unsplash.com/photo-1739382122846-74e722a6eea4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8",
    "https://images.unsplash.com/photo-1739382122846-74e722a6eea4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8",
    "https://images.unsplash.com/photo-1739382122846-74e722a6eea4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8",
    "https://plus.unsplash.com/premium_photo-1739052532481-ec8585055149?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8",

  ];
export const Slider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const totalSlides = images.length;
  
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
      }, 3000);
      return () => clearInterval(interval);
    }, []);

    return (
      <div className="relative overflow-hidden w-full max-w-4xl mx-auto mt-6">
        <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${currentIndex * 100}%)` 
    }}>
        
          {images.map((image, index) => (
            
            <div key={index} className="w-full flex-shrink-0 p-4">
              
              <img src={`${image}`} style={{height: "200px"}} alt={`Slide ${index + 1}`} className="w-full h-auto rounded-lg shadow-md" />
            </div>
          ))}
        </div>
        <button onClick={() => setCurrentIndex((currentIndex - 1 + totalSlides) % totalSlides)} className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full">◀</button>
        <button onClick={() => setCurrentIndex((currentIndex + 1) % totalSlides)} className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full">▶</button>
      </div>
    );
    
  };