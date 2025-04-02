import { useState } from "react"
export default function FruiteList(){
          const [fruit,setFruit]=useState('')
          const [fruits,setFruits]=useState([])
          const displayFruit = () => fruits.map((fruit, index) => <li key={index}>{fruit}</li>)
 
         const handleInput=()=>{
              const fruitValue=document.getElementById('fruit').value
              setFruit(fruitValue)
         }

          const handleAddFruit=(e)=>{
              e.preventDefault()
              setFruits([...fruits,fruit])
          }

          return <>
                 <span>
                     <form>
                            <input type="text" onChange={handleInput} id='fruit'/>
                            <input type="submit" onClick={handleAddFruit} value="Ajouter Fruit" />
                     </form>
                 </span>
                 <h1>Fruits :</h1>
                 <ul>
                 {displayFruit()}
                 </ul>
          </>          
}