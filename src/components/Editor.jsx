import Codemirror from "@uiw/react-codemirror";
import React, { useCallback } from "react";
import 'codemirror/keymap/sublime';
import { useDropzone } from "react-dropzone";
import { saveImage } from "../fileService";
import { myLocalStorage } from "../storageHelper";

const imgPrefix = "img/";

export default function Editor({ value, theme, onChange, onUploadImage }) {
	const onDrop = useCallback(files => {
		const file = files[0];
		saveImage(file, (err, data) => {
			if (err) {
				throw new Error(err);
			}
			const key = imgPrefix + file.name;
			myLocalStorage.store(key, data);
			onUploadImage(key, data);
		});
	}, [])
	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

	const handleChange = (editor, _) =>
		onChange(editor.getValue());

	return <>
		<div {...getRootProps()}>
			<input {...getInputProps()} />
			<Codemirror
				value={value}
				onChange={(editor, change) => handleChange(editor, change)}
				options={{
					theme,
					keyMap: "sublime",
					mode: "markdown",
				}}
			/>
		</div>
	</>;
}
