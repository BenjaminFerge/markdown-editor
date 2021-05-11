import React from "react";
import ImageView from "./ImageView";
import "./ImageList.css";

export default function ImageList({images, handleDelete}) {
    return (images.length ?
        <div className="ImageList">
            <span>Images: </span>
            {images.map(img => <ImageView onDelete={handleDelete} image={img} />)}
        </div> :
        <></>
    );
}