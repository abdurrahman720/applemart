import Image from "next/image";

const HomeBanner = () => {
    return (
        <div className="relative bg-gradient-to-r from-sky-500 to-sky-700 mb-8">
            <div className="mx-auto px-8 py-12 flex flex-col md:flex-row  items-center justify-evenly">
                <div className="text-center mb-8 md:mb-0">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Summer Sale</h1>
                    <p className="text-lg md:text-xl text-white mb-2">enjoy discount on selected items</p>
                    <h1 className="text-2xl md:text-5xl text-yellow-400 font-bold">Get 50% Off</h1>
                </div>
                <div className="relative w-1/3 aspect-video ">
             <Image src="/banner-image.png " alt="banner image" fill className="object-contain" />
                  </div>
            </div>
        </div>
    );
};

export default HomeBanner;