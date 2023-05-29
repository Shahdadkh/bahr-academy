import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

const CustomeDropzone = ({ getPicture }) => {
  const [files, setFiles] = useState([]);
  const [image, setImage] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
      setImage(acceptedFiles);
    },
  });

  const thumbs = files.map((file) => (
    <div className="rounded-sm w-24 h-24 mx-auto relative" key={file.name}>
      <div className="flex min-w-0 overflow-hidden w-fit">
        <img
          src={file.preview}
          className="block w-full h-full absolute"
          alt=""
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
      {getPicture(image[0])}
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  return (
    <section className="border-dashed border-2 p-3 h-fit cursor-pointer">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p className="text-textHead-800 py-6 text-md font-semibold">
          عکس مورد نظر را کشیده و در اینجا قرار دهید
        </p>
        <aside className="mt-2">{thumbs}</aside>
      </div>
    </section>
  );
};

export { CustomeDropzone };
