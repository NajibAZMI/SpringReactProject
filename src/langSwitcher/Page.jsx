import { useState } from "react"
import Swicher from "./Swicher"
export default function Page(){
                   const [currentLang,SetCurrentLang]=useState()
                   const DisplayName=()=>{
                     switch(currentLang){
                            case 'AR':return  <div>لعربية </div>    
                            case 'EN':return  <div>Hello</div>   
                            case 'ES':return   <div>Hola</div>   
                            case 'FR':return  <div>Bonjour</div>          
                     }
                   }
                    return <>
                         <Swicher onLangChange={(value)=>{SetCurrentLang(value)}}/>
                         
                          {DisplayName()}
                        
                         
                    </>
}