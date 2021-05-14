import Codemirror from "@uiw/react-codemirror";
import React, { useCallback } from "react";
import 'codemirror/keymap/sublime';
import fileService from "../services/fileService";
import { useDrop } from "react-dnd";

export default function Editor({ value, theme, onChange, onUploadImage }) {
	const handleChange = (editor, _) =>
		onChange(editor.getValue());

	const [collectedProps, drop] = useDrop(() => ({
		accept: ["ImageView"]
	}))

	return <>
		<div ref={drop}>
			<Codemirror
				editorDid
				onDrop={(editor, e) => {
					const { files } = e.dataTransfer;
					const doc = editor.getDoc()
					const { pageX: x, pageY: y } = e;
					editor.setCursor(editor.coordsChar({ left: x, top: y }))
					const pos = editor.getCursor()
					fileService.saveImage(files)
						.then(res => res.json())
						.then(res => {
							const { path } = res.files[0];
							onUploadImage(path);
							const newLine = `![alt text](${path} "Embedded image")`;
							doc.replaceRange(newLine, pos)
						});
				}}
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
