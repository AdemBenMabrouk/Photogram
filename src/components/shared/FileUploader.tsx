import {useCallback, useState} from 'react'
import {useDropzone,FileWithPath} from 'react-dropzone'
import { Button } from '../ui/button'

type fileUploaderProps={
    fieldchange:(FILES:File[])=>void,
    mediaurl:string
}

const FileUploader = ({fieldchange,mediaurl}:fileUploaderProps) => {
    const [fileurl, setfileurl] = useState(mediaurl) 
    const [file, setfile] = useState<File[]>([]) 

    
        const onDrop = useCallback((acceptedFiles:FileWithPath[]) => {
          setfile(acceptedFiles)
          fieldchange(acceptedFiles)
          setfileurl(URL.createObjectURL(acceptedFiles[0]))
        }, [file])
        const {getRootProps, getInputProps} = useDropzone({onDrop,accept:{'image/*':['.png','.jpeg','.jpg']}})

 return (
    <div {...getRootProps()} className='flex flex-center flex-col bg-dark-3 rounded-xl cursor-pointer'>
    <input {...getInputProps()} className='cursor-pointer'/>
    {
      fileurl ?(
        
         <div className='flex flex-1 flex-col justify-center w-full p-5 lg:p-10'>
            <img src={fileurl} alt=""className='file_uploader-img' />
            <p className='file_uploader-label'>Click or Drag to replace</p>
          </div>
        
      ):(
        <div className='file_uploader-box'>
            <img src="/assets/icons/file-upload.svg" alt="" width={96} height={77} />
            <h3 className='base-meduim text-light-2 mb-2 mt-6'>Drag Photo Here</h3>
            <p className='text-light-4 small-regular mb-6' >SVG,PNG,JPG</p>
            <Button className='shad-button_dark_4'>
                Select from gallery
            </Button>
        </div>
      )
        
    }
  </div>
  )
}


export default FileUploader