import { FC, useCallback, useEffect, useRef } from "react"
import { Button } from "@mui/material"

interface CloudinaryUploadWidgetProps {}

export const CloudinaryUploadWidget: FC<CloudinaryUploadWidgetProps> = () => {
  const cloudinaryRef = useRef<any>(null)
  const widgetRef = useRef<any>(null)
  useEffect(() => {
    cloudinaryRef.current = window.cloudinary
    
    if (cloudinaryRef.current) {
      widgetRef.current = cloudinaryRef.current.createUploadWidget({
        cloudName: process.env.REACT_APP_CLOUDINARY_UPLOAD_NAME,
        uploadPresset: process.env.REACT_APP_UPLOAD_PRESET,
      }, function(error: any, result: any){
        console.log(result)
      })
    }
  }, [])

  const handleOpneWidget = useCallback(()=>{
    if(widgetRef.current){
      widgetRef.current?.open()
    }
  },[])
  return (
    <Button
    variant="outlined"
    color="primary"
    onClick={handleOpneWidget}
  >
    Upload
  </Button>
  )
}
