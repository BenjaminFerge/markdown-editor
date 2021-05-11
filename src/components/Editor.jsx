import Codemirror from "@uiw/react-codemirror";
import React, { useCallback } from "react";
import 'codemirror/keymap/sublime';
import { useDropzone } from "react-dropzone";
import { saveImage } from "../fileService";

export default function Editor({ value, theme, onChange }) {
	const onDrop = useCallback(files => {
		saveImage(files[0]);
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
