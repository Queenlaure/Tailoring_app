
export interface GalleryCardsProps {
    id?: number;
    name?: string;
    pic?: any;
}

export const galleryCards:GalleryCardsProps[] = [
    {
      id: 1,
      name: "traditional Wear",
      pic: require("../assets/tailor1.jpg"),
    },
  
    {
      id: 2,
      name: "Turkish",
      pic: require("../assets/tailor2.jpg"),
    },
    {
      id: 3,
      name: "Casual",
      pic: require("../assets/tailor3.jpg"),
    },
  
    {
      id: 4,
      name: "Joggings",
      pic: require("../assets/tailor4.jpg"),
    },
 

  ];
  

  