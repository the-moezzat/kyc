'use client'
import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import {Button} from "@/components/ui/button";
import {ArrowLeft, UploadCloud} from "lucide-react";
import File from "./_components/file";
import Link from "next/link";

function Page() {
    const [files, setFiles] = React.useState<File[]>([]);
    const onDrop = useCallback((acceptedFiles: File[]) => {
        // Do something with the files
        setFiles(acceptedFiles);
        console.log(acceptedFiles);
    }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    console.log(files)
    return (
        <>
    <div  className={"flex flex-col items-center justify-between h-full py-8"}>
            <h1 className={"text-gray-900 text-xl font-bold text-center"}>Upload Your Bank Statements</h1>
            <div className={'space-y-10'}>
                <div className={"space-y-2"}>
                    {files.map((file) => (<File key={file.name} name={file.name} onDelete={() =>
                        setFiles(files.filter((f) => f.name !== file.name))
                    }/>)) }
                </div>
                <div
                    className={"flex flex-col items-center gap-4 p-4 rounded-lg border bg-gray-50 w-full"}  {...getRootProps()}>
                    <input {...getInputProps()} />
                    <div className={"w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-600"}>
                        <UploadCloud/>
                    </div>
                    <p className={"text-sm text-center leading-relaxed"}>
                           <span className={"text-gray-500 font-semibold"}>
                               Click to upload
                           </span> {" "}
                        <span className={"text-gray-700"}>
                                or drag and drop
                            </span>
                        <br/>
                        SVG, PNG, JPG or GIF (max. 800x400px)
                    </p>

                </div>
            </div>
        <div className={'flex w-full justify-between items-center'}>
            <Button variant={"outline"} asChild>
                <Link href={'/mobile/tasks'} className={"text-sm flex gap-1 items-center text-gray-600"}> <ArrowLeft size={14} /> <span>Back</span></Link>
            </Button>
            <Button size={"lg"} disabled={files.length === 0}>Next</Button>
        </div>
        </div>
        </>
    );
}

export default Page;