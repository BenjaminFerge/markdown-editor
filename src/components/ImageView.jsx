import React from "react";
import { useDrag } from "react-dnd";
import fileService from "../services/fileService";
import "./ImageView.css";

export default function ImageView({ onDelete, image, isDragging }) {
    const [{ opacity }, dragRef] = useDrag(
        () => ({
            type: "ImageView",
            item: { text: "" },
            collect: (monitor) => ({
                opacity: monitor.isDragging() ? 0.5 : 1
            })
        }),
        []
    );
    return (
        <div className="ImageView" ref={dragRef} style={{ opacity }}>
            <button onClick={() => {
                if (window.confirm("Are you sure?")) {
                    onDelete(image);
                }
            }} className="ImageView-delete">x</button>
            <img src={`${fileService.getUrl()}/${image}`} alt="Embedded image" />
        </div>
    );
}