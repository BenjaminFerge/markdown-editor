import Codemirror from "@uiw/react-codemirror";
import React, { useCallback } from "react";
import 'codemirror/keymap/sublime';
import { useDropzone } from "react-dropzone";
import fileService from "../services/fileService";
import { myLocalStorage } from "../storageHelper";
import { useDrop } from "react-dnd";

export default function Editor({ value, theme, onChange, onUploadImage }) {
	const onDrop = useCallback(files => {
		fileService.saveImage(files)
			.then(res => res.json())
			.then(res => {
				const { path: filename } = res.files[0];
				const path = `${fileService.getUrl()}/${filename}`;
				onUploadImage(path);
			});
	}, [])
	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

	const handleChange = (editor, _) =>
		onChange(editor.getValue());

	const [collectedProps, drop] = useDrop(() => ({
		accept: ["ImageView"]
	}))

	return <>
		<div {...getRootProps()} ref={drop}>
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
