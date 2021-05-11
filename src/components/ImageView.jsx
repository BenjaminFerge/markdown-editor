import React from "react";
import { myLocalStorage } from "../storageHelper";
import "./ImageView.css";

export default function ImageView({ onDelete, image }) {
    const [key, imageData] = image;
    return (
        <div className="ImageView">
            <button onClick={() => {
                if (window.confirm("Are you sure?")) {
                    myLocalStorage.removeItem(key);
                    onDelete(key);
                }
            }} className="ImageView-delete">x</button>
            <img src={imageData} alt={key} />
        </div>
    );
}