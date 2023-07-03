import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface galleryType {
  folderName: string;
  tailorEmail?: string;
  imageUrl: string;
  id: string;
}
interface GalleryState {
  gallery: galleryType[];
}

const initialState: GalleryState = {
  gallery: [] as galleryType[],
};
export const gallerySlice = createSlice({
  name: 'gallery',
  initialState,
  reducers: {
    galleryInfo: (state, action: PayloadAction<galleryType[]>) => {
      state.gallery = action.payload;
    },
    resetGalleryInfo: (state) => {
      state = initialState;
    },
  },
});

export const { galleryInfo, resetGalleryInfo } = gallerySlice.actions;
export default gallerySlice.reducer;
