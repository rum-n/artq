import React,{useRef,useEffect,useState} from 'react';
import './imageupload.css'
import Button from "./Button" 

const ImageUpload = props =>{

   
    const filePickerRef = useRef();
    const [file,setFile] = useState();
    const [previewUrl,setPreviewUrl] = useState()
    const [isValid,setIsValid] = useState(false)
    useEffect(() =>{
        if(!file){
            return;
        }
        const fileReader = new FileReader();
        fileReader.onload = () =>{
            setPreviewUrl(fileReader.url)
        }
        fileReader.readAsDataURL(file)

    },[file])

    const pickImageHandler = () =>{
     filePickerRef.current.click()

    }
    const pickedHandler = event =>{
        let pickedFile;
        let fileIsValid = isValid
        if(event.target.file && event.target.files.length === 1){
            pickedFile = event.target.files[0];
            setFile(pickedFile);
            setIsValid(true);
            fileIsValid = true

        }else{
            setIsValid(false)
            fileIsValid = false
        }
      

    }
  return(
      <div className="form-control">
       <input onChange={pickedHandler} ref={filePickerRef} id={props.id} style={{display:"none"}} type="file" accept=".jpg,.png,.jpeg"/>
       <div className={`image-upload ${props.center && 'center'}`}>
           <div className="image-upload__preview">
               {previewUrl && <img src={previewUrl} alt="Preview"/>}
               {!previewUrl && <p>Please pic an image</p>}

           </div>
       <Button type="button" onClick={pickImageHandler}>PICK IMAGE</Button>

       </div>
       {!isValid && <p>{props.errorText}</p>}
      </div>


  )

}
export default ImageUpload