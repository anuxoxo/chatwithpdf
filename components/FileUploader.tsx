"use client";

import React, { useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import {
  CheckCircleIcon,
  CircleArrowDown,
  HammerIcon,
  RocketIcon,
  SaveIcon,
} from "lucide-react";
import useUpload, { StatusText } from "@/hooks/useUpload";
import { useRouter } from "next/navigation";

function FileUploader() {
  const { progress, status, fileId, handleUpload } = useUpload();
  const router = useRouter();

  useEffect(() => {
    if (fileId) {
      router.push(`/dashboard/files/${fileId}`);
    }
  }, [fileId, router]);

  const statusIcons: { [key in StatusText]: JSX.Element } = {
    [StatusText.UPLOADING]: (
      <RocketIcon className="h-20 w-20 text-indigo-600" />
    ),
    [StatusText.UPLOADED]: (
      <CheckCircleIcon className="h-20 w-20 text-indigo-600" />
    ),
    [StatusText.SAVING]: <SaveIcon className="h-20 w-20 text-indigo-600" />,
    [StatusText.GENERATING]: (
      <HammerIcon className="h-20 w-20 text-indigo-600" />
    ),
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      await handleUpload(file);
    } else {
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { getRootProps, getInputProps, isDragActive, isFocused, isDragAccept } =
    useDropzone({
      onDrop,
      maxFiles: 1,
      accept: {
        "application/pdf": [".pdf"],
      },
    });

  const uploadInProgress = progress != null && progress >= 0 && progress <= 100;

  return (
    <div className="flex flex-col gap-4 items-center max-w-7xl mx-auto">
      {uploadInProgress && (
        <div className="mt-32 flex flex-col justify-center items-center gap-5">
          <div
            className={`radial-progress bg-indigo-300 text-white border-indigo-600 border-4 ${
              progress === 100 && "hidden"
            }`}
            role="progressbar"
            style={
              {
                "--value": progress,
                "--size": "6rem",
                "--thickness": "1rem",
              } as React.CSSProperties
            }
          >
            {progress} %
          </div>
          {status && statusIcons[status as StatusText]}
          {status && <p>{status as StatusText}</p>}
        </div>
      )}

      {!uploadInProgress && (
        <>
          <div
            {...getRootProps()}
            className={`p-10 mt-10 w-[90%] mx-auto rounded border-2 border-dashed border-indigo-600 text-indigo-600 h-96 flex items-center justify-center ${
              isFocused || isDragAccept ? "bg-indigo-300" : "bg-indigo-100"
            }`}
          >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center justify-center">
              {isDragActive ? (
                <>
                  <RocketIcon className="h-20 w-20 animate-ping" />
                  <p>Drop the files here ...</p>
                </>
              ) : (
                <>
                  <CircleArrowDown className="h-20 w-20 animate-bounce" />
                  <p>Drag n drop some files here, or click to select files</p>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default FileUploader;
