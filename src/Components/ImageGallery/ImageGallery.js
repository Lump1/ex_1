import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { uploadImage } from '../../redux/slices/imagesSlice';
  

function Image(props) {
    return(
        <img className="gallery-image" src={props.imageURL}></img>
    );
}

export function ImageGallery() {
    const dispatch = useDispatch();
    const images = useSelector(state => state.images.urlArray);
    
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if(file == null)
            return;
        if (file) {
          const url = URL.createObjectURL(file);
          dispatch(uploadImage(url));
        }
    };

    return(
        <div>
            <input type="file" id="imageInput" onChange={handleFileChange} accept="image/*" />
            <div className="gallery-container">
                {
                        images.map(url => {
                                return(<Image imageURL={url}></Image>);
                        })

                }
                
            </div>
        </div>
    );
}