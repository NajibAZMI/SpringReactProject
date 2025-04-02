export default function Event(){
            const  handleClick = () =>{
                    alert("Booom !!")
            }        
            return <div><button onClick={handleClick}>Click</button></div>        
}