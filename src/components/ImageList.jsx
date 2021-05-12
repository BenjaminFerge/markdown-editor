import React from "react";
import ImageView from "./ImageView";
import "./ImageList.css";

export default function ImageList({ images, handleDelete }) {
    return (images && images.length ?
        <div className="ImageList">
            <span>Images: </span>
            {images.map(path => <ImageView key={path} onDelete={handleDelete} image={path} />)}
        </div> :
        <></>
    );
}