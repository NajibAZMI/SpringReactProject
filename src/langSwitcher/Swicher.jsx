export default function Swicher({onLangChange}){
                    const handlelangChange=(e)=>{

                          onLangChange(e.currentTarget.dataset.lang)
                    }
                    return <>
                           <ul className="nav justify-content-center"> 
<li className="nav-item"> <a className="nav-link active" data-lang="AR" href="#" onClick={handlelangChange}> العربية </a> </li> 
<li className="nav-item"> <a className="nav-link" href="#" data-lang='FR' onClick={handlelangChange}>Français</a> </li> 
<li className="nav-item"> <a className="nav-link" href="#" data-lang='EN' onClick={handlelangChange}>English</a> </li> 
<li className="nav-item"> <a className="nav-link" href="#" data-lang='ES' onClick={handlelangChange} >Español</a> </li> 
</ul>
                    </>
}