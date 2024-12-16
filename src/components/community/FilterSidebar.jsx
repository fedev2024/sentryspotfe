
const FilterSidebar = () => {
    return (
        <div className=" pd-right ">
            <div className="filters-outer text-center">
                
               <div className="flex-row flex justify-center">
               <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLMI5YxZE03Vnj-s-sth2_JxlPd30Zy7yEGg&s"
                className="rounded-full w-28 h-28"
                alt="" />
               </div>

                <h4 className="m-3">Ben Dexter</h4>
                
            </div>
            <div className="filters-outer text-center bg-">
                
               <div className="flex-row flex justify-center">
               <img src="https://w7.pngwing.com/pngs/352/661/png-transparent-flowers-bouquet-watercolor-flowers-flower-clip-art-thumbnail.png"
                className="rounded-full w-28 h-28"
                alt="" />
               </div>

                <h6 className="m-3">YOUR GROUPS</h6>
                <p className="text-xs my-2">
                Discover and join groups with like-minded women who share your interests, profession, and lifestyle.
                </p>
                <button className="my-2 text-blue-950">Explore</button>
            </div>
            <div className="filters-outer text-center">
                
               <div className="flex-row flex justify-center">
               <img src="https://www.shutterstock.com/image-vector/3d-illustration-abstract-modern-urban-600nw-2345134001.jpg"
                className="rounded-full w-28 h-28"
                alt="" />
               </div>

               <h6 className="m-3">COMPANIES YOU FOLLOW</h6>
                <p className="text-xs my-2">
               Get alerted when there are new employee reviews.
                </p>
                <button className="my-2 text-blue-950">Explore</button>
                
            </div>
        </div>
    );
};

export default FilterSidebar;
